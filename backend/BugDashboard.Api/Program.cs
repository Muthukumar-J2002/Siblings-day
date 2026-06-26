using BugDashboard.Api.Data;
using BugDashboard.Api.Middleware;
using BugDashboard.Api.Models;
using BugDashboard.Api.Services;
using BugDashboard.Api.Validation;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) => configuration.ReadFrom.Configuration(context.Configuration).WriteTo.Console());

var connectionString = builder.Configuration.GetConnectionString("BugTracker")
    ?? throw new InvalidOperationException("Missing BugTracker connection string.");

builder.Services.AddDbContextPool<BugDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36))));
builder.Services.AddScoped<IBugService, BugService>();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AngularClient", policy => policy
        .WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? ["http://localhost:4200"])
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var logger = scope.ServiceProvider.GetRequiredService<ILoggerFactory>().CreateLogger("DatabaseStartup");
    try
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<BugDbContext>();
        await dbContext.Database.EnsureCreatedAsync();
        logger.LogInformation("Bug tracker database schema is ready.");
    }
    catch (Exception exception)
    {
        logger.LogError(exception, "Database schema initialization failed. Confirm the MySQL server and BugTracker connection string are available.");
    }
}

app.UseSerilogRequestLogging();
app.UseMiddleware<ExceptionHandlingMiddleware>();
app.UseCors("AngularClient");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var bugs = app.MapGroup("/api/bugs");

bugs.MapGet("/", async ([FromServices] IBugService service, [FromQuery] BugStatus? status, CancellationToken cancellationToken) =>
    Results.Ok(await service.GetAllAsync(status, cancellationToken)));

bugs.MapGet("/{id:int}", async (int id, [FromServices] IBugService service, CancellationToken cancellationToken) =>
    await service.GetByIdAsync(id, cancellationToken) is { } bug ? Results.Ok(bug) : Results.NotFound());

bugs.MapPost("/", async ([FromBody] BugCreateRequest request, [FromServices] IBugService service, CancellationToken cancellationToken) =>
{
    var bug = await service.CreateAsync(request, cancellationToken);
    return Results.Created($"/api/bugs/{bug.Id}", bug);
}).AddEndpointFilter<ValidationFilter<BugCreateRequest>>();

bugs.MapPut("/{id:int}", async (int id, [FromBody] BugUpdateRequest request, [FromServices] IBugService service, CancellationToken cancellationToken) =>
    await service.UpdateAsync(id, request, cancellationToken) is { } bug ? Results.Ok(bug) : Results.NotFound()).AddEndpointFilter<ValidationFilter<BugUpdateRequest>>();

bugs.MapDelete("/{id:int}", async (int id, [FromServices] IBugService service, CancellationToken cancellationToken) =>
    await service.DeleteAsync(id, cancellationToken) ? Results.NoContent() : Results.NotFound());

bugs.MapGet("/summary", async ([FromServices] IBugService service, CancellationToken cancellationToken) =>
    Results.Ok(await service.GetSummaryAsync(cancellationToken)));

app.Run();

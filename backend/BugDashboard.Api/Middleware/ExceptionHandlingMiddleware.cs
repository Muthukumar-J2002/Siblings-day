using System.Net;
using System.Text.Json;

namespace BugDashboard.Api.Middleware;

public sealed class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Unhandled API exception for {Method} {Path}", context.Request.Method, context.Request.Path);
            context.Response.ContentType = "application/problem+json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var problem = new { title = "Unexpected server error", status = context.Response.StatusCode, traceId = context.TraceIdentifier };
            await context.Response.WriteAsync(JsonSerializer.Serialize(problem));
        }
    }
}

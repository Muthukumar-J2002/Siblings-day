using BugDashboard.Api.Data;
using BugDashboard.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BugDashboard.Api.Services;

public interface IBugService
{
    Task<List<BugItem>> GetAllAsync(BugStatus? status, CancellationToken cancellationToken);
    Task<BugItem?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<BugItem> CreateAsync(BugCreateRequest request, CancellationToken cancellationToken);
    Task<BugItem?> UpdateAsync(int id, BugUpdateRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken);
    Task<List<BugSummary>> GetSummaryAsync(CancellationToken cancellationToken);
}

public sealed class BugService(BugDbContext dbContext, ILogger<BugService> logger) : IBugService
{
    public Task<List<BugItem>> GetAllAsync(BugStatus? status, CancellationToken cancellationToken) =>
        dbContext.Bugs.AsNoTracking()
            .Where(bug => status == null || bug.Status == status)
            .OrderByDescending(bug => bug.UpdatedAtUtc)
            .ToListAsync(cancellationToken);

    public Task<BugItem?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        dbContext.Bugs.AsNoTracking().FirstOrDefaultAsync(bug => bug.Id == id, cancellationToken);

    public async Task<BugItem> CreateAsync(BugCreateRequest request, CancellationToken cancellationToken)
    {
        var bug = new BugItem { Title = request.Title.Trim(), Description = request.Description.Trim(), Status = request.Status, Assignee = request.Assignee?.Trim(), Priority = NormalizePriority(request.Priority) };
        dbContext.Bugs.Add(bug);
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Created bug {BugId} with status {Status}", bug.Id, bug.Status);
        return bug;
    }

    public async Task<BugItem?> UpdateAsync(int id, BugUpdateRequest request, CancellationToken cancellationToken)
    {
        var bug = await dbContext.Bugs.FindAsync([id], cancellationToken);
        if (bug is null) return null;
        bug.Title = request.Title.Trim();
        bug.Description = request.Description.Trim();
        bug.Status = request.Status;
        bug.Assignee = request.Assignee?.Trim();
        bug.Priority = NormalizePriority(request.Priority);
        bug.UpdatedAtUtc = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);
        logger.LogInformation("Updated bug {BugId} to status {Status}", bug.Id, bug.Status);
        return bug;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken)
    {
        var deleted = await dbContext.Bugs.Where(bug => bug.Id == id).ExecuteDeleteAsync(cancellationToken);
        if (deleted > 0) logger.LogInformation("Deleted bug {BugId}", id);
        return deleted > 0;
    }

    public async Task<List<BugSummary>> GetSummaryAsync(CancellationToken cancellationToken)
    {
        var grouped = await dbContext.Bugs.AsNoTracking().GroupBy(bug => bug.Status).Select(group => new BugSummary(group.Key, group.Count())).ToListAsync(cancellationToken);
        return Enum.GetValues<BugStatus>().Select(status => grouped.FirstOrDefault(item => item.Status == status) ?? new BugSummary(status, 0)).ToList();
    }

    private static string NormalizePriority(string? priority) => string.IsNullOrWhiteSpace(priority) ? "Medium" : priority.Trim();
}

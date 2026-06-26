using System.ComponentModel.DataAnnotations;

namespace BugDashboard.Api.Models;

public sealed class BugItem
{
    public int Id { get; set; }

    [Required, MaxLength(160)]
    public string Title { get; set; } = string.Empty;

    [Required, MaxLength(4000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public BugStatus Status { get; set; } = BugStatus.Open;

    [MaxLength(80)]
    public string? Assignee { get; set; }

    [MaxLength(40)]
    public string Priority { get; set; } = "Medium";

    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}

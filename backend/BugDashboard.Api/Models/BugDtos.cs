using System.ComponentModel.DataAnnotations;

namespace BugDashboard.Api.Models;

public sealed record BugCreateRequest(
    [Required, StringLength(160, MinimumLength = 3)] string Title,
    [Required, StringLength(4000, MinimumLength = 3)] string Description,
    BugStatus Status,
    [StringLength(80)] string? Assignee,
    [StringLength(40)] string? Priority);

public sealed record BugUpdateRequest(
    [Required, StringLength(160, MinimumLength = 3)] string Title,
    [Required, StringLength(4000, MinimumLength = 3)] string Description,
    BugStatus Status,
    [StringLength(80)] string? Assignee,
    [StringLength(40)] string? Priority);

public sealed record BugSummary(BugStatus Status, int Count);

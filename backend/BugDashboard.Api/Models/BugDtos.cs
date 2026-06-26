using System.ComponentModel.DataAnnotations;

namespace BugDashboard.Api.Models;

public sealed record BugCreateRequest(
    [Required, MaxLength(160)] string Title,
    [Required, MaxLength(4000)] string Description,
    BugStatus Status,
    [MaxLength(80)] string? Assignee,
    [MaxLength(40)] string Priority);

public sealed record BugUpdateRequest(
    [Required, MaxLength(160)] string Title,
    [Required, MaxLength(4000)] string Description,
    BugStatus Status,
    [MaxLength(80)] string? Assignee,
    [MaxLength(40)] string Priority);

public sealed record BugSummary(BugStatus Status, int Count);

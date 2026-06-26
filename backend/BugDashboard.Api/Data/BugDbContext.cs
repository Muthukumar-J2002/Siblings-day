using BugDashboard.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace BugDashboard.Api.Data;

public sealed class BugDbContext(DbContextOptions<BugDbContext> options) : DbContext(options)
{
    public DbSet<BugItem> Bugs => Set<BugItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BugItem>(entity =>
        {
            entity.ToTable("bugs");
            entity.HasKey(bug => bug.Id);
            entity.Property(bug => bug.Title).HasMaxLength(160).IsRequired();
            entity.Property(bug => bug.Description).HasMaxLength(4000).IsRequired();
            entity.Property(bug => bug.Status).HasConversion<string>().HasMaxLength(32).IsRequired();
            entity.Property(bug => bug.Assignee).HasMaxLength(80);
            entity.Property(bug => bug.Priority).HasMaxLength(40).HasDefaultValue("Medium");
            entity.HasIndex(bug => bug.Status);
            entity.HasIndex(bug => bug.CreatedAtUtc);
        });
    }
}

# Bug Dashboard API

Set `ConnectionStrings__BugTracker` to your MySQL connection string. The API uses EF Core `AddDbContextPool` plus MySQL connection-string pooling options.

```bash
dotnet restore
dotnet run --project backend/BugDashboard.Api
```

Create the database with EF migrations or let your deployment pipeline run migrations.

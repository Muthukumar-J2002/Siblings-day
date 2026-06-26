# Bug Management Dashboard

A full-stack bug tracking dashboard with an Angular frontend, .NET Core API, and MySQL persistence. It supports creating, reading, updating, deleting, filtering, and summarizing bugs across Open, Closed, Work In Progress, Hold, and Rejected statuses.

## Backend

```bash
dotnet restore backend/BugDashboard.Api/BugDashboard.Api.csproj
dotnet run --project backend/BugDashboard.Api
```

Configure MySQL using `ConnectionStrings__BugTracker`. The API uses EF Core `AddDbContextPool` and MySQL connection-string pooling settings for managed database connection pooling.

## Frontend

```bash
cd frontend
npm install
npm start
```

The Angular app calls `http://localhost:5000/api` by default. Update `frontend/src/environments/environment.ts` if your API runs elsewhere.
## Vercel frontend deployment

This repository keeps the Angular application in the `frontend/` subdirectory, so Vercel needs an explicit root-level `vercel.json`. The config builds the Angular app from that subdirectory, publishes the browser bundle, and rewrites non-API routes to `index.html` so direct page loads do not return Vercel `NOT_FOUND` 404 responses.


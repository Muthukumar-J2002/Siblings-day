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

The Angular app calls `/api` on the same origin by default so deployed URLs work without hard-coded localhost values. During local development, `npm start` uses `frontend/proxy.conf.json` to proxy `/api` requests to `http://localhost:5000`.

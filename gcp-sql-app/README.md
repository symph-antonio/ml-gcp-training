# GCP SQL App Engine Application

A simple Node.js application that connects to a Google Cloud SQL MySQL instance using socket path for health checks. Designed for deployment on Google App Engine.

## Prerequisites

- Node.js (v22 or later)
- Google Cloud SQL MySQL instance
- Google Cloud SDK installed and configured
- IAM permissions to deploy App Engine apps and access Cloud SQL

## Project Structure

- `app.js` - Main Express application with health check endpoint
- `db.js` - Database connection module that handles socket and TCP connections
- `app.yaml` - App Engine configuration
- `.env` - Local development environment variables

## Local Development Setup

1. Clone this repository

2. Install dependencies:
   ```
   npm install
   ```

3. Configure your `.env` file for local development:
   ```
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=test
   DB_HOST=/cloudsql/<connection_name>
   DB_PORT=3306
   PORT=8080
   ```

4. If using Cloud SQL with local development:
   
   a. [Install the Cloud SQL Proxy](https://cloud.google.com/sql/docs/mysql/sql-proxy)
   
   b. Start the Cloud SQL Proxy:
   ```
   ./cloud_sql_proxy -instances=your-project:your-region:your-instance=tcp:3306
   ```

5. Start the application:
   ```
   npm run dev
   ```

## Deployment to App Engine

1. Make sure you're authenticated with the Google Cloud SDK:
   ```
   gcloud auth login
   gcloud config set project your-project-id
   ```

3. Deploy to App Engine:
   ```
   npm run deploy
   # or
   gcloud app deploy
   ```

4. Open the deployed application:
   ```
   gcloud app browse
   ```

## Health Check Endpoint

The application provides a health check endpoint at `/health` that:
- Tests the connection to your MySQL database
- Returns a status code 200 if healthy
- Returns a status code 500 if unhealthy

Example response:
```json
{
  "status": "healthy",
  "database": {
    "connected": true,
    "timestamp": "2023-03-19T12:34:56.789Z"
  }
}
```

## How Socket Connection Works

In production (App Engine):
- The application connects to MySQL using a Unix socket path (`/cloudsql/instance-connection-name`)
- App Engine manages the socket connection through the `cloud_sql_instances` config in app.yaml

In local development:
- The application uses a standard TCP connection (host/port)
- The database module automatically detects which connection type to use

## License

ISC 
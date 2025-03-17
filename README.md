# GCP Training Projects

This repository contains sample projects for learning Google Cloud Platform (GCP) services.

## Project 1: Hello World Node.js on App Engine

This is a simple Node.js application deployed to Google App Engine. It demonstrates the basic concepts of deploying and running a web application on GCP.

### Prerequisites

1. [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
2. Node.js and npm installed
3. A Google Cloud Platform account
4. A GCP project created

### Setup and Deployment

1. Clone this repository
2. Navigate to the `hello-world-app-engine` directory
3. Install dependencies:
   ```bash
   npm install
   ```

4. Test locally:
   ```bash
   npm start
   ```

5. Deploy to App Engine:
   ```bash
   gcloud app deploy
   ```

6. Access your application:
   ```bash
   gcloud app browse
   ```

### Project Structure

```
hello-world-app-engine/
├── app.js              # Main application file
├── app.yaml            # App Engine configuration
├── package.json        # Node.js dependencies
└── README.md          # Project documentation
```

### Learning Objectives

- Basic GCP project setup
- App Engine standard environment configuration
- Deploying Node.js applications to App Engine
- Understanding app.yaml configuration
- Basic GCP CLI commands

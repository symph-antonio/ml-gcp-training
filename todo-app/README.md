This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Google Cloud Deployment

This project is configured for deployment to Google App Engine using Google Cloud Build with Secret Manager integration.

### Prerequisites

1. Google Cloud Platform account
2. Google Cloud project with the following APIs enabled:
   - App Engine Admin API
   - Cloud Build API
   - Secret Manager API
3. A secret named `API_KEY` stored in Secret Manager

### Setting Up Secret Manager

```bash
# Create a secret
echo -n "your-api-key-value" | gcloud secrets create API_KEY --data-file=-

# Grant access to the Cloud Build service account
PROJECT_ID=$(gcloud config get-value project)
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
CLOUDBUILD_SA="${PROJECT_NUMBER}@cloudbuild.gserviceaccount.com"

gcloud secrets add-iam-policy-binding API_KEY \
  --member="serviceAccount:$CLOUDBUILD_SA" \
  --role="roles/secretmanager.secretAccessor"

# Grant access to the App Engine service account
APPENGINE_SA="${PROJECT_ID}@appspot.gserviceaccount.com"
gcloud secrets add-iam-policy-binding API_KEY \
  --member="serviceAccount:$APPENGINE_SA" \
  --role="roles/secretmanager.secretAccessor"
```

### Local Development with API Key

1. Copy `.env.local.example` to `.env.local`
2. Update `NEXT_PUBLIC_API_KEY` with your actual API key
3. Run `npm run dev`

### Deploying with Cloud Build

```bash
gcloud builds submit --config=cloudbuild.yaml
```

This will:
1. Access the API key securely from Secret Manager
2. Install dependencies
3. Build the application with the secret available as an environment variable
4. Deploy to App Engine

The app will be accessible at `https://[PROJECT_ID].appspot.com`.

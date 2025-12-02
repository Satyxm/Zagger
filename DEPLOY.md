# Deployment Guide

## Vercel KV Setup

The "Share" functionality in this application requires **Vercel KV** (Redis) to store the shared YAML specifications. If you are deploying to Vercel, you must set this up manually.

### Steps to Configure

1.  **Create a KV Database**:
    - Go to your Vercel Dashboard.
    - Navigate to the "Storage" tab.
    - Click "Create Database".
    - If "Vercel KV" is not immediately visible, look for **"Upstash"** or **"Redis"** in the Marketplace section. Vercel KV is powered by Upstash, so selecting Upstash is effectively the same.
    - Select "Upstash" or "Vercel KV".
    - Give it a name (e.g., `zagger-kv`) and select a region.

2.  **Link to Project**:
    - Go to your `zagger` project settings in Vercel.
    - Navigate to the "Storage" tab.
    - Click "Connect" and select the KV database you just created.
    - This will automatically add the necessary environment variables (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, etc.) to your project.

3.  **Redeploy**:
    - After linking the database, you may need to redeploy your application for the changes to take effect.

### Troubleshooting

-   **"Vercel KV is not configured" Error**: This means the environment variables are missing. Ensure you have linked the KV database to your project and that the environment variables are present in the "Settings" -> "Environment Variables" section.

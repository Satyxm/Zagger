# Zagger YAML Previewer

Zagger is a minimal, no-auth web application for editing, previewing, and sharing Swagger/OpenAPI YAML files.

## Features

- **Interactive Editor**: Monaco-based YAML editor with syntax highlighting.
- **Live Preview**: Real-time API documentation rendering using Swagger UI.
- **Split View**: Side-by-side editor and preview.
- **Shareable Links**: Generate public, read-only links to share your API specs.
- **Standalone Viewer**: Dedicated view-only mode for shared links.
- **Responsive Design**: Works on desktop and mobile.

## Setup & Running Locally

1.  **Clone the repository** (or navigate to the directory).
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is built with Next.js.

### Important Note on Storage
The current implementation uses **local file system storage** (`./data` directory) for saving shared YAML files.
- **VPS / Docker**: Works out of the box. Data will persist if the volume is mounted.
- **Serverless (Vercel/Netlify)**: **NOT PERSISTENT**. Files saved will be lost when the lambda function freezes or redeploys. For serverless deployment, you must swap `lib/storage.ts` to use a database (Postgres, MongoDB) or object storage (S3, Vercel Blob).

## Architecture

- **Frontend**: Next.js (App Router), React, Tailwind CSS.
- **Editor**: `@monaco-editor/react`.
- **Preview**: `swagger-ui-react`.
- **Backend**: Next.js API Routes.
- **Storage**: Simple file-based storage (JSON/YAML files in `data/`).

## Project Structure

- `app/page.tsx`: Main editor and preview interface.
- `app/view/[id]/page.tsx`: Standalone read-only viewer.
- `app/api/share/route.ts`: API endpoint to save YAML.
- `components/`: Reusable UI components (Editor, Preview).
- `lib/storage.ts`: Storage logic.

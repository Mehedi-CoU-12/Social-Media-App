# Backend — Social-Media-App

This directory contains the AdonisJS backend for the Social-Media-App. This README explains how to set up, run, and inspect the backend code.

## Quick overview

- Framework: AdonisJS (Node)
- Database: MySQL (configured in [backend/config/database.ts](backend/config/database.ts))
- File upload: Cloudinary integration in [`uploadFilesOnCloudinary`](backend/utils/cloudinary.ts)
- Routes entry: [backend/start/routes.ts](backend/start/routes.ts)
- Env schema: [`Env.create`](backend/start/env.ts)

## Requirements

- Node 187+ (matching the project setup)
- pnpm (recommended) or npm/yarn
- MySQL server (matching `.env` values)
- Cloudinary account (optional — required for uploads)

## Environment

Copy the example and edit values:

```sh
cd backend
cp .env.example .env
# then edit .env
```

cd backend
pnpm install
# or
npm install
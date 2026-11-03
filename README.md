# Thu Wun Thar & Aye Zon Zon Phue Wedding

A React and Vite wedding invitation website.

## Run locally

**Prerequisite:** Node.js

1. Install dependencies: `npm ci`.
2. Install and log in to the Vercel CLI, then link this folder to the Vercel project.
3. Pull the project's environment variables with `vercel env pull .env.local`, or copy `.env.example` to `.env.local` and add `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
4. Run the SQL in `supabase/migrations/20261104000000_create_wishes.sql` in the Supabase SQL Editor.
5. Start the app and its API function locally with `vercel dev`.

The browser sends guestbook requests to the same-origin `/api/wishes` Vercel function. That function connects to Supabase with the public anon key and is protected by the database's row-level security policies. Wishes refresh every 15 seconds instead of using a direct browser WebSocket connection.

## Deploy to Vercel

Import the GitHub repository into Vercel and use:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` to the Vercel project's environment variables. They must point to the same Supabase project where you ran the SQL migration. Remove the old `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables, then redeploy. Use only the anon/public key; never put the Supabase service-role key in any frontend-prefixed variable.

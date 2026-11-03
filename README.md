<<<<<<< HEAD
# Thu Wun Thar & Aye Zon Zon Phue Wedding

A React and Vite wedding invitation website.

## Run locally

**Prerequisite:** Node.js

1. Install dependencies: `npm ci`
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Start the development server: `npm run dev`

The live guestbook requires a Supabase `wishes` table with appropriate public row-level security policies and Realtime enabled. The database schema is managed in Supabase and is not included in this repository.

## Deploy to Vercel

Import the GitHub repository into Vercel and use:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel project's environment variables, then redeploy. The anon key is intended for client-side use; never use a Supabase service-role key in a `VITE_` variable.
=======
# thu-wun-thar-aye-zon-zon-phue-wedding
A beautiful, responsive, and interactive digital wedding invitation website for our special day.
>>>>>>> bcd29d26786e23cf03f73c2bd6ebc6f16e4abfeb

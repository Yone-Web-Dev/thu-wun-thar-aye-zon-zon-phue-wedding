# Thu Wun Thar & Aye Zon Zon Phue Wedding

A React and Vite wedding invitation website.

## Run locally

**Prerequisite:** Node.js

1. Install dependencies: `npm ci`.
2. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run the SQL in `supabase/migrations/20261104000000_create_wishes.sql` in the Supabase SQL Editor.
4. Start the development server: `npm run dev`.

The guestbook stores wishes in the Supabase project configured by those environment variables. The browser connects directly to Supabase using its public anon key; row-level security limits public access to reading and adding wishes.

## Deploy to Vercel

Import the GitHub repository into Vercel and use:

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the Vercel project's environment variables. They must point to the same Supabase project where you ran the SQL migration. Redeploy after changing environment variables. The anon key is intended for client-side use; never use a Supabase service-role key in a `VITE_` variable.

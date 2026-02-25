# supravisor-web

Landing page for [supravisor.ai](https://supravisor.ai) — *Run AI Agents Without Fear.*

Built with Next.js 15, Tailwind CSS, framer-motion. Email waitlist backed by Supabase.

---

## Deploy to Vercel

1. **Import** this repo in [vercel.com/new](https://vercel.com/new)
2. **Framework:** Next.js (auto-detected)
3. **Environment Variables** — add these in the Vercel project settings:

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

   → Get both from: **Supabase Dashboard → Project Settings → API**  
   → Use the same Supabase project as uniplex.ai

4. **Deploy** — that's it.

---

## Supabase: Run the Waitlist Migration

Before the form works, create the `waitlist` table. Two options:

**Option A — Supabase SQL Editor (quickest):**
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → your project → SQL Editor
2. Paste and run the contents of `supabase/migrations/20260225_waitlist.sql`

**Option B — Supabase CLI:**
```bash
supabase db push
```

The migration creates a `waitlist` table with RLS enabled. Anon users can insert but not read, so signups are write-only from the browser.

---

## Local Development

```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key

npm install
npm run dev
```

---

## Customise

- **Formspree ID / waitlist backend:** `lib/supabase.ts` + `components/waitlist-form.tsx`
- **Logo:** Replace the SVG in `components/logo.tsx`
- **Copy:** Edit `app/landing-page.tsx`
- **Theme colors:** CSS variables in `app/globals.css`

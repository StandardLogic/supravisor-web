-- Waitlist table for supravisor.ai early access signups
create table if not exists waitlist (
  id          uuid        default gen_random_uuid() primary key,
  email       text        unique not null,
  created_at  timestamptz default now()
);

-- Enable RLS
alter table waitlist enable row level security;

-- Anyone can insert (join the waitlist) — no read access for anon
create policy "anyone can join waitlist"
  on waitlist
  for insert
  with check (true);

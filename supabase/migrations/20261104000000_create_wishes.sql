create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) between 1 and 100),
  message text not null check (char_length(btrim(message)) between 3 and 2000),
  created_at timestamptz not null default now()
);

create index if not exists wishes_created_at_idx
  on public.wishes (created_at desc);

alter table public.wishes enable row level security;

grant select, insert on table public.wishes to anon, authenticated;

drop policy if exists "Public can read wishes" on public.wishes;
create policy "Public can read wishes"
  on public.wishes
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can add wishes" on public.wishes;
create policy "Public can add wishes"
  on public.wishes
  for insert
  to anon, authenticated
  with check (
    char_length(btrim(name)) between 1 and 100
    and char_length(btrim(message)) between 3 and 2000
  );

do $$
begin
  if exists (
    select 1
    from pg_publication
    where pubname = 'supabase_realtime'
  ) and not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'wishes'
  ) then
    execute 'alter publication supabase_realtime add table public.wishes';
  end if;
end
$$;

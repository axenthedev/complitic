-- Create stores table if it doesn't exist
create table if not exists stores (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  platform text not null,
  region text,
  store_url text,
  api_key text,
  api_secret text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create policies table if it doesn't exist
create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  type text not null,
  content text not null,
  last_updated_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable RLS on stores table
alter table stores enable row level security;

-- Enable RLS on policies table
alter table policies enable row level security;

-- Create RLS policies for stores
drop policy if exists "Users can manage their own stores" on stores;
create policy "Users can manage their own stores"
  on stores
  for all
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text);

-- Create RLS policies for policies
drop policy if exists "Users can manage their own policies" on policies;
create policy "Users can manage their own policies"
  on policies
  for all
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text);

-- Create indexes for better performance
create index if not exists idx_stores_user_id on stores(user_id);
create index if not exists idx_policies_user_id on policies(user_id);
create index if not exists idx_policies_type on policies(type); 
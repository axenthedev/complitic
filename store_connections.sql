create table store_connections (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  store_type text not null check (store_type in ('shopify', 'woocommerce')),
  store_name text,
  store_url text not null,
  access_token text,
  api_key text,
  api_secret text,
  status text not null default 'connected',
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable Row Level Security
alter table store_connections enable row level security;

-- Policy: Users can manage their own store connections
create policy "Users can manage their own store connections"
  on store_connections
  for all
  using (user_id = auth.uid()); 
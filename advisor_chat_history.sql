-- Create advisor_chat_history table
create table if not exists advisor_chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  role text not null check (role in ('user', 'assistant')),
  message text not null,
  image_url text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table advisor_chat_history enable row level security;

-- Drop existing policies if they exist
drop policy if exists "Users can manage their own advisor chat" on advisor_chat_history;

-- Create RLS policy for user access
create policy "Users can manage their own advisor chat"
  on advisor_chat_history
  for all
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text);

-- Create index for better performance
create index if not exists idx_advisor_chat_history_user_id on advisor_chat_history(user_id);
create index if not exists idx_advisor_chat_history_created_at on advisor_chat_history(created_at); 
create table if not exists user_settings (
  user_id text primary key references users(id),
  auto_update_enabled boolean default true
);

alter table user_settings enable row level security;

drop policy if exists "Users can manage their own settings" on user_settings;
create policy "Users can manage their own settings"
  on user_settings
  for all
  using (user_id = auth.uid()::text)
  with check (user_id = auth.uid()::text); 
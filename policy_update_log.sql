create table if not exists policy_update_log (
  id uuid primary key default gen_random_uuid(),
  user_id text references users(id),
  policy_type text,
  change text,
  timestamp timestamp default now()
);

alter table policy_update_log enable row level security;

drop policy if exists "Users can view their own policy update log" on policy_update_log;
create policy "Users can view their own policy update log"
  on policy_update_log
  for select
  using (user_id = auth.uid()::text); 
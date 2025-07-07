-- Create the generated_policies table
CREATE TABLE generated_policies (
  id uuid PRIMARY KEY default uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  title text NOT NULL,
  prompt text NOT NULL,
  result text NOT NULL,
  created_at timestamp default now()
);

-- Enable Row Level Security
ALTER TABLE generated_policies ENABLE ROW LEVEL SECURITY;

-- Create RLS policy for users to manage their own generated policies
CREATE POLICY "Allow users to manage their AI generated policies"
ON generated_policies
FOR ALL
USING (auth.uid() = user_id);

-- Create index for better performance
CREATE INDEX idx_generated_policies_user_id ON generated_policies(user_id);
CREATE INDEX idx_generated_policies_created_at ON generated_policies(created_at DESC); 
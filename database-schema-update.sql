-- Database schema update for customized templates feature
-- This ensures the policy_documents table exists with proper structure

-- Drop existing table if it exists (to recreate with correct schema)
DROP TABLE IF EXISTS policy_documents CASCADE;

-- Create policy_documents table with correct user_id type
CREATE TABLE policy_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,  -- Changed from UUID to TEXT to match Clerk user IDs
  template_slug TEXT NOT NULL,
  template_name TEXT NOT NULL,
  content TEXT NOT NULL,
  form_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_policy_documents_user_id ON policy_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_policy_documents_created_at ON policy_documents(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_policy_documents_template_slug ON policy_documents(template_slug);

-- Enable Row Level Security (RLS)
ALTER TABLE policy_documents ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their own policy documents" ON policy_documents;
DROP POLICY IF EXISTS "Users can insert their own policy documents" ON policy_documents;
DROP POLICY IF EXISTS "Users can update their own policy documents" ON policy_documents;
DROP POLICY IF EXISTS "Users can delete their own policy documents" ON policy_documents;

-- Create RLS policies with proper type casting
CREATE POLICY "Users can view their own policy documents" ON policy_documents
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own policy documents" ON policy_documents
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own policy documents" ON policy_documents
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own policy documents" ON policy_documents
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_policy_documents_updated_at
  BEFORE UPDATE ON policy_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 
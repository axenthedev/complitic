-- Policy Documents Table Schema
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS policy_documents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  template_slug TEXT NOT NULL,
  template_name TEXT NOT NULL,
  content TEXT NOT NULL,
  form_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_policy_documents_user_id ON policy_documents(user_id);
CREATE INDEX IF NOT EXISTS idx_policy_documents_template_slug ON policy_documents(template_slug);
CREATE INDEX IF NOT EXISTS idx_policy_documents_created_at ON policy_documents(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE policy_documents ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own policy documents" ON policy_documents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own policy documents" ON policy_documents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own policy documents" ON policy_documents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own policy documents" ON policy_documents
  FOR DELETE USING (auth.uid() = user_id);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_policy_documents_updated_at
  BEFORE UPDATE ON policy_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column(); 
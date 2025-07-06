-- Generated Policies Table
CREATE TABLE IF NOT EXISTS generated_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  store_id UUID,
  store_type TEXT CHECK (store_type IN ('shopify', 'woocommerce')),
  page_destination TEXT,
  custom_url TEXT,
  published_url TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Shopify Stores Table
CREATE TABLE IF NOT EXISTS shopify_stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  store_url TEXT NOT NULL,
  access_token TEXT NOT NULL,
  store_name TEXT,
  connected_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- WooCommerce Stores Table
CREATE TABLE IF NOT EXISTS woocommerce_stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  store_url TEXT NOT NULL,
  consumer_key TEXT NOT NULL,
  consumer_secret TEXT NOT NULL,
  store_name TEXT,
  connected_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- RLS Policies for generated_policies
ALTER TABLE generated_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own generated policies" ON generated_policies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generated policies" ON generated_policies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generated policies" ON generated_policies
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated policies" ON generated_policies
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for shopify_stores
ALTER TABLE shopify_stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own Shopify stores" ON shopify_stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own Shopify stores" ON shopify_stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own Shopify stores" ON shopify_stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own Shopify stores" ON shopify_stores
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for woocommerce_stores
ALTER TABLE woocommerce_stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own WooCommerce stores" ON woocommerce_stores
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own WooCommerce stores" ON woocommerce_stores
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own WooCommerce stores" ON woocommerce_stores
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own WooCommerce stores" ON woocommerce_stores
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_generated_policies_user_id ON generated_policies(user_id);
CREATE INDEX IF NOT EXISTS idx_generated_policies_slug ON generated_policies(slug);
CREATE INDEX IF NOT EXISTS idx_shopify_stores_user_id ON shopify_stores(user_id);
CREATE INDEX IF NOT EXISTS idx_woocommerce_stores_user_id ON woocommerce_stores(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers to automatically update updated_at
CREATE TRIGGER update_generated_policies_updated_at 
  BEFORE UPDATE ON generated_policies 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_shopify_stores_updated_at 
  BEFORE UPDATE ON shopify_stores 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_woocommerce_stores_updated_at 
  BEFORE UPDATE ON woocommerce_stores 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 
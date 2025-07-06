-- Affiliate System Database Schema
-- Run this in your Supabase SQL editor

-- 1. Create affiliate_stats table
CREATE TABLE IF NOT EXISTS affiliate_stats (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    conversion_rate FLOAT DEFAULT 0.0,
    total_earnings FLOAT DEFAULT 0.0,
    available_balance FLOAT DEFAULT 0.0,
    pending_balance FLOAT DEFAULT 0.0,
    commission_rate FLOAT DEFAULT 30.0, -- 30% commission
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referred_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'converted')),
    commission_earned FLOAT DEFAULT 0.0,
    subscription_amount FLOAT DEFAULT 60.0, -- $60 subscription
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create payouts table
CREATE TABLE IF NOT EXISTS payouts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    amount FLOAT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
    payment_method TEXT,
    payment_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create referral_links table for tracking unique links
CREATE TABLE IF NOT EXISTS referral_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    link_code TEXT UNIQUE NOT NULL,
    name TEXT,
    clicks INTEGER DEFAULT 0,
    conversions INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create referral_clicks table for detailed click tracking
CREATE TABLE IF NOT EXISTS referral_clicks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    referral_link_id UUID REFERENCES referral_links(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Create affiliate_materials table
CREATE TABLE IF NOT EXISTS affiliate_materials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL CHECK (type IN ('banner', 'social', 'email', 'video')),
    url TEXT,
    file_path TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Create commission_events table for tracking commission calculations
CREATE TABLE IF NOT EXISTS commission_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    referral_id UUID REFERENCES referrals(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('click', 'conversion', 'commission_earned')),
    amount FLOAT DEFAULT 0.0,
    commission_rate FLOAT DEFAULT 30.0,
    commission_amount FLOAT DEFAULT 0.0,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_affiliate_stats_user_id ON affiliate_stats(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_user_id ON referrals(user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_payouts_user_id ON payouts(user_id);
CREATE INDEX IF NOT EXISTS idx_payouts_status ON payouts(status);
CREATE INDEX IF NOT EXISTS idx_referral_links_user_id ON referral_links(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_links_code ON referral_links(link_code);
CREATE INDEX IF NOT EXISTS idx_referral_clicks_link_id ON referral_clicks(referral_link_id);
CREATE INDEX IF NOT EXISTS idx_referral_clicks_user_id ON referral_clicks(user_id);
CREATE INDEX IF NOT EXISTS idx_commission_events_user_id ON commission_events(user_id);
CREATE INDEX IF NOT EXISTS idx_commission_events_type ON commission_events(event_type);

-- 9. Enable Row Level Security
ALTER TABLE affiliate_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE affiliate_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_events ENABLE ROW LEVEL SECURITY;

-- 10. Create RLS Policies

-- Affiliate stats policies
DROP POLICY IF EXISTS "Allow user to access their affiliate stats" ON affiliate_stats;
CREATE POLICY "Allow user to access their affiliate stats"
ON affiliate_stats
FOR ALL
USING (auth.uid()::text = user_id);

-- Referrals policies
DROP POLICY IF EXISTS "Allow user to access their referrals" ON referrals;
CREATE POLICY "Allow user to access their referrals"
ON referrals
FOR ALL
USING (auth.uid()::text = user_id);

-- Payouts policies
DROP POLICY IF EXISTS "Allow user to access their payouts" ON payouts;
CREATE POLICY "Allow user to access their payouts"
ON payouts
FOR ALL
USING (auth.uid()::text = user_id);

-- Referral links policies
DROP POLICY IF EXISTS "Allow user to access their referral links" ON referral_links;
CREATE POLICY "Allow user to access their referral links"
ON referral_links
FOR ALL
USING (auth.uid()::text = user_id);

-- Referral clicks policies (users can only see clicks for their own links)
DROP POLICY IF EXISTS "Allow user to access their referral clicks" ON referral_clicks;
CREATE POLICY "Allow user to access their referral clicks"
ON referral_clicks
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM referral_links 
    WHERE referral_links.id = referral_clicks.referral_link_id 
    AND referral_links.user_id = auth.uid()::text
  )
);

-- Commission events policies
DROP POLICY IF EXISTS "Allow user to access their commission events" ON commission_events;
CREATE POLICY "Allow user to access their commission events"
ON commission_events
FOR ALL
USING (auth.uid()::text = user_id);

-- Affiliate materials policies (read-only for all authenticated users)
DROP POLICY IF EXISTS "Allow authenticated users to read affiliate materials" ON affiliate_materials;
CREATE POLICY "Allow authenticated users to read affiliate materials"
ON affiliate_materials
FOR SELECT
USING (auth.role() = 'authenticated');

-- 11. Create functions for automatic updates

-- Function to update conversion rate
CREATE OR REPLACE FUNCTION update_conversion_rate()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.clicks > 0 THEN
        NEW.conversion_rate = (NEW.conversions::FLOAT / NEW.clicks::FLOAT) * 100;
    ELSE
        NEW.conversion_rate = 0.0;
    END IF;
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate commission
CREATE OR REPLACE FUNCTION calculate_commission()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate commission amount (30% of subscription)
    NEW.commission_amount = (NEW.amount * NEW.commission_rate) / 100;
    
    -- Update affiliate stats
    UPDATE affiliate_stats 
    SET 
        conversions = conversions + 1,
        total_earnings = total_earnings + NEW.commission_amount,
        available_balance = available_balance + NEW.commission_amount,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to handle referral conversion
CREATE OR REPLACE FUNCTION handle_referral_conversion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'converted' AND OLD.status != 'converted' THEN
        -- Calculate commission (30% of $60 = $18)
        NEW.commission_earned = 18.0;
        
        -- Update affiliate stats
        UPDATE affiliate_stats 
        SET 
            conversions = conversions + 1,
            total_earnings = total_earnings + 18.0,
            available_balance = available_balance + 18.0,
            updated_at = NOW()
        WHERE user_id = NEW.user_id;
        
        -- Create commission event
        INSERT INTO commission_events (
            user_id, 
            referral_id, 
            event_type, 
            amount, 
            commission_rate, 
            commission_amount
        ) VALUES (
            NEW.user_id,
            NEW.id,
            'conversion',
            60.0,
            30.0,
            18.0
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 12. Create triggers
DROP TRIGGER IF EXISTS trigger_update_conversion_rate ON affiliate_stats;
CREATE TRIGGER trigger_update_conversion_rate
    BEFORE UPDATE ON affiliate_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_conversion_rate();

DROP TRIGGER IF EXISTS trigger_calculate_commission ON commission_events;
CREATE TRIGGER trigger_calculate_commission
    BEFORE INSERT ON commission_events
    FOR EACH ROW
    EXECUTE FUNCTION calculate_commission();

DROP TRIGGER IF EXISTS trigger_handle_referral_conversion ON referrals;
CREATE TRIGGER trigger_handle_referral_conversion
    AFTER UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION handle_referral_conversion();

-- 13. Insert sample affiliate materials
INSERT INTO affiliate_materials (title, description, type, url, is_active) VALUES
('Complitic Banner - 728x90', 'Standard banner for websites and blogs', 'banner', '/materials/banner-728x90.png', true),
('Complitic Banner - 300x250', 'Medium rectangle banner for sidebars', 'banner', '/materials/banner-300x250.png', true),
('Social Media Post Template', 'Ready-to-use social media content', 'social', '/materials/social-template.txt', true),
('Email Template', 'Professional email template for referrals', 'email', '/materials/email-template.html', true),
('Product Demo Video', 'Short video showcasing Complitic features', 'video', '/materials/demo-video.mp4', true)
ON CONFLICT DO NOTHING; 
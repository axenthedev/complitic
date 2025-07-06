import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface AffiliateStats {
  id: string;
  user_id: string;
  clicks: number;
  conversions: number;
  conversion_rate: number;
  total_earnings: number;
  available_balance: number;
  pending_balance: number;
  total_referrals: number;
  active_referrals: number;
  converted_referrals: number;
  updated_at: string;
}

interface Referral {
  id: string;
  user_id: string;
  referred_email: string;
  status: 'pending' | 'active' | 'converted';
  created_at: string;
}

interface Payout {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'paid' | 'failed';
  created_at: string;
}

interface ReferralLink {
  id: string;
  user_id: string;
  link_code: string;
  clicks: number;
  conversions: number;
  full_url: string;
  created_at: string;
}

interface AffiliateMaterial {
  id: string;
  title: string;
  description: string;
  type: 'banner' | 'social' | 'email' | 'video';
  url: string;
  is_active: boolean;
}

export function useAffiliate() {
  const { getToken, isLoaded } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<AffiliateStats | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([]);
  const [materials, setMaterials] = useState<AffiliateMaterial[]>([]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/affiliate/stats');
      if (!response.ok) throw new Error('Failed to fetch affiliate stats');
      const data = await response.json();
      setStats(data.stats);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchReferrals = async (status?: string) => {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);
      
      const response = await fetch(`/api/affiliate/referrals?${params}`);
      if (!response.ok) throw new Error('Failed to fetch referrals');
      const data = await response.json();
      setReferrals(data.referrals);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchPayouts = async (status?: string) => {
    try {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.append('status', status);
      
      const response = await fetch(`/api/affiliate/payouts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch payouts');
      const data = await response.json();
      setPayouts(data.payouts);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchReferralLinks = async () => {
    try {
      const response = await fetch('/api/affiliate/links');
      if (!response.ok) throw new Error('Failed to fetch referral links');
      const data = await response.json();
      setReferralLinks(data.links);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchMaterials = async (type?: string) => {
    try {
      const params = new URLSearchParams();
      if (type && type !== 'all') params.append('type', type);
      
      const response = await fetch(`/api/affiliate/materials?${params}`);
      if (!response.ok) throw new Error('Failed to fetch materials');
      const data = await response.json();
      setMaterials(data.materials);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const createReferral = async (email: string) => {
    try {
      const response = await fetch('/api/affiliate/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referred_email: email }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create referral');
      }
      
      const data = await response.json();
      await fetchReferrals(); // Refresh referrals list
      return data.referral;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const createReferralLink = async () => {
    try {
      const response = await fetch('/api/affiliate/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Failed to create referral link');
      
      const data = await response.json();
      await fetchReferralLinks(); // Refresh links list
      return data.link;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchStats(),
        fetchReferrals(),
        fetchPayouts(),
        fetchReferralLinks(),
        fetchMaterials(),
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isClerkLoaded && clerkUser?.id) {
      refreshAll();
    }
  }, [isLoaded, isClerkLoaded, clerkUser?.id]);

  return {
    loading,
    error,
    stats,
    referrals,
    payouts,
    referralLinks,
    materials,
    fetchStats,
    fetchReferrals,
    fetchPayouts,
    fetchReferralLinks,
    fetchMaterials,
    createReferral,
    createReferralLink,
    refreshAll,
  };
} 
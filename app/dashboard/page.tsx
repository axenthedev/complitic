"use client"

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { SyncUser } from "@/components/SyncUser";
import supabase from "@/lib/supabase/browser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Store,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Cookie,
} from "lucide-react"

export default function DashboardPage() {
  const { getToken, isLoaded } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  const [lastPolicy, setLastPolicy] = useState<any>(null);
  const [cookieBanner, setCookieBanner] = useState<any>(null);
  const [compliance, setCompliance] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (!isLoaded || !isClerkLoaded || !clerkUser?.id) return;
        // Get Clerk session token for Supabase
        const token = await getToken({ template: "supabase" });
        if (token) {
          await supabase.auth.setSession({ access_token: token, refresh_token: "" });
        }
        // Fetch user profile
        const { data: userProfile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("id", clerkUser.id)
          .single();
        setUser(userProfile);
        // Fetch stores
        const { data: storesData, error: storesError } = await supabase
          .from("stores")
          .select("*")
          .eq("user_id", clerkUser.id);
        if (storesError) throw storesError;
        setStores(storesData || []);
        // Fetch policies
        const { data: policiesData, error: policiesError } = await supabase
          .from("policies")
          .select("*")
          .eq("user_id", clerkUser.id)
          .order("updated_at", { ascending: false });
        if (policiesError) throw policiesError;
        setPolicies(policiesData || []);
        setLastPolicy(policiesData && policiesData[0] ? policiesData[0] : null);
        // Fetch cookie banner status (for first store)
        let cookieBannerData = null;
        let cookieBannerColor = "blue";
        if (storesData && storesData[0]) {
          const { data: cbData, error: cbError } = await supabase
            .from("cookie_banners")
            .select("*")
            .eq("user_id", clerkUser.id)
            .eq("store_id", storesData[0].id)
            .single();
          if (cbError && cbError.code !== "PGRST116") throw cbError;
          cookieBannerData = cbData;
          cookieBannerColor = cbData?.color || "blue";
        }
        setCookieBanner(cookieBannerData);
        // Fetch compliance by region (aggregate compliance_scans)
        const { data: complianceData, error: complianceError } = await supabase
          .from("compliance_scans")
          .select("region, status")
          .eq("user_id", clerkUser.id);
        if (complianceError) throw complianceError;
        setCompliance(complianceData || []);
        // Fetch recent activity
        const { data: activityData, error: activityError } = await supabase
          .from("activity_log")
          .select("*")
          .eq("user_id", clerkUser.id)
          .order("created_at", { ascending: false })
          .limit(5);
        if (activityError) throw activityError;
        setActivity(activityData || []);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getToken, isLoaded, isClerkLoaded, clerkUser?.id]);

  if (loading || !isClerkLoaded || !clerkUser?.id) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Use Clerk profile as fallback if Supabase user is missing
  const displayName = user?.full_name || clerkUser?.fullName || clerkUser?.emailAddresses?.[0]?.emailAddress || "User";
  const displayEmail = user?.email || clerkUser?.emailAddresses?.[0]?.emailAddress || "";

  // Compliance by region (dummy fallback if empty)
  const complianceRegions = [
    { region: "European Union", status: "GDPR Compliant", percent: 100, color: "green" },
    { region: "California, USA", status: "CCPA In Progress", percent: 75, color: "orange" },
    { region: "Canada", status: "PIPEDA Ready", percent: 90, color: "blue" },
  ];
  // Map real compliance data if available
  const regionMap = {
    "EU": { region: "European Union", color: "green" },
    "CA": { region: "California, USA", color: "orange" },
    "CAN": { region: "Canada", color: "blue" },
  };
  let complianceDisplay = compliance.length
    ? compliance.map((c: { region: string; status: string }) => {
        const regionKey = c.region as keyof typeof regionMap;
        return {
          region: regionMap[regionKey]?.region || c.region,
          status: c.status,
          percent: c.status === "passed" ? 100 : c.status === "pending" ? 75 : 0,
          color: regionMap[regionKey]?.color || "gray",
        };
      })
    : complianceRegions;

  const bannerColor = cookieBanner?.color || "blue";

  return (
    <>
      <SyncUser />
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1E293B] to-slate-700 rounded-xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {displayName}!</h2>
          <p className="text-slate-200">
            {stores[0]?.name
              ? `Your store "${stores[0].name}" is ${complianceDisplay[0]?.percent || 0}% compliant. Here's your overview.`
              : "Connect a store to get started."}
          </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Policies Generated</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{policies.length}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                  {policies.length > 0 ? "+" + policies.length + " this month" : "No policies yet"}
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-green-500 before:to-teal-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Connected Stores</CardTitle>
              <Store className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stores.length}</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                  {stores.length > 0 ? "+" + stores.length + " this week" : "No stores yet"}
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Last Policy Update</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-slate-900">{lastPolicy ? new Date(lastPolicy.updated_at).toLocaleString() : "-"}</div>
              <div className="flex items-center text-xs text-slate-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                  {lastPolicy ? `${lastPolicy.type} updated` : "No policy updates"}
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Cookie Banner Status</CardTitle>
              <Cookie className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
                <div className={`text-2xl font-bold ${cookieBanner?.status === "active" ? `text-${bannerColor}-600` : "text-slate-600"}`}>
                  {cookieBanner ? (cookieBanner.status.charAt(0).toUpperCase() + cookieBanner.status.slice(1)) : "Inactive"}
                </div>
              <div className="flex items-center text-xs text-green-600">
                <ShieldCheck className="h-3 w-3 mr-1" />
                  {cookieBanner && cookieBanner.status === "active" ? "All stores protected" : "No active banner"}
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Compliance Coverage by Region */}
      <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-cyan-500 before:via-blue-500 before:to-indigo-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        <div className="relative bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Compliance Coverage by Region</span>
            </CardTitle>
            <CardDescription>Your compliance status across different jurisdictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {complianceDisplay.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-4 bg-${c.color}-50 rounded-lg`}
                  >
                <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 bg-${c.color}-500 rounded-full`}></div>
                  <div>
                        <p className={`font-medium text-${c.color}-900`}>{c.region}</p>
                        <p className={`text-sm text-${c.color}-700`}>{c.status}</p>
                  </div>
                </div>
                    <Badge className={`bg-${c.color}-100 text-${c.color}-800`}>{c.percent}%</Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-pink-500 before:via-rose-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        <div className="relative bg-white rounded-xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {activity.length === 0 && (
                <div className="text-slate-500 text-sm">No recent activity.</div>
              )}
              {activity.map((a, i) => (
                <div key={a.id} className="flex items-start space-x-3">
                  {a.type === "policy_update" ? (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : a.type === "cookie_banner" ? (
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  ) : (
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  )}
              <div className="space-y-1">
                    <p className="text-sm font-medium">{a.message}</p>
                    <p className="text-xs text-slate-600">{a.type.replace("_", " ")}</p>
                    <p className="text-xs text-slate-400">{new Date(a.created_at).toLocaleString()}</p>
              </div>
            </div>
              ))}
          </CardContent>
        </div>
      </Card>
    </div>
    </>
  )
}

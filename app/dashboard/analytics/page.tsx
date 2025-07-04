"use client"

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import supabase from "@/lib/supabase/browser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Globe, Calendar, ArrowUpRight } from "lucide-react"
import { TrafficChart } from "@/components/dashboard/traffic-chart"

export default function AnalyticsPage() {
  const { getToken, isLoaded } = useAuth();
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<any>(null);
  const [trafficData, setTrafficData] = useState<any[]>([]);
  const [geoData, setGeoData] = useState<any[]>([]);
  const [topPages, setTopPages] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (!isLoaded || !isClerkLoaded || !clerkUser?.id) return;
        const token = await getToken({ template: "supabase" });
        if (token) {
          await supabase.auth.setSession({ access_token: token, refresh_token: "" });
        }
        // Fetch latest metrics (most recent date)
        const { data: analyticsRows, error: analyticsError } = await supabase
          .from("analytics")
          .select("*")
          .eq("user_id", clerkUser.id)
          .order("date", { ascending: false })
          .limit(7);
        if (analyticsError) throw analyticsError;
        // Use the most recent row for key metrics
        const latest = analyticsRows && analyticsRows[0] ? analyticsRows[0] : null;
        setMetrics(latest);
        // Prepare traffic data for chart (last 7 days)
        const traffic = (analyticsRows || []).slice(0, 7).reverse().map(row => ({
          day: row.date,
          visitors: row.unique_visitors,
          pageViews: row.page_views,
        }));
        setTrafficData(traffic);
        // Fetch geo distribution (last 7 days)
        const since = new Date();
        since.setDate(since.getDate() - 7);
        const { data: geoRows, error: geoError } = await supabase
          .from("analytics_events")
          .select("country")
          .eq("user_id", clerkUser.id)
          .gte("occurred_at", since.toISOString());
        if (geoError) throw geoError;
        // Aggregate by country
        const countryCounts: Record<string, number> = {};
        (geoRows || []).forEach((row: any) => {
          if (!row.country) return;
          countryCounts[row.country] = (countryCounts[row.country] || 0) + 1;
        });
        const total = Object.values(countryCounts).reduce((a, b) => a + b, 0);
        const geo = Object.entries(countryCounts)
          .map(([country, count]) => ({ country, percent: total ? (count / total) * 100 : 0 }))
          .sort((a, b) => b.percent - a.percent)
          .slice(0, 5);
        setGeoData(geo);
        // Fetch top pages (last 7 days)
        const { data: pageRows, error: pageError } = await supabase
          .from("analytics_events")
          .select("page_path")
          .eq("user_id", clerkUser.id)
          .gte("occurred_at", since.toISOString());
        if (pageError) throw pageError;
        // Aggregate by page_path
        const pageCounts: Record<string, number> = {};
        (pageRows || []).forEach((row: any) => {
          if (!row.page_path) return;
          pageCounts[row.page_path] = (pageCounts[row.page_path] || 0) + 1;
        });
        const top = Object.entries(pageCounts)
          .map(([page, count]) => ({ page, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        setTopPages(top);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [getToken, isLoaded, isClerkLoaded, clerkUser?.id]);

  if (loading || !isClerkLoaded || !clerkUser?.id) {
    return <div className="p-8 text-center text-slate-500">Loading analytics...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  // Fallbacks for empty data
  const pageViews = metrics?.page_views ?? 0;
  const uniqueVisitors = metrics?.unique_visitors ?? 0;
  const bounceRate = metrics?.bounce_rate ?? 0;
  const avgSession = metrics?.avg_session ?? "-";
  const newUsers = metrics?.new_users ?? 0;
  const returningUsers = metrics?.returning_users ?? 0;
  const sessionDuration = metrics?.session_duration ?? "-";
  const pagesPerSession = metrics?.pages_per_session ?? 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
        <p className="text-slate-600">Track your compliance performance and user engagement metrics.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pageViews}</div>
            {/* You can add growth metrics if you calculate them */}
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{uniqueVisitors}</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{bounceRate}%</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{avgSession}</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span>Traffic Overview</span>
            </CardTitle>
            <CardDescription>Website traffic for the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <TrafficChart data={trafficData} />
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-green-600" />
              <span>Geographic Distribution</span>
            </CardTitle>
            <CardDescription>Visitor locations by country</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {geoData.length === 0 && <div className="text-slate-500 text-sm">No data</div>}
            {geoData.map((g, i) => (
              <div key={g.country} className="space-y-3">
              <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{g.country}</span>
                  <span className="text-sm text-slate-600">{g.percent.toFixed(1)}%</span>
              </div>
                <Progress value={g.percent} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>User Engagement</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">New Users</span>
              <Badge className="bg-green-100 text-green-800">{newUsers}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Returning Users</span>
              <Badge className="bg-blue-100 text-blue-800">{returningUsers}%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Duration</span>
              <span className="text-sm font-medium">{sessionDuration}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pages per Session</span>
              <span className="text-sm font-medium">{pagesPerSession}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Top Pages</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topPages.length === 0 && <div className="text-slate-500 text-sm">No data</div>}
            {topPages.map((p, i) => (
              <div key={p.page} className="flex items-center justify-between">
                <span className="text-sm">{p.page}</span>
                <span className="text-sm text-slate-600">{p.count}</span>
            </div>
            ))}
          </CardContent>
        </Card>

        {/* You can add more analytics cards here */}
      </div>
    </div>
  );
}

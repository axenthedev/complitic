import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Globe, Calendar, ArrowUpRight } from "lucide-react"
import { TrafficChart } from "@/components/dashboard/traffic-chart"

export default function AnalyticsPage() {
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
            <div className="text-2xl font-bold text-slate-900">45,231</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">12,847</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Bounce Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">24.5%</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              -3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Avg. Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">3m 24s</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +15% from last month
            </div>
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
            <TrafficChart />
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">United States</span>
                <span className="text-sm text-slate-600">45.2%</span>
              </div>
              <Progress value={45.2} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">United Kingdom</span>
                <span className="text-sm text-slate-600">23.8%</span>
              </div>
              <Progress value={23.8} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Germany</span>
                <span className="text-sm text-slate-600">15.4%</span>
              </div>
              <Progress value={15.4} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Canada</span>
                <span className="text-sm text-slate-600">8.9%</span>
              </div>
              <Progress value={8.9} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Others</span>
                <span className="text-sm text-slate-600">6.7%</span>
              </div>
              <Progress value={6.7} className="h-2" />
            </div>
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
              <Badge className="bg-green-100 text-green-800">68%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Returning Users</span>
              <Badge className="bg-blue-100 text-blue-800">32%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Session Duration</span>
              <span className="text-sm font-medium">3m 24s</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Pages per Session</span>
              <span className="text-sm font-medium">2.4</span>
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
            <div className="flex items-center justify-between">
              <span className="text-sm">/dashboard</span>
              <span className="text-sm text-slate-600">12,847</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">/policy-generator</span>
              <span className="text-sm text-slate-600">8,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">/cookie-manager</span>
              <span className="text-sm text-slate-600">5,678</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">/compliance-scanner</span>
              <span className="text-sm text-slate-600">4,123</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">/settings</span>
              <span className="text-sm text-slate-600">2,456</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover-border-animation">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-red-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm">
              <span className="font-medium">Policy generated</span>
              <div className="text-xs text-slate-600">2 hours ago</div>
            </div>
            <div className="text-sm">
              <span className="font-medium">Cookie banner updated</span>
              <div className="text-xs text-slate-600">5 hours ago</div>
            </div>
            <div className="text-sm">
              <span className="font-medium">Compliance scan completed</span>
              <div className="text-xs text-slate-600">1 day ago</div>
            </div>
            <div className="text-sm">
              <span className="font-medium">New user registered</span>
              <div className="text-xs text-slate-600">2 days ago</div>
            </div>
            <div className="text-sm">
              <span className="font-medium">Store connected</span>
              <div className="text-xs text-slate-600">3 days ago</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

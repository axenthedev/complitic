"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Zap, CheckCircle, XCircle, Clock, RefreshCw, TrendingUp } from "lucide-react"

const autoUpdateStats = [
  { title: "Auto-Updates This Month", value: "3,456", icon: Zap, color: "bg-purple-500", change: "+18.2%" },
  { title: "Success Rate", value: "97.8%", icon: CheckCircle, color: "bg-green-500", change: "+2.1%" },
  { title: "Failed Updates", value: "76", icon: XCircle, color: "bg-red-500", change: "-12.5%" },
  { title: "Avg Update Time", value: "1.2s", icon: Clock, color: "bg-blue-500", change: "-0.3s" },
]

const recentUpdates = [
  {
    id: "1",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    store: "sarahs-store.myshopify.com",
    platform: "Shopify",
    policyType: "Privacy Policy",
    trigger: "Regulation Change",
    status: "Completed",
    timestamp: "2024-01-20 14:30:25",
    updateTime: "1.8s",
    changesDetected: 3,
    autoApplied: true,
  },
  {
    id: "2",
    user: "Mike Chen",
    email: "mike@example.com",
    store: "mikesstore.com",
    platform: "WooCommerce",
    policyType: "Cookie Policy",
    trigger: "Store Configuration",
    status: "Completed",
    timestamp: "2024-01-20 13:45:12",
    updateTime: "0.9s",
    changesDetected: 1,
    autoApplied: true,
  },
  {
    id: "3",
    user: "Emma Davis",
    email: "emma@example.com",
    store: "emma-boutique.myshopify.com",
    platform: "Shopify",
    policyType: "Terms of Service",
    trigger: "Product Category Change",
    status: "Pending Review",
    timestamp: "2024-01-20 12:15:08",
    updateTime: "2.1s",
    changesDetected: 5,
    autoApplied: false,
  },
  {
    id: "4",
    user: "Alex Rodriguez",
    email: "alex@example.com",
    store: "alexstore.com",
    platform: "WooCommerce",
    policyType: "Privacy Policy",
    trigger: "Data Processing Change",
    status: "Failed",
    timestamp: "2024-01-20 11:20:33",
    updateTime: "0.3s",
    changesDetected: 0,
    autoApplied: false,
  },
  {
    id: "5",
    user: "Lisa Wang",
    email: "lisa@example.com",
    store: "lisa-fashion.myshopify.com",
    platform: "Shopify",
    policyType: "Return Policy",
    trigger: "Business Hours Change",
    status: "In Progress",
    timestamp: "2024-01-20 10:55:17",
    updateTime: "1.5s",
    changesDetected: 2,
    autoApplied: false,
  },
]

const updateTriggers = [
  { name: "Regulation Changes", count: 1234, percentage: 35.7, color: "bg-red-500" },
  { name: "Store Configuration", count: 987, percentage: 28.5, color: "bg-blue-500" },
  { name: "Product Changes", count: 654, percentage: 18.9, color: "bg-green-500" },
  { name: "Business Info Updates", count: 432, percentage: 12.5, color: "bg-purple-500" },
  { name: "Data Processing Changes", count: 149, percentage: 4.3, color: "bg-orange-500" },
]

export default function AutoUpdateActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Auto-Update Activity</h1>
        <p className="text-slate-600 mt-2">Monitor automated policy updates and system performance</p>
      </div>

      {/* Auto-Update Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {autoUpdateStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-slate-600">vs last month</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Update Triggers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5" />
              <span>Update Triggers</span>
            </CardTitle>
            <CardDescription>What triggers automatic policy updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updateTriggers.map((trigger, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${trigger.color}`}></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{trigger.name}</span>
                      <span className="text-sm text-slate-600">{trigger.count}</span>
                    </div>
                    <Progress value={trigger.percentage} className="h-2" />
                  </div>
                  <div className="text-sm text-slate-600 w-12 text-right">{trigger.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle>System Performance</CardTitle>
            <CardDescription>Auto-update system health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50 border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold text-green-800">System Status</h3>
                    <p className="text-sm text-green-700">All auto-update services operational</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">Healthy</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">99.2%</div>
                  <div className="text-sm text-slate-600">Uptime</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">1.2s</div>
                  <div className="text-sm text-slate-600">Avg Response</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Queue Processing</span>
                  <span>87%</span>
                </div>
                <Progress value={87} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Auto-Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-purple-500" />
            <span>Recent Auto-Updates</span>
          </CardTitle>
          <CardDescription>Latest automated policy updates across all users</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User & Store</TableHead>
                <TableHead>Policy Type</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Changes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUpdates.map((update) => (
                <TableRow key={update.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{update.user}</div>
                      <div className="text-sm text-slate-600">{update.email}</div>
                      <div className="text-xs text-slate-500">{update.store}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {update.platform}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{update.policyType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{update.trigger}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="text-sm font-medium">{update.changesDetected}</div>
                      <div className="text-xs text-slate-600">detected</div>
                      {update.autoApplied && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Auto-applied
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        update.status === "Completed"
                          ? "default"
                          : update.status === "In Progress"
                            ? "secondary"
                            : update.status === "Failed"
                              ? "destructive"
                              : "outline"
                      }
                      className={
                        update.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : update.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : update.status === "Failed"
                              ? "bg-red-100 text-red-800"
                              : "bg-orange-100 text-orange-800"
                      }
                    >
                      {update.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Time: {update.updateTime}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{update.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Auto-Update Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Auto-Update Configuration</CardTitle>
          <CardDescription>System settings and thresholds for automatic updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Update Frequency</h3>
              <div className="text-2xl font-bold text-blue-600">Real-time</div>
              <p className="text-sm text-slate-600 mt-1">Updates triggered immediately</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Review Threshold</h3>
              <div className="text-2xl font-bold text-orange-600">5+ changes</div>
              <p className="text-sm text-slate-600 mt-1">Requires manual review</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Rollback Window</h3>
              <div className="text-2xl font-bold text-purple-600">24 hours</div>
              <p className="text-sm text-slate-600 mt-1">Auto-rollback period</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

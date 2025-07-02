"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Activity, TrendingUp, AlertTriangle, Zap, Globe, Database, Clock } from "lucide-react"

const apiStats = [
  { title: "Total API Calls", value: "89,234", icon: Activity, color: "bg-blue-500", change: "+12.5%" },
  { title: "Avg Response Time", value: "245ms", icon: Clock, color: "bg-green-500", change: "-8.2%" },
  { title: "Error Rate", value: "0.3%", icon: AlertTriangle, color: "bg-red-500", change: "-0.1%" },
  { title: "Rate Limit Hits", value: "156", icon: Zap, color: "bg-orange-500", change: "+5.4%" },
]

const endpointUsage = [
  {
    endpoint: "/api/policies/generate",
    method: "POST",
    calls: 45234,
    avgResponseTime: 2340,
    errorRate: 0.2,
    usage: 85,
    topUsers: ["sarah@example.com", "mike@example.com", "emma@example.com"],
  },
  {
    endpoint: "/api/policies/update",
    method: "PUT",
    calls: 23456,
    avgResponseTime: 1890,
    errorRate: 0.1,
    usage: 55,
    topUsers: ["alex@example.com", "lisa@example.com", "david@example.com"],
  },
  {
    endpoint: "/api/stores/connect",
    method: "POST",
    calls: 12345,
    avgResponseTime: 890,
    errorRate: 0.5,
    usage: 30,
    topUsers: ["maria@example.com", "john@example.com", "sarah@example.com"],
  },
  {
    endpoint: "/api/compliance/scan",
    method: "POST",
    calls: 8901,
    avgResponseTime: 5670,
    errorRate: 0.8,
    usage: 20,
    topUsers: ["emma@example.com", "mike@example.com", "alex@example.com"],
  },
]

const heavyUsers = [
  {
    user: "Sarah Johnson",
    email: "sarah@example.com",
    plan: "Pro",
    apiCalls: 15000,
    limit: 20000,
    usage: 75,
    lastCall: "2024-01-20 14:30:25",
    status: "Normal",
  },
  {
    user: "Mike Chen",
    email: "mike@example.com",
    plan: "Free",
    apiCalls: 4800,
    limit: 5000,
    usage: 96,
    lastCall: "2024-01-20 14:25:12",
    status: "Near Limit",
  },
  {
    user: "Emma Davis",
    email: "emma@example.com",
    plan: "Pro",
    apiCalls: 18500,
    limit: 20000,
    usage: 92.5,
    lastCall: "2024-01-20 14:20:08",
    status: "Near Limit",
  },
  {
    user: "Lisa Wang",
    email: "lisa@example.com",
    plan: "Free",
    apiCalls: 5000,
    limit: 5000,
    usage: 100,
    lastCall: "2024-01-20 13:45:33",
    status: "Limit Reached",
  },
]

export default function APIUsagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">API Usage</h1>
        <p className="text-slate-600 mt-2">Monitor API performance, usage patterns, and rate limits</p>
      </div>

      {/* API Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apiStats.map((stat) => {
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
                  <Badge
                    variant={stat.change.startsWith("+") && stat.title !== "Error Rate" ? "default" : "secondary"}
                    className="text-xs"
                  >
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
        {/* Endpoint Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Endpoint Usage</span>
            </CardTitle>
            <CardDescription>Most frequently used API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Calls</TableHead>
                  <TableHead>Avg Time</TableHead>
                  <TableHead>Error Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpointUsage.map((endpoint, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-mono text-sm">{endpoint.endpoint}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {endpoint.method}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{endpoint.calls.toLocaleString()}</div>
                        <Progress value={endpoint.usage} className="h-1 mt-1" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{endpoint.avgResponseTime}ms</span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={endpoint.errorRate > 0.5 ? "destructive" : "secondary"} className="text-xs">
                        {endpoint.errorRate}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Heavy API Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Heavy API Users</span>
            </CardTitle>
            <CardDescription>Users with highest API consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {heavyUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{user.user}</div>
                        <div className="text-sm text-slate-600">{user.email}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {user.plan}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{user.apiCalls.toLocaleString()}</span>
                          <span className="text-slate-600">/ {user.limit.toLocaleString()}</span>
                        </div>
                        <Progress value={user.usage} className="h-2" />
                        <div className="text-xs text-slate-600">{user.usage}% used</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Limit Reached"
                            ? "destructive"
                            : user.status === "Near Limit"
                              ? "default"
                              : "secondary"
                        }
                        className={
                          user.status === "Limit Reached"
                            ? "bg-red-100 text-red-800"
                            : user.status === "Near Limit"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* API Health Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>API Health Monitoring</CardTitle>
          <CardDescription>Real-time API performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold text-green-800">System Status</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">Operational</div>
              <p className="text-sm text-green-700 mt-1">All systems running normally</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Uptime</h3>
              <div className="text-2xl font-bold text-blue-600">99.98%</div>
              <p className="text-sm text-slate-600 mt-1">Last 30 days</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-2">Peak Usage</h3>
              <div className="text-2xl font-bold text-purple-600">2,456</div>
              <p className="text-sm text-slate-600 mt-1">Requests per minute</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { ShoppingCart, Zap, AlertTriangle, CheckCircle, Settings, Plus, TrendingUp } from "lucide-react"

const integrationStats = [
  { title: "Total Integrations", value: "12,847", icon: ShoppingCart, color: "bg-blue-500", change: "+8.2%" },
  { title: "Active Connections", value: "11,234", icon: CheckCircle, color: "bg-green-500", change: "+12.5%" },
  { title: "Failed Connections", value: "156", icon: AlertTriangle, color: "bg-red-500", change: "-5.4%" },
  { title: "API Health", value: "99.8%", icon: Zap, color: "bg-purple-500", change: "+0.2%" },
]

const platformStats = [
  { platform: "Shopify", connections: 8456, percentage: 65.8, color: "bg-green-500", status: "Healthy" },
  { platform: "WooCommerce", connections: 3891, percentage: 30.3, color: "bg-blue-500", status: "Healthy" },
  { platform: "BigCommerce", connections: 345, percentage: 2.7, color: "bg-orange-500", status: "Healthy" },
  { platform: "Magento", connections: 155, percentage: 1.2, color: "bg-purple-500", status: "Maintenance" },
]

const integrationHealth = [
  {
    platform: "Shopify",
    version: "v2.1.3",
    status: "Healthy",
    uptime: 99.9,
    lastUpdate: "2024-01-15",
    activeConnections: 8456,
    avgResponseTime: "245ms",
    errorRate: 0.1,
    features: ["Policy Sync", "Auto-Update", "Webhook Support", "Real-time Monitoring"],
  },
  {
    platform: "WooCommerce",
    version: "v1.8.7",
    status: "Healthy",
    uptime: 99.7,
    lastUpdate: "2024-01-12",
    activeConnections: 3891,
    avgResponseTime: "312ms",
    errorRate: 0.2,
    features: ["Policy Sync", "Auto-Update", "Manual Sync", "Error Reporting"],
  },
  {
    platform: "BigCommerce",
    version: "v1.2.1",
    status: "Healthy",
    uptime: 99.5,
    lastUpdate: "2024-01-10",
    activeConnections: 345,
    avgResponseTime: "189ms",
    errorRate: 0.3,
    features: ["Policy Sync", "Webhook Support"],
  },
  {
    platform: "Magento",
    version: "v0.9.4",
    status: "Maintenance",
    uptime: 98.2,
    lastUpdate: "2024-01-08",
    activeConnections: 155,
    avgResponseTime: "567ms",
    errorRate: 1.2,
    features: ["Policy Sync", "Manual Sync"],
  },
]

const recentConnections = [
  {
    id: "1",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    platform: "Shopify",
    store: "sarahs-store.myshopify.com",
    connectedAt: "2024-01-20 14:30:25",
    status: "Connected",
    lastSync: "2024-01-20 14:35:12",
    policies: 3,
  },
  {
    id: "2",
    user: "Mike Chen",
    email: "mike@example.com",
    platform: "WooCommerce",
    store: "mikesstore.com",
    connectedAt: "2024-01-20 13:45:12",
    status: "Connected",
    lastSync: "2024-01-20 14:20:08",
    policies: 2,
  },
  {
    id: "3",
    user: "Emma Davis",
    email: "emma@example.com",
    platform: "Shopify",
    store: "emma-boutique.myshopify.com",
    connectedAt: "2024-01-20 12:15:08",
    status: "Failed",
    lastSync: null,
    policies: 0,
  },
  {
    id: "4",
    user: "Alex Rodriguez",
    email: "alex@example.com",
    platform: "BigCommerce",
    store: "alexstore.mybigcommerce.com",
    connectedAt: "2024-01-20 11:20:33",
    status: "Connected",
    lastSync: "2024-01-20 13:45:21",
    policies: 1,
  },
]

export default function StoreIntegrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Store Integrations</h1>
        <p className="text-slate-600 mt-2">Manage e-commerce platform integrations and connections</p>
      </div>

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrationStats.map((stat) => {
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

      {/* Platform Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Distribution</CardTitle>
          <CardDescription>Store connections by e-commerce platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-24 text-sm font-medium">{platform.platform}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{platform.connections.toLocaleString()} stores</span>
                    <Badge variant={platform.status === "Healthy" ? "default" : "secondary"}>{platform.status}</Badge>
                  </div>
                  <Progress value={platform.percentage} className="h-2" />
                </div>
                <div className="text-sm text-slate-600 w-12 text-right">{platform.percentage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Integration Health */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Integration Health</CardTitle>
              <CardDescription>Monitor platform integration status and performance</CardDescription>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Integration</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Platform</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrationHealth.map((integration, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <ShoppingCart className="h-5 w-5 text-slate-400" />
                      <div>
                        <div className="font-medium text-slate-900">{integration.platform}</div>
                        <div className="text-sm text-slate-600">Last updated: {integration.lastUpdate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{integration.version}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          integration.status === "Healthy" ? "bg-green-500" : "bg-orange-500"
                        }`}
                      ></div>
                      <Badge variant={integration.status === "Healthy" ? "default" : "secondary"}>
                        {integration.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{integration.activeConnections.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">active</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Uptime:</span>
                        <span className="font-medium">{integration.uptime}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Response:</span>
                        <span className="font-medium">{integration.avgResponseTime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Errors:</span>
                        <span className="font-medium">{integration.errorRate}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.slice(0, 2).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {integration.features.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{integration.features.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Connections */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Store Connections</CardTitle>
          <CardDescription>Latest store integration attempts and status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User & Store</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Connected</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Policies</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentConnections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{connection.user}</div>
                      <div className="text-sm text-slate-600">{connection.email}</div>
                      <div className="text-xs text-slate-500">{connection.store}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{connection.platform}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{connection.connectedAt}</TableCell>
                  <TableCell className="text-sm text-slate-600">{connection.lastSync || "Never"}</TableCell>
                  <TableCell className="text-center">
                    <div className="font-medium">{connection.policies}</div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={connection.status === "Connected" ? "default" : "destructive"}
                      className={
                        connection.status === "Connected" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }
                    >
                      {connection.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

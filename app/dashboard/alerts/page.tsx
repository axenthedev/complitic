"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import {
  Bell,
  Mail,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Trash2,
  Plus,
  Globe,
  Shield,
} from "lucide-react"

export default function AlertsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  const alertTypes = [
    {
      name: "Compliance Issues",
      description: "Critical compliance violations that need immediate attention",
      enabled: true,
      priority: "high",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      name: "Policy Updates",
      description: "When policies are automatically updated",
      enabled: true,
      priority: "medium",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      name: "Regulation Changes",
      description: "New regulations that may affect your compliance",
      enabled: true,
      priority: "high",
      icon: Globe,
      color: "text-blue-600",
    },
    {
      name: "Scan Results",
      description: "Compliance scan completion and results",
      enabled: false,
      priority: "low",
      icon: Shield,
      color: "text-purple-600",
    },
    {
      name: "System Maintenance",
      description: "Scheduled maintenance and system updates",
      enabled: true,
      priority: "low",
      icon: Settings,
      color: "text-slate-600",
    },
  ]

  const recentAlerts = [
    {
      type: "Compliance Issue",
      message: "Cookie consent banner is not active for EU visitors",
      timestamp: "2 hours ago",
      status: "unread",
      priority: "high",
    },
    {
      type: "Policy Update",
      message: "Privacy policy automatically updated for GDPR compliance",
      timestamp: "1 day ago",
      status: "read",
      priority: "medium",
    },
    {
      type: "Regulation Change",
      message: "New CCPA amendments effective January 2024",
      timestamp: "3 days ago",
      status: "read",
      priority: "high",
    },
    {
      type: "Scan Complete",
      message: "Compliance scan found 2 issues requiring attention",
      timestamp: "1 week ago",
      status: "read",
      priority: "medium",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Alerts & Notifications</h1>
        <p className="text-slate-600">Configure how and when you receive compliance alerts and system notifications.</p>
      </div>

      {/* Notification Channels */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <span>Notification Channels</span>
          </CardTitle>
          <CardDescription>Choose how you want to receive alerts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-slate-600">Receive alerts via email</p>
              </div>
            </div>
            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Smartphone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-slate-600">Receive critical alerts via SMS</p>
              </div>
            </div>
            <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-5 w-5 text-purple-600" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-slate-600">Browser push notifications</p>
              </div>
            </div>
            <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number (SMS)</Label>
              <Input placeholder="+1 (555) 123-4567" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert Types */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-slate-600" />
            <span>Alert Types</span>
          </CardTitle>
          <CardDescription>Configure which types of alerts you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {alertTypes.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <alert.icon className={`h-5 w-5 ${alert.color}`} />
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{alert.name}</h4>
                    <Badge
                      variant="outline"
                      className={
                        alert.priority === "high"
                          ? "border-red-200 text-red-800"
                          : alert.priority === "medium"
                            ? "border-orange-200 text-orange-800"
                            : "border-slate-200 text-slate-800"
                      }
                    >
                      {alert.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600">{alert.description}</p>
                </div>
              </div>
              <Switch checked={alert.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span>Recent Alerts</span>
              </span>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </CardTitle>
            <CardDescription>Your latest compliance alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  alert.status === "unread" ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">{alert.type}</span>
                      <Badge
                        variant="outline"
                        className={
                          alert.priority === "high"
                            ? "border-red-200 text-red-800"
                            : "border-orange-200 text-orange-800"
                        }
                      >
                        {alert.priority}
                      </Badge>
                      {alert.status === "unread" && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                    <p className="text-sm text-slate-700">{alert.message}</p>
                    <p className="text-xs text-slate-500">{alert.timestamp}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-green-600" />
              <span>Custom Alert Rules</span>
            </CardTitle>
            <CardDescription>Create custom rules for specific compliance scenarios</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., High Traffic Cookie Alert" />
            </div>

            <div className="space-y-3">
              <Label>Condition</Label>
              <Textarea placeholder="Describe when this alert should trigger..." className="min-h-[80px]" />
            </div>

            <div className="space-y-3">
              <Label>Alert Message</Label>
              <Input placeholder="Custom message for this alert" />
            </div>

            <Button className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Alert Rule
            </Button>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium text-sm">Existing Custom Rules</h4>
              <div className="text-sm text-slate-600 p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>EU Traffic Spike Alert</span>
                  <Switch defaultChecked />
                </div>
              </div>
              <div className="text-sm text-slate-600 p-3 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Policy Update Failure</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert Summary */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Alert Summary</CardTitle>
          <CardDescription>Overview of your notification settings and recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-slate-600">Unread Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">5</div>
              <div className="text-sm text-slate-600">Active Rules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-slate-600">Alerts This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">98%</div>
              <div className="text-sm text-slate-600">Delivery Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

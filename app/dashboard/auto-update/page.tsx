"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Zap, Clock, Globe, FileText, Settings, CheckCircle, Calendar, Bell, RefreshCw } from "lucide-react"

export default function AutoUpdatePage() {
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true)
  const [gdprUpdates, setGdprUpdates] = useState(true)
  const [ccpaUpdates, setCcpaUpdates] = useState(true)
  const [updateFrequency, setUpdateFrequency] = useState("weekly")

  const updateRules = [
    {
      name: "GDPR Regulation Changes",
      description: "Automatically update privacy policies when EU regulations change",
      enabled: true,
      lastTriggered: "2 days ago",
      status: "active",
      region: "EU",
    },
    {
      name: "CCPA Law Updates",
      description: "Monitor California privacy law changes and update policies",
      enabled: true,
      lastTriggered: "1 week ago",
      status: "active",
      region: "US-CA",
    },
    {
      name: "Cookie Policy Updates",
      description: "Update cookie policies when new tracking technologies are detected",
      enabled: false,
      lastTriggered: "Never",
      status: "inactive",
      region: "Global",
    },
    {
      name: "Terms of Service Updates",
      description: "Automatically update terms when platform policies change",
      enabled: true,
      lastTriggered: "3 days ago",
      status: "active",
      region: "Global",
    },
  ]

  const recentUpdates = [
    {
      policy: "Privacy Policy",
      change: "Added new GDPR data retention clauses",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      policy: "Cookie Policy",
      change: "Updated consent banner text for clarity",
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      policy: "Terms of Service",
      change: "Modified dispute resolution section",
      timestamp: "3 days ago",
      status: "completed",
    },
    {
      policy: "Refund Policy",
      change: "Updated return timeframe for digital products",
      timestamp: "1 week ago",
      status: "completed",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Auto-Update Rules</h1>
        <p className="text-slate-600">
          Configure automatic policy updates when regulations change to stay compliant effortlessly.
        </p>
      </div>

      {/* Master Control */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span>Auto-Update Settings</span>
          </CardTitle>
          <CardDescription>Master controls for automatic policy updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Enable Auto-Updates</Label>
              <p className="text-sm text-slate-600">Automatically update policies when regulations change</p>
            </div>
            <Switch checked={autoUpdateEnabled} onCheckedChange={setAutoUpdateEnabled} />
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-base font-medium">Update Frequency</Label>
              <Select value={updateFrequency} onValueChange={setUpdateFrequency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="immediate">Immediate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-medium">Notification Email</Label>
              <Input placeholder="admin@yourstore.com" defaultValue="john@example.com" />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-medium">Regional Compliance</Label>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="font-medium">GDPR Updates</p>
                  <p className="text-sm text-slate-600">European Union regulations</p>
                </div>
              </div>
              <Switch checked={gdprUpdates} onCheckedChange={setGdprUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-red-600" />
                <div>
                  <p className="font-medium">CCPA Updates</p>
                  <p className="text-sm text-slate-600">California privacy laws</p>
                </div>
              </div>
              <Switch checked={ccpaUpdates} onCheckedChange={setCcpaUpdates} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Update Rules */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-slate-600" />
            <span>Update Rules</span>
          </CardTitle>
          <CardDescription>Configure specific rules for different types of policy updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {updateRules.map((rule, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium">{rule.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {rule.region}
                  </Badge>
                  <Badge
                    className={rule.status === "active" ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}
                  >
                    {rule.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{rule.description}</p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <Clock className="h-3 w-3" />
                  <span>Last triggered: {rule.lastTriggered}</span>
                </div>
              </div>
              <Switch checked={rule.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <RefreshCw className="h-5 w-5 text-blue-600" />
              <span>Recent Updates</span>
            </CardTitle>
            <CardDescription>Latest automatic policy updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentUpdates.map((update, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <p className="text-sm font-medium">{update.policy}</p>
                  <p className="text-xs text-slate-600">{update.change}</p>
                  <p className="text-xs text-slate-400">{update.timestamp}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <span>Upcoming Checks</span>
            </CardTitle>
            <CardDescription>Scheduled compliance monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">GDPR Regulation Review</p>
                <p className="text-xs text-slate-600">Check for new EU privacy regulations</p>
                <p className="text-xs text-slate-400">Tomorrow at 9:00 AM</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Cookie Policy Scan</p>
                <p className="text-xs text-slate-600">Detect new tracking technologies</p>
                <p className="text-xs text-slate-400">In 3 days</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">CCPA Law Update Check</p>
                <p className="text-xs text-slate-600">Monitor California privacy law changes</p>
                <p className="text-xs text-slate-400">Weekly on Mondays</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Platform Policy Review</p>
                <p className="text-xs text-slate-600">Check Shopify/WooCommerce policy updates</p>
                <p className="text-xs text-slate-400">Monthly on 1st</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your auto-update settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center space-y-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg">
              <RefreshCw className="h-6 w-6" />
              <span className="text-sm">Force Update</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-white border-slate-200 hover:bg-slate-50 rounded-lg"
            >
              <Settings className="h-6 w-6" />
              <span className="text-sm">Configure Rules</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-white border-slate-200 hover:bg-slate-50 rounded-lg"
            >
              <Bell className="h-6 w-6" />
              <span className="text-sm">Notification Settings</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center space-y-2 bg-white border-slate-200 hover:bg-slate-50 rounded-lg"
            >
              <FileText className="h-6 w-6" />
              <span className="text-sm">View Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

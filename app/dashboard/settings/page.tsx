"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, Database, Download, Trash2, Save, Eye, EyeOff } from "lucide-react"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [autoBackup, setAutoBackup] = useState(true)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Account Settings</h1>
        <p className="text-slate-600">
          Manage your account preferences, security settings, and compliance configurations.
        </p>
      </div>

      {/* Profile Settings */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-blue-600" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>Update your personal information and profile details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="bg-slate-100 text-lg">JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Button variant="outline">Change Photo</Button>
              <Button variant="ghost" className="text-red-600">
                Remove Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input defaultValue="John" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input defaultValue="Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company</Label>
            <Input defaultValue="Eco Style Boutique" />
          </div>

          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Tell us about yourself..."
              defaultValue="E-commerce entrepreneur focused on sustainable fashion and compliance."
              className="min-h-[80px]"
            />
          </div>

          <Button className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <span>Notification Preferences</span>
          </CardTitle>
          <CardDescription>Configure how you receive alerts and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Email Notifications</Label>
                <p className="text-sm text-slate-600">Receive compliance alerts via email</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">SMS Notifications</Label>
                <p className="text-sm text-slate-600">Critical alerts via text message</p>
              </div>
              <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Weekly Reports</Label>
                <p className="text-sm text-slate-600">Receive weekly compliance summaries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Marketing Updates</Label>
                <p className="text-sm text-slate-600">Product updates and feature announcements</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-medium">Notification Frequency</Label>
            <Select defaultValue="immediate">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate</SelectItem>
                <SelectItem value="hourly">Hourly Digest</SelectItem>
                <SelectItem value="daily">Daily Digest</SelectItem>
                <SelectItem value="weekly">Weekly Digest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Security & Privacy</span>
          </CardTitle>
          <CardDescription>Manage your account security and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Current Password</Label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div className="space-y-2">
              <Label>New Password</Label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div className="space-y-2">
              <Label>Confirm New Password</Label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <Button variant="outline">Update Password</Button>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Two-Factor Authentication</Label>
                <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Login Alerts</Label>
                <p className="text-sm text-slate-600">Get notified of new login attempts</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <Label className="text-base font-medium">API Access</Label>
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex items-center space-x-2">
                <Input type={showApiKey ? "text" : "password"} defaultValue="sk_live_1234567890abcdef" readOnly />
                <Button variant="outline" size="icon" onClick={() => setShowApiKey(!showApiKey)}>
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">Regenerate Key</Button>
              <Button variant="outline">View Documentation</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Palette className="h-5 w-5 text-purple-600" />
              <span>Appearance</span>
            </CardTitle>
            <CardDescription>Customize your dashboard appearance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Dark Mode</Label>
                <p className="text-sm text-slate-600">Switch to dark theme</p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>

            <div className="space-y-2">
              <Label>Language</Label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Select defaultValue="pst">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pst">Pacific Standard Time</SelectItem>
                  <SelectItem value="est">Eastern Standard Time</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="cet">Central European Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-green-600" />
              <span>Data & Backup</span>
            </CardTitle>
            <CardDescription>Manage your data and backup preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-base font-medium">Automatic Backups</Label>
                <p className="text-sm text-slate-600">Daily backup of your compliance data</p>
              </div>
              <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
            </div>

            <div className="space-y-2">
              <Label>Data Retention</Label>
              <Select defaultValue="1year">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="2years">2 Years</SelectItem>
                  <SelectItem value="forever">Forever</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="bg-white rounded-xl border border-red-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            <span>Danger Zone</span>
          </CardTitle>
          <CardDescription>Irreversible actions that affect your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="space-y-1">
              <Label className="text-base font-medium text-red-800">Delete Account</Label>
              <p className="text-sm text-red-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
          </div>

          <div className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
            <div className="space-y-1">
              <Label className="text-base font-medium text-orange-800">Reset All Settings</Label>
              <p className="text-sm text-orange-600">Reset all preferences to default values</p>
            </div>
            <Button variant="outline" className="border-orange-300 text-orange-700 bg-transparent">
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

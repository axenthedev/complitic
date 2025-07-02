"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cookie, Eye, Code, Settings, Globe, CheckCircle, AlertTriangle } from "lucide-react"

export default function CookieManager() {
  const [bannerEnabled, setBannerEnabled] = useState(true)
  const [gdprEnabled, setGdprEnabled] = useState(true)
  const [ccpaEnabled, setCcpaEnabled] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  const cookieCategories = [
    {
      name: "Essential",
      description: "Required for basic site functionality",
      enabled: true,
      required: true,
      count: 3,
    },
    {
      name: "Analytics",
      description: "Help us understand how visitors use our site",
      enabled: true,
      required: false,
      count: 2,
    },
    {
      name: "Marketing",
      description: "Used to track visitors and show relevant ads",
      enabled: false,
      required: false,
      count: 5,
    },
    {
      name: "Preferences",
      description: "Remember your settings and preferences",
      enabled: true,
      required: false,
      count: 1,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Cookie Manager</h1>
        <p className="text-slate-600">Configure cookie consent banners and manage cookie categories for compliance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Banner Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                <span>Cookie Banner Settings</span>
              </CardTitle>
              <CardDescription>Configure your cookie consent banner appearance and behavior</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Enable Cookie Banner</Label>
                  <p className="text-sm text-slate-600">Show cookie consent banner to visitors</p>
                </div>
                <Switch checked={bannerEnabled} onCheckedChange={setBannerEnabled} />
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Compliance Regions</Label>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">GDPR (European Union)</p>
                      <p className="text-sm text-slate-600">Required for EU visitors</p>
                    </div>
                  </div>
                  <Switch checked={gdprEnabled} onCheckedChange={setGdprEnabled} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-red-600" />
                    <div>
                      <p className="font-medium">CCPA (California)</p>
                      <p className="text-sm text-slate-600">Required for California residents</p>
                    </div>
                  </div>
                  <Switch checked={ccpaEnabled} onCheckedChange={setCcpaEnabled} />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-base font-medium">Banner Text</Label>
                <Textarea
                  placeholder="We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies."
                  className="min-h-[80px]"
                  defaultValue="We use cookies to enhance your browsing experience and analyze our traffic. By clicking 'Accept All', you consent to our use of cookies."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Accept Button Text</Label>
                  <Input defaultValue="Accept All" />
                </div>
                <div className="space-y-2">
                  <Label>Reject Button Text</Label>
                  <Input defaultValue="Reject All" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cookie Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-slate-600" />
                <span>Cookie Categories</span>
              </CardTitle>
              <CardDescription>Manage different types of cookies used on your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cookieCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {category.count} cookies
                      </Badge>
                      {category.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{category.description}</p>
                  </div>
                  <Switch checked={category.enabled} disabled={category.required} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Embed Code */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5 text-green-600" />
                <span>Embed Code</span>
              </CardTitle>
              <CardDescription>Copy this code to your website's header section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <code>{`<!-- Complitic Cookie Consent -->
<script src="https://cdn.complitic.com/cookie-banner.js"></script>
<script>
  ComplititicCookies.init({
    apiKey: 'your-api-key-here',
    gdpr: ${gdprEnabled},
    ccpa: ${ccpaEnabled},
    categories: ['essential', 'analytics', 'preferences']
  });
</script>`}</code>
              </div>
              <Button className="mt-4 bg-transparent" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                Copy Code
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Status */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Banner Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                {bannerEnabled ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                )}
                <span className="font-medium">{bannerEnabled ? "Active" : "Inactive"}</span>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Compliance Status</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">GDPR</span>
                    <Badge className={gdprEnabled ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}>
                      {gdprEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CCPA</span>
                    <Badge className={ccpaEnabled ? "bg-green-100 text-green-800" : "bg-slate-100 text-slate-800"}>
                      {ccpaEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Active Categories</p>
                <div className="flex flex-wrap gap-1">
                  {cookieCategories
                    .filter((cat) => cat.enabled)
                    .map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cat.name}
                      </Badge>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">Live Preview</span>
                <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                  <Eye className="h-4 w-4 mr-2" />
                  {showPreview ? "Hide" : "Show"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {showPreview && bannerEnabled ? (
                <div className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Cookie className="h-5 w-5 text-orange-600 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-sm">
                          We use cookies to enhance your browsing experience and analyze our traffic. By clicking
                          'Accept All', you consent to our use of cookies.
                        </p>
                        <div className="flex space-x-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-xs">
                            Accept All
                          </Button>
                          <Button variant="outline" size="sm" className="text-xs bg-transparent">
                            Reject All
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            Settings
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500">
                  <Cookie className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {bannerEnabled ? "Click 'Show' to preview banner" : "Enable banner to see preview"}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Customize Appearance
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                View Integration Guide
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Test on Live Site
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

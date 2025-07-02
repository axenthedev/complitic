"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Store,
  Plus,
  Settings,
  ExternalLink,
  CheckCircle,
  AlertTriangle,
  Globe,
  BarChart3,
  RefreshCw,
} from "lucide-react"

export default function StoresPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const connectedStores = [
    {
      name: "Eco Style Boutique",
      platform: "Shopify",
      url: "ecostyle-boutique.myshopify.com",
      status: "connected",
      lastSync: "2 hours ago",
      compliance: 85,
      orders: 1247,
      revenue: "$45,230",
      region: "US, EU",
      logo: "🌿",
    },
    {
      name: "TechGear Pro",
      platform: "WooCommerce",
      url: "techgearpro.com",
      status: "connected",
      lastSync: "1 day ago",
      compliance: 92,
      orders: 856,
      revenue: "$32,180",
      region: "US, CA",
      logo: "⚡",
    },
    {
      name: "Artisan Crafts Co",
      platform: "Shopify",
      url: "artisan-crafts.myshopify.com",
      status: "warning",
      lastSync: "3 days ago",
      compliance: 67,
      orders: 423,
      revenue: "$18,950",
      region: "US",
      logo: "🎨",
    },
  ]

  const availablePlatforms = [
    {
      name: "Shopify",
      description: "Connect your Shopify store for automatic compliance management",
      icon: "🛍️",
      supported: true,
    },
    {
      name: "WooCommerce",
      description: "Integrate with your WordPress WooCommerce store",
      icon: "🔧",
      supported: true,
    },
    {
      name: "BigCommerce",
      description: "Connect your BigCommerce store (Coming Soon)",
      icon: "🏪",
      supported: false,
    },
    {
      name: "Magento",
      description: "Magento integration (Coming Soon)",
      icon: "🎯",
      supported: false,
    },
  ]

  const handleConnectStore = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Store Connections</h1>
        <p className="text-slate-600">
          Connect your e-commerce stores to automatically manage compliance across all platforms.
        </p>
      </div>

      {/* Add New Store */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-green-600" />
            <span>Add New Store</span>
          </CardTitle>
          <CardDescription>Connect a new e-commerce platform to manage compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePlatforms.map((platform, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  platform.supported
                    ? "border-slate-200 hover:border-green-300 cursor-pointer"
                    : "border-slate-200 opacity-50"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{platform.name}</h4>
                      {!platform.supported && (
                        <Badge variant="outline" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{platform.description}</p>
                  </div>
                </div>
                {platform.supported && (
                  <Button
                    className="w-full mt-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                    onClick={handleConnectStore}
                  >
                    Connect {platform.name}
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Manual Connection</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store URL</Label>
                <Input placeholder="your-store.myshopify.com" />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input placeholder="Enter your API key" type="password" />
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={handleConnectStore}>
              Connect Manually
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Connected Stores */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Store className="h-5 w-5 text-blue-600" />
              <span>Connected Stores</span>
            </span>
            <Button
              onClick={handleConnectStore}
              disabled={isConnecting}
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
            >
              {isConnecting ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Connect Store
                </>
              )}
            </Button>
          </CardTitle>
          <CardDescription>Manage your connected e-commerce platforms</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {connectedStores.map((store, index) => (
            <div key={index} className="p-4 border border-slate-200 rounded-lg">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{store.logo}</div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{store.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {store.platform}
                      </Badge>
                      <Badge
                        className={
                          store.status === "connected" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
                        }
                      >
                        {store.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600">{store.url}</p>
                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                      <span>Last sync: {store.lastSync}</span>
                      <span>Region: {store.region}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{store.compliance}%</div>
                  <div className="text-xs text-slate-600">Compliance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{store.orders}</div>
                  <div className="text-xs text-slate-600">Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">{store.revenue}</div>
                  <div className="text-xs text-slate-600">Revenue</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    {store.status === "connected" ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="text-xs text-slate-600">Status</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Store Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <span>Store Performance</span>
            </CardTitle>
            <CardDescription>Compliance and performance metrics across stores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Average Compliance Score</span>
                <span className="text-lg font-bold text-slate-900">81%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: "81%" }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Stores</span>
                <span className="text-lg font-bold text-slate-900">3</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Regional Coverage</span>
            </CardTitle>
            <CardDescription>Geographic distribution of your stores</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">United States</span>
                </div>
                <span className="text-sm font-medium">3 stores</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  <span className="text-sm">European Union</span>
                </div>
                <span className="text-sm font-medium">1 store</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  <span className="text-sm">Canada</span>
                </div>
                <span className="text-sm font-medium">1 store</span>
              </div>
            </div>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-slate-600">
                Your stores operate in <strong>3 regions</strong> with different compliance requirements
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

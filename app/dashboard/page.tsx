import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Store,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  CheckCircle,
  AlertTriangle,
  Clock,
  Cookie,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#1E293B] to-slate-700 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
        <p className="text-slate-200">Your store "Eco Style Boutique" is 85% compliant. Here's your overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Policies Generated</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2 this month
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-green-500 before:to-teal-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Connected Stores</CardTitle>
              <Store className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3</div>
              <div className="flex items-center text-xs text-green-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1 this week
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Last Policy Update</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">2h</div>
              <div className="flex items-center text-xs text-slate-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Privacy Policy updated
              </div>
            </CardContent>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Cookie Banner Status</CardTitle>
              <Cookie className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Active</div>
              <div className="flex items-center text-xs text-green-600">
                <ShieldCheck className="h-3 w-3 mr-1" />
                All stores protected
              </div>
            </CardContent>
          </div>
        </Card>
      </div>

      {/* Compliance Coverage by Region */}
      <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-cyan-500 before:via-blue-500 before:to-indigo-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        <div className="relative bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span>Compliance Coverage by Region</span>
            </CardTitle>
            <CardDescription>Your compliance status across different jurisdictions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-green-900">European Union</p>
                    <p className="text-sm text-green-700">GDPR Compliant</p>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-800">100%</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-orange-900">California, USA</p>
                    <p className="text-sm text-orange-700">CCPA In Progress</p>
                  </div>
                </div>
                <Badge className="bg-orange-100 text-orange-800">75%</Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-blue-900">Canada</p>
                    <p className="text-sm text-blue-700">PIPEDA Ready</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-800">90%</Badge>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-pink-500 before:via-rose-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
        <div className="relative bg-white rounded-xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Privacy Policy Updated</p>
                <p className="text-xs text-slate-600">Auto-updated for GDPR compliance</p>
                <p className="text-xs text-slate-400">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Cookie Banner Update</p>
                <p className="text-xs text-slate-600">New categories detected</p>
                <p className="text-xs text-slate-400">1 day ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Terms Generated</p>
                <p className="text-xs text-slate-600">AI created new terms of service</p>
                <p className="text-xs text-slate-400">3 days ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Store Connected</p>
                <p className="text-xs text-slate-600">Shopify integration successful</p>
                <p className="text-xs text-slate-400">1 week ago</p>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

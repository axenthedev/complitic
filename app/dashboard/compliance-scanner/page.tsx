"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Globe, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { ScanProgress } from "@/components/dashboard/scan-progress"

export default function ComplianceScannerPage() {
  const [storeUrl, setStoreUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleScan = () => {
    if (!storeUrl.trim()) return
    setIsScanning(true)
    setShowResults(false)
  }

  const handleScanComplete = () => {
    setIsScanning(false)
    setShowResults(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#1E293B] to-slate-700 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Store Compliance Scanner</h1>
        <p className="text-slate-200">Analyze your store's compliance with GDPR, CCPA, and other privacy regulations</p>
      </div>

      {/* Scan Input */}
      <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
        <div className="relative bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Scan Your Store</span>
            </CardTitle>
            <CardDescription>Enter your store URL to begin compliance analysis</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-url">Store URL</Label>
              <div className="flex space-x-2">
                <Input
                  id="store-url"
                  type="url"
                  placeholder="https://your-store.com"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  disabled={isScanning}
                  className="flex-1"
                />
                <Button
                  onClick={handleScan}
                  disabled={!storeUrl.trim() || isScanning}
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isScanning ? "Scanning..." : "Scan Store"}
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardContent className="p-6">
              <ScanProgress isScanning={isScanning} onComplete={handleScanComplete} />
            </CardContent>
          </div>
        </Card>
      )}

      {/* Scan Results */}
      {showResults && !isScanning && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-green-500 before:to-teal-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Overall Score</CardTitle>
                  <Shield className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">85%</div>
                  <p className="text-xs text-slate-600">Good compliance level</p>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Issues Found</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <p className="text-xs text-slate-600">Require attention</p>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Scan Time</CardTitle>
                  <Clock className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">2.3s</div>
                  <p className="text-xs text-slate-600">Fast analysis</p>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Last Scan</CardTitle>
                  <TrendingUp className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-900">Now</div>
                  <p className="text-xs text-slate-600">Just completed</p>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Compliance Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-emerald-500 before:via-teal-500 before:to-cyan-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-700">
              <div className="relative bg-white rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span>Compliance Breakdown</span>
                  </CardTitle>
                  <CardDescription>Detailed analysis by regulation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">GDPR Compliance</span>
                      <Badge className="bg-green-100 text-green-800">95%</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">CCPA Compliance</span>
                      <Badge className="bg-orange-100 text-orange-800">75%</Badge>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Cookie Consent</span>
                      <Badge className="bg-green-100 text-green-800">100%</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Data Protection</span>
                      <Badge className="bg-yellow-100 text-yellow-800">80%</Badge>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-pink-500 before:via-rose-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
              <div className="relative bg-white rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <span>Issues Found</span>
                  </CardTitle>
                  <CardDescription>Items that need attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900">Missing Privacy Policy Link</p>
                      <p className="text-xs text-red-700">Footer privacy policy link not found</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-orange-900">Cookie Banner Incomplete</p>
                      <p className="text-xs text-orange-700">Missing analytics cookie category</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Terms of Service Outdated</p>
                      <p className="text-xs text-yellow-700">Last updated over 2 years ago</p>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-violet-500 before:via-purple-500 before:to-fuchsia-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500">
            <div className="relative bg-white rounded-xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span>AI Recommendations</span>
                </CardTitle>
                <CardDescription>Automated suggestions to improve compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-900">Update Privacy Policy</p>
                    <p className="text-xs text-blue-700 mb-2">Add CCPA-specific data collection disclosures</p>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Generate Update <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-900">Enhance Cookie Banner</p>
                    <p className="text-xs text-green-700 mb-2">Add granular consent options for analytics</p>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Update Banner <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-900">Refresh Terms of Service</p>
                    <p className="text-xs text-purple-700 mb-2">Update with current legal requirements</p>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      Generate Terms <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

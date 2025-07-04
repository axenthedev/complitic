"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Globe, Clock, TrendingUp, ArrowRight, Loader2 } from "lucide-react"
import { ScanProgress } from "@/components/dashboard/scan-progress"

export default function ComplianceScannerPage() {
  const { user } = useUser();
  const [storeUrl, setStoreUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [waitingForResults, setWaitingForResults] = useState(false)

  const handleScan = async () => {
    if (!storeUrl.trim() || !user?.id) return
    setIsScanning(true)
    setScanResult(null)
    setError(null)
    setShowResults(false)
    setWaitingForResults(false)
    try {
      const res = await fetch("/api/compliance-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, url: storeUrl }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Scan failed")
      setScanResult(data)
    } catch (err: any) {
      setError(err.message || "Scan failed")
    } finally {
      setIsScanning(false)
    }
  }

  // Show spinner for at least 10s after progress completes
  const handleProgressComplete = () => {
    setWaitingForResults(true)
    setTimeout(() => {
    setShowResults(true)
    }, 10000)
  }

  // Show results only after both scanResult is ready and 10s spinner is done
  const shouldShowResults = showResults && scanResult && !isScanning

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
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </CardContent>
        </div>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
          <div className="relative bg-white rounded-xl">
            <CardContent className="p-6">
              <ScanProgress isScanning={isScanning} onComplete={handleProgressComplete} />
            </CardContent>
          </div>
        </Card>
      )}

      {/* Spinner after progress, before results */}
      {waitingForResults && !shouldShowResults && (
        <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="relative bg-white rounded-xl">
            <CardContent className="flex flex-col items-center justify-center p-8">
              <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
              <div className="text-lg font-semibold text-slate-700">Results coming...</div>
              <div className="text-sm text-slate-500 mt-2">Analyzing your store. This may take a few seconds.</div>
            </CardContent>
          </div>
        </Card>
      )}

      {/* Scan Results */}
      {shouldShowResults && (
        <>
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Privacy Policy */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-green-500 before:to-teal-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Privacy Policy</CardTitle>
                  {scanResult.privacy_policy_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.privacy_policy_found ? "text-green-600" : "text-red-600"}`}>{scanResult.privacy_policy_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Privacy policy page {scanResult.privacy_policy_found ? "detected" : "not found"}</p>
                </CardContent>
              </div>
            </Card>

            {/* Terms Page */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Terms Page</CardTitle>
                  {scanResult.terms_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.terms_found ? "text-green-600" : "text-red-600"}`}>{scanResult.terms_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Terms page {scanResult.terms_found ? "detected" : "not found"}</p>
                </CardContent>
              </div>
            </Card>

            {/* Return Policy */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-blue-500 before:to-green-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Return Policy</CardTitle>
                  {scanResult.return_policy_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.return_policy_found ? "text-green-600" : "text-red-600"}`}>{scanResult.return_policy_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Return policy page {scanResult.return_policy_found ? "detected" : "not found"}</p>
                </CardContent>
              </div>
            </Card>

            {/* Disclaimer */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Disclaimer</CardTitle>
                  {scanResult.disclaimer_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.disclaimer_found ? "text-green-600" : "text-red-600"}`}>{scanResult.disclaimer_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Disclaimer page {scanResult.disclaimer_found ? "detected" : "not found"}</p>
                </CardContent>
              </div>
            </Card>

            {/* Shipping Policy */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-yellow-500 before:to-orange-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Shipping Policy</CardTitle>
                  {scanResult.shipping_policy_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.shipping_policy_found ? "text-green-600" : "text-red-600"}`}>{scanResult.shipping_policy_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Shipping policy page {scanResult.shipping_policy_found ? "detected" : "not found"}</p>
                </CardContent>
                    </div>
            </Card>

            {/* Payment Policy */}
            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-pink-500 before:to-purple-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Payment Policy</CardTitle>
                  {scanResult.payment_policy_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.payment_policy_found ? "text-green-600" : "text-red-600"}`}>{scanResult.payment_policy_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Payment policy page {scanResult.payment_policy_found ? "detected" : "not found"}</p>
                </CardContent>
                    </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-orange-500 before:to-red-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Cookie Banner</CardTitle>
                  {scanResult.cookie_banner_found ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.cookie_banner_found ? "text-green-600" : "text-red-600"}`}>{scanResult.cookie_banner_found ? "Found" : "Missing"}</div>
                  <p className="text-xs text-slate-600">Cookie banner {scanResult.cookie_banner_found ? "detected" : "not found"}</p>
                </CardContent>
              </div>
            </Card>

            <Card className="relative overflow-hidden bg-white rounded-xl border border-slate-200 shadow-sm before:absolute before:inset-0 before:rounded-xl before:p-[2px] before:bg-gradient-to-r before:from-purple-500 before:to-pink-500 before:animate-pulse before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300">
              <div className="relative bg-white rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">Trackers</CardTitle>
                  {scanResult.trackers && scanResult.trackers.length > 0 ? <AlertTriangle className="h-4 w-4 text-orange-600" /> : <CheckCircle className="h-4 w-4 text-green-600" />}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${scanResult.trackers && scanResult.trackers.length > 0 ? "text-orange-600" : "text-green-600"}`}>{scanResult.trackers && scanResult.trackers.length > 0 ? scanResult.trackers.length : 0}</div>
                  <p className="text-xs text-slate-600">{scanResult.trackers && scanResult.trackers.length > 0 ? scanResult.trackers.join(", ") : "No known trackers detected"}</p>
                </CardContent>
              </div>
            </Card>
          </div>

          {/* Contact Info */}
          <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <span>Contact Info Found</span>
                </CardTitle>
              </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div><span className="font-medium">Emails:</span> {scanResult.contact_info?.emails?.length ? scanResult.contact_info.emails.join(", ") : <span className="text-slate-400">None</span>}</div>
                <div><span className="font-medium">Phone Numbers:</span> {scanResult.contact_info?.tels?.length ? scanResult.contact_info.tels.join(", ") : <span className="text-slate-400">None</span>}</div>
                </div>
              </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

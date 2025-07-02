"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { PayoutRequestModal } from "@/components/modals/payout-request-modal"
import {
  Copy,
  DollarSign,
  Users,
  TrendingUp,
  Download,
  Share2,
  Eye,
  MousePointer,
  CreditCard,
  Gift,
  Target,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function AffiliatePage() {
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false)
  const { toast } = useToast()

  const affiliateStats = {
    totalEarnings: 2847.5,
    monthlyEarnings: 485.2,
    availableBalance: 485.2,
    pendingBalance: 125.0,
    totalReferrals: 23,
    activeReferrals: 18,
    conversionRate: 12.5,
    clickThroughRate: 8.3,
  }

  const referralLinks = [
    {
      id: 1,
      name: "General Referral",
      url: "https://complitic.com/ref/johndoe123",
      clicks: 156,
      conversions: 12,
      earnings: 240.0,
    },
    {
      id: 2,
      name: "Blog Campaign",
      url: "https://complitic.com/ref/johndoe123?utm_source=blog",
      clicks: 89,
      conversions: 7,
      earnings: 140.0,
    },
    {
      id: 3,
      name: "Social Media",
      url: "https://complitic.com/ref/johndoe123?utm_source=social",
      clicks: 234,
      conversions: 18,
      earnings: 360.0,
    },
  ]

  const recentReferrals = [
    {
      id: 1,
      email: "sarah.j***@gmail.com",
      plan: "Professional",
      commission: 25.0,
      status: "Active",
      date: "2024-01-15",
    },
    {
      id: 2,
      email: "mike.w***@company.com",
      plan: "Enterprise",
      commission: 50.0,
      status: "Active",
      date: "2024-01-12",
    },
    {
      id: 3,
      email: "lisa.m***@startup.io",
      plan: "Professional",
      commission: 25.0,
      status: "Pending",
      date: "2024-01-10",
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      amount: 485.2,
      date: "2024-01-01",
      status: "Paid",
      method: "PayPal",
    },
    {
      id: 2,
      amount: 392.5,
      date: "2023-12-01",
      status: "Paid",
      method: "Bank Transfer",
    },
    {
      id: 3,
      amount: 278.8,
      date: "2023-11-01",
      status: "Paid",
      method: "PayPal",
    },
  ]

  const payoutRequests = [
    {
      id: 1,
      amount: 485.2,
      requestDate: "2024-01-20",
      status: "Processing",
      method: "PayPal",
      estimatedDate: "2024-01-25",
    },
    {
      id: 2,
      amount: 392.5,
      requestDate: "2023-12-28",
      status: "Completed",
      method: "Bank Transfer",
      completedDate: "2024-01-03",
    },
    {
      id: 3,
      amount: 150.0,
      requestDate: "2023-12-15",
      status: "Rejected",
      method: "PayPal",
      reason: "Insufficient balance",
    },
  ]

  const copyToClipboard = (text: string, linkName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedLink(linkName)
    toast({ title: "Copied", description: "Referral link copied to clipboard!" })
    setTimeout(() => setCopiedLink(null), 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Affiliate Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your referrals, earnings, and grow your affiliate income</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${affiliateStats.totalEarnings.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${affiliateStats.availableBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">${affiliateStats.pendingBalance.toFixed(2)} pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">{affiliateStats.activeReferrals} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{affiliateStats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">{affiliateStats.clickThroughRate}% CTR</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="links">Referral Links</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
                <CardDescription>Your affiliate performance over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Clicks</span>
                      <span>479</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversions</span>
                      <span>37</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Earnings</span>
                      <span>${affiliateStats.monthlyEarnings}</span>
                    </div>
                    <Progress value={60} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common affiliate tasks and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Social Media
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Marketing Kit
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Gift className="h-4 w-4 mr-2" />
                  Create Custom Link
                </Button>
                <Button
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsPayoutModalOpen(true)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Request Payout
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Referral Links Tab */}
        <TabsContent value="links" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Links</CardTitle>
              <CardDescription>Track performance of your different referral campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {referralLinks.map((link) => (
                  <div key={link.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{link.name}</h3>
                      <Badge variant="secondary">${link.earnings.toFixed(2)}</Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Input value={link.url} readOnly className="flex-1" />
                      <Button size="sm" onClick={() => copyToClipboard(link.url, link.name)} className="shrink-0">
                        {copiedLink === link.name ? "Copied!" : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        <span>{link.clicks} clicks</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MousePointer className="h-4 w-4 text-muted-foreground" />
                        <span>{link.conversions} conversions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${link.earnings.toFixed(2)} earned</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Referrals Tab */}
        <TabsContent value="referrals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Referrals</CardTitle>
              <CardDescription>Track your recent referral sign-ups and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReferrals.map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{referral.email}</p>
                      <p className="text-sm text-muted-foreground">{referral.plan} Plan</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="font-medium">${referral.commission.toFixed(2)}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={referral.status === "Active" ? "default" : "secondary"}>
                          {referral.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{referral.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View your completed affiliate payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">${payment.amount.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="default">{payment.status}</Badge>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payouts Tab */}
        <TabsContent value="payouts" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Payout Requests</h2>
              <p className="text-gray-600">Manage your payout requests and track their status</p>
            </div>
            <Button onClick={() => setIsPayoutModalOpen(true)} className="bg-green-600 hover:bg-green-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Balance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Available Balance</div>
                  <div className="text-2xl font-bold text-green-600">${affiliateStats.availableBalance.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">Ready for payout</div>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Pending Balance</div>
                  <div className="text-2xl font-bold text-yellow-600">${affiliateStats.pendingBalance.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">Processing referrals</div>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600">Total Earned</div>
                  <div className="text-2xl font-bold text-blue-600">${affiliateStats.totalEarnings.toFixed(2)}</div>
                  <div className="text-xs text-gray-500">All time earnings</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Payout Requests</CardTitle>
              <CardDescription>Track the status of your payout requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="font-medium">${request.amount.toFixed(2)}</span>
                      </div>
                      <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Method:</span>
                        <div className="font-medium">{request.method}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Requested:</span>
                        <div className="font-medium">{request.requestDate}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">
                          {request.status === "Completed" ? "Completed:" : "Estimated:"}
                        </span>
                        <div className="font-medium">{request.completedDate || request.estimatedDate || "N/A"}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <div className="font-medium">
                          {request.status === "Rejected" ? request.reason : request.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Marketing Materials Tab */}
        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Banners & Graphics</CardTitle>
                <CardDescription>Download promotional banners for your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">728x90 Leaderboard</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">300x250 Rectangle</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">160x600 Skyscraper</span>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Pre-written email templates for your campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Welcome Email</span>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Feature Announcement</span>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Newsletter Template</span>
                    <Button size="sm" variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Payout Request Modal */}
      <PayoutRequestModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableBalance={affiliateStats.availableBalance}
      />
    </div>
  )
}

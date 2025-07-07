"use client"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
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
  ExternalLink,
  AlertCircle,
  Link as LinkIcon,
  Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import supabase from "@/lib/supabase/browser"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface AffiliateStats {
  id: string
  user_id: string
  clicks: number
  conversions: number
  conversion_rate: number
  total_earnings: number
  available_balance: number
  pending_balance: number
  total_referrals: number
  active_referrals: number
  converted_referrals: number
  updated_at: string
}

interface Referral {
  id: string
  user_id: string
  referred_email: string
  status: 'pending' | 'active' | 'converted'
  created_at: string
}

interface Payout {
  id: string
  user_id: string
  amount: number
  status: 'pending' | 'paid' | 'failed'
  created_at: string
}

interface ReferralLink {
  id: string
  user_id: string
  link_code: string
  clicks: number
  conversions: number
  full_url: string
  created_at: string
}

interface AffiliateMaterial {
  id: string
  title: string
  description: string
  type: 'banner' | 'social' | 'email' | 'video'
  url: string
  is_active: boolean
}

export default function AffiliateDashboard() {
  const { getToken, isLoaded } = useAuth()
  const { user: clerkUser, isLoaded: isClerkLoaded } = useUser()
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<AffiliateStats | null>(null)
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [referralLinks, setReferralLinks] = useState<ReferralLink[]>([])
  const [materials, setMaterials] = useState<AffiliateMaterial[]>([])
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false)
  const [showCreateLink, setShowCreateLink] = useState(false)
  const [newLinkName, setNewLinkName] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      
      try {
        if (!isLoaded || !isClerkLoaded || !clerkUser?.id) return
        
        // Get Clerk session token for Supabase
        const token = await getToken({ template: "supabase" })
        if (token) {
          await supabase.auth.setSession({ access_token: token, refresh_token: "" })
        }

        // Fetch affiliate stats
        const response = await fetch('/api/affiliate/stats')
        if (!response.ok) throw new Error('Failed to fetch affiliate stats')
        const statsData = await response.json()
        setStats(statsData.stats)

        // Fetch referrals
        const referralsResponse = await fetch('/api/affiliate/referrals')
        if (referralsResponse.ok) {
          const referralsData = await referralsResponse.json()
          setReferrals(referralsData.referrals)
        }

        // Fetch payouts
        const payoutsResponse = await fetch('/api/affiliate/payouts')
        if (payoutsResponse.ok) {
          const payoutsData = await payoutsResponse.json()
          setPayouts(payoutsData.payouts)
        }

        // Fetch referral links
        const linksResponse = await fetch('/api/affiliate/links')
        if (linksResponse.ok) {
          const linksData = await linksResponse.json()
          setReferralLinks(linksData.links)
        }

        // Fetch materials
        const materialsResponse = await fetch('/api/affiliate/materials')
        if (materialsResponse.ok) {
          const materialsData = await materialsResponse.json()
          setMaterials(materialsData.materials)
        }

      } catch (err: any) {
        setError(err.message || "An error occurred")
        console.error('Affiliate dashboard error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [getToken, isLoaded, isClerkLoaded, clerkUser?.id])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedLink(text)
      toast({ title: "Copied", description: "Referral link copied to clipboard!" })
      setTimeout(() => setCopiedLink(null), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'secondary' as const, icon: Clock },
      active: { variant: 'default' as const, icon: CheckCircle },
      converted: { variant: 'default' as const, icon: CheckCircle },
      paid: { variant: 'default' as const, icon: CheckCircle },
      failed: { variant: 'destructive' as const, icon: AlertCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const createNewLink = async () => {
    if (!newLinkName.trim()) return
    
    try {
      const response = await fetch('/api/affiliate/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newLinkName }),
      })
      
      if (!response.ok) throw new Error('Failed to create link')
      
      const data = await response.json()
      setReferralLinks(prev => [data.link, ...prev])
      setNewLinkName("")
      setShowCreateLink(false)
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading || !isClerkLoaded || !clerkUser?.id) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading affiliate dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Affiliate Program</h1>
          <p className="text-gray-600 mt-2">Earn 30% commission on every $60 subscription you refer</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats?.total_earnings || 0)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>Available: {formatCurrency(stats?.available_balance || 0)}</span>
                <span className="mx-2">•</span>
                <span>Pending: {formatCurrency(stats?.pending_balance || 0)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.total_referrals || 0}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>{stats?.active_referrals || 0} active</span>
                <span className="mx-2">•</span>
                <span>{stats?.converted_referrals || 0} converted</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats?.conversion_rate?.toFixed(1) || 0}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>{stats?.clicks || 0} clicks</span>
                <span className="mx-2">•</span>
                <span>{stats?.conversions || 0} conversions</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Request Payout Button */}
        <div className="mb-8 flex justify-end">
          <Button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
            onClick={() => setIsPayoutModalOpen(true)}
          >
            Request Payout
          </Button>
        </div>
        <PayoutRequestModal
          isOpen={isPayoutModalOpen}
          onClose={() => setIsPayoutModalOpen(false)}
          availableBalance={stats?.available_balance || 0}
        />

        {/* Main Content */}
        <Tabs defaultValue="links" className="space-y-6">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="links" className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              Referral Links
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Materials
            </TabsTrigger>
          </TabsList>

          {/* Referral Links Tab */}
          <TabsContent value="links" className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Your Referral Links</CardTitle>
                    <CardDescription>Share these links to earn 30% commission on subscriptions</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setShowCreateLink(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Link
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showCreateLink && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="linkName" className="text-sm font-medium">Link Name</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="linkName"
                        value={newLinkName}
                        onChange={(e) => setNewLinkName(e.target.value)}
                        placeholder="e.g., Blog Post, Social Media"
                        className="flex-1"
                      />
                      <Button onClick={createNewLink} disabled={!newLinkName.trim()}>
                        Create
                      </Button>
                      <Button variant="outline" onClick={() => setShowCreateLink(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {referralLinks.length === 0 ? (
                  <div className="text-center py-12">
                    <LinkIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No referral links yet</h3>
                    <p className="text-gray-600 mb-4">Create your first referral link to start earning commissions</p>
                    <Button onClick={() => setShowCreateLink(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Link
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {referralLinks.map((link) => (
                      <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-gray-900">Link: {link.link_code}</h4>
                              <Badge variant="outline" className="text-xs">
                                {link.clicks} clicks
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {link.conversions} conversions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                              {link.full_url}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(link.full_url)}
                            >
                              {copiedLink === link.full_url ? (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals" className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Your Referrals</CardTitle>
                <CardDescription>Track the people you've referred and their status</CardDescription>
              </CardHeader>
              <CardContent>
                {referrals.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No referrals yet</h3>
                    <p className="text-gray-600">Start sharing your referral links to see referrals here</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Potential Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {referrals.map((referral) => (
                        <TableRow key={referral.id}>
                          <TableCell className="font-medium">{referral.referred_email}</TableCell>
                          <TableCell>{getStatusBadge(referral.status)}</TableCell>
                          <TableCell>{formatDate(referral.created_at)}</TableCell>
                          <TableCell>
                            {referral.status === 'converted' ? (
                              <span className="text-green-600 font-medium">$18.00</span>
                            ) : (
                              <span className="text-gray-500">$0.00</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Materials Tab */}
          <TabsContent value="materials" className="space-y-6">
            <Card className="bg-white border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Marketing Materials</CardTitle>
                <CardDescription>Download and share these materials to promote Complitic</CardDescription>
              </CardHeader>
              <CardContent>
                {materials.length === 0 ? (
                  <div className="text-center py-12">
                    <Download className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No materials available</h3>
                    <p className="text-gray-600">Marketing materials will be available soon</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {materials.map((material) => (
                      <div key={material.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-1">{material.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                            <Badge variant="outline" className="text-xs">
                              {material.type}
                            </Badge>
                          </div>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Commission Info */}
        <Card className="bg-blue-50 border-blue-200 mt-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">How Commissions Work</h3>
                <p className="text-blue-800 mb-3">
                  Earn 30% commission on every $60 subscription you refer. That's $18 per successful referral!
                </p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Referral clicks are tracked automatically</li>
                  <li>• Commissions are paid when referrals subscribe</li>
                  <li>• Payouts are processed monthly</li>
                  <li>• Minimum payout threshold: $50</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

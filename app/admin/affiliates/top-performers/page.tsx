"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Crown, TrendingUp, DollarSign, Users, Star } from "lucide-react"

const topPerformers = [
  {
    id: "AF-001",
    name: "Sarah Johnson",
    email: "sarah@marketingpro.com",
    tier: "Platinum",
    rank: 1,
    referrals: 247,
    totalEarnings: 45620,
    thisMonth: 8340,
    conversionRate: 12.5,
    avatar: "/placeholder.svg?height=64&width=64",
    badge: "Top Performer",
  },
  {
    id: "AF-002",
    name: "Mike Chen",
    email: "mike@digitalagency.com",
    tier: "Platinum",
    rank: 2,
    referrals: 198,
    totalEarnings: 38940,
    thisMonth: 6890,
    conversionRate: 11.8,
    avatar: "/placeholder.svg?height=64&width=64",
    badge: "Rising Star",
  },
  {
    id: "AF-003",
    name: "Emma Wilson",
    email: "emma@consultancy.co",
    tier: "Gold",
    rank: 3,
    referrals: 156,
    totalEarnings: 28750,
    thisMonth: 4560,
    conversionRate: 10.2,
    avatar: "/placeholder.svg?height=64&width=64",
    badge: "Consistent Performer",
  },
  {
    id: "AF-004",
    name: "David Rodriguez",
    email: "david@techsolutions.com",
    tier: "Gold",
    rank: 4,
    referrals: 134,
    totalEarnings: 24890,
    thisMonth: 3890,
    conversionRate: 9.8,
    avatar: "/placeholder.svg?height=64&width=64",
    badge: "Quality Leader",
  },
  {
    id: "AF-005",
    name: "Lisa Thompson",
    email: "lisa@growthmarketing.io",
    tier: "Gold",
    rank: 5,
    referrals: 128,
    totalEarnings: 22340,
    thisMonth: 3450,
    conversionRate: 9.5,
    avatar: "/placeholder.svg?height=64&width=64",
    badge: "Growth Expert",
  },
]

export default function TopPerformersPage() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Trophy className="h-6 w-6 text-gray-400" />
      case 3:
        return <Medal className="h-6 w-6 text-amber-600" />
      default:
        return <Award className="h-6 w-6 text-blue-500" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-purple-100 text-purple-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Silver":
        return "bg-slate-100 text-slate-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Top Performer":
        return "bg-red-100 text-red-800"
      case "Rising Star":
        return "bg-blue-100 text-blue-800"
      case "Consistent Performer":
        return "bg-green-100 text-green-800"
      case "Quality Leader":
        return "bg-purple-100 text-purple-800"
      case "Growth Expert":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Top Performers</h1>
          <p className="text-slate-600 mt-2">Recognize and reward your highest-performing affiliates</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Star className="h-4 w-4 mr-2" />
            Send Recognition
          </Button>
          <Button>
            <Trophy className="h-4 w-4 mr-2" />
            Award Bonus
          </Button>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Earner</CardTitle>
            <Crown className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,620</div>
            <p className="text-xs text-muted-foreground">Sarah Johnson - All Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Sarah Johnson - All Time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Conversion</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
            <p className="text-xs text-muted-foreground">Sarah Johnson - Current</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month Leader</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,340</div>
            <p className="text-xs text-muted-foreground">Sarah Johnson - January</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>Top 5 performing affiliates based on overall performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {topPerformers.map((performer) => (
              <div key={performer.id} className="flex items-center space-x-4 p-4 rounded-lg border bg-slate-50">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-slate-200">
                  {getRankIcon(performer.rank)}
                </div>

                <Avatar className="h-12 w-12">
                  <AvatarImage src={performer.avatar || "/placeholder.svg"} alt={performer.name} />
                  <AvatarFallback>
                    {performer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{performer.name}</h3>
                    <Badge className={getTierColor(performer.tier)}>{performer.tier}</Badge>
                    <Badge className={getBadgeColor(performer.badge)}>{performer.badge}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{performer.email}</p>
                  <p className="text-xs text-muted-foreground">Affiliate ID: {performer.id}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{performer.referrals}</div>
                    <div className="text-xs text-muted-foreground">Referrals</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">${performer.totalEarnings.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Total Earnings</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">${performer.thisMonth.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">This Month</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">{performer.conversionRate}%</div>
                    <div className="text-xs text-muted-foreground">Conversion</div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button size="sm">View Details</Button>
                  <Button size="sm" variant="outline">
                    Send Reward
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recognition Program */}
      <Card>
        <CardHeader>
          <CardTitle>Recognition Program</CardTitle>
          <CardDescription>Reward and motivate your top performers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg border bg-gradient-to-br from-yellow-50 to-yellow-100">
              <Crown className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Hall of Fame</h3>
              <p className="text-sm text-muted-foreground mb-4">Recognize top performers with permanent recognition</p>
              <Button variant="outline" size="sm">
                Add to Hall of Fame
              </Button>
            </div>

            <div className="text-center p-6 rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100">
              <Star className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Bonus Rewards</h3>
              <p className="text-sm text-muted-foreground mb-4">Award special bonuses for exceptional performance</p>
              <Button variant="outline" size="sm">
                Award Bonus
              </Button>
            </div>

            <div className="text-center p-6 rounded-lg border bg-gradient-to-br from-green-50 to-green-100">
              <Trophy className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Tier Upgrades</h3>
              <p className="text-sm text-muted-foreground mb-4">Promote affiliates to higher commission tiers</p>
              <Button variant="outline" size="sm">
                Upgrade Tier
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

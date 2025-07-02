"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MoreHorizontal, TrendingUp, DollarSign, Users, Award, Filter, Download } from "lucide-react"
import { useState } from "react"

const affiliates = [
  {
    id: "AF-001",
    name: "Sarah Johnson",
    email: "sarah@marketingpro.com",
    status: "Active",
    tier: "Gold",
    referrals: 127,
    totalEarnings: 15420,
    thisMonth: 2340,
    joinDate: "2023-08-15",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "AF-002",
    name: "Mike Chen",
    email: "mike@digitalagency.com",
    status: "Active",
    tier: "Platinum",
    referrals: 89,
    totalEarnings: 12890,
    thisMonth: 1890,
    joinDate: "2023-09-22",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "AF-003",
    name: "Emma Wilson",
    email: "emma@consultancy.co",
    status: "Active",
    tier: "Silver",
    referrals: 45,
    totalEarnings: 6750,
    thisMonth: 890,
    joinDate: "2023-11-10",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "AF-004",
    name: "David Rodriguez",
    email: "david@techsolutions.com",
    status: "Inactive",
    tier: "Bronze",
    referrals: 23,
    totalEarnings: 3450,
    thisMonth: 0,
    joinDate: "2023-12-05",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "AF-005",
    name: "Lisa Thompson",
    email: "lisa@growthmarketing.io",
    status: "Active",
    tier: "Gold",
    referrals: 78,
    totalEarnings: 11670,
    thisMonth: 1560,
    joinDate: "2023-10-18",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function AffiliatesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredAffiliates = affiliates.filter(
    (affiliate) =>
      affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      affiliate.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Inactive":
        return "bg-gray-100 text-gray-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "bg-amber-100 text-amber-800"
      case "Silver":
        return "bg-slate-100 text-slate-800"
      case "Gold":
        return "bg-yellow-100 text-yellow-800"
      case "Platinum":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Affiliate Overview</h1>
          <p className="text-slate-600 mt-2">Monitor and manage your affiliate program</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Invite Affiliate
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+15.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">892</div>
            <p className="text-xs text-muted-foreground">71.5% of total affiliates</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89,432</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+22.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Gold tier and above</p>
          </CardContent>
        </Card>
      </div>

      {/* Affiliates Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Affiliates</CardTitle>
              <CardDescription>Manage your affiliate partners and their performance</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search affiliates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Referrals</TableHead>
                <TableHead>Total Earnings</TableHead>
                <TableHead>This Month</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAffiliates.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={affiliate.avatar || "/placeholder.svg"} alt={affiliate.name} />
                        <AvatarFallback>
                          {affiliate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{affiliate.name}</div>
                        <div className="text-sm text-muted-foreground">{affiliate.email}</div>
                        <div className="text-xs text-muted-foreground">{affiliate.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(affiliate.status)}>{affiliate.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTierColor(affiliate.tier)}>{affiliate.tier}</Badge>
                  </TableCell>
                  <TableCell>{affiliate.referrals}</TableCell>
                  <TableCell>${affiliate.totalEarnings.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={affiliate.thisMonth > 0 ? "text-green-600" : "text-gray-500"}>
                      ${affiliate.thisMonth.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Performance</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Process Payout</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Upgrade Tier</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Suspend Affiliate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

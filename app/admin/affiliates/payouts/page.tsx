"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Search, MoreHorizontal, DollarSign, Clock, CheckCircle, XCircle, Filter, Download } from "lucide-react"

const pendingPayouts = [
  {
    id: "PO-001",
    affiliateId: "AF-001",
    affiliateName: "Sarah Johnson",
    email: "sarah@marketingpro.com",
    amount: 2450,
    requestDate: "2024-01-18",
    dueDate: "2024-01-25",
    status: "Pending",
    paymentMethod: "PayPal",
    referrals: 12,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PO-002",
    affiliateId: "AF-002",
    affiliateName: "Mike Chen",
    email: "mike@digitalagency.com",
    amount: 1890,
    requestDate: "2024-01-17",
    dueDate: "2024-01-24",
    status: "Approved",
    paymentMethod: "Bank Transfer",
    referrals: 9,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PO-003",
    affiliateId: "AF-003",
    affiliateName: "Emma Wilson",
    email: "emma@consultancy.co",
    amount: 890,
    requestDate: "2024-01-16",
    dueDate: "2024-01-23",
    status: "Processing",
    paymentMethod: "PayPal",
    referrals: 4,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PO-004",
    affiliateId: "AF-004",
    affiliateName: "David Rodriguez",
    email: "david@techsolutions.com",
    amount: 1560,
    requestDate: "2024-01-15",
    dueDate: "2024-01-22",
    status: "Pending",
    paymentMethod: "Stripe",
    referrals: 7,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "PO-005",
    affiliateId: "AF-005",
    affiliateName: "Lisa Thompson",
    email: "lisa@growthmarketing.io",
    amount: 3200,
    requestDate: "2024-01-14",
    dueDate: "2024-01-21",
    status: "Overdue",
    paymentMethod: "Bank Transfer",
    referrals: 15,
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function PayoutsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayouts, setSelectedPayouts] = useState<string[]>([])

  const filteredPayouts = pendingPayouts.filter(
    (payout) =>
      payout.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payout.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Approved":
        return "bg-blue-100 text-blue-800"
      case "Processing":
        return "bg-purple-100 text-purple-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4" />
      case "Approved":
        return <CheckCircle className="h-4 w-4" />
      case "Processing":
        return <Clock className="h-4 w-4" />
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Overdue":
        return <XCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleSelectPayout = (payoutId: string) => {
    setSelectedPayouts((prev) => (prev.includes(payoutId) ? prev.filter((id) => id !== payoutId) : [...prev, payoutId]))
  }

  const handleSelectAll = () => {
    setSelectedPayouts(
      selectedPayouts.length === filteredPayouts.length ? [] : filteredPayouts.map((payout) => payout.id),
    )
  }

  const totalSelectedAmount = filteredPayouts
    .filter((payout) => selectedPayouts.includes(payout.id))
    .reduce((sum, payout) => sum + payout.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Pending Payouts</h1>
          <p className="text-slate-600 mt-2">Review and process affiliate commission payouts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          {selectedPayouts.length > 0 && (
            <Button>
              <CheckCircle className="h-4 w-4 mr-2" />
              Process Selected (${totalSelectedAmount.toLocaleString()})
            </Button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,890</div>
            <p className="text-xs text-muted-foreground">47 payout requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,340</div>
            <p className="text-xs text-muted-foreground">23 requests due</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$3,200</div>
            <p className="text-xs text-muted-foreground">5 overdue requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$8,450</div>
            <p className="text-xs text-muted-foreground">12 payments sent</p>
          </CardContent>
        </Card>
      </div>

      {/* Payouts Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Payout Requests</CardTitle>
              <CardDescription>Review and approve affiliate payout requests</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search payouts..."
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
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPayouts.length === filteredPayouts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Affiliate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayouts.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPayouts.includes(payout.id)}
                      onCheckedChange={() => handleSelectPayout(payout.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payout.avatar || "/placeholder.svg"} alt={payout.affiliateName} />
                        <AvatarFallback>
                          {payout.affiliateName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payout.affiliateName}</div>
                        <div className="text-sm text-muted-foreground">{payout.email}</div>
                        <div className="text-xs text-muted-foreground">{payout.affiliateId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">${payout.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">{payout.referrals} referrals</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payout.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(payout.status)}
                        <span>{payout.status}</span>
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>{payout.requestDate}</TableCell>
                  <TableCell>
                    <span className={payout.status === "Overdue" ? "text-red-600 font-medium" : ""}>
                      {payout.dueDate}
                    </span>
                  </TableCell>
                  <TableCell>{payout.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve Payout
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Affiliate</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit Amount</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Reject Request</DropdownMenuItem>
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

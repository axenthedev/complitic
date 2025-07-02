"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Search, MoreHorizontal, AlertTriangle, Ban, CheckCircle, Filter } from "lucide-react"

const flaggedUsers = [
  {
    id: "1",
    name: "Alex Thompson",
    email: "alex.thompson@suspicious.com",
    flagReason: "Suspicious Activity",
    flagDate: "2024-01-18",
    severity: "High",
    description: "Multiple failed login attempts from different IPs",
    status: "Under Review",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria.garcia@example.com",
    flagReason: "Payment Issues",
    flagDate: "2024-01-17",
    severity: "Medium",
    description: "Multiple chargebacks reported",
    status: "Suspended",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "3",
    name: "Robert Kim",
    email: "robert.kim@test.com",
    flagReason: "Policy Violations",
    flagDate: "2024-01-16",
    severity: "Low",
    description: "Generated inappropriate content in policies",
    status: "Warning Issued",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    name: "Jennifer Lee",
    email: "jennifer.lee@spam.com",
    flagReason: "Spam Reports",
    flagDate: "2024-01-15",
    severity: "High",
    description: "Multiple spam reports from other users",
    status: "Banned",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "5",
    name: "Michael Davis",
    email: "michael.davis@fake.com",
    flagReason: "Fake Information",
    flagDate: "2024-01-14",
    severity: "Medium",
    description: "Provided false business information",
    status: "Under Review",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function FlaggedUsersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = flaggedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.flagReason.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-orange-100 text-orange-800"
      case "Suspended":
        return "bg-red-100 text-red-800"
      case "Warning Issued":
        return "bg-yellow-100 text-yellow-800"
      case "Banned":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Flagged Users</h1>
          <p className="text-slate-600 mt-2">Review and manage users requiring attention</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <CheckCircle className="h-4 w-4 mr-2" />
            Bulk Review
          </Button>
          <Button variant="destructive">
            <Ban className="h-4 w-4 mr-2" />
            Bulk Suspend
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Flagged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">High Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Requires immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-xs text-muted-foreground">Pending investigation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">Cases closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Flagged Users Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Flagged Users</CardTitle>
              <CardDescription>Users requiring administrative review</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search flagged users..."
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
                <TableHead>User</TableHead>
                <TableHead>Flag Reason</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Flag Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium flex items-center">
                          {user.name}
                          <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                        </div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.flagReason}</div>
                      <div className="text-sm text-muted-foreground">{user.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getSeverityColor(user.severity)}>{user.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>{user.flagDate}</TableCell>
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
                          Review Case
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Full Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact User</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Issue Warning</DropdownMenuItem>
                        <DropdownMenuItem className="text-orange-600">Suspend Account</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
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

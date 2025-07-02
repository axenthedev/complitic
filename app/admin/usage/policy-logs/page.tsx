"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Bot, User, Zap, Search, Download } from "lucide-react"

const usageStats = [
  { title: "Total Policies Generated", value: "8,456", icon: FileText, color: "bg-blue-500" },
  { title: "AI Generated", value: "7,234", icon: Bot, color: "bg-green-500" },
  { title: "Manual Generated", value: "1,222", icon: User, color: "bg-orange-500" },
  { title: "Auto-Updated", value: "3,456", icon: Zap, color: "bg-purple-500" },
]

const policyLogs = [
  {
    id: "1",
    user: "Sarah Johnson",
    email: "sarah@example.com",
    store: "sarahs-store.myshopify.com",
    platform: "Shopify",
    policyType: "Privacy Policy",
    generatedBy: "AI",
    autoUpdated: true,
    timestamp: "2024-01-20 14:30:25",
    status: "Completed",
    processingTime: "2.3s",
    wordCount: 2456,
  },
  {
    id: "2",
    user: "Mike Chen",
    email: "mike@example.com",
    store: "mikesstore.com",
    platform: "WooCommerce",
    policyType: "Terms of Service",
    generatedBy: "AI",
    autoUpdated: false,
    timestamp: "2024-01-20 13:45:12",
    status: "Completed",
    processingTime: "3.1s",
    wordCount: 3200,
  },
  {
    id: "3",
    user: "Emma Davis",
    email: "emma@example.com",
    store: "emma-boutique.myshopify.com",
    platform: "Shopify",
    policyType: "Cookie Policy",
    generatedBy: "Manual",
    autoUpdated: false,
    timestamp: "2024-01-20 12:15:08",
    status: "Completed",
    processingTime: "45.2s",
    wordCount: 1800,
  },
  {
    id: "4",
    user: "Alex Rodriguez",
    email: "alex@example.com",
    store: "alexstore.com",
    platform: "WooCommerce",
    policyType: "Privacy Policy",
    generatedBy: "AI",
    autoUpdated: true,
    timestamp: "2024-01-20 11:20:33",
    status: "In Progress",
    processingTime: "1.8s",
    wordCount: 0,
  },
  {
    id: "5",
    user: "Lisa Wang",
    email: "lisa@example.com",
    store: "lisa-fashion.myshopify.com",
    platform: "Shopify",
    policyType: "Return Policy",
    generatedBy: "AI",
    autoUpdated: false,
    timestamp: "2024-01-20 10:55:17",
    status: "Failed",
    processingTime: "0.5s",
    wordCount: 0,
  },
]

export default function PolicyLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [generationFilter, setGenerationFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredLogs = policyLogs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.store.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || log.policyType.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesGeneration = generationFilter === "all" || log.generatedBy.toLowerCase() === generationFilter
    const matchesStatus = statusFilter === "all" || log.status.toLowerCase() === statusFilter

    return matchesSearch && matchesType && matchesGeneration && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Policy Generation Logs</h1>
        <p className="text-slate-600 mt-2">Monitor all policy generation activity and performance</p>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {usageStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.color}`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Policy Generation Activity</CardTitle>
              <CardDescription>Detailed logs of all policy generation requests</CardDescription>
            </div>
            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search by user or store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Policy type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="privacy">Privacy Policy</SelectItem>
                <SelectItem value="terms">Terms of Service</SelectItem>
                <SelectItem value="cookie">Cookie Policy</SelectItem>
                <SelectItem value="return">Return Policy</SelectItem>
              </SelectContent>
            </Select>
            <Select value={generationFilter} onValueChange={setGenerationFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Generation method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="ai">AI Generated</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Policy Logs Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User & Store</TableHead>
                <TableHead>Policy Type</TableHead>
                <TableHead>Generation</TableHead>
                <TableHead>Auto-Update</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{log.user}</div>
                      <div className="text-sm text-slate-600">{log.email}</div>
                      <div className="text-xs text-slate-500">{log.store}</div>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {log.platform}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{log.policyType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {log.generatedBy === "AI" ? (
                        <Bot className="h-4 w-4 text-green-500" />
                      ) : (
                        <User className="h-4 w-4 text-orange-500" />
                      )}
                      <span className="text-sm">{log.generatedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {log.autoUpdated ? (
                      <div className="flex items-center space-x-1">
                        <Zap className="h-4 w-4 text-purple-500" />
                        <span className="text-sm text-purple-600">Yes</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">No</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.status === "Completed"
                          ? "default"
                          : log.status === "In Progress"
                            ? "secondary"
                            : "destructive"
                      }
                      className={
                        log.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : log.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                      }
                    >
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Time: {log.processingTime}</div>
                      {log.wordCount > 0 && (
                        <div className="text-slate-600">Words: {log.wordCount.toLocaleString()}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

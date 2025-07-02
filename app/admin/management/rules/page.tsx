"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Shield, AlertTriangle, CheckCircle, Edit, Plus, Globe, Eye } from "lucide-react"

const ruleStats = [
  { title: "Active Rules", value: "156", icon: Shield, color: "bg-green-500" },
  { title: "Critical Rules", value: "23", icon: AlertTriangle, color: "bg-red-500" },
  { title: "Compliance Rate", value: "94.2%", icon: CheckCircle, color: "bg-blue-500" },
  { title: "Auto-Applied", value: "89%", icon: CheckCircle, color: "bg-purple-500" },
]

const complianceRules = [
  {
    id: "1",
    name: "GDPR Cookie Consent",
    category: "Privacy",
    jurisdiction: "EU",
    severity: "Critical",
    description: "Requires explicit consent for non-essential cookies",
    status: "Active",
    autoApply: true,
    affectedUsers: 3456,
    lastUpdated: "2024-01-15",
    triggers: ["Cookie detection", "EU visitor"],
    compliance: 96.8,
  },
  {
    id: "2",
    name: "CCPA Data Rights",
    category: "Privacy",
    jurisdiction: "California",
    severity: "High",
    description: "Must provide data deletion and opt-out rights",
    status: "Active",
    autoApply: true,
    affectedUsers: 2134,
    lastUpdated: "2024-01-12",
    triggers: ["California visitor", "Personal data collection"],
    compliance: 92.3,
  },
  {
    id: "3",
    name: "Return Policy Disclosure",
    category: "Consumer Protection",
    jurisdiction: "US",
    severity: "Medium",
    description: "Clear return policy must be displayed before purchase",
    status: "Active",
    autoApply: false,
    affectedUsers: 5678,
    lastUpdated: "2024-01-10",
    triggers: ["E-commerce store", "Product sales"],
    compliance: 88.7,
  },
  {
    id: "4",
    name: "Age Verification",
    category: "Content Restriction",
    jurisdiction: "Global",
    severity: "High",
    description: "Age verification required for restricted products",
    status: "Active",
    autoApply: true,
    affectedUsers: 890,
    lastUpdated: "2024-01-08",
    triggers: ["Age-restricted products", "Alcohol/tobacco sales"],
    compliance: 94.1,
  },
  {
    id: "5",
    name: "Accessibility Standards",
    category: "Accessibility",
    jurisdiction: "US",
    severity: "Medium",
    description: "WCAG 2.1 AA compliance for public websites",
    status: "Draft",
    autoApply: false,
    affectedUsers: 0,
    lastUpdated: "2024-01-05",
    triggers: ["Public website", "Government contract"],
    compliance: 0,
  },
]

const jurisdictions = [
  { name: "Global", count: 45, color: "bg-blue-500" },
  { name: "EU", count: 38, color: "bg-green-500" },
  { name: "US", count: 32, color: "bg-red-500" },
  { name: "California", count: 18, color: "bg-purple-500" },
  { name: "UK", count: 15, color: "bg-orange-500" },
  { name: "Canada", count: 8, color: "bg-pink-500" },
]

export default function ComplianceRulesPage() {
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [jurisdictionFilter, setJurisdictionFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredRules = complianceRules.filter((rule) => {
    const matchesCategory =
      categoryFilter === "all" || rule.category.toLowerCase().includes(categoryFilter.toLowerCase())
    const matchesJurisdiction =
      jurisdictionFilter === "all" || rule.jurisdiction.toLowerCase() === jurisdictionFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || rule.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesCategory && matchesJurisdiction && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Compliance Rule Engine</h1>
        <p className="text-slate-600 mt-2">Manage compliance rules and automated policy updates</p>
      </div>

      {/* Rule Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ruleStats.map((stat) => {
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

      {/* Jurisdiction Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="h-5 w-5" />
            <span>Rules by Jurisdiction</span>
          </CardTitle>
          <CardDescription>Distribution of compliance rules across jurisdictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {jurisdictions.map((jurisdiction, index) => (
              <div key={index} className="text-center p-3 border rounded-lg">
                <div className={`w-8 h-8 rounded-full ${jurisdiction.color} mx-auto mb-2`}></div>
                <div className="font-semibold text-slate-900">{jurisdiction.count}</div>
                <div className="text-sm text-slate-600">{jurisdiction.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rules Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Compliance Rules</CardTitle>
              <CardDescription>Configure and manage compliance rules</CardDescription>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Rule</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="privacy">Privacy</SelectItem>
                <SelectItem value="consumer">Consumer Protection</SelectItem>
                <SelectItem value="content">Content Restriction</SelectItem>
                <SelectItem value="accessibility">Accessibility</SelectItem>
              </SelectContent>
            </Select>
            <Select value={jurisdictionFilter} onValueChange={setJurisdictionFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                <SelectItem value="global">Global</SelectItem>
                <SelectItem value="eu">EU</SelectItem>
                <SelectItem value="us">US</SelectItem>
                <SelectItem value="california">California</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Rules Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Auto-Apply</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-slate-900">{rule.name}</div>
                      <div className="text-sm text-slate-600">{rule.description}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Affects {rule.affectedUsers.toLocaleString()} users
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{rule.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="text-sm">{rule.jurisdiction}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        rule.severity === "Critical"
                          ? "destructive"
                          : rule.severity === "High"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {rule.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={rule.autoApply} />
                  </TableCell>
                  <TableCell>
                    {rule.status === "Active" ? (
                      <div className="flex items-center space-x-2">
                        <div className="text-sm font-medium">{rule.compliance}%</div>
                        <div className="w-16 bg-slate-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${rule.compliance}%` }} />
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-500">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={rule.status === "Active" ? "default" : rule.status === "Draft" ? "secondary" : "outline"}
                    >
                      {rule.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Rule Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Rule Categories</CardTitle>
          <CardDescription>Overview of compliance rule categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg bg-blue-50 border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3 className="font-semibold text-blue-800">Privacy</h3>
              </div>
              <div className="text-2xl font-bold text-blue-600">45</div>
              <p className="text-sm text-blue-700">GDPR, CCPA, Privacy policies</p>
            </div>
            <div className="p-4 border rounded-lg bg-green-50 border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="font-semibold text-green-800">Consumer Protection</h3>
              </div>
              <div className="text-2xl font-bold text-green-600">32</div>
              <p className="text-sm text-green-700">Returns, warranties, disclosures</p>
            </div>
            <div className="p-4 border rounded-lg bg-orange-50 border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-orange-800">Content Restriction</h3>
              </div>
              <div className="text-2xl font-bold text-orange-600">28</div>
              <p className="text-sm text-orange-700">Age verification, restricted products</p>
            </div>
            <div className="p-4 border rounded-lg bg-purple-50 border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-5 w-5 text-purple-500" />
                <h3 className="font-semibold text-purple-800">Accessibility</h3>
              </div>
              <div className="text-2xl font-bold text-purple-600">15</div>
              <p className="text-sm text-purple-700">WCAG, ADA compliance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

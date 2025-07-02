"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, TrendingUp, Edit, Plus, Crown, Zap } from "lucide-react"

const planStats = [
  { title: "Total Revenue", value: "$45,678", icon: DollarSign, color: "bg-green-500", change: "+12.5%" },
  { title: "Active Subscriptions", value: "8,234", icon: Users, color: "bg-blue-500", change: "+8.2%" },
  { title: "Conversion Rate", value: "23.4%", icon: TrendingUp, color: "bg-purple-500", change: "+2.1%" },
  { title: "Churn Rate", value: "2.8%", icon: TrendingUp, color: "bg-red-500", change: "-0.5%" },
]

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    billingCycle: "month",
    subscribers: 6234,
    revenue: 0,
    features: ["5 policies per month", "Basic templates", "Email support", "Single store connection"],
    limits: {
      policies: 5,
      stores: 1,
      apiCalls: 1000,
      support: "Email",
    },
    status: "Active",
    conversionRate: 18.5,
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    billingCycle: "month",
    subscribers: 1890,
    revenue: 54810,
    features: [
      "Unlimited policies",
      "Advanced templates",
      "Priority support",
      "Multiple store connections",
      "Auto-updates",
      "Compliance scanning",
    ],
    limits: {
      policies: "Unlimited",
      stores: 10,
      apiCalls: 50000,
      support: "Priority",
    },
    status: "Active",
    conversionRate: 4.2,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    billingCycle: "month",
    subscribers: 110,
    revenue: 10890,
    features: [
      "Everything in Pro",
      "Custom templates",
      "Dedicated support",
      "Unlimited stores",
      "White-label options",
      "API access",
      "Custom integrations",
    ],
    limits: {
      policies: "Unlimited",
      stores: "Unlimited",
      apiCalls: "Unlimited",
      support: "Dedicated",
    },
    status: "Active",
    conversionRate: 0.7,
  },
]

const planUsage = [
  { plan: "Free", usage: 85, color: "bg-gray-500" },
  { plan: "Pro", usage: 65, color: "bg-blue-500" },
  { plan: "Enterprise", usage: 45, color: "bg-purple-500" },
]

export default function PlansPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Plans & Pricing</h1>
        <p className="text-slate-600 mt-2">Manage subscription plans, pricing, and billing</p>
      </div>

      {/* Plan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {planStats.map((stat) => {
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
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="default" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.change}
                  </Badge>
                  <p className="text-xs text-slate-600">vs last month</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Plan Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Distribution</CardTitle>
          <CardDescription>Subscriber distribution across plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {planUsage.map((plan, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-20 text-sm font-medium">{plan.plan}</div>
                <div className="flex-1">
                  <Progress value={plan.usage} className="h-3" />
                </div>
                <div className="text-sm text-slate-600 w-12 text-right">{plan.usage}%</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plans Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>Manage pricing tiers and features</CardDescription>
            </div>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Plan</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Pricing</TableHead>
                <TableHead>Subscribers</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Conversion</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {plan.name === "Enterprise" && <Crown className="h-4 w-4 text-purple-500" />}
                      {plan.name === "Pro" && <Zap className="h-4 w-4 text-blue-500" />}
                      <div>
                        <div className="font-medium text-slate-900">{plan.name}</div>
                        <div className="text-sm text-slate-600">{plan.features.length} features</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{plan.price === 0 ? "Free" : `$${plan.price}`}</div>
                      {plan.price > 0 && <div className="text-sm text-slate-600">per {plan.billingCycle}</div>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-center">
                      <div className="font-medium">{plan.subscribers.toLocaleString()}</div>
                      <div className="text-sm text-slate-600">subscribers</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-green-600">${plan.revenue.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{plan.conversionRate}%</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={plan.status === "Active" ? "default" : "secondary"}>{plan.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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

      {/* Plan Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Comparison</CardTitle>
          <CardDescription>Compare features across all plans</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Feature</th>
                  <th className="text-center py-3 px-4">Free</th>
                  <th className="text-center py-3 px-4">Pro</th>
                  <th className="text-center py-3 px-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Policies per month</td>
                  <td className="text-center py-3 px-4">5</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Store connections</td>
                  <td className="text-center py-3 px-4">1</td>
                  <td className="text-center py-3 px-4">10</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">API calls per month</td>
                  <td className="text-center py-3 px-4">1,000</td>
                  <td className="text-center py-3 px-4">50,000</td>
                  <td className="text-center py-3 px-4">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Auto-updates</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">Priority support</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium">White-label</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">❌</td>
                  <td className="text-center py-3 px-4">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Download, Calendar, TrendingUp, Check, Star, Receipt, Settings, Plus } from "lucide-react"

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const currentPlan = {
    name: "Pro",
    price: "$29",
    period: "month",
    features: [
      "All Free features",
      "GDPR & CCPA compliance",
      "Cookie consent banner",
      "Auto-updates",
      "3 store connections",
      "Priority support",
      "Return policy generator",
    ],
    usage: {
      stores: { current: 2, limit: 3 },
      policies: { current: 12, limit: "unlimited" },
      scans: { current: 8, limit: 20 },
    },
  }

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: ["Basic privacy policy", "Terms of service", "1 store connection", "Email support"],
      popular: false,
      current: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "month",
      description: "Most popular for growing stores",
      features: [
        "All Free features",
        "GDPR & CCPA compliance",
        "Cookie consent banner",
        "Auto-updates",
        "3 store connections",
        "Priority support",
        "Return policy generator",
      ],
      popular: true,
      current: true,
    },
    {
      name: "Business",
      price: "$79",
      period: "month",
      description: "For established businesses",
      features: [
        "All Pro features",
        "Unlimited store connections",
        "Custom policy templates",
        "Legal review service",
        "White-label options",
        "Dedicated account manager",
        "API access",
      ],
      popular: false,
      current: false,
    },
  ]

  const invoices = [
    {
      id: "INV-2024-001",
      date: "Jan 1, 2024",
      amount: "$29.00",
      status: "paid",
      plan: "Pro Plan",
      period: "Jan 2024",
    },
    {
      id: "INV-2023-012",
      date: "Dec 1, 2023",
      amount: "$29.00",
      status: "paid",
      plan: "Pro Plan",
      period: "Dec 2023",
    },
    {
      id: "INV-2023-011",
      date: "Nov 1, 2023",
      amount: "$29.00",
      status: "paid",
      plan: "Pro Plan",
      period: "Nov 2023",
    },
    {
      id: "INV-2023-010",
      date: "Oct 1, 2023",
      amount: "$29.00",
      status: "paid",
      plan: "Pro Plan",
      period: "Oct 2023",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">Billing & Plan</h1>
        <p className="text-slate-600">Manage your subscription, view usage, and download invoices.</p>
      </div>

      {/* Current Plan */}
      <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <Star className="h-5 w-5" />
              <span>Current Plan: {currentPlan.name}</span>
            </span>
            <Badge className="bg-white text-green-600">Active</Badge>
          </CardTitle>
          <CardDescription className="text-green-100">Your subscription renews on February 1, 2024</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{currentPlan.price}</div>
              <div className="text-green-100">per {currentPlan.period}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-green-100">Next billing</div>
              <div className="font-medium">Feb 1, 2024</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-green-100">Store Connections</div>
              <div className="text-xl font-bold">
                {currentPlan.usage.stores.current}/{currentPlan.usage.stores.limit}
              </div>
              <Progress
                value={(currentPlan.usage.stores.current / currentPlan.usage.stores.limit) * 100}
                className="mt-2 h-2 bg-white/20"
              />
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-green-100">Policies Generated</div>
              <div className="text-xl font-bold">{currentPlan.usage.policies.current}</div>
              <div className="text-xs text-green-100 mt-1">Unlimited</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="text-sm text-green-100">Compliance Scans</div>
              <div className="text-xl font-bold">
                {currentPlan.usage.scans.current}/{currentPlan.usage.scans.limit}
              </div>
              <Progress
                value={(currentPlan.usage.scans.current / currentPlan.usage.scans.limit) * 100}
                className="mt-2 h-2 bg-white/20"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="secondary" className="bg-white text-green-600 hover:bg-green-50">
              <Settings className="h-4 w-4 mr-2" />
              Manage Plan
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-600">This Month</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">$29.00</div>
            <div className="text-xs text-slate-500">Pro Plan</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-slate-600">Next Billing</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">Feb 1</div>
            <div className="text-xs text-slate-500">2024</div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-slate-600">Total Spent</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mt-2">$348</div>
            <div className="text-xs text-slate-500">Since Jan 2023</div>
          </CardContent>
        </Card>
      </div>

      {/* Available Plans */}
      <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>Choose the plan that best fits your business needs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative border-2 rounded-xl p-6 ${
                  plan.current
                    ? "border-green-500 bg-green-50"
                    : plan.popular
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white"
                } hover:shadow-lg transition-all duration-200`}
              >
                {plan.popular && !plan.current && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                )}
                {plan.current && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                    Current Plan
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-slate-800">{plan.price}</span>
                    <span className="text-slate-600 ml-2">/{plan.period}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.current
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : plan.popular
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                  disabled={plan.current}
                >
                  {plan.current ? "Current Plan" : `Upgrade to ${plan.name}`}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method & Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Payment Method</span>
            </CardTitle>
            <CardDescription>Manage your billing information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                  VISA
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-slate-600">Expires 12/25</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-800">Default</Badge>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Card
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Receipt className="h-5 w-5 text-purple-600" />
              <span>Recent Invoices</span>
            </CardTitle>
            <CardDescription>Download your billing history</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((invoice, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{invoice.id}</p>
                  <p className="text-xs text-slate-600">
                    {invoice.date} • {invoice.period}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-medium">{invoice.amount}</span>
                  <Badge className="bg-green-100 text-green-800">Paid</Badge>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full bg-transparent">
              View All Invoices
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

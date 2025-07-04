import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started",
    features: ["Basic privacy policy", "Terms of service", "1 store connection", "Email support"],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "per month",
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
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Business",
    price: "$49",
    period: "per month",
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
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your business. All plans include our core compliance features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border-2 hover:shadow-xl transition-all duration-200 ${
                plan.popular ? "border-green-500 shadow-lg scale-105" : "border-slate-200"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-slate-800 mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-800">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full py-3 font-semibold ${
                    plan.popular
                      ? "bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
                      : "bg-slate-800 hover:bg-slate-700 text-white"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
          <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
            <span>✓ Cancel anytime</span>
            <span>✓ 30-day money back guarantee</span>
            <span>✓ No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Link, MessageSquare, FileCheck } from "lucide-react"

const steps = [
  {
    icon: Link,
    title: "Connect Your Store",
    description: "Link your Shopify or WooCommerce store in seconds with our secure integration.",
  },
  {
    icon: MessageSquare,
    title: "Prompt the AI",
    description: "Describe your business needs and compliance requirements through our AI-powered questionnaire.",
  },
  {
    icon: FileCheck,
    title: "Get Legal Documents",
    description: "Receive fully generated, compliant legal policies tailored to your specific business needs.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get compliant in three simple steps. No legal expertise required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="border border-slate-200 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-300 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

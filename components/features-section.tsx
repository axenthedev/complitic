import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Globe, FileText, Cookie } from "lucide-react"

const features = [
  {
    icon: RefreshCw,
    title: "Auto Updates",
    description:
      "Your policies automatically update when regulations change, keeping you compliant without manual work.",
  },
  {
    icon: Globe,
    title: "Region-Specific Compliance",
    description: "Tailored policies for GDPR, CCPA, and other regional requirements based on your customer locations.",
  },
  {
    icon: FileText,
    title: "AI-Generated Legal Policies",
    description:
      "Advanced AI creates comprehensive, legally sound policies customized to your specific business needs.",
  },
  {
    icon: Cookie,
    title: "Cookie Consent Banner",
    description:
      "Fully compliant cookie consent management with automatic categorization and user preference tracking.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Everything You Need for Compliance</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive compliance tools that work automatically, so you can focus on growing your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

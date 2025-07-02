import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    store: "EcoStyle Boutique",
    avatar: "/placeholder.svg?height=40&width=40",
    quote:
      "Complitic saved us thousands in legal fees. Our policies update automatically and we never worry about compliance issues anymore.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    store: "TechGear Pro",
    avatar: "/placeholder.svg?height=40&width=40",
    quote:
      "The AI-generated policies are incredibly detailed and professional. Setup took less than 10 minutes and we were fully compliant.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    store: "Artisan Crafts Co",
    avatar: "/placeholder.svg?height=40&width=40",
    quote:
      "As a small business owner, I don't have time to track changing regulations. Complitic handles everything automatically.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">Trusted by 1,200+ Shopify Brands</h2>
          <p className="text-xl text-gray-600">See what store owners are saying about Complitic</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-slate-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.store}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

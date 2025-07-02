import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold mb-4">Complitic</h3>
            <p className="text-slate-300 mb-4 max-w-md">
              AI-powered compliance platform for Shopify and WooCommerce stores. Stay legally compliant, automatically.
            </p>
            <div className="text-sm text-slate-400">© 2024 Complitic. All rights reserved.</div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div className="mb-4 md:mb-0">Made with ❤️ for e-commerce entrepreneurs</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Status
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Blog
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

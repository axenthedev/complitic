import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Complitic Policy Maker",
  description:
    "AI-powered compliance policy generator for e-commerce businesses. Automatically generate privacy policies, terms of service, and cookie policies that comply with GDPR, CCPA, and other regulations.",
  keywords: ["compliance", "privacy policy", "GDPR", "CCPA", "e-commerce", "legal", "AI", "policy generator"],
  authors: [{ name: "Complitic Team" }],
  creator: "Complitic",
  publisher: "Complitic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://complitic.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Complitic Policy Maker - AI-Powered Compliance Solutions",
    description:
      "Generate compliant privacy policies, terms of service, and cookie policies for your e-commerce business with AI.",
    url: "https://complitic.com",
    siteName: "Complitic Policy Maker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Complitic Policy Maker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complitic Policy Maker - AI-Powered Compliance Solutions",
    description:
      "Generate compliant privacy policies, terms of service, and cookie policies for your e-commerce business with AI.",
    images: ["/og-image.png"],
    creator: "@complitic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

// Import FontAwesome CSS (this is needed for the icons to display properly)
import "@fortawesome/fontawesome-svg-core/styles.css"
// Configure FontAwesome to prevent auto-adding CSS
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false // Tell Font Awesome to skip adding CSS automatically

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Esabal Day Spa | Luxury Spa & Wellness Center",
  description: "Experience ultimate relaxation and rejuvenation at Esabal Day Spa. Book your spa treatment today.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/details-Y4KH5fMcksOdRtI3QRn53J9biqjDqF.jpeg",
        href: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/details-Y4KH5fMcksOdRtI3QRn53J9biqjDqF.jpeg",
      },
    ],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}

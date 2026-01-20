import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "@/styles/components/ui/globals.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "ShapeWebs | Introduce the magic back into software",
    template: "%s | ShapeWebs",
  },
  description: "ShapeWebs builds magical, high-performance web applications using modern technologies for growing businesses.",
  icons: {
    icon: "/favicon.svg",   // modern browsers
    apple: "/favicon.png",  // iOS devices
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="Fixed__mask__root__w0Cpa" aria-hidden="true"></div>
          <div className="layout__wrapper__H9k4s">
            <Header />
            <main className="layout__main__Z7j3p">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"


import './globals.css'
import { SidebarProvider } from "@/components/ui/sidebar"
import { ChatbotProvider } from "@/components/chatbot/chatbot-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { MainSidebar } from "@/components/main-sidebar"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Taxify- Play, Learn, Taxify!",
  description: "Interactive and gamified tax learning platform",
    generator: 'v0.dev'
}
SidebarProvider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <ChatbotProvider>
            <div className="flex min-h-screen w-full">
                <MainSidebar />
                <main className="flex-1 bg-gradient-to-b from-purple-500 to-blue-500 p-6">
                  {children}
                </main>
              </div>
              <Toaster />
            </ChatbotProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



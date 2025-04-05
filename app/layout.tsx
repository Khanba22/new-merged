import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatbotProvider } from "@/components/chatbot/chatbot-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { MainSidebar } from "@/components/main-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaxLearn - Learn Tax The Fun Way",
  description: "Interactive and gamified tax learning platform",
  generator: "v0.dev",
};
SidebarProvider;
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SidebarProvider>
            <ChatbotProvider>
              <div className="flex min-h-screen">
                <MainSidebar />
                <main className="flex-1 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 overflow-auto">
                  <AuthProvider>{children}</AuthProvider>
                </main>
              </div>
              <Toaster />
            </ChatbotProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import {
  BookOpen,
  Award,
  Lightbulb,
  Gift,
  ShoppingCart,
  User,
  Menu,
  ReceiptText,
  FileText,
  Calculator,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Badge } from "@/components/ui/badge"

export function MainSidebar() {
  const pathname = usePathname()
  const [userExp, setUserExp] = useState(505)
  const [streakDays, setStreakDays] = useState(1)
  const [gems, setGems] = useState(5)

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center space-x-2">
          <ReceiptText className="h-8 w-8 text-lime-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-lime-500 to-green-500 text-transparent bg-clip-text">
            TaxLearn
          </span>
        </Link>
      </SidebarHeader>

      <div className="flex justify-around px-2 py-3">
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white font-bold">{streakDays}</span>
          </div>
          <span className="ml-1 text-gray-300">Day</span>
        </div>
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">{userExp}</span>
          </div>
          <span className="ml-1 text-gray-300">XP</span>
        </div>
        <div className="flex items-center">
          <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-white font-bold">{gems}</span>
          </div>
          <span className="ml-1 text-gray-300">Gems</span>
        </div>
      </div>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/learn"}>
              <Link href="/learn">
                <BookOpen />
                <span>Learn</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/taxtrivia"}>
              <Link href="/taxtrivia">
                <FileText />
                <span>Tax Trivia</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/techterm"}>
              <Link href="/techterm">
                <Lightbulb />
                <span>Tech Term of the Day</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/leaderboard"}>
              <Link href="/leaderboard">
                <Award />
                <span>Leaderboard</span>
                <Badge className="ml-auto bg-purple-600">NEW</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/quests"}>
              <Link href="/quests">
                <Gift />
                <span>Quests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/calculator"}>
              <Link href="/calculator">
                <Calculator />
                <span>Tax Calculator</span>
                <Badge className="ml-auto bg-green-600">PRO</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/shop"}>
              <Link href="/shop">
                <ShoppingCart />
                <span>Shop</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/profile"}>
              <Link href="/profile">
                <User />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/more"}>
              <Link href="/more">
                <Menu />
                <span>More</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}


"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProblems } from "@/components/nav-problems"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { getProblems } from "@/features/supabase/problems"
import { User } from "@/contexts/UserContext"
import { Database } from '@/types/supabaseTypes'

type Props = {
  user: User;
  problems: Database['public']['Tables']['problems']['Row'][];
}

export function AppSidebar({ user, problems, ...props }: Props) {

  const userData = {
    name: user.display_name || "userName",
    email: user.email || "userEmail",
    avatar: user.avatar || "/avatars/default.jpg",
  }

  const data = {
    navMain: [
      {
        title: "ダッシュボード",
        url: "/dashboard",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "History", url: "#" },
          { title: "Starred", url: "#" },
          { title: "Settings", url: "#" },
        ],
      },
      {
        title: "問題生成",
        url: "/generate",
        icon: Bot,
        items: [
          { title: "Genesis", url: "#" },
          { title: "Explorer", url: "#" },
          { title: "Quantum", url: "#" },
        ],
      },
      {
        title: "問題一覧",
        url: "/problems",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
          { title: "Changelog", url: "#" },
        ],
      },
      {
        title: "設定",
        url: "/settings",
        icon: Settings2,
        items: [
          { title: "General", url: "#" },
          { title: "Team", url: "#" },
          { title: "Billing", url: "#" },
          { title: "Limits", url: "#" },
        ],
      },
    ],
    navSecondary: [
      { title: "サポート", url: "/support", icon: LifeBuoy },
      { title: "フィードバック", url: "/feedback", icon: Send },
    ],
    problems: [
      { name: "Design Engineering", url: "#", icon: Frame },
      { name: "Sales & Marketing", url: "#", icon: PieChart },
      { name: "Travel", url: "#", icon: Map },
    ],
  }

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">PhysicGen</span>
                  <span className="truncate text-xs">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProblems problems={problems} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
      <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  )
}

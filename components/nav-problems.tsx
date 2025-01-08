"use client"

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { getProblems } from "@/features/supabase/problems"
import { useEffect, useState } from "react"
import { useUser } from "@/contexts/UserContext"
//型を後で定義する（supabaseのやつでいいね）


export function NavProblems({
  problems,
}: {
  problems: any
}) {

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Problems</SidebarGroupLabel>
      <SidebarMenu>
        {/* 🥸 ページ遷移した時にリロードしてしまうの問題を修正する */}
        {/* {problems.map((item: any) => (
          <Button key={item.id}>{item.id}</Button>
        ))} */}
        <div className="text-sm text-red-600">💩ページ遷移した時にリロードしてしまうの問題を修正する💩</div>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <MoreHorizontal />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}

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

//型を後で定義する（supabaseのやつでいいね）


export function NavProblems({
}: {
}) {
  const { isMobile } = useSidebar()
  const [problems, setProblems] = useState([])

  useEffect(() => {
    const fetchProblems = async () => {
      const problems = await getProblems()
      setProblems(problems)
    }
    fetchProblems()
  }, [])

  console.log(problems)

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Problems</SidebarGroupLabel>
      <SidebarMenu>
        {problems.map((item) => (
          <Button key={item.id}>{item.id}</Button>
        ))}
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

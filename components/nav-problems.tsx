"use client"

import {
  Folder,
  MoreHorizontal,
  Share,
  Trash2,
  type LucideIcon,
  MoreVertical,
  Trash,
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
import { Database } from '@/types/supabaseTypes'
import Link from "next/link"
import { Badge } from "@/components/ui/badge"


export function NavProblems({
  problems,
}: {
  problems: Database['public']['Tables']['problems']['Row'][]
}) {
  const [showAll, setShowAll] = useState(false)
  const displayProblems = showAll ? problems : problems.slice(0, 4)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}.${month}.${day}`
  }


  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Problems</SidebarGroupLabel>
      <SidebarMenu>
        {displayProblems.map((item: any) => (
          <Link 
            key={item.id} 
            href={`/problems/${item.id}`} 
            className="w-full"
          >
            <Button variant="ghost" className="w-full flex justify-between items-center h-auto text-left p-2">
              <div className="w-full max-w-full overflow-hidden text-left gap-1">
                <span className="truncate block w-full text-left">
                  {item.question_title}
                </span>
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="text-[10px] font-normal rounded-md mt-1">
                    {item.units?.name || '不明な単元'}
                  </Badge>
                </div>
                <span className="text-[10px]">
                  {formatDate(item.created_at)}
                </span>
              </div>
              {/* エラー出るから後で実装する */}
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">メニューを開く</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem 
                    onClick={(e) => {
                      e.preventDefault()
                      // TODO: 削除処理を追加
                    }}
                    className="text-red-500 focus:text-red-500"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>削除</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </Button>
          </Link>
        ))}
        {problems.length > 4 && (
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setShowAll(!showAll)}>
              <MoreHorizontal />
              <span className="text-xs font-semibold">{showAll ? '閉じる' : 'More'}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  )
}

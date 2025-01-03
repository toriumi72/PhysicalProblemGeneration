'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bot, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Edit, Copy, Trash } from 'lucide-react'
import Link from "next/link"

interface CreatedProblem {
  id: number
  createdAt: string
  title: string
  unitName: string
  description?: string
}

export default function CreatedProblem({ 
  id,
  createdAt, 
  title, 
  unitName, 
  description 
}: CreatedProblem) {
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}.${month}.${day}`
  }

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <Link href={`/problems/${id}`}>
      <Card className="w-full transition-all hover:shadow-lg cursor-pointer">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-primary/10 p-2">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={handleDropdownClick}
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">メニューを開く</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleDropdownClick}>
                <Edit className="mr-2 h-4 w-4" />
                <span>編集</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDropdownClick}>
                <Copy className="mr-2 h-4 w-4" />
                <span>複製</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDropdownClick}>
                <Trash className="mr-2 h-4 w-4 text-red-500" />
                <span className="text-red-500">削除</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              {unitName}
            </p>
            <p className="text-xs text-muted-foreground">
              作成日: {formatDate(createdAt)}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


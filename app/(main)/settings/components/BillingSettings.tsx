"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function BillingSettings() {
  const router = useRouter()

  return (
    <div className="max-w-3xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>現在のプラン</CardTitle>
          <CardDescription>現在のプランと支払い情報を確認できます。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Pro プラン</h3>
              <p className="text-sm text-muted-foreground">¥800 / 月</p>
            </div>
            <Badge>現在のプラン</Badge>
          </div>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>無制限の問題生成</li>
            <li>優先サポート</li>
            <li>高度な分析機能</li>
          </ul>
          <div className="flex space-x-4">
            <Button variant="outline">プランを変更</Button>
            <Link
              href="/settings/subscription/cancel"
              className="text-destructive"
            >
              <Button variant="outline">プランを解約</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>支払い方法</CardTitle>
          <CardDescription>登録されているクレジットカード情報です。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md" />
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">有効期限: 12/2025</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline">支払い方法を変更</Button>
            <Button variant="outline">請求履歴を表示</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


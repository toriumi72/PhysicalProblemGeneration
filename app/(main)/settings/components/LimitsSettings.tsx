"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LimitsSettings() {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>利用状況</CardTitle>
          <CardDescription>現在の利用状況と制限を確認できます。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>問題生成回数</span>
              <span>150 / 200</span>
            </div>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground">今月の残り利用可能回数: 50回</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>ストレージ使用量</span>
              <span>2.5GB / 5GB</span>
            </div>
            <Progress value={50} className="h-2" />
            <p className="text-xs text-muted-foreground">残り利用可能容量: 2.5GB</p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">利用制限について</h4>
            <p className="text-sm text-muted-foreground">
              プランをアップグレードすることで、より多くの問題生成回数とストレージ容量を利用できます。
              現在の制限に近づいている場合は、プランのアップグレードをご検討ください。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


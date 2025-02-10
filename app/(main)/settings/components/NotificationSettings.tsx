"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

export function NotificationSettings() {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>通知設定</CardTitle>
          <CardDescription>通知の受け取り方を設定します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span className="font-medium">メール通知</span>
              <span className="font-normal text-sm text-muted-foreground">
                重要な更新やお知らせをメールで受け取ります。
              </span>
            </Label>
            <Switch id="email-notifications" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
              <span className="font-medium">プッシュ通知</span>
              <span className="font-normal text-sm text-muted-foreground">ブラウザのプッシュ通知を受け取ります。</span>
            </Label>
            <Switch id="push-notifications" />
          </div>
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
              <span className="font-medium">SMS通知</span>
              <span className="font-normal text-sm text-muted-foreground">緊急の通知をSMSで受け取ります。</span>
            </Label>
            <Switch id="sms-notifications" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


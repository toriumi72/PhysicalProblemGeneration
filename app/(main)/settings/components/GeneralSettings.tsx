"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload } from "lucide-react"
import { useState, useRef } from "react"
import { Separator } from "@/components/ui/separator"


export function GeneralSettings() {
  const [avatar, setAvatar] = useState("")
  
  // ファイル入力への参照を作成
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // ファイル選択ダイアログを開く関数
  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click()
  }
  
  // ファイルが選択されたときの処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // FileReaderを使用して画像をData URLに変換
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatar(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-3xl space-y-6">
      <Card className="">
        <CardHeader className="">
          <CardTitle>プロフィール設定</CardTitle>
          <CardDescription>プロフィール情報を更新します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatar} />
              <AvatarFallback>ユ</AvatarFallback>
            </Avatar>
            <div>
              {/* 非表示のファイル入力 */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleAvatarButtonClick}
              >
                <Upload className="h-4 w-4" />
                画像を変更
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-rows-2">
            <div className="space-y-2">
              <Label htmlFor="name">表示名</Label>
              <Input id="name" defaultValue="ユーザー名" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" type="email" defaultValue="user@example.com" />
            </div>
          </div>
          <Button>変更を保存</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card className="">
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
          <CardDescription>アカウントのパスワードを変更します。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">現在のパスワード</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">新しいパスワード</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">パスワードの確認</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button variant="outline">パスワードを変更</Button>
        </CardContent>
      </Card>
    </div>
  )
}


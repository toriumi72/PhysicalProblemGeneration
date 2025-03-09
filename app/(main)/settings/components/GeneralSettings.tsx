"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, Loader2 } from "lucide-react"
import { useState, useRef } from "react"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import { uploadUserAvatar, updateUserAvatar, updateUserData } from "@/features/supabase/users"

export function GeneralSettings() {
  const user = useUser()
  const [avatar, setAvatar] = useState(user.avatar || "/placeholder.svg?height=100&width=100")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)
  
  // ファイル選択ダイアログを開く関数
  const handleAvatarButtonClick = () => {
    fileInputRef.current?.click()
  }
  
  // ファイルが選択されたときの処理
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    // ファイルを状態に保存
    setSelectedFile(file)
    
    // ファイルをプレビュー表示用にData URLとして読み込む
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setAvatar(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }
  
  // 変更を保存するときの処理
  const handleSaveChanges = async () => {
    setIsUploading(true);

    try {
      // 変更内容を格納するオブジェクト
      const updates: Record<string, any> = {};
      
      // 名前の変更を確認
      const newName = nameInputRef.current?.value;
      if (newName && newName !== user.display_name) {
        updates.display_name = newName;
      }
      
      // アバター画像の変更があれば処理
      if (selectedFile) {
        // アバター画像をアップロード
        const avatarUrl = await uploadUserAvatar(user.id, selectedFile, user.avatar);
        updates.avatar = avatarUrl;
      }
      
      // 何か変更があれば更新
      if (Object.keys(updates).length > 0) {
        // 全ての変更をまとめて一度に更新
        await updateUserData(updates);
        toast.success('プロフィール情報が更新されました');
        
        // ファイル選択をリセット
        setSelectedFile(null);
        
        // 更新が完了したらページをリロード
        // これによりUserContextも最新の情報に更新される
        setTimeout(() => {
          window.location.reload();
        }, 1000); // トーストメッセージが表示される時間を考慮して少し遅延
      } else {
        toast.info('変更はありませんでした');
      }
    } catch (error: any) {
      console.error('更新エラー:', error);
      toast.error('変更の保存に失敗しました: ' + error.message);
      
      // エラー時は元の画像に戻す
      if (selectedFile) {
        setAvatar(user.avatar || "/placeholder.svg?height=100&width=100");
      }
    } finally {
      setIsUploading(false);
    }
  };

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
              {selectedFile && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedFile.name} が選択されています
                </p>
              )}
            </div>
          </div>
          <div className="gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">表示名</Label>
              <Input id="name" defaultValue={user.display_name} ref={nameInputRef} />
            </div>
          </div>
          <Button 
            onClick={handleSaveChanges} 
            disabled={isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                保存中...
              </>
            ) : '変更を保存'}
          </Button>
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


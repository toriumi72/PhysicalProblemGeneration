'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function CancelSubscription() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleCancel = async () => {
    setIsLoading(true)

    const cancelPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch('/api/stripe/cancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscriptionId: 'sub_1Qqo5OQ3ZMuN4zzeb9VJbGpm' // ここは実際のサブスクリプションIDに置き換える必要があります
          }),
        })

        if (!response.ok) {
          throw new Error('解約処理に失敗しました')
        }

        resolve('解約が完了しました')
        router.push('/settings')
      } catch (error) {
        reject(error)
      } finally {
        setIsLoading(false)
      }
    })

    toast.promise(cancelPromise, {
      loading: '処理中...',
      success: '解約が完了しました',
      error: 'エラーが発生しました'
    })
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>サブスクリプション解約</CardTitle>
          <CardDescription>
            解約後も現在の請求期間の終わりまでは機能をご利用いただけます
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-medium">解約後の変更点：</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>無制限の問題生成が制限されます</li>
              <li>高度な分析機能が利用できなくなります</li>
              <li>優先サポートが終了します</li>
            </ul>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => router.back()}
            >
              キャンセル
            </Button>
            <Button
              variant="destructive"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  処理中...
                </>
              ) : (
                '解約する'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
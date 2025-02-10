"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import CheckoutButton from "@/components/stripe/Checkout"
export default function PricingTable() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">アップグレードでより多くの機能を</h2>
        <p className="text-muted-foreground">プロプランで全ての機能をご利用いただけます</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>お試し利用</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">¥0</span>
              <span className="text-muted-foreground ml-1">/月</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>基本機能の利用</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>10問までの生成</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>コミュニティサポート</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              現在のプラン
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="relative border-primary">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
            おすすめ
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>ビジネス利用に最適</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">¥798</span>
              <span className="text-muted-foreground ml-1">/月</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>全ての機能を利用可能</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>無制限の問題生成</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>優先サポート</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>高度な分析機能</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-primary" />
                <span>カスタマイズ可能なワークフロー</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <CheckoutButton 
              productId="prod_Rk07U7cc8QpQcw" 
              buttonText="プロにアップグレード" 
              className="w-full" 
            />
          </CardFooter>
        </Card>
      </div>

      {/* <div className="mt-8 text-center text-sm text-muted-foreground">
        すべてのプランは14日間の無料トライアル付き。いつでもキャンセル可能です。
      </div> */}
    </div>
  )
}


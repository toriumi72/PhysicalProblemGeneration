import { Construction } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function UnderConstruction() {
  return (
    <div className="flex-1 space-y-4">
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[400px] text-muted-foreground">
          <Construction className="w-12 h-12 mb-4" />
          <h2 className="text-xl font-medium mb-2">このページは現在作成中です</h2>
          <p className="text-center max-w-md">
            申し訳ありませんが、この機能はまだ開発中です。<br/>完成までしばらくお待ちください。
          </p>
        </CardContent>
      </Card>
    </div>
  )
}


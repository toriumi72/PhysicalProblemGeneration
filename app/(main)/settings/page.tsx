import UnderConstruction from "@/components/underConstruction"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function Page() {
  return (
    <div>
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">一般設定</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
          <TabsTrigger value="billing">支払い設定</TabsTrigger>
          <TabsTrigger value="limits">利用制限</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          一般設定
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          通知設定
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          支払い設定
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          利用制限
        </TabsContent>
      </Tabs>
    </div>
  )
}

import UnderConstruction from "@/components/underConstruction"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { GeneralSettings } from "./components/GeneralSettings"
import { NotificationSettings } from "./components/NotificationSettings"
import { BillingSettings } from "./components/BillingSettings"
import { LimitsSettings } from "./components/LimitsSettings"

export default function Page() {
  return (
    <div>
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">一般設定</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
          <TabsTrigger value="billing">支払い設定</TabsTrigger>
          <TabsTrigger value="limits">利用状況</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <GeneralSettings />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <BillingSettings />
        </TabsContent>

        <TabsContent value="limits" className="space-y-6">
          <LimitsSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

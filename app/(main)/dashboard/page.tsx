"use client"

import UnderConstruction from "@/components/underConstruction"
import { useUser } from "@/contexts/UserContext";

export default function Page() {
  const user = useUser();

  return (
    // <div className="flex flex-1 flex-col gap-4">
    //   <div className="grid auto-rows-min gap-4 md:grid-cols-3">
    //     <div className="aspect-video rounded-xl bg-muted/50" />
    //     <div className="aspect-video rounded-xl bg-muted/50" />
    //     <div className="aspect-video rounded-xl bg-muted/50" />
    //   </div>
    //   <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    // </div>
    <div>
      <UnderConstruction />
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  )
}

"use client";

import "@/app/globals.css";
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PageTitle } from "@/components/PageTitle";
import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useProblems } from "@/contexts/ProblemsContext";
import { getProblems } from "@/features/supabase/problems";
// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // グローバル変数からユーザー情報を取得
  const user = useUser();
  const problems = useProblems();

  return (
    <SidebarProvider>
      <AppSidebar user={user} problems={problems} />
      <SidebarInset>
        <Header />
        <div className="p-4 pt-16">
          <PageTitle />
          {children}
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/sonner"
import { createClient } from "@/utils/supabase/server";
import { useEffect, useState } from "react";
import { ReactNode } from 'react'
import { UserContext, User } from '@/contexts/UserContext'
import { UserProvider } from '@/components/providers/UserProvider'
import ProblemsProvider from '@/components/providers/ProblemsProvider'
import { getProblems } from "@/features/supabase/problems";

type RootLayoutProps = {
  children: ReactNode
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const supabase = await createClient();

  const {
    data,
  } = await supabase.auth.getUser();

  const user = {
    id: data?.user?.id ?? "",
    aud: data?.user?.aud ?? "",
    role: data?.user?.role ?? "",
    email: data?.user?.email ?? "",
    last_sign_in_at: data?.user?.last_sign_in_at ?? "",
    created_at: data?.user?.created_at ?? "",
    updated_at: data?.user?.updated_at ?? "",
    is_anonymous: data?.user?.is_anonymous ?? false,
    display_name: data?.user?.user_metadata?.display_name ?? "",
    is_pro: data?.user?.user_metadata?.is_pro ?? false,
    avatar_url: data?.user?.user_metadata?.avatar_url ?? "",
  }

  console.log(user)

  const problems = await getProblems(user.id)


  return (
    <html lang="ja" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <UserProvider initialUser={user}>
          <ProblemsProvider problems={problems}>
            <main>{children}</main>
          </ProblemsProvider>
          <Toaster richColors closeButton />
        </UserProvider>
      </body>
    </html>
  );
}

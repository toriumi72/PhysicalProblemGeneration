import { createClient } from "@/utils/supabase/server";
import Link from 'next/link'
import { redirect } from 'next/navigation';

export default async function Index() {
  redirect("/dashboard");
  return (
    <>
    </>
  );
}

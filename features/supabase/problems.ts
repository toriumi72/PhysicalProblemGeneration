import { createClient } from "@/utils/supabase/client";
import { Database } from '@/types/supabaseTypes'

export async function addProblem(problem: Database['public']['Tables']['problems']['Insert']) {

  const supabase = createClient()
  const { data, error } = await supabase.from('problems').insert(problem)
  
  if (error) {
    throw new Error(error.message)
  }
  return data
}
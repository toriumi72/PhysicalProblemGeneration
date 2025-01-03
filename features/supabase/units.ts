import { createClient } from "@/utils/supabase/server";

export async function getUnits() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('units').select('*')

  if (error) {
    throw new Error(error.message)
  }
  return data
} 

export const getUnit = async (id: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase.from('units').select('*').eq('id', id).single()
  if (error) {
    throw new Error(error.message)
  }
  return data
}
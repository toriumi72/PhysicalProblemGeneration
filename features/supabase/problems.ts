import { createClient } from "@/utils/supabase/client";
import { Database } from '@/types/supabaseTypes'

type GetProblemOptions = {
  id?: string;
  generationRequestId?: string;
}

export async function addProblem(problem: Database['public']['Tables']['problems']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase.from('problems').insert(problem)
  
  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getProblem = async (options: GetProblemOptions) => {
  const supabase = createClient()
  const query = supabase
    .from('problems')
    .select(`
      *,
      units:unit_id (
        id,
        name,
        description
      )
    `)

  if (options.id) {
    query.eq('id', options.id)
  } else if (options.generationRequestId) {
    query.eq('generation_request_id', options.generationRequestId)
  } else {
    throw new Error('Either id or generationRequestId must be provided')
  }

  const { data, error } = await query.single()

  if (error) {
    throw new Error(error.message)
  }
  return data
}

export const getProblems = async () => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('problems')
    .select(`
      *,
      units:unit_id (
        id,
        name,
        description
      )
    `)
    .order('created_at', { ascending: false })
  if (error) {
    throw new Error(error.message)
  }
  return data
}
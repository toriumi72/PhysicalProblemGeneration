import { createClient } from "@/utils/supabase/client";
import { Database } from '@/types/supabaseTypes'

const test: Database['public']['Tables']['problems']['Insert'] = {
  unit_id: 1,
  difficulty_id: 1,
  question_title: 'test',
  question_text: 'test',
  step_titles: ['test', 'test', 'test'],
  step_explanations: ['test', 'test', 'test'],
  final_answer_text: 'test',
  final_answer_equation: 'test',
  hints: ['test', 'test', 'test'],
}


export async function addProblem(problem: Database['public']['Tables']['problems']['Insert']) {

  const supabase = createClient()
  const { data, error } = await supabase.from('problems').insert(problem)
  
  if (error) {
    throw new Error(error.message)
  }
  return data
}
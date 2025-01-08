import { createClient } from "@/utils/supabase/client";
import { Database } from '@/types/supabaseTypes'

type GetProblemOptions = {
  id?: string;
  generationRequestId?: string;
}

// 個別
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

export const deleteProblem = async (id: number) => {
  const supabase = createClient()

  // トランザクション的に順番に削除を実行
  try {
    // 🥸user_problem_attemptsの処理書いたら追加
    // 1. user_problem_attemptsの削除
    // const { error: attemptsError } = await supabase
    //   .from('user_problem_attempts')
    //   .delete()
    //   .eq('problem_id', id)
    
    // if (attemptsError) throw attemptsError

    // 2. problemsテーブルから削除
    const { error: problemError } = await supabase
      .from('problems')
      .delete()
      .eq('id', id)

    if (problemError) throw problemError

    return { success: true }
  } catch (error) {
    console.error('Problem deletion error:', error)
    throw error
  }
}

// 複数
export const getProblems = async (userId?: string) => {
  const supabase = createClient()
  
  if (!userId) {
    return [] // ユーザーIDがない場合は空配列を返す
  }

  // ユーザーのproblem_generation_requestsのIDを取得
  const { data: requestIds } = await supabase
    .from('problem_generation_requests')
    .select('id')
    .eq('user_id', userId)
  
  // 取得したIDの配列を作成
  const ids = requestIds?.map(request => request.id) || []
  
  // そのIDに関連する問題を取得
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
    .in('generation_request_id', ids)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }
  return data
}
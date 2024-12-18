import { createClient } from "@/utils/supabase/client";
import { User } from "@/contexts/UserContext";
import { Database } from '@/types/supabaseTypes'

interface Unit {
  id: number
  name: string
  description: string
}

export async function createProblemGenerationRequest(user: User, currentUnit: Unit, data: any) {
  const supabase = createClient();
  const { data: requestData, error: requestError } = await supabase
    .from('problem_generation_requests')
    .insert({
      user_id: user?.id,
      difficulty_id: 1,
      question_count: 1,
      request_params: { unit: currentUnit },
      response_metadata: data
    })
    .select()
    .single();

  if (requestError) {
    console.error('リクエスト保存エラー:', requestError);
    throw new Error('リクエストの保存に失敗しました');
  }

  return requestData;
}

export async function saveProblemGenerationRequestUnit(requestId: number, unitId: number) {
  const supabase = createClient();
  const { error: unitError } = await supabase
    .from('problem_generation_request_units')
    .insert({ problem_generation_request_id: requestId, unit_id: unitId });

  if (unitError) {
    console.error('単元紐付けエラー:', unitError);
    throw new Error('単元の紐付けに失敗しました');
  }
}
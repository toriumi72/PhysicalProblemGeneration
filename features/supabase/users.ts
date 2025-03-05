import { createClient } from '@/utils/supabase/client';

export async function getUserData(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error('ユーザーデータの取得に失敗しました: ' + error.message);
  }
  console.log("user data" + data)
  return data;
} 
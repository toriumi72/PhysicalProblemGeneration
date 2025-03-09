import { createClient } from '@/utils/supabase/client';

/**
 * ユーザーデータをAuthメタデータから取得する関数
 * @returns ユーザーのメタデータ情報
 */
export async function getUserData() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error('ユーザーデータの取得に失敗しました: ' + error.message);
  }
  
  if (!user) {
    throw new Error('ユーザーが見つかりませんでした');
  }

  // メタデータを返す
  return user.user_metadata || {};
}

/**
 * ユーザー情報をメタデータに更新する関数
 * @param userData 更新するユーザーデータ
 */
export async function updateUserData(userData: Record<string, any>): Promise<void> {
  const supabase = createClient();
  
  const { error } = await supabase.auth.updateUser({
    data: userData
  });
  
  if (error) {
    throw new Error('ユーザープロファイルの更新に失敗しました: ' + error.message);
  }
}

/**
 * ユーザーのアバター画像をアップロードする関数
 * 既存の画像がある場合は削除してから新しい画像をアップロードします
 * @param userId ユーザーID
 * @param file アップロードする画像ファイル
 * @param currentAvatarUrl 現在のアバターURL（あれば）
 * @returns アップロードされた画像の公開URL
 */
export async function uploadUserAvatar(
  userId: string, 
  file: File, 
  currentAvatarUrl?: string
): Promise<string> {
  const supabase = createClient();
  
  // 既存のアバター画像がある場合は削除
  if (currentAvatarUrl) {
    try {
      // URLからユーザーIDとファイル名部分を抽出
      const urlParts = currentAvatarUrl.split('/avatars/');
      if (urlParts.length > 1) {
        // 'avatars/' の後ろの部分を取得し、クエリパラメータがあれば削除
        const pathPart = urlParts[1].split('?')[0];
        console.log('削除するファイルパス:', pathPart);
        
        // 古いファイルを削除
        const { error: deleteError } = await supabase.storage
          .from('avatars')
          .remove([pathPart]);
          
        if (deleteError) {
          console.error('古いアバター画像の削除に失敗しました:', deleteError);
        }
      }
    } catch (error) {
      console.error('古いアバター画像の削除処理中にエラーが発生:', error);
    }
  }
  
  // ファイル拡張子を取得
  const fileExt = file.name.split('.').pop();
  // ランダムなファイル名を生成
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  // ポリシーに合わせたファイルパス
  const filePath = `${userId}/${fileName}`;
  
  // ファイルをストレージにアップロード
  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file);
    
  if (uploadError) {
    throw new Error('画像のアップロードに失敗しました: ' + uploadError.message);
  }
  
  // アップロードしたファイルの公開URLを取得
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath);
  
  return publicUrl;
}

/**
 * ユーザープロファイルのアバターURLを更新する関数
 * @param avatarUrl アバターの公開URL
 */
export async function updateUserAvatar(avatarUrl: string): Promise<void> {
  // updateUserDataを使用してアバターを更新
  return updateUserData({ avatar: avatarUrl });
} 
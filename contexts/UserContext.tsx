"use client"

import { createContext, useContext } from 'react'

// ユーザー情報の型定義
export interface User {
  id: string,
  aud: string,
  role: string,
  email: string,
  last_sign_in_at: string,
  created_at: string,
  updated_at: string,
  is_anonymous: boolean,
  display_name: string,
  is_pro: boolean, // users テーブルから取得するカスタム情報
}

// デフォルト値を持つUserContextを作成
export const UserContext = createContext<User | null>(null)

// カスタムフックでUserContextを利用しやすくする
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser は UserProvider 内で使用してください")
  }
  return context
}
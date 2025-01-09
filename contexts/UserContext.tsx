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
}

// デフォルト値を持つUserContextを作成
export const UserContext = createContext<User>({
  id: '',
  aud: '',
  role: '',
  email: '',
  last_sign_in_at: '',
  created_at: '',
  updated_at: '',
  is_anonymous: false,
  display_name: '',
})

// カスタムフックでUserContextを利用しやすくする
export const useUser = (): User => {
  return useContext(UserContext)
}
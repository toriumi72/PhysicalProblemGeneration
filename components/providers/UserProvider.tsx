'use client'

import React, { useEffect, useState } from "react";
import { User, UserContext } from "@/contexts/UserContext";
import { getUserData } from "@/features/supabase/users";

interface UserProviderProps {
  initialUser: User;
  children: React.ReactNode;
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  const [user, setUser] = useState<User>(initialUser);

  useEffect(() => {
    (async () => {
      try {
        if (user.id) {
          // ここでユーザーテーブルからカスタムデータ（例：is_pro）を取得
          const customData = await getUserData(user.id);

          setUser({
            ...user,
            is_pro: customData.is_pro,
            // 他のカスタムフィールドがあればここで統合
          });
        }
      } catch (error) {
        console.error("追加のユーザーデータ取得エラー:", error);
      }
    })();
  }, [user.id]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
} 
'use client'

import React, { useEffect, useState } from "react";
import { User, UserContext } from "@/contexts/UserContext";
import { getUserData } from "@/features/supabase/users";

interface UserProviderProps {
  initialUser: User;
  children: React.ReactNode;
}

export function UserProvider({ initialUser, children }: UserProviderProps) {
  console.log(initialUser);
  return <UserContext.Provider value={initialUser}>{children}</UserContext.Provider>;
} 
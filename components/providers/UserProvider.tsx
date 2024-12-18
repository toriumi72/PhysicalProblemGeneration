'use client'

import { ReactNode } from 'react'
import { UserContext, User } from '@/contexts/UserContext'

interface UserProviderProps {
  user: User
  children: ReactNode
}

export default function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
} 
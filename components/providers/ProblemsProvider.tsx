'use client'

import { ProblemsContext } from '@/contexts/ProblemsContext'
import { Database } from '@/types/supabaseTypes'
import { ReactNode } from 'react'

interface ProblemsProviderProps {
  problems: Database['public']['Tables']['problems']['Row'][]
  children: ReactNode
}

export default function ProblemsProvider({ problems, children }: ProblemsProviderProps) {
  return (
    <ProblemsContext.Provider value={problems}>
      {children}
    </ProblemsContext.Provider>
  )
}

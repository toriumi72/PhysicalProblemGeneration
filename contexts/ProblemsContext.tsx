"use client"

import { createContext, useContext } from 'react'
import { Database } from '@/types/supabaseTypes'

export const ProblemsContext = createContext<Database['public']['Tables']['problems']['Row'][]>([])

export const useProblems = (): Database['public']['Tables']['problems']['Row'][] => {
  return useContext(ProblemsContext)
}
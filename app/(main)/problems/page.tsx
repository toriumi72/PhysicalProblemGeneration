'use client'

import { getProblems } from '@/features/supabase/problems'
import CreatedProblem from './components/CreatedProblem'
import { useUser } from '@/contexts/UserContext'
import { useEffect, useState, useCallback } from 'react'

export default function Page() {
  const user = useUser()
  const [problems, setProblems] = useState([])

  const refreshProblems = useCallback(async () => {
    if (user.id) {
      const updatedProblems = await getProblems(user.id)
      setProblems(updatedProblems)
    }
  }, [user.id])

  useEffect(() => {
    refreshProblems()
  }, [refreshProblems])

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {problems.map((problem) => (
          <CreatedProblem
            key={problem.id}
            id={problem.id}
            createdAt={problem.created_at}
            title={problem.question_title}
            unitName={problem.units?.name || '不明な単元'}
            description={problem.question_text}
            onDelete={refreshProblems}
          />
        ))}
      </div>
    </div>
  )
}
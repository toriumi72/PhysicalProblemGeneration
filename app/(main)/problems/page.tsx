'use client'

import { getProblems } from '@/features/supabase/problems'
import CreatedProblem from './components/CreatedProblem'
import { useUser } from '@/contexts/UserContext'
import { useEffect, useState, useCallback } from 'react'
import { Database } from '@/types/supabaseTypes'
import { Card, CardHeader } from '@/components/ui/card'
import { Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Plus } from 'lucide-react'
import Link from 'next/link'

type Problem = Database['public']['Tables']['problems']['Row'] & {
  units?: {
    name: string;
  };
};

export default function Page() {
  const user = useUser()
  const [problems, setProblems] = useState<Problem[]>([])

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

        <Card className="w-full h-full flex justify-center items-center min-h-20">
          <Link href="/generate" className="w-full h-full flex justify-center items-center">
            <Button variant="ghost" size="icon" className="w-full h-full px-4">  
              <Plus className="h-4 w-4" />
              <span className="text-xs">新しい問題を作成する</span>
            </Button>
          </Link>
        </Card>

        {problems.map((problem) => (
          <CreatedProblem
            key={problem.id}
            id={problem.id}
            createdAt={problem.created_at ?? ""}
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
import { getProblems } from '@/features/supabase/problems'
import CreatedProblem from './components/CreatedProblem'

export default async function Page() {
  const problems = await getProblems()

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
          />
        ))}
      </div>
    </div>
  )
}
import { getProblem } from '@/features/supabase/problems'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

export default async function ProblemPage({
  params,
}: {
  params: { id: string }
}) {
  const problem = await getProblem({ id: params.id })

  if (!problem) {
    return <div>問題が見つかりませんでした。</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">{problem.question_title}</h1>
        
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">問題文</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <InlineMath math={problem.question_text} />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">解答手順</h2>
          <div className="space-y-4">
            {problem.step_titles.map((title: string, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">ステップ {index + 1}: {title}</h3>
                <p>{problem.step_explanations[index]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">最終解答</h2>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="mb-2">{problem.final_answer_text}</p>
            <InlineMath math={problem.final_answer_equation} />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">ヒント</h2>
          <div className="space-y-2">
            {problem.hints.map((hint: string, index: number) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <p>ヒント {index + 1}: {hint}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 
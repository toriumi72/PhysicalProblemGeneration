'use client'

import { useSearchParams } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function Page() {
  const searchParams = useSearchParams();
  const answer = searchParams.get('answer');
  const answerJson = answer ? JSON.parse(decodeURIComponent(answer)) : null;

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{answerJson?.question.title}</h2>
        {answerJson && (
          <div className="mt-4">
            <InlineMath math={answerJson.question.text} />
          </div>
        )}
      </div>
    </div>
  )
}
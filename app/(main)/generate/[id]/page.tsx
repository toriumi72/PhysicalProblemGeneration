'use client'

import { useSearchParams } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// LaTeX記法のカッコを削除する関数
function formatLatexText(text: string): string {
  return text
    .replace(/\\\((.*?)\\\)/g, '$1')  // \(...\) を削除
    .replace(/\\\[(.*?)\\\]/g, '$1')  // \[...\] を削除
    .replace(/\\\{(.*?)\\\}/g, '$1')  // \{...\} を削除
    .replace(/\$\$(.*?)\$\$/g, '$1'); // $$...$$ を削除
}

// バッククォートで囲まれたJSONを整形する関数
function formatJsonText(text: string | null): string | null {
  if (!text) return null;
  return text.replace(/^```json|```$/g, '').trim();
}

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const rawAnswer = searchParams.get('answer');

  const answer = formatJsonText(rawAnswer);
  const answerJson = answer ? JSON.parse(answer) : null;

  return (
    <div className="overflow-x-auto">
      <div className="bg-gray-100 rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">{answerJson.question.title}</h2>
        {answerJson && (
          <div className="mt-4">
            <InlineMath math={formatLatexText(answerJson.question.text)} />
          </div>
        )}
      </div>
    </div>
  )
}
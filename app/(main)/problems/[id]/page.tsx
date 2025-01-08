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

// 'use client'

// import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion"
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import 'katex/dist/katex.min.css';
// import { InlineMath } from 'react-katex';
// import { getProblem } from '@/features/supabase/problems'
// import { use } from 'react';

// export default function ProblemPage({
//   params,
// }: {
//   params: { id: string }
// }) {
//   const [problem, setProblem] = useState<any>(null);
//   const problemId = use(Promise.resolve(params.id));

//   useEffect(() => {
//     async function fetchProblem() {
//       const data = await getProblem({ id: problemId });
//       setProblem(data);
//     }
//     fetchProblem();
//   }, [problemId]);

//   console.log(problem)

//   if (!problem) {
//     return <div>問題が見つかりませんでした。</div>
//   }
//   return (
//     <div className="space-y-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg">{problem.question_title}</h2>
//         <Button variant="ghost" size="icon">  
//           <Download className="h-4 w-4" />
//         </Button>
//       </div>

//       <Card className="bg-sky-50 p-4">
//         <div className="flex flex-col gap-2 text-sm">
//           <div className="text-gray-500">問題</div>
//           <InlineMath math={problem.question_text} />
//         </div>
//       </Card>

//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="hint1">
//           <AccordionTrigger>ヒント1</AccordionTrigger>
//           <AccordionContent>
//             <InlineMath math={problem.hints[0]} />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="hint2">
//           <AccordionTrigger>ヒント2</AccordionTrigger>
//           <AccordionContent>
//             <InlineMath math={problem.hints[1]} />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="hint3">
//           <AccordionTrigger>ヒント3</AccordionTrigger>
//           <AccordionContent>
//             <InlineMath math={problem.hints[2]} />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       <Accordion type="single" collapsible className="w-full">
//         <AccordionItem value="answer">
//           <AccordionTrigger>回答</AccordionTrigger>
//           <AccordionContent>
//             <div className="space-y-4 text-sm">
//               <p className="font-semibold">・{problem.step_titles[0]}</p>
//               <InlineMath math={problem.step_explanations[0]} />
//               <p className="font-semibold">・{problem.step_titles[1]}</p>
//               <InlineMath math={problem.step_explanations[1]} />
//               <p className="font-semibold">・{problem.step_titles[2]}</p>
//               <InlineMath math={problem.step_explanations[2]} />
//               <div className="mt-4">
//                 <p className="mb-2 font-semibold">⭐️ 最終解答 ⭐️</p>
//                 <InlineMath math={problem.final_answer_text} />
//                 <InlineMath math={problem.final_answer_equation} />
//               </div>
//             </div>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>

//       <div className="flex justify-between items-center mt-8">
//         {/* 🥸 後で消す */}
//         <div className="flex gap-2">
//           <Button variant="outline" size="icon">
//             <ChevronLeft className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon">
//             <ChevronRight className="h-4 w-4" />
//           </Button>
//         </div>
//         <Button variant="outline" className="px-8">
//           問題を終える
//         </Button>
//       </div>
//     </div>
//   )
// }


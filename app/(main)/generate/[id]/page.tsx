'use client'

import { ChevronLeft, ChevronRight, Download } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { getProblem } from '@/features/supabase/problems'

export default function Page() {
  const [problem, setProblem] = useState<any>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    async function fetchProblem() {
      if (id) {
        const data = await getProblem({ generationRequestId: id });
        setProblem(data);
      }
    }
    fetchProblem();
  }, [id]);

  console.log(problem)

  if (!problem) {
    return <div>問題が見つかりませんでした。</div>
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg">{problem.question_title}</h2>
        <Button variant="ghost" size="icon">  
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <Card className="bg-sky-50 p-4">
        <div className="flex flex-col gap-2 text-sm">
          <div className="text-gray-500">問題</div>
          <InlineMath math={problem.question_text} />
        </div>
      </Card>

      <Accordion type="multiple" className="w-full">
        <AccordionItem value="hint1">
          <AccordionTrigger>ヒント1</AccordionTrigger>
          <AccordionContent>
            <InlineMath math={problem.hints[0]} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hint2">
          <AccordionTrigger>ヒント2</AccordionTrigger>
          <AccordionContent>
            <InlineMath math={problem.hints[1]} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="hint3">
          <AccordionTrigger>ヒント3</AccordionTrigger>
          <AccordionContent>
            <InlineMath math={problem.hints[2]} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="answer">
          <AccordionTrigger>回答</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-sm">
              <p className="font-semibold">・{problem.step_titles[0]}</p>
              <InlineMath math={problem.step_explanations[0]} />
              <p className="font-semibold">・{problem.step_titles[1]}</p>
              <InlineMath math={problem.step_explanations[1]} />
              <p className="font-semibold">・{problem.step_titles[2]}</p>
              <InlineMath math={problem.step_explanations[2]} />
              <div className="mt-4">
                <p className="mb-2 font-semibold">⭐️ 最終解答 ⭐️</p>
                <InlineMath math={problem.final_answer_text} />
                <InlineMath math={problem.final_answer_equation} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-between items-center mt-8">
        {/* 🥸 後で消す */}
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" className="px-8">
          問題を終える
        </Button>
      </div>
    </div>
  )
}


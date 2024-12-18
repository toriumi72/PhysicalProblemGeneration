'use client'

import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Database } from '@/types/supabaseTypes'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { addProblem } from '@/features/supabase/problems'
import { createClient } from '@/utils/supabase/client'
import { useUser } from '@/contexts/UserContext'
interface Unit {
  id: number
  name: string
  description: string
}

export default function ProblemGenerator({ units }: { units: Unit[] | null }) {
  // グローバル変数からユーザー情報を取得
  const user = useUser();

  const [currentUnit, setCurrentUnit] = useState({
    id: units?.[0]?.id || 0,
    name: units?.[0]?.name || '',
    description: units?.[0]?.description || '',
  })

  const [response, setResponse] = useState({
    id: '',
    answer: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponse({ id: '', answer: '' });

    const fetchPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await fetch('/generate/api/dify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ unit: currentUnit }),
        });

        if (!res.ok) {
          reject(new Error('サーバーエラーが発生しました'));
          return;
        }

        const data = await res.json();

        // problem_generation_requestsにデータを挿入
        const supabase = createClient();
        const { data: requestData, error: requestError } = await supabase
          .from('problem_generation_requests')
          .insert({
            user_id: user?.id,
            difficulty_id: 1,
            question_count: 1,
            request_params: { unit: currentUnit },
            response_metadata: data
          })
          .select()
          .single();

        if (requestError) {
          console.error('リクエスト保存エラー:', requestError);
          reject(new Error('リクエストの保存に失敗しました'));
          return;
        }

        // problem_generation_request_unitsに単元情報を挿入
        const { error: unitError } = await supabase
          .from('problem_generation_request_units')
          .insert({
            problem_generation_request_id: requestData.id,
            unit_id: currentUnit.id
          });

        if (unitError) {
          console.error('単元紐付けエラー:', unitError);
          reject(new Error('単元の紐付けに失敗しました'));
          return;
        }
        
        // problemsテーブルに問題データを挿入
        const problemData: Database['public']['Tables']['problems']['Insert'] = {
          generation_request_id: requestData.id, // 生成されたリクエストIDを使用
          unit_id: currentUnit.id,
          difficulty_id: 1,
          question_title: data.question.title,
          question_text: data.question.text,
          step_titles: data.answer.steps.map((step: any) => step.step_n),
          step_explanations: data.answer.steps.map((step: any) => step.explanation_step_n),
          final_answer_text: data.answer.final_answer.text,
          final_answer_equation: data.answer.final_answer.equation,
          hints: data.hints,
        }

        try {
          await addProblem(problemData);
        } catch (error) {
          console.error('DB保存エラー:', error);
          reject(new Error('データベースへの保存に失敗しました'));
          return;
        }

        resolve(data);
        setResponse({
          id: data.id,
          answer: data.answer,
        });

        // URLパラメータとしてJSONを渡す前にエンコード
        const encodedAnswer = encodeURIComponent(JSON.stringify(data));
        router.push(`/generate/${data.id}?id=${data.id}&answer=${encodedAnswer}`);

      } catch (error) {
        reject(error);
      } finally {
        setIsLoading(false);
      }
    });

    toast.promise(fetchPromise, {
      loading: '問題を生成中...',
      success: () => '問題が生成されました。',
      error: 'エラーが発生しました。'
    });
  };

  return (
    <>
      <h1 className="text-4xl font-extralight tracking-tight mb-12 text-center">
        物理学の問題を生成
      </h1>
      <div className="space-y-6">

        <Select 
          value={currentUnit.name} 
          onValueChange={(value) => {
            const selectedUnit = units?.find(u => u.name === value);
            if (selectedUnit) {
              setCurrentUnit({
                id: selectedUnit.id,
                name: selectedUnit.name,
                description: selectedUnit.description,
              });
            }
          }}
        >
          <SelectTrigger className="w-full h-12 text-sm border-gray-300 focus:ring-gray-400 focus:border-gray-400">
            <SelectValue placeholder="単元を選択" />
          </SelectTrigger>
          <SelectContent>
            {units?.map((unit) => (
              <SelectItem 
                key={unit.name} 
                value={unit.name}
                className="text-sm"
              >
                {unit.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleSubmit}
          disabled={!currentUnit.name || isLoading}
          className="w-full text-white h-12 text-sm font-normal tracking-wide transition-all duration-200 ease-in-out"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              生成中...
            </>
          ) : (
            '生成する'
          )}
        </Button>
      </div>

      {/* {response.answer && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-2xl tracking-tight mb-4">
            生成された問題
          </h2>
          <pre className="whitespace-pre-wrap">{response.answer}</pre>
        </div>
      )} */}
    </>
  )
}


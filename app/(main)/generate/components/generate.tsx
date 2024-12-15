'use client'

import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'

export default function ProblemGenerator() {
  const [unit, setUnit] = useState('')
  const [responseText, setResponseText] = useState('')

  const units = {
    mechanics: ['運動量', 'エネルギー保存', '力学的振動'],
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseText(''); // レスポンステキストをリセット

    try {
      const res = await fetch('/generate/api/dify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ units }),
      });

      if (!res.body) {
        setResponseText('ストリーミングデータがありません');
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let accumulatedText = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          // ストリームを行単位で分割
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          lines.forEach(line => {
            try {
              const data = JSON.parse(line.replace(/^data: /, ''));
              if (data.event === 'message' && data.answer) {
                accumulatedText += data.answer;
                setResponseText(accumulatedText);
              } else if (data.event === 'message_end') {
                // ストリーミング終了時の処理（必要に応じて）
                console.log('ストリーミングが終了しました');
              }
            } catch (err) {
              console.error('JSON解析エラー:', err);
            }
          });
        }
      }
    } catch (error) {
      setResponseText('サーバーエラーが発生しました');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 font-light">
      <h1 className="text-4xl font-extralight tracking-tight mb-12 text-center">
        物理学の問題を生成
      </h1>
      <div className="space-y-6">

        <Select value={unit} onValueChange={setUnit}>
          <SelectTrigger className="w-full h-12 text-sm border-gray-300 focus:ring-gray-400 focus:border-gray-400">
            <SelectValue placeholder="単元を選択" />
          </SelectTrigger>
          <SelectContent>
            {units.mechanics?.map((unitName) => (
              <SelectItem 
                key={unitName} 
                value={unitName}
                className="text-sm"
              >
                {unitName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleSubmit}
          disabled={ !unit }
          className="w-full bg-black hover:bg-gray-800 text-white h-12 text-sm font-normal tracking-wide transition-all duration-200 ease-in-out"
        >
          生成する
        </Button>
      </div>
      {responseText && (
        <div className="mt-4 p-4 border rounded-lg">
          <h2 className="text-2xl font-extralight tracking-tight mb-4">
            生成された問題
          </h2>
          <pre className="whitespace-pre-wrap">{responseText}</pre>
        </div>
      )}
    </div>
  )
}


import { NextRequest, NextResponse } from 'next/server';

// LaTeX記法のカッコを削除する関数
function formatLatexText(text: string): string {
  return text
    .replace(/\\\((.*?)\\\)/g, '$1')
    .replace(/\\\[(.*?)\\\]/g, '$1')
    .replace(/\\\{(.*?)\\\}/g, '$1')
    .replace(/\$\$(.*?)\$\$/g, '$1');
}

// JSONレスポンスを整形する関数
function formatDifyResponse(rawResponse: any) {
  const parsedAnswer = JSON.parse(rawResponse.answer);
  
  return {
    id: rawResponse.id,
    question: {
      title: parsedAnswer.question.title,
      text: formatLatexText(parsedAnswer.question.text)
    },
    answer: {
      steps: parsedAnswer.answer.steps.map((step: any) => ({
        step_n: step.step_n,
        explanation_step_n: formatLatexText(step.explanation_step_n)
      })),
      final_answer: {
        text: formatLatexText(parsedAnswer.answer.final_answer.text),
        equation: formatLatexText(parsedAnswer.answer.final_answer.equation)
      }
    },
    hints: parsedAnswer.hints
  };
}

export async function POST(req: NextRequest) {
  const { unit } = await req.json(); // 単元名をリクエストから取得

  try {
    const response = await fetch('https://api.dify.ai/v1/completion-messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIFY_API_KEY}`, // APIキーを環境変数から取得
      },
      body: JSON.stringify({
        inputs: { 'unit_name': unit.name, 'unit_description': unit.description },
        query: '', // クエリが必要であれば記述
        response_mode: 'blocking',
        user: 'user-id-123',
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Dify APIリクエストに失敗しました' },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('💩', data)
    
    // レスポンスを整形
    const formattedData = formatDifyResponse(data);
    
    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'サーバーエラー', details: error },
      { status: 500 }
    );
  }
}

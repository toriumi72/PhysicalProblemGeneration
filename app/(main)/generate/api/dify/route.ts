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
  let parsedAnswer;
  
  try {
    // レスポンスがコードブロックで囲まれているかチェック
    const answerText = rawResponse.answer;
    if (answerText.includes('```json')) {
      // コードブロックから JSON 部分を抽出
      const jsonMatch = answerText.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        parsedAnswer = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Invalid JSON format in code block');
      }
    } else {
      // 通常の JSON パース
      parsedAnswer = JSON.parse(answerText);
    }

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
  } catch (error) {
    console.error('JSON解析エラー:', error);
    throw new Error('レスポンスの解析に失敗しました');
  }
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
    
    // レスポンスを整形
    const formattedData = formatDifyResponse(data);

    console.log('💩' + formattedData);
    
    return NextResponse.json(formattedData);
  } catch (error) {
    return NextResponse.json(
      { error: 'サーバーエラー', details: error },
      { status: 500 }
    );
  }
}

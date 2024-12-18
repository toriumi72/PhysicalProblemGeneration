import { NextRequest, NextResponse } from 'next/server';

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
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'サーバーエラー', details: error },
      { status: 500 }
    );
  }
}

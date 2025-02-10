// import Stripe from 'stripe'
// import { NextResponse, NextRequest } from 'next/server'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-01-27.acacia',
// })

// export async function POST(request: NextRequest) {
//   try {
//     // リクエストボディからpriceIdを取得
//     const { priceId } = await request.json()

//     // リクエストヘッダーからオリジンを取得
//     const origin = request.headers.get('origin')
//     if (!origin) {
//       return NextResponse.json(
//         { error: 'Origin header が見つかりませんでした' },
//         { status: 400 }
//       )
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       mode: 'subscription',
//       success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${origin}/cancel`,
//     })

//     return NextResponse.json({ sessionId: session.id })
//   } catch (err: any) {
//     return NextResponse.json(
//       { statusCode: 500, message: err.message },
//       { status: 500 }
//     )
//   }
// } 



import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Stripeの初期化
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

// POSTリクエストを正しくハンドリングするために、export async function POSTで定義
export async function POST(request: Request) {
  try {
    // リクエストボディから必要な情報を取得（必要に応じてproductIdなど）
    const { productId } = await request.json();

    // request.headers.getでオリジンを取得
    const origin = request.headers.get('origin');
    if (!origin) {
      return NextResponse.json(
        { error: 'Origin header が見つかりませんでした' },
        { status: 400 }
      );
    }

    // Stripe Checkoutセッションの作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // 固定の価格IDを使用（もしくはproductIdなどを利用して動的に設定）
          price: 'price_1QqW6nQ3ZMuN4zzeqLPvdU4j',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/`,
      cancel_url: `${origin}/upgradeToPro`,
    });

    // セッションURLを返す
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
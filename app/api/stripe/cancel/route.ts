import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export async function POST(request: Request) {
  try {
    const { subscriptionId } = await request.json();

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'サブスクリプションIDが必要です' },
        { status: 400 }
      );
    }

    // サブスクリプションをキャンセル（解約）する処理
    const subscription = await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({ subscription });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
} 
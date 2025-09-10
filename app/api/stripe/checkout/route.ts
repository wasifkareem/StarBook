import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export async function POST(request: NextRequest) {
  try {

    // you can implement some basic check here like, is user valid or not
    const data = await request.json();
    const priceId = data.priceId;
    const {userId} = await auth()
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_BASE_URL}/billing`,
        cancel_url: `${process.env.NEXT_BASE_URL}/billing`,
        metadata: {
          userId: userId,
          priceId
        }
      });
    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server', { status: 500 });
  }
}
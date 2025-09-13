import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { clerkClient } from '@clerk/nextjs/server';

type METADATA = {
  userId: string;
  priceId: string;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
  const sig = (await headers()).get('stripe-signature') as string;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log('✅ Webhook received:', event.type);
  } catch (err) {
    console.error('❌ Webhook Error:', err);
    return new Response(`Webhook Error: ${err}`, {
      status: 400
    });
  }

  const eventType = event.type;
  
  if (
    eventType !== 'checkout.session.completed' &&
    eventType !== 'checkout.session.async_payment_succeeded'
  ) {
    console.log(`ℹ️  Unhandled event type: ${eventType}`);
    return new Response('Event not handled', {
      status: 200
    });
  }

  const data = event.data.object as Stripe.Checkout.Session;
  const metadata = data.metadata as METADATA;
  
  // Extract all the details
  const userId = metadata?.userId;
  const priceId = metadata?.priceId;
  const sessionId = data.id;
  const customerId = data.customer;
  const customerEmail = data.customer_details?.email;
  const amount = data.amount_total;
  const currency = data.currency;
  const paymentStatus = data.payment_status;
  
  // 🎉 LOG SUBSCRIPTION SUCCESS
  console.log('🎉 SUBSCRIPTION SUCCESSFUL!');
  console.log('================================');
  console.log(`👤 User ID: ${userId}`);
  console.log(`📧 Email: ${customerEmail}`);
  console.log(`💰 Amount: ${amount ? (amount / 100) : 'N/A'} ${currency?.toUpperCase()}`);
  console.log(`🏷️  Price ID: ${priceId}`);
  console.log(`🎫 Session ID: ${sessionId}`);
  console.log(`🏪 Customer ID: ${customerId}`);
  console.log(`✅ Payment Status: ${paymentStatus}`);
  console.log(`📅 Date: ${new Date().toISOString()}`);
  console.log('================================');
  
  // You can also log the full transaction details object
  const transactionDetails = {
    userId,
    priceId,
    sessionId,
    customerId,
    customerEmail,
    amount: amount ? amount / 100 : null,
    currency,
    paymentStatus,
    created: data.created,
    timestamp: new Date().toISOString()
  };
  
  console.log('📊 Full Transaction Details:', JSON.stringify(transactionDetails, null, 2));

  try {
    if(paymentStatus==='paid'){
      const clerkUserId = userId;
      if(!clerkUserId){
        console.warn('missing clerk userId')
      }else{
        const client  =await clerkClient();
        const user = await client.users.getUser(clerkUserId);
        const alreadyPro= user?.privateMetadata?.pro===true;

        if(!alreadyPro){
          await client.users.updateUser(clerkUserId,{
            privateMetadata:{
              ...(user?.privateMetadata||{}),
              pro:true,
              proSince:new Date().toISOString()
            }
          })
          console.log(`✅ Clerk privateMetadata updated: user ${clerkUserId} is now pro.`);
          
        }else{
          console.log(`ℹ️ User ${clerkUserId} already pro; no update needed.`);

        }
      }
    }
    // TODO: Add database update here later
    console.log('💾 Database update will be added here...');
    
    return new Response('Subscription logged successfully', {
      status: 200
    });
  } catch (error) {
    console.error('❌ Error processing subscription:', error);
    return new Response('Server error', {
      status: 500
    });
  }
}
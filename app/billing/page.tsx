'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { loadStripe } from '@stripe/stripe-js';

const page= () => {
  const handleSubmit = async () => {
      const stripe = await loadStripe('pk_test_51NbSYfSHbgEvO9smM7oUXYA4mXB0tKznI4LrUBhCVv9upBTpA1QOwjBsTsvQvyF1rGr1wxZF3Gh9JDAfzp64cET100VStgdSn9');
        if (!stripe) {
            return;
        }
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: "price_1S5AafSHbgEvO9smiDZ33OMw"
        })
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) throw new Error('Something went wrong');
      await stripe.redirectToCheckout({
        sessionId: data.result.id
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
<div className=' flex w-full justify-center'>
   <Card className=' w-fit'>
    <CardContent className=' flex flex-col gap-3'>
    Click Below button to get 
<Button onClick={handleSubmit}>
      Upgrade in 20$
    </Button>
    </CardContent>
   </Card>
</div>
  );
};
export default page;
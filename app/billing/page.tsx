'use client';
import { MovingBorderButton } from '@/components/ui/moving-border';
import { Card, CardContent } from '@/components/ui/card';
import { useAppContext } from '@/context/AppContext';
import { loadStripe } from '@stripe/stripe-js';
import Confetti from 'react-confetti'
import { useWindowDimensions } from '@/lib/dimension';
import { getUserProStatus } from '@/lib/actions/users';
import { ArrowLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';


const page = () => {
    const { state } = useAppContext();
    const {width, height} = useWindowDimensions()
    const searchParams = useSearchParams();
    const [showConfetti, setShowConfetti] = useState(false)

    const handleSubmit = async () => {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
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
            console.log(data);
            
            if (!response.ok) throw new Error('Something went wrong');
            
            await stripe.redirectToCheckout({
                sessionId: data.result.id
            });
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const success = searchParams.get('success');
        if (success === 'true') {
            setShowConfetti(true);
        }
    }, [searchParams]);

    if (!state.pro) {
        return (
           <div className=' w-full flex justify-center'>
             <div className="flex flex-col w-fit items-start gap-2 md:pt-20">
                 <a href='/app' className=' flex gap-1 text-base text-[#81878d] transition-all cursor-pointer hover:text-secondary items-center'><ArrowLeft size={18}/>Back to Home</a>
               <div className=' flex gap-2 md:mt-16'>
               <Card className="w-fit bg-white">
                    <CardContent className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <p className="text-xl font-semibold font-mono opacity-65">Starbook</p>
                            <span className="bg-teal-500/20 text-teal-600 px-2 py-1 rounded-[5px] text-xs font-medium">
                                Current Plan
                            </span>
                        </div>

                        <ul className="list-disc mt-7 ml-6 flex flex-col gap-2 md:max-w-96 opacity-65">
                            <li>Create upto two spaces</li>
                            <li>Add upto 7 testimonials in a single space</li>
                            <li>Generate upto 2 AI-Insights per day based on the collected testimonials</li>
                        </ul>
                    </CardContent>
                </Card>
                
                <Card className="w-fit shadow-yellow-glow">
                    <CardContent className="flex flex-col gap-3 items-end">
                    <div className="flex w-full justify-between items-center">
                        <p 
                            className="text-xl font-semibold font-mono" 
                            style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}
                        >
                            Starbook Pro
                        </p>
                        
                        <div className="flex gap-3">
                            <span className="bg-teal-500/20 text-teal-600 px-2 py-1 rounded-[5px] text-xs font-medium">
                               Recommended
                            </span>
                            <span className="bg-blue-500/20 text-blue-600 px-2 py-1 rounded-[5px] text-xs font-medium">
                                Lifetime access
                            </span>
                        </div>
                    </div>
                        <ul className="list-disc mt-7 ml-6 flex flex-col gap-2 md:max-w-96">
                            <li>Create upto 10 spaces</li>
                            <li>Add upto 25 testimonials in a single space</li>
                            <li>Generate upto 10 AI-Insights per day based on the collected testimonials</li>
                        </ul>
                        
                        <MovingBorderButton
                            borderRadius="1rem"
                            containerClassName=' h-10'
                            className="bg-white dark:bg-slate-900 cursor-pointer text-yellow-500 dark:text-white border-neutral-200 dark:border-slate-800"
                            onClick={handleSubmit}
                        >
                            Upgrade in 20$
                        </MovingBorderButton>
                    </CardContent>
                </Card>
               </div>
            </div>
           </div>
        );
    }

    return (
        <div className=' w-full flex justify-center'>
          {showConfetti && <Confetti  height={height} width={width} recycle={false} />}
          <div className="w-fit h-screen flex flex-col gap-20 items-start md:mt-10">
        <a href='/app' className=' flex gap-1 text-base text-[#81878d] transition-all cursor-pointer hover:text-secondary items-center'><ArrowLeft size={18}/>Back to Home</a>

            <Card className="w-fit h-fit py-10 px-7 border shadow-yellow-glow">
            <CardContent>
                <div className="flex w-full justify-between items-center">
                <p 
                    className="text-xl font-semibold font-mono" 
                    style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}
                >
                    Starbook Pro
                </p>
                
                <div className="flex gap-3">
                    <span className="bg-teal-500/20 text-teal-600 px-2 py-1 rounded-[5px] text-xs font-medium">
                    Current Plan
                    </span>
                    <span className="bg-blue-500/20 text-blue-600 px-2 py-1 rounded-[5px] text-xs font-medium">
                    Lifetime access
                    </span>
                </div>
                </div>
                
                <ul className="list-disc mt-7 ml-6 flex flex-col gap-2 md:max-w-96">
                <li>Create upto seven spaces</li>
                <li>Add upto 50 testimonials in a single space</li>
                <li>Generate upto 10 AI-Insights per day based on the collected testimonials</li>
                </ul>
            </CardContent>
            </Card>
        </div>
          </div>
    );
};

export default page;
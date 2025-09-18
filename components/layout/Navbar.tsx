"use client"

import { useAppContext } from '@/context/AppContext';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@radix-ui/react-select';
import { CreditCard } from 'lucide-react';
import { Cover } from '@/components/ui/cover';

const Navbar = () => {
    const { isSignedIn } = useUser();
    const { state } = useAppContext();

    return (
        <>
            <div className='grid grid-cols-3 items-center w-full  px-6 h-20' style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <div className='col-span-1 flex justify-start'>
                    <Link href={`${isSignedIn ? "/app" : "/"}`}>
                        <div className="flex gap-2 text-2xl font-bold italic">
                            {/* <img className=" w-6 " src="/assets/star-logo.svg" alt="star-logo" /> */}
                            <Cover className=' flex'>
                            <p style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}>
                               StarBook
                            </p>
                            {state.pro && <p className=' text-sm h-fit px-2 rounded-2xl bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-600 text-yellow-900 font-bold shadow-lg border border-yellow-500' style={{ 
                                background: 'linear-gradient(145deg, #fbbf24, #f59e0b, #d97706)', 
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                                textShadow: '0 1px 0 rgba(255,255,255,0.3)'
                            }}>Pro</p>}</Cover>
                        </div>
                    </Link>
                </div>

                <div className='col-span-1 flex justify-center'>
                {!state.pro && (
                        <SignedIn>
                            <div className='hidden lg:flex border border-neutral-200 rounded-3xl w-fit items-center'>
                                <Button 
                                    className="bg-gradient-to-b from-neutral-800 to-neutral-900 text-neutral-300 text-sm px-4 py-2 rounded-lg border border-neutral-600 hover:from-neutral-700 m-1 hover:to-neutral-800 transition-colors duration-200"
                                    style={{
                                        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 1px 3px rgba(0,0,0,0.3)',
                                    }}
                                >
                                    <Link href='/billing'>Upgrade</Link>
                                </Button>
                                <div className="text-sm md:mr-5 px-4 py-2 text-neutral-600 rounded-r-full font-medium">
                                    Lifetime access for first 100 people
                                </div>
                            </div>
                        </SignedIn>
                )}
                </div>

                <div className='col-span-1 flex justify-end'>
                    <SignedOut>
                        <div className="flex gap-3">
                            <Link href="/sign-in">
                                <Button variant="secondary">Sign In</Button>
                            </Link>
                            <Link href="/sign-up">
                                <Button>Sign-up</Button>
                            </Link>
                        </div>
                    </SignedOut>
                    <SignedIn>
                        <UserButton 
                        >
                            <UserButton.MenuItems>
                                <UserButton.Link
                                    label="Billing"
                                    labelIcon={<CreditCard size={16} />}
                                    href="/billing"
                                />
                                 <UserButton.Link
                                    label="Dashboard"
                                    labelIcon={<CreditCard size={16} />}
                                    href={"/app"}
                                />
                            </UserButton.MenuItems>
                        </UserButton>
                    </SignedIn>
                </div>
            </div>
            </>
    );
};

export default Navbar;

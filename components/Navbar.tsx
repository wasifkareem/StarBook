"use client"

import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from './ui/button';

const Navbar = () => {

    const {isSignedIn} = useUser();
    return (
        <>
        <div className=' flex justify-between w-full'>

        <div>
        <Link href={`${isSignedIn ? "/app" : "/"}`}>
        <div className=" flex gap-2 text-2xl font-bold italic ">
          {/* <img className=" w-6 " src="/assets/star-logo.svg" alt="star-logo" /> */}
          <p style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}>
            StarBook
          </p>
        </div>
      </Link>
        </div>
        <div>
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
                <UserButton />
            </SignedIn>
        </div>
        </div>

        </>
    );
};

export default Navbar;

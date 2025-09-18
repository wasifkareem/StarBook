'use client'

import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { Separator } from "@/components/ui/separator";
import IframeResizer from '@iframe-resizer/react';
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";



const Home = () => {
  return (
    <>
      <div  className="relative flex w-full justify-center">
        {/* Subtle backdrop hint */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-gray-200/20 rounded-[100px] blur-sm opacity-50"></div>

       
          <div className="md:pt-20 z-10 ">
            <div className="flex flex-col items-center md:pb-10 p-10 gap-8">
              <div className="text-lg flex flex-col justify-center md:text-2xl font-mono">
                <p className="text-3xl md:text-5xl font-light text-center font-mono text-gray-800">
                  Collect testimonails With <Cover>StarBook</Cover>
                  
                </p>
                <p className="text-lg my-12 text-gray-600 bg-[#ffffff62] shadow-2xl shadow-white font-light max-w-2xl self-center text-center">
                  Use Starbook to collect testimonails in minutes and embed them on your websites without any developer help.
                </p>
              </div>
              <div className="flex rounded-full flex-wrap gap-4 shadow-black bg-white justify-center items-center" style={{ boxShadow: '0 0 0 1px hsl(var(--border)), 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06)' }}>
                <Button>

                <Link
                  href="/sign-up"
                  >
                  Signup
                </Link>
                  </Button>
                  <Button variant='secondary'>

                <Link
                  href="/sign-in"
                  >
                  Login
                </Link>
                  </Button>
               
                <a
                  href="https://github.com/wasifkareem/StarBook"
                  target="_blank"
                >
                  <FaGithub className="opacity-40 text-4xl transition-all hover:opacity-60 text-gray-700" />
                </a>
              </div>
              <div className="md:w-6xl border border-gray-200 shadow-lg rounded-xl overflow-hidden bg-white">
                <iframe
                  className="md:h-[750px]"
                  width="100%"
                  src="https://www.youtube.com/embed/gaiyO3RZB6E?si=405LXf0p57uxZ9n2"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div>
                <div className=" my-10 md:my-32 md:mt-44 ">

                <p className=" text-xl md:text-4xl font-mono text-center my-3 ">Add Testimonials to your website without any coding</p>
                <p className=" text-center my-5 mt-10 font-mono">Copy and paste our HTML code to your website to get a Testimonial wall like below</p>
                </div>
              
              </div>
              
              <IframeResizer
                license='GPLv3'
                log="collapsed"
                scrolling={false}
                src="http://localhost:3000/embed/cmfm931zh0000sk2zflixyb44"
                style={{ width: '100%' }}
              />
              <div className=" mt-4 lg:mt-40  lg:max-w-7xl flex flex-col gap-32 ">
                <h2 className="  md:text-4xl font-light text-center font-mono text-gray-800">Collect and Display Testimonials all in one place</h2>
                <div className="  grid grid-cols-1 lg:grid-cols-2">
                 <div className="  flex justify-center flex-col gap-2 lg:px-16">
                  <span className=" text-primary text-xl" >Quick to setup</span>
                  <p className=" text-3xl font-mono">A dedicated landing page
                  </p>
                  <p className=" text-lg text-neutral-600 mt-3">Create a dedicated landing page for your business. Share the page link easily via email, social media, or even SMS. Setup can be done in two minutes.

</p>
                  </div>
                 <div className=" flex justify-center mt-16 md:mt-0"><Image className=" border h-[450px]" src="/assets/Screenshot 2025-09-16 at 12.15.56 AM.png" alt="" /></div>
                </div>
                <div className="  grid grid-cols-1 lg:grid-cols-2">
                <div className=" flex justify-center mt-16 md:mt-0"><Image className=" border h-[450px]" src="/assets/Screenshot 2025-09-16 at 12.16.32 AM.png" alt="" /></div>
                 <div className="  flex justify-center flex-col gap-2 lg:px-16">
                  <span className=" text-primary text-xl" >Easy to manage
                  </span>
                  <p className=" text-3xl font-mono">A dashboard to manage all testimonials

                  </p>
                  <p className=" text-lg text-neutral-600 mt-3">You will have a simple & clean dashboard to manage all testimonials in one place. It&apos;s like your email inbox, but it&apos;s designed for your social proof!



</p>
                  </div>
               
                </div>
                <div className="  grid grid-cols-1 lg:grid-cols-2">
                 <div className="  flex justify-center flex-col gap-2 lg:px-16">
                  <span className=" text-primary text-xl" >More social proof
                  </span>
                  <p className=" text-3xl font-mono">Add tweets as Testimonials
                  </p>
                  <p className=" text-lg text-neutral-600 mt-3">If people are talking about your startup/company on twitter, bring those tweets here and use them as testimonials

</p>
                  </div>
                 <div className=" flex justify-center mt-16 md:mt-0"><Image className=" border h-[450px]" src="/assets/Screenshot 2025-09-16 at 12.17.11 AM.png" alt="" /></div>
                </div>
                <div className="  grid grid-cols-1 lg:grid-cols-2">
                <div className=" flex justify-center mt-16 md:mt-0"><video className=" border h-[420px]" autoPlay muted loop src="/assets/viddd.mov" /></div>
                 <div className="  flex justify-center flex-col gap-2 lg:px-16">
                  <span className=" text-primary text-xl" >Embed the Wall of Love

                  </span>
                  <p className=" text-3xl font-mono">The best testimonials all in one place</p>
                  <p className=" text-lg text-neutral-600 mt-3">Treat the Wall of Love as the place to showcase all your favorite testimonials. You can embed it to your website in under a minute. No coding knowledge required!</p>
                  </div>
               
                </div>
              </div>
                <Separator className=" mt-10"/>
                <div className=" flex items-center justify-end gap-6 w-full lg:px-32">
              <span> Made by <a className=" text-primary" href="https://wasifkareem.com" target="_blank"> Wasif kareem ✨</a></span>
                <div className=" flex items-center gap-7">
                <a href="https://github.com/wasifkareem/StarBook" target="_blank"><BsGithub size={30}/></a>
                 <a href="https://www.linkedin.com/in/wasifdev2762/" target="_blank"><BsLinkedin size={30}/></a>
                </div>
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Home;

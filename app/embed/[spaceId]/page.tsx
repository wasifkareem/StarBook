'use client'

import { use, useEffect, useState } from "react";
import Testimonials from "@/components/Testimonials";
import { useWindowDimensions } from "@/lib/dimension";
import { Testimonial } from "@/lib/schemas/testimonial.schema";
import { prisma } from "@/lib/db";
import { useAppContext } from "@/context/AppContext";
import Canvas from "@/components/Canvas";

interface PageProps {
  params: Promise<{ spaceId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const  EmbedPage= ({ params, searchParams }: PageProps)=> {
  const { spaceId } = use(params)
  const [isDark, setIsDark] = useState(false);
  const {setField,setTheme} = useAppContext()
 
  
  const [testimonials, setTestimonials] = useState<[Testimonial]|null>(null);
  useEffect(() => {
    const getTestimonials = async () => {
      const res = await fetch(
        `/api/wall/fetch-wall?spaceId=${spaceId}`
      );

      if(res.ok){
        const data = await res.json()
        setTestimonials(data);
      }

      const response = await fetch(`/api/fetch-theme?spaceId=${spaceId}`)
      const theme  = await response.json()
      setIsDark(theme?.isDark)
      setField(theme?.field)
      setTheme(theme?.theme)
    };
    getTestimonials();
    
  }, []);
  if (!testimonials) {
    return (
      <div className=" flex justify-center items-center  h-screen w-screen">
        <img
          className=" h-16"
          src="/assets/Spinner@1x-1.0s-200px-200px.svg"
          alt=""
        />
      </div>
    );
  }


  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
     
      <div className="md:w-full">
      <Canvas publicTestimonials={testimonials} mode={isDark}/>
      </div>
    </div>
  )
}


export default EmbedPage
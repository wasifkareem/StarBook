'use client'

import { use, useEffect, useState } from "react";
import Testimonials from "@/components/Testimonials";
import { useWindowDimensions } from "@/lib/utils";
import { Testimonial } from "@/lib/schemas/testimonial.schema";
import { prisma } from "@/lib/db";
import { useAppContext } from "@/context/AppContext";

interface PageProps {
  params: Promise<{ spaceId: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const  EmbedPage= ({ params, searchParams }: PageProps)=> {
  const { spaceId } = use(params)
  const [isDark, setIsDark] = useState(false);
  const {setField,state} = useAppContext()
 
  
  const [testimonials, setTestimonials] = useState<[Testimonial]|null>(null);
  const { width } = useWindowDimensions();
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
  const arrayCount = () => {
    if (width > 1900) {
      return 5;
    } else if (width > 1536) {
      return 4;
    } else if (width > 1150) {
      return 3;
    } else if (width > 782) {
      return 2;
    } else {
      return 1;
    }
  };

  return (
    <div className={isDark ? 'dark-theme' : 'light-theme'}>
     
      <div className=" flex justify-center">
        <div className="grid grid-cols-1 w-fit lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  my-10 gap-3 items-start mx-10">
          {Array(arrayCount())
            .fill(4)
            .map((_, colIndex) => (
              <div className="grid gap-3 justify-center" key={colIndex}>
                {testimonials
                  .filter((_, index) => index % arrayCount() === colIndex)
                  .map((testimonial) => (
                    <Testimonials
                      key={testimonial.id}
                      testimonial={testimonial}
                      mode={isDark}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}


export default EmbedPage
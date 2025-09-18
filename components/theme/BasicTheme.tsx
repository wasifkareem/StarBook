import { Testimonial } from '@/lib/schemas/testimonial.schema'
import { useWindowDimensions } from '@/lib/dimension';
import React from 'react'
import Testimonials from '@/components/cards/Testimonials';
import { CanvasProps } from '../layout/Canvas';

const BasicTheme = ({publicTestimonials, mode}:CanvasProps) => {
    const { width } = useWindowDimensions();

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
        <div>
            <div className="grid grid-cols-1 w-fit lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 my-10 gap-3 items-start mx-5">
                {Array(arrayCount())
                    .fill(0)
                    .map((_, colIndex) => (
                        <div className="grid gap-3 justify-center" key={colIndex}>
                            {publicTestimonials
                                ?.filter((_, index) => index % arrayCount() === colIndex)
                                .map((testimonial) => (
                                    <Testimonials
                                    key={testimonial.id}
                                        testimonial={testimonial}
                                        mode={mode}
                                    />
                                ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default BasicTheme
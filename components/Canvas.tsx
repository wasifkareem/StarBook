import { Testimonial } from "@/lib/schemas/testimonial.schema"
import { useWindowDimensions } from "@/lib/utils";
import Testimonials from "./Testimonials";

interface CanvasProps {
  publicTestimonials:[Testimonial],
  mode:boolean
}

const Canvas = ({publicTestimonials, mode}:CanvasProps) => {
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
    <>
    <div className="bg-slate-500 mx-10 shadow-inner shadow-shadow-color">
      <p className="text-center font-semibold text-xl mt-6 md:mt-16 text-gray-700">
        Live Preview
      </p>
      <div className="flex justify-center">
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
    </div>
  </>
  )
}

export default Canvas
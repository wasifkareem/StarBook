import { useWindowDimensions } from "@/lib/dimension";
import { CanvasProps } from "../layout/Canvas";
import Testimonials from "@/components/cards/Testimonials";

const VerticalTheme = ({ publicTestimonials, mode }: CanvasProps) => {
  const { width } = useWindowDimensions();

  const arrayCount = () => {
    if (width > 1900) return 5;
    else if (width > 1536) return 4;
    else if (width > 1150) return 3;
    else if (width > 782) return 2;
    else return 1;
  };

  // Create exactly 2 copies for seamless loop
  const duplicatedTestimonials = [
    ...(publicTestimonials || []),
    ...(publicTestimonials || []),
    ...(publicTestimonials || []),
    ...(publicTestimonials || []),
    ...(publicTestimonials || []),
  ];

  return (
    <div className=" flex  items-center  w-full h-full">
      <div className="max-h-[800px] flex items-center justify-center overflow-hidden relative  w-full  ">
        {/* Gradient overlay for smooth fade effect */}
        <div
          className={`absolute top-0 h-16 left-0 right-0 bg-gradient-to-b to-transparent z-10 ${mode ? "from-neutral-900 via-neutral-900/100" : "from-white via-white/80"}`}
        ></div>
        <div
          className={`absolute left-0 right-0 bottom-0 h-16 bg-gradient-to-t to-transparent z-10 ${mode ? "from-neutral-900 via-neutral-900/100" : "from-white via-white/80"}`}
        ></div>

        <div className="animate-infinite-vertical self-center  grid grid-cols-1 w-fit lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-3 items-start mx-5">
          {Array(arrayCount())
            .fill(0)
            .map((_, colIndex) => (
              <div
                className="grid gap-3 justify-center"
                key={colIndex}
                style={{ animationDelay: `${colIndex * 0.5}s` }}
              >
                {duplicatedTestimonials
                  ?.filter((_, index) => index % arrayCount() === colIndex)
                  .map((testimonial, index) => (
                    <Testimonials
                      key={`${testimonial.id}-${index}`}
                      testimonial={testimonial}
                      mode={mode}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalTheme;

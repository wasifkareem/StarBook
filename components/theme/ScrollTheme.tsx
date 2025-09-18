import { CanvasProps } from "../layout/Canvas";
import Testimonials from "@/components/cards/Testimonials";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const ScrollTheme = ({ publicTestimonials, mode }: CanvasProps) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-[91%] md:my-10"
    >
      <CarouselContent className=" mx-3">
        {publicTestimonials.map((testimonial) => (
          <CarouselItem
            key={testimonial.id}
            className="md:basis-1/2 lg:basis-1/3 pl-2 xl:basis-1/4"
          >
            <div className="p-1">
              <Testimonials
                key={testimonial.id}
                testimonial={testimonial}
                mode={mode}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ScrollTheme;

import { Card, CardContent } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { Testimonial } from "@/lib/schemas/testimonial.schema";
import StarRatings from "react-star-ratings";
import TweetCard from "./TweetCard";
import Image from "next/image";

export interface TestimonialsProps {
  testimonial: Testimonial;
  mode: boolean | string;
}
const Testimonials = ({ testimonial, mode }: TestimonialsProps) => {
  const dateObj = new Date(testimonial.createdAt);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj,
  );
  const { state } = useAppContext();

  if (testimonial.tweet) {
    return (
      <div
        style={{
          boxShadow:
            mode == "true" || mode === true
              ? "0 0 22px rgba(0,0,0,0.12)"
              : "0 0 32px rgba(0,0,0,0.24)",
        }}
        className={` max-w-[354px]   ${
          mode == "true" || mode == true
            ? "bg-neutral-900 hover:bg-neutral-800 transition-all text-white "
            : " bg-card"
        } rounded-[15px]`}
      >
        <TweetCard
          isAdmin={false}
          imgPath={testimonial.imgPath}
          xId={testimonial.xId}
          Id={testimonial.id}
          key={testimonial.id}
          WOF={testimonial.WOF}
          name={testimonial.name}
          testimonial={testimonial?.testimonial}
          twitterHandle={testimonial?.twitterHandle}
          entities={testimonial?.entities}
          likes={testimonial?.likes}
          date={testimonial?.date}
          imgMedia={testimonial?.imgMedia}
          poster={testimonial?.poster}
          video={testimonial?.video}
          spaceId={testimonial.spaceId}
          createdAt={testimonial.createdAt}
        />
      </div>
    );
  }
  return (
    <Card
      style={{
        border: mode == "true" ? "none" : "",
        boxShadow:
          mode == "true" || mode === true
            ? "0 0 22px rgba(0,0,0,0.12)"
            : "0 0 32px rgba(0,0,0,0.24)",
      }}
      className={`relative border-none flex transition-all flex-col gap-2  ${
        mode == "true" || mode == true ? "bg-neutral-900" : ""
      } rounded-[15px]  px-5 py-4 pb-12 max-w-[354px]  md:h-fit ${
        mode == "true" || mode == true
          ? "hover:bg-neutral-800"
          : "hover:bg-gray-50"
      }`}
    >
      <CardContent>
        <div className=" flex justify-between items-center">
          <div className=" flex gap-2  items-center">
            <Image
              width={100}
              height={100}
              alt="pfp"
              className=" h-12 rounded-full w-12"
              src={testimonial.imgPath}
            />
            <div>
              <p
                style={{
                  color: mode == "true" || mode == true ? "white" : "#0f172a",
                }}
                className=" first-letter:uppercase font-semibold text-slate-900"
              >
                {testimonial.name}
              </p>
              {testimonial.title && (
                <p
                  className={` text-sm ${
                    mode == "true" || mode == true
                      ? "text-white"
                      : " text-gray-800"
                  }`}
                >
                  {testimonial.title}
                </p>
              )}
            </div>
          </div>
        </div>
        <StarRatings
          starRatedColor="#ffa534"
          rating={testimonial.starRating}
          starSpacing="2px"
          starDimension="20px"
        />
        <div
          style={{
            color: mode == "true" || mode == true ? "white" : "#0f172a",
          }}
          className={`first-letter:uppercase ${state.field == "sm" && "text-[13px] my-5"} ${state.field == "base" && "text-[15px] my-7"} ${state.field == "lg" && "text-[18px] my-10"}`}
        >
          {testimonial.testimonial}
        </div>
        <p
          style={{
            color: mode == "true" || mode == true ? "#b1afafda" : "#434d5acc",
          }}
          className=" text-sm text-slate-700 absolute bottom-3 left-4"
        >
          {formattedDate}
        </p>
      </CardContent>
    </Card>
  );
};

export default Testimonials;

import StarRatings from "react-star-ratings";
import TweetCard from "./TweetCard";

const Testimonials = ({
testimonial,
theme
}) => {
  const dateObj = new Date(testimonial.createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  if (testimonial.tweet) {
    return (
      <div
        className={` w-[354px]   ${
          theme == "true" || theme == true ? "bg-neutral-900 hover:bg-neutral-800 transition-all text-white " : "bg-white hover:bg-gray-50"
        } rounded-xl`}
      >
          <TweetCard
                    isAdmin={false}
                    imgPath={testimonial.imgPath}
                    xId={testimonial.xId}
                    Id={testimonial._id}
                    key={testimonial._id}
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
                    />
      </div>
    );
  }
  return (
    <div
      style={{
        border: theme == "true" ? "none" : "",
      }}
      className={`relative flex transition-all flex-col gap-2 border ${
        theme == "true" || theme == true ? "bg-neutral-900" : "bg-white"
      } rounded-xl  px-5 py-4 pb-12 w-[354px]  md:h-fit ${
        theme == "true" || theme == true
          ? "hover:bg-neutral-800"
          : "hover:bg-gray-50"
      }`}
    >
      <div className=" flex justify-between items-center">
        <div className=" flex gap-2  items-center">
          <img className=" h-12 rounded-full w-12" src={testimonial.imgPath} alt="" />
          <div>
            <p
              style={{
                color: theme == "true" || theme == true ? "white" : "#0f172a",
              }}
              className=" first-letter:uppercase font-semibold text-slate-900"
            >
              {testimonial.name}
            </p>
            {testimonial.title && (
              <p
                className={` text-sm ${
                  theme == "true" || theme == true
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
          color: theme == "true" || theme == true ? "white" : "#0f172a",
        }}
        className=" first-letter:uppercase"
      >
        {testimonial.text}
      </div>
      <p
        style={{
          color: theme == "true" || theme == true ? "#b1afafda" : "#434d5acc",
        }}
        className=" text-sm text-slate-700 absolute bottom-3 left-4"
      >
        {formattedDate}
      </p>
    </div>
  );
};

export default Testimonials;

import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import StarRatings from "react-star-ratings";
import { Tooltip } from "react-tooltip";
import { Tweet } from "react-tweet";
import TweetCard from "./TweetCard";

const Testimonials = ({
  email,
  imgPath,
  name,
  starRating,
  text,
  testimonial,
  createdAt,
  theme,
  tip,
  title,
  xId,
  tweet,
}) => {
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );

  if (tweet) {
    return (
      <TweetCard
        isAdmin={false}
        imgPath={testimonial.imgPath}
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
    );
  }
 
};

export default Testimonials;

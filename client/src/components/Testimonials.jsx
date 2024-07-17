import axios from "axios";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";

const Testimonials = ({
  email,
  imgPath,
  name,
  starRating,
  testimonial,
  createdAt,
}) => {
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  return (
    <div className=" relative flex flex-col gap-2 border bg-white border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
      <div className=" flex gap-2  items-center">
        <img className=" h-12 rounded-full w-12" src={imgPath} alt="" />
        <p className=" font-semibold text-slate-900">{name}</p>
      </div>
      <StarRatings
        starRatedColor="#ffa534"
        rating={starRating}
        starSpacing="2px"
        starDimension="20px"
      />
      <div className=" text-slate-900">{testimonial}</div>
      <p className=" text-slate-700 absolute bottom-3 left-4">
        {formattedDate}
      </p>
    </div>
  );
};

export default Testimonials;

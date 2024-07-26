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
  theme,
}) => {
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  return (
    <div
      style={{
        border: theme == "true" ? "none" : "",
      }}
      className={`relative flex flex-col gap-2 border ${
        theme == "true" || theme == true ? "bg-[#25282c]" : "bg-white"
      } rounded-lg w-full px-5 py-4 pb-12 md:min-w-72 md:max-w-[400px] md:min-h-64 ${
        theme == "true" || theme == true
          ? "hover:bg-[#34383b]"
          : "hover:bg-gray-100"
      }`}
    >
      <div className=" flex gap-2  items-center">
        <img className=" h-12 rounded-full w-12" src={imgPath} alt="" />
        <p
          style={{
            color: theme == "true" || theme == true ? "white" : "#0f172a",
          }}
          className=" font-semibold text-slate-900"
        >
          {name}
        </p>
      </div>
      <StarRatings
        starRatedColor="#ffa534"
        rating={starRating}
        starSpacing="2px"
        starDimension="20px"
      />
      <div
        style={{
          color: theme == "true" || theme == true ? "white" : "#0f172a",
        }}
      >
        {testimonial}
      </div>
      <p
        style={{
          color: theme == "true" || theme == true ? "white" : "#334155",
        }}
        className=" text-slate-700 absolute bottom-3 left-4"
      >
        {formattedDate}
      </p>
    </div>
  );
};

export default Testimonials;

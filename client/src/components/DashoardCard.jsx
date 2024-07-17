import axios from "axios";
import { useState } from "react";
import StarRatings from "react-star-ratings";

const DashoardCard = ({
  token,
  spaceId,
  email,
  imgPath,
  name,
  starRating,
  testimonial,
  Id,
  createdAt,
}) => {
  const [filled, setFilled] = useState(false);
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  const addToWall = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=true`,
      {},
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  };
  return (
    <div className="  relative flex flex-col gap-2 border border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
      <div className=" flex justify-between items-center">
        <label className=" bg-teal-800 text-white text-sm font-semibold px-5 py-1 rounded-3xl">
          Text
        </label>
        {filled ? (
          <img className=" h-7" src="/src/assets/h-filled.svg" alt="h-filled" />
        ) : (
          <button className=" cursor-pointer" onClick={addToWall}>
            <img
              className=" h-7"
              src="/src/assets/heart-empty.svg"
              alt="h-filled"
            />
          </button>
        )}
      </div>
      <StarRatings
        starRatedColor="#ffa534"
        rating={starRating}
        starSpacing="2px"
        starDimension="20px"
      />
      <div className=" text-slate-900">{testimonial}</div>
      <div className=" grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Name</p>
          <div className=" flex gap-2  items-center">
            <img className=" h-8 rounded-full w-8" src={imgPath} alt="" />
            <p className=" text-sm text-slate-900">{name}</p>
          </div>
        </div>
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Title</p>
          <div className=" flex items-center ">
            <p className=" text-sm text-slate-900">Company Name</p>
          </div>
        </div>
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Email</p>
          <div className=" flex gap-2  items-center">
            <p className=" text-sm text-slate-900">{email}</p>
          </div>
        </div>
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Submitted At:</p>
          <div className=" flex gap-2  items-center">
            <p className=" text-sm text-slate-900">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashoardCard;

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { ReloadCards } from "../redux/InfoRedux";
import { MdDelete } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";

const DashoardCard = ({
  token,
  spaceId,
  WOF,
  email,
  imgPath,
  name,
  starRating,
  testimonial,
  Id,
  createdAt,
}) => {
  const [overlay, setOverlay] = useState(false);
  const dateObj = new Date(createdAt);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  const dispatch = useDispatch();
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
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Successfully added to Wall of Fame!");
    }
  };
  const removeFromWall = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=false`,
      {},
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/testimonials/delete?spaceId=${spaceId}&testimonialId=${Id}`,

      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Deleted!");
    }
  };
  return (
    <div className=" transition-all relative flex flex-col gap-2 border border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
      {overlay ? (
        <div className=" rounded-lg flex flex-col justify-center items-center absolute top-0 bottom-0 right-0 left-0 bg-white z-50 gap-7">
          <p className="  text-xl text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold ">{name}</span>&#39;s testimonial?
          </p>
          <div className=" flex gap-3">
            <button
              className=" border border-slate-400 font-semibold text-red-800 px-2 py-1 rounded-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              className=" border border-slate-400 bg-slate-800 font-semibold text-slate-100 px-2 py-1 rounded-sm"
              onClick={() => setOverlay(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      <div className=" flex justify-between">
        <div>
          <div className=" flex justify-between items-center">
            <label className=" bg-teal-800 text-white text-sm font-semibold px-5 py-1 rounded-3xl">
              Text
            </label>
          </div>
          <div className=" flex justify-between">
            <StarRatings
              starRatedColor="#ffa534"
              rating={starRating}
              starSpacing="2px"
              starDimension="20px"
            />
          </div>
        </div>
        <div>
          <div className=" flex flex-col gap-2 items-cente&WOF=falser justify-center">
            {WOF ? (
              <button
                title=""
                className=" cursor-pointer"
                onClick={removeFromWall}
              >
                <IoMdHeart className=" text-red-600 hover:text-red-500 transition-all text-3xl " />
              </button>
            ) : (
              <button
                title="Add to Wall of Fame"
                className="  cursor-pointer"
                onClick={addToWall}
              >
                <CiHeart className="text-3xl fill-slate-700" />
              </button>
            )}
            <button>
              <MdDelete
                onClick={() => setOverlay(true)}
                className="text-3xl text-slate-400 transition-all hover:text-slate-800"
              />
            </button>
          </div>
        </div>
      </div>

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

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { ReloadCards } from "../redux/InfoRedux";
import { MdDelete } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoIosCheckbox, IoMdHeart } from "react-icons/io";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { FaSquareCheck } from "react-icons/fa6";

const DashoardCard = ({
  token,
  spaceId,
  WOF,
  email,
  imgPath,
  tip,
  name,
  starRating,
  testimonial,
  Id,
  createdAt,
  title,
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
      `https://starbook.onrender.com/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=true`,
      {}
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Successfully added to Wall of Fame!");
    }
  };
  const removeFromWall = async () => {
    const res = await axios.put(
      `https://starbook.onrender.com/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=false`,
      {}
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `https://starbook.onrender.com/api/testimonials/delete?spaceId=${spaceId}&testimonialId=${Id}`,

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
    <div className=" transition-all relative flex flex-col gap-2 shadow border border-slate-200 shadow-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
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
            <label className=" relative bg-teal-800 text-white text-sm font-semibold px-5 py-1 rounded-3xl">
              {tip && (
                <>
                  <RiMoneyRupeeCircleFill
                    data-tooltip-id="tip-tooltip"
                    data-tooltip-content="This is a tipped review, the tip amount might take some time to get reflected in razorpay dashboard."
                    className=" bg-slate-800 rounded-full text-yellow-500 text-xl z-1 absolute top-[-3px] left-[-4px]"
                  />
                  <Tooltip style={{ width: "180px" }} id="tip-tooltip" />
                </>
              )}
              <FaSquareCheck
                data-tooltip-id="tick-tip"
                data-tooltip-content="The reviewer has given permission to share this review for marketing efforts"
                className="absolute top-[-3px] right-[-4px] text-xl text-white bg-green-500  rounded"
              />
              <Tooltip id="tick-tip" style={{ width: "180px" }} />
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
              <>
                <button
                  title=""
                  className=" cursor-pointer"
                  onClick={removeFromWall}
                >
                  <IoMdHeart className=" text-red-600 hover:text-red-500 transition-all text-3xl " />
                </button>
              </>
            ) : (
              <>
                <Tooltip style={{ width: "180px" }} id="WOF-tooltip" />

                <button
                  data-tooltip-content="Add to Wall of fame"
                  data-tooltip-id="WOF-tooltip"
                  className="  cursor-pointer"
                  onClick={addToWall}
                >
                  <CiHeart className="text-3xl fill-slate-700" />
                </button>
              </>
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

      <div className=" text-slate-900 max-w-[720px]">{testimonial}</div>
      <div className=" grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Name</p>
          <div className=" flex gap-2  items-center">
            <img className=" h-8 rounded-full w-8" src={imgPath} alt="" />
            <p className=" text-sm text-slate-900 first-letter:uppercase">
              {name}
            </p>
          </div>
        </div>
        {title && (
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Title</p>
            <div className=" flex items-center ">
              <p className=" text-sm text-slate-900">{title}</p>
            </div>
          </div>
        )}
        {tip && (
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Tip Amount</p>
            <div className=" flex items-center ">
              <p className=" text-sm text-slate-900">INR {tip / 100}</p>
            </div>
          </div>
        )}
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

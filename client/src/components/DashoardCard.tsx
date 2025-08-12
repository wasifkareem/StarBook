import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";
import { ReloadCards } from "../redux/InfoRedux";
import { MdDelete } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { FaSquareCheck } from "react-icons/fa6";
import { Testimonial } from "@/pages/Dashboard";



const DashoardCard = ({
  testimonial,
}: {testimonial: Testimonial}) => {
  const [overlay, setOverlay] = useState(false);
  const dateObj = new Date(testimonial.createdAt);
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj
  );
  const dispatch = useDispatch();
  const addToWall = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/wall/update-wall?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}&WOF=true`,
      {}
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Successfully added to Wall of Fame!");
    }
  };
  const removeFromWall = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/wall/update-wall?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}&WOF=false`,
      {}
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
    }
  };

  const handleDelete = async () => {
    const res = await axios.delete(
      `http://localhost:3000/api/testimonials/delete?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}`,

    );
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Deleted!");
    }
  };
  return (
    <div className=" transition-all relative flex flex-col gap-2 shadow border bg-white border-slate-200 shadow-slate-300 rounded-lg w-full px-5 py-4 pb-12 max-w-5xl self-center">
      {overlay ? (
        <div className=" rounded-lg flex flex-col justify-center items-center absolute top-0 bottom-0 right-0 left-0 bg-white z-50 gap-7">
          <p className="  text-xl text-slate-600">
            Are you sure you want to delete{" "}
            <span className="font-semibold ">{testimonial.name}</span>&#39;s testimonial?
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
              {testimonial.tip && (
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
              rating={testimonial.starRating}
              starSpacing="2px"
              starDimension="20px"
            />
          </div>
        </div>
        <div>
          <div className=" flex flex-col gap-2 items-cente&WOF=falser justify-center">
            {testimonial.WOF ? (
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

      {/* <div className=" text-slate-900 max-w-[720px]">{testimonial}</div> */}
      <div className=" grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Name</p>
          <div className=" flex gap-2  items-center">
            <img className=" h-8 rounded-full w-8" src={testimonial.imgPath} alt="" />
            <p className=" text-sm text-slate-900 first-letter:uppercase">
              {testimonial.name}
            </p>
          </div>
        </div>
        {testimonial.title && (
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Title</p>
            <div className=" flex items-center ">
              <p className=" text-sm text-slate-900">{testimonial.title}</p>
            </div>
          </div>
        )}
        {testimonial.tip && (
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Tip Amount</p>
            <div className=" flex items-center ">
              <p className=" text-sm text-slate-900">INR {testimonial.tip / 100}</p>
            </div>
          </div>
        )}
        <div>
          <p className=" font-semibold text-slate-800 text-sm">Email</p>
          <div className=" flex gap-2  items-center">
            <p className=" text-sm text-slate-900">{testimonial.email}</p>
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

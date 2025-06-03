import axios from "axios";
import React from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Tweet } from "react-tweet";
import { ReloadCards } from "../redux/InfoRedux";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const TweetCard = ({ xId, Id, spaceId, WOF }) => {
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
      `https://starbook.onrender.com/api/testimonials/delete?spaceId=${spaceId}&testimonialId=${Id}`
    );
    if (res.status == 200) {
      dispatch(ReloadCards());
      toast.success("Deleted!");
    }
  };
  return (
    <div className=" max-h-fit relative w-[354px] border rounded-xl">
      <button className=" absolute top-[10px] right-20 z-10">
        <MdDelete
          onClick={handleDelete}
          className="text-3xl text-slate-400  transition-all hover:text-slate-800"
        />
      </button>
      {WOF ? (
        <button
          className=" absolute top-[14px] right-12 cursor-pointer z-10"
          onClick={removeFromWall}
        >
          <BsHeartFill className=" text-2xl text-red-500" />
        </button>
      ) : (
        <button
          className=" absolute top-[14px] right-12 cursor-pointer z-10"
          onClick={addToWall}
        >
          <BsHeart className=" text-2xl" />
        </button>
      )}
      <Tweet id={xId} />
    </div>
  );
};

export default TweetCard;

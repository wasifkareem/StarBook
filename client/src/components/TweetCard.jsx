"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Tweet } from "react-tweet";
import { ReloadCards } from "../redux/InfoRedux";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { getTweet } from "react-tweet/api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { FaCirclePlay } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { TweetRenderer } from "./helper-comp/TweetRenderer";

const TweetCard = ({
  xId,
  Id,
  imgPath,
  imgMedia,
  spaceId,
  WOF,
  name,
  testimonial,
  isAdmin,
  twitterHandle,
  poster,
  video,
  entities,
  likes,
  date,
}) => {
  let [isDel, setIsDel] = useState(false);
  let [isWallChange, setIsWallChange] = useState(false);

  const dispatch = useDispatch();

  const addToWall = async () => {
    setIsWallChange(true);
    const res = await axios.put(
      `https://starbook-1.onrender.com/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=true`,
      {}
    );
    if (res.status == 200) {
      setIsWallChange(false);
      dispatch(ReloadCards());
      toast.success("Successfully added to Wall of Fame!");
    }
  };

  const removeFromWall = async () => {
    setIsWallChange(true);
    const res = await axios.put(
      `https://starbook-1.onrender.com/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=false`,
      {}
    );
    if (res.status == 200) {
      setIsWallChange(false);
      dispatch(ReloadCards());
    }
  };

  const handleDelete = async () => {
    setIsDel(true);
    const res = await axios.delete(
      `https://starbook-1.onrender.com/api/testimonials/delete?spaceId=${spaceId}&testimonialId=${Id}`
    );
    if (res.status == 200) {
      setIsDel(false);
      dispatch(ReloadCards());
      toast.success("Deleted!");
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    const lightbox = GLightbox({
      loop: false,
      autoplayVideos: false,
      zoomable: false,
      draggable: false,
      slideEffect: "slide",
      moreText: "View more",
      touchNavigation: false,
      selector: ".glightbox",
    });
  }, []);

  return (
    <div className="flex flex-col p-5 px-4 max-h-fit relative w-[354px] border rounded-xl">
      <div className="flex justify-between items-center">
        <div className=" flex justify-between w-full items-center">
        <div className="flex gap-2 items-start">
          <img src={imgPath} alt="x-dp" className="  rounded-full" />
          <div className="flex flex-col leading-5">
            <p className="font-semibold">{name}</p>
            <p className="text-gray-500">@{twitterHandle}</p>
          </div>
        </div>
       {!isAdmin && <a
          target="_blank"
          className="hover:underline transition-all underline-offset-1"
          href={`https://x.com/${twitterHandle}/status/${xId}`}
          rel="noopener noreferrer"
        >
         <FaXTwitter className=" text-xl mb-6"/>
        </a>}
        </div>

        {isAdmin && (
          <div className="flex self-start w-fit">
            {WOF ? (
              <button className="cursor-pointer z-10" onClick={removeFromWall}>
                <BsHeartFill
                  className={`text-2xl text-red-500 ${
                    isWallChange && "animate-bounce"
                  }`}
                />
              </button>
            ) : (
              <button className="cursor-pointer z-10" onClick={addToWall}>
                <BsHeart
                  className={`text-2xl ${isWallChange && "animate-bounce"}`}
                />
              </button>
            )}
          </div>
        )}
      </div>
      <a
        className="mt-5"
        target="_blank"
        href={`https://x.com/${twitterHandle}/status/${xId}`}
        rel="noopener noreferrer"
      >
        <TweetRenderer text={testimonial} entities={entities} />
      </a>
      {imgMedia && (
        <a href={imgMedia} className="glightbox">
          <div className="bg-black rounded-lg overflow-hidden mt-5 my-2 shadow-sm shadow-gray-300 flex justify-center ">
            <img
              className=" max-h-96 "
              src={imgMedia}
              alt=""
            />
          </div>
        </a>
      )}
      {poster && (
        <a
          href={video}
          className="glightbox relative transition-all opacity-100 hover:opacity-80"
        >
          <div className="bg-black rounded-lg overflow-hidden mt-5 my-2 shadow-sm shadow-gray-300 flex justify-center">
            <img className="max-h-60" src={poster} alt="" />
          </div>
          <FaCirclePlay className="absolute top-[45%] left-[135px] text-5xl text-cyan-400" />
        </a>
      )}
      <div className="flex items-center gap-5 mt-4">
        <span className="flex items-center gap-1 md:gap-1">
          <BsHeart className="text-red-500" />
          {likes}
        </span>
        <a
          target="_blank"
          className="hover:underline transition-all underline-offset-1"
          href={`https://x.com/${twitterHandle}/status/${xId}`}
          rel="noopener noreferrer"
        >
          {formatDate(date)}
        </a>
      </div>
     {isAdmin && <div className="flex justify-center gap-3 mt-8 font-quicksand">
        <a
          target="_blank"
          href={`https://x.com/${twitterHandle}/status/${xId}`}
          className="flex gap-1 items-center w-fit px-3 py-1 border hover:border-gray-400 rounded-xl transition-all"
          rel="noopener noreferrer"
        >
          Imported from <FaXTwitter />
        </a>
        <button
          onClick={handleDelete}
          className="group z-10 flex justify-center hover:border-red-300 items-center min-w-24 border rounded-xl px-3 text-[#171717]"
        >
          {!isDel ? (
            <>
              Delete
              <MdDelete className="text-2xl text-[#171717] transition-all hover:text-slate-800" />
            </>
          ) : (
            <img
              className="m-2 h-4"
              src="/assets/Spinner@1x-1.0s-200px-200px.svg"
              alt=""
            />
          )}
        </button>
      </div>}
    </div>
  );
};

export default TweetCard;
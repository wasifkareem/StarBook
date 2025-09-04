"use client";

import React, { useEffect, useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import { FaCirclePlay } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { TweetRenderer } from "./helper-comp/TweetRenderer";
import { tweetSchema } from "@/lib/schemas/testimonial.schema";
import z from "zod";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const tweetPropsSchema = tweetSchema.extend({
  Id:z.string()
})

type tweetProps = z.infer<typeof tweetPropsSchema>

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
}:tweetProps) => {
  let [isDel, setIsDel] = useState(false);
  let [isWallChange, setIsWallChange] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const {setReloadCards,state} = useAppContext()

  const addToWall = async () => {
    setIsWallChange(true);
    const res = await fetch(
      `/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=true`,
      {
        method:'PUT'
      }
    );
    if (res.ok) {
      setIsWallChange(false);
      setReloadCards(!state.reloadCards)
      toast.success("Successfully added to Wall of Fame!");
    }
  };

  const removeFromWall = async () => {
    setIsWallChange(true);
    const res = await fetch(
      `/api/wall/update-wall?spaceId=${spaceId}&testimonialId=${Id}&WOF=false`,
      {
        method:'PUT'
      }
    );
    if (res.ok) {
      setIsWallChange(false);
      setReloadCards(!state.reloadCards)
    }
  };

  const handleDelete = async () => {
    setIsDel(true);
    const res = await fetch(
      `/api/testimonials/delete?spaceId=${spaceId}&testimonialId=${Id}`,{
        method:'DELETE'
      }
    );

    if(!res.ok){
      toast('Failed to delete testimonails, try again later!!!')
      return
    }
    if (res.ok) {
      setIsDel(false);
      setReloadCards(!state.reloadCards);
      toast.success("Deleted!");
    }
  };

  function formatDate(dateString:string) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  useEffect(() => {
    const initLightbox = async () => {
      if (typeof window !== 'undefined') {
        const GLightbox = (await import('glightbox')).default;
        await import('glightbox/dist/css/glightbox.min.css');
        
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
      }
    };

    initLightbox();
  }, []);
  return (
    <Card className={`w-full border-none max-w-sm ${isAdmin? "bg-card":"bg-inherit text-inherit"} `} >
      <CardContent>

      <div className="flex justify-between items-center">
        <div className=" flex justify-between w-full items-center">
        <div className="flex gap-2 items-start">
          <img src={imgPath} alt="x-dp" className="  rounded-full" />
          <div className={`flex flex-col leading-5 text-${state.field}`}>
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
         <FaXTwitter className=" border border-white p-1 text-2xl rounded-md mb-6"/>
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
        target="_blank"
        href={`https://x.com/${twitterHandle}/status/${xId}`}
        rel="noopener noreferrer"
      >
        <TweetRenderer text={testimonial} entities={entities} />
      </a>
      {imgMedia && (
        <a href={imgMedia} className="glightbox">
          <div className="bg-black rounded-lg overflow-hidden mt-5 my-2  flex justify-center ">
            <img
             className={`max</a>-h-96 transition-all duration-300 ${
              imageLoaded ? 'blur-0' : 'blur-md opacity-50'
            }`}
              src={imgMedia}
              alt=""
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
            />
          </div>
        </a>
      )}
      {poster && (
        <a
          href={video}
          className="glightbox relative transition-all opacity-100 hover:opacity-80"
        >
          <div className="bg-black rounded-lg overflow-hidden mt-5 my-2 flex justify-center">
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
      <Button variant="default" className=" hover:cursor-pointer">
        <a
          target="_blank"
          href={`https://x.com/${twitterHandle}/status/${xId}`}
          className="flex gap-1 items-center w-fit "
          rel="noopener noreferrer"
          >
          Imported from <FaXTwitter />
        </a>
          </Button>
        <Button
        variant="outline"
         className=" hover:border hover:cursor-pointer hover:border-red-300 hover:text-black hover:bg-white min-w-24"
          onClick={handleDelete}
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
        </Button>
      </div>}
      </CardContent>

    </Card>
  );
};

export default TweetCard;
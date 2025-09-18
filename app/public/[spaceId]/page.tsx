'use client'

import { ReactNode, use, useEffect, useState } from "react";
import Loader from "@/components/layout/Loader";
import ReviewBox from "@/components/dialog/ReviewBox";
import { SpaceInfo } from "@/lib/schemas/space.schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ReviewPage = ({params}:{params:Promise<{ spaceId: string }>}) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>();
  const [toggle, setToggle] = useState<boolean>(false);
  const {spaceId} = use(params);

  useEffect(() => {
    const getSpace = async () => {
      const res = await fetch(
        `/api/space/fetch-reviewInfo?spaceId=${spaceId}`
      );
      if(!res.ok){
        toast.error('Failed to fetch this page, try again later!');
        return;
      }
      if(res.ok){
        const data = await res.json();
        setSpaceInfo(data)
      }
    };
    getSpace();
  }, []);

  const handleClick = () => {
    setToggle(true);
  };
  if (!spaceInfo) {
    return <Loader />;
  }

  return (
    <>
      {toggle ? (
        <ReviewBox
          setToggle={setToggle}
          spaceInfo={spaceInfo}
        />
      ) : null}
      <div className=" overflow-y-auto font flex flex-col justify-center w-full">
        <img
          className=" h-32 w-32 object-cover self-center mt-20 rounded-lg"
          src={spaceInfo?.imgPath ? spaceInfo?.imgPath : "/assets/review.png"}
          alt=""
        />

        <h1 className=" self-center font-bold text-slate-700 text-4xl mt-10">
          {spaceInfo?.headerTitle}
        </h1>
        <p className=" text-slate-600 self-center mt-2 text-lg md:max-w-96 text-center">
          {spaceInfo?.message}
        </p>
        <div className=" mx-12 flex flex-col md:self-center">
          <p className=" font-semibold text-lg mt-10 md:mt-20 md:text-xl ">
            {" "}
            QUESTIONS
          </p>
          <hr className=" w-8 h-1 bg-cyan-700 mt-2" />
          <ul className="  text-slate-700 mt-5 list-disc md:text-lg">
            <li>{spaceInfo?.qOne}</li>
            <li>{spaceInfo?.qTwo}</li>
            <li>{spaceInfo?.qThree}</li>
          </ul>
        </div>
        <div className=" flex gap-3 justify-center">
          <Button
          variant="secondary"
            onClick={handleClick}
            className=" w-4/5 md:w-80 mt-6 h-12 cursor-pointer"
          >
            Send Text
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import ReviewBox from "../components/ReviewBox";
import { SpaceInfo } from "./Dashboard";

const ReviewPage = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo>();
  const [toggle, setToggle] = useState<boolean>(false);
  const location = useLocation();
  const spaceId = location.pathname.split("/")[2];

  useEffect(() => {
    const getSpace = async () => {
      const res = await axios(
        `https://starbook-1.onrender.com/api/space/fetch-reviewInfo?spaceId=${spaceId}`
      );
      setSpaceInfo(res?.data);
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
          toggle={toggle}
          setToggle={setToggle}
          spaceInfo={spaceInfo}
        />
      ) : null}
      <div className=" overflow-y-auto flex flex-col justify-center w-full">
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
          <button
            onClick={handleClick}
            className=" w-4/5 md:w-80 mb-5 md:mb-14 bg-cyan-600 self-center py-3 mt-6 text-white font-semibold text-lg rounded-sm"
          >
            Send Text
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;

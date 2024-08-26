import { useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isVideo, setIsVideo] = useState(false);
  return (
    <div>
      <div className=" flex  justify-center items-center h-[500px] p-10 gap-5">
        <div className="text-2xl font-mono bg-red-500 px-8 h-fit flex flex-col gap-32 p-4 py-6 rounded-xl  ">
          {" "}
          <p className=" text-xl text-white  font-mono ">
            Welcome to <strong>StarBook</strong>, manage all Your <br />
            testimonials in one place, and use our <br /> embed to showcase them
            on your website
          </p>
          <div className=" flex gap-3">
            <Link
              to="/sign-up"
              className=" rounded-3xl text-xl px-2 py-2  bg-white"
            >
              Get started for free
            </Link>
            <Link
              to="/sign-in"
              className=" rounded-3xl text-xl px-2 py-2 border-solid  text-white border border-white"
            >
              Login
            </Link>
          </div>
        </div>
        {/* <div className=" border rounded-lg">
          <video
            controls
            className=" rounded-lg h-[310px]"
            src="http://res.cloudinary.com/domd44kuh/video/upload/v1698722170/ynmhor7ijlh4s7vxlhsj.mp4"
          ></video>
        </div> */}
      </div>
    </div>
  );
};

export default LandingPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const LandingPage = () => {
  const [isVideo, setIsVideo] = useState(false);
  return (
    <div className=" md:mt-5  ">
      <div className="  flex  flex-col md:flex-row justify-center items-end md:h-[500px] md:mb-10  p-10 gap-5">
        <div className="  md:text-2xl font-mono bg-red-500 md:w-2/5 px-8 h-fit flex flex-col gap-32 p-4 py-6 rounded-xl  ">
          {" "}
          <p className=" text-xl text-white  font-mono ">
            Welcome to <strong>StarBook</strong>, manage all Your <br />
            testimonials and Tips in one place, and use our embed to showcase
            them on your website
          </p>
          <div className=" flex gap-3 justify-center items-center">
            <Link
              to="/sign-up"
              className=" rounded-3xl md:text-2xl px-2 py-2  underline text-white"
            >
              Signup
            </Link>
            <Link
              to="/sign-in"
              className="  rounded-3xl md:text-2xl px-2 py-2  underline text-white"
            >
              Login
            </Link>
            <a
              href="https://codepen.io/Wasif-Kareem/pen/OJeExjy?editors=1000"
              target="_blank"
              className=" rounded-3xl md:text-2xl px-4 shadow shadow-white py-2 border-solid text-slate-800 border bg-white"
            >
              Live Demo
            </a>
            <a href="https://github.com/wasifkareem/StarBook" target="_blank">
              <FaGithub className=" opacity-35 md:text-5xl transition-all hover:opacity-55" />
            </a>
          </div>
        </div>
        <div className="  md:w-[58%] border-4 border-white rounded-lg overflow-hidden">
          <iframe
            className=" md:h-[450px] "
            width="100%"
            src="https://www.youtube.com/embed/Nqh90T8i8eI?si=m7u7cTpdzSBdeCQe"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

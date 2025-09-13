import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { MeshGradient, DotOrbit } from "@paper-design/shaders-react";


const Home = () => {
  return (
    <>
      <div className="relative flex w-full justify-center">
        {/* Subtle backdrop hint */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100/30 to-gray-200/20 rounded-[100px] blur-sm opacity-50"></div>

        <DotOrbit
          colors={["#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6"]}
          colorBack={"#edeff0"}
          scale={0.9}
          sizeRange={0.8}
          speed={0.4}
          spreading={1000000}
          className="relative w-[90%] opacity-90 md:mt-32 border rounded-[100px] overflow-hidden backdrop-blur-sm"
        >
          <div className="md:pt-20 z-10 ">
            <div className="flex flex-col items-center md:pb-10 p-10 gap-8">
              <div className="text-lg flex flex-col justify-center md:text-2xl font-mono">
                <p className="text-3xl md:text-5xl font-light text-center font-mono text-gray-800">
                  Tweets as Testimonails,
                  <span
                    className="font-normal"
                    style={{
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    XMonials
                  </span>
                </p>
                <p className="text-lg my-12 text-gray-600 bg-[#ffffff62] shadow-2xl shadow-white font-light max-w-2xl self-center text-center">
                  People talking about your Startup on X? use it as testimonails
                  on you website
                </p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/sign-up"
                  className="rounded-full text-base md:text-lg px-6 py-3 bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  Signup
                </Link>
                <Link
                  href="/sign-in"
                  className="rounded-full text-base md:text-lg px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
                <a
                  href="https://codepen.io/Wasif-Kareem/pen/OJeExjy?editors=1000"
                  target="_blank"
                  className="rounded-full text-base md:text-lg px-6 py-3 bg-white border border-gray-200 text-gray-800 hover:shadow-md transition-shadow"
                >
                  Live Demo
                </a>
                <a
                  href="https://github.com/wasifkareem/StarBook"
                  target="_blank"
                >
                  <FaGithub className="opacity-40 text-4xl transition-all hover:opacity-60 text-gray-700" />
                </a>
              </div>
              <div className="md:w-[80%] border border-gray-200 shadow-lg rounded-xl overflow-hidden bg-white">
                <iframe
                  className="md:h-[750px]"
                  width="100%"
                  src="https://www.youtube.com/embed/gaiyO3RZB6E?si=405LXf0p57uxZ9n2"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </DotOrbit>
      </div>
    </>
  );
};

export default Home;

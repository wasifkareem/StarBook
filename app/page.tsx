import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Home = () => {
  return (
    <>
      <div className="relative">
        <img
          className="absolute -z-10 -top-80 opacity-10"
          src="/assets/matrix.svg"
          style={{
            maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
          }}
        />
      </div>
      <div className="md:mt-44 z-10">
        <div className="flex flex-col items-center md:mb-10 p-10 gap-5">
          <div className="text-lg md:text-2xl font-mono">
            <p className="text-2xl md:text-6xl font-semibold text-center font-mono">
              Welcome to{" "}
              <span
                style={{
                  textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)",
                }}
              >
                StarBook
              </span>
            </p>
            <p className="text-lg my-10">
              Manage all Your testimonials and Tips in one place, and use our
              embed to showcase them on your website
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/sign-up"
              className="rounded-3xl text-base md:text-2xl px-2 py-2 underline"
            >
              Signup
            </Link>
            <Link
              href="/sign-in"
              className="rounded-3xl text-base md:text-2xl px-2 py-2 underline"
            >
              Login
            </Link>
            <a
              href="https://codepen.io/Wasif-Kareem/pen/OJeExjy?editors=1000"
              target="_blank"
              className="rounded-3xl text-base md:text-2xl px-4 shadow shadow-white py-2 border-solid text-slate-800 border bg-white"
            >
              Live Demo
            </a>
            <a
              href="https://github.com/wasifkareem/StarBook"
              target="_blank"
            >
              <FaGithub className="opacity-35 text-5xl transition-all hover:opacity-55" />
            </a>
          </div>
          <div className="md:w-[80%] border-1 border-gray-700 shadow-xl shadow-gray-300 rounded-lg overflow-hidden">
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
    </>
  );
};

export default Home;

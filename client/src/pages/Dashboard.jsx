import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Wall from "../components/Wall";
import DashoardCard from "../components/DashoardCard";

const Dashboard = () => {
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [wallPageToggle, setWallPageToggle] = useState(false);
  const location = useLocation();
  const spaceId = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state?.user?.currentUser);
  const [testimonials, setTestimonials] = useState([]);
  console.log(testimonials);
  console.log(spaceInfo);

  useEffect(() => {
    const getSpace = async () => {
      const res = await axios(
        `http://localhost:3000/api/space/fetch-space?spaceId=${spaceId}`,

        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setSpaceInfo(res?.data);
    };
    getSpace();
  }, []);

  useEffect(() => {
    const getTestimonials = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/testimonials/fetch-all?spaceId=${spaceId}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setTestimonials(res?.data);
    };
    getTestimonials();
  }, []);

  const publicTestimonials = testimonials.filter(
    (testimonial) => testimonial.WOF === true
  );
  console.log(publicTestimonials);
  if (!spaceInfo || !testimonials) {
    return <Loader />;
  }

  return (
    <>
      {wallPageToggle ? (
        <Wall
          spaceId={spaceId}
          publicTestimonials={publicTestimonials}
          setWallPageToggle={setWallPageToggle}
        />
      ) : null}
      <Navbar />
      <hr />
      <div className=" flex w-full justify-between py-4 px-5 ">
        <div className=" w-fit flex gap-3 items-center">
          <img
            className=" hidden md:block w-20 object-cover rounded-lg h-20"
            src={
              spaceInfo?.imgPath ? spaceInfo?.imgPath : "/src/assets/review.png"
            }
            alt=""
          />
          <div>
            <h1 className=" text-4xl font-semibold text-slate-800 font-sans ">
              {spaceInfo?.spaceName}
            </h1>
            <p className=" text-slate-500">
              Space public url :
              <Link
                style={{ overflowWrap: "anywhere" }}
                className=" underline"
                target="_blank"
                rel="noopener noreferrer"
                to={`/${spaceInfo?._id}`}
              >
                {" "}
                {window.location.origin}/{spaceInfo?._id}
              </Link>
            </p>
          </div>
        </div>
        <button className=" bg-slate-800 font-semibold text-white rounded-md px-3 py-1 h-fit md:self-center">
          Wall of fame
        </button>
      </div>
      <hr />
      <div className=" flex flex-col md:flex-row">
        <div className=" md:w-2/6 flex flex-col gap-1 md:mt-7 md:ml-3 md:mx-2 ">
          <button className=" w-full hover:bg-slate-200 transition-colors  bg-slate-100 font-semibold text-slate-800 text-start px-4 py-2 rounded-md ">
            All
          </button>
          <button
            onClick={() => setWallPageToggle(true)}
            className=" w-full hover:bg-slate-200 transition-colors  font-semibold text-slate-800 text-start px-4 py-2 rounded-md "
          >
            Wall of Fame
          </button>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`/${spaceInfo?._id}`}
          >
            <button className=" w-full hover:bg-slate-200  transition-colors font-semibold text-slate-800 text-start px-4 py-2 rounded-md ">
              Public landing page
            </button>
          </Link>
          <button className=" w-full hover:bg-slate-200 transition-colors  font-semibold text-slate-800 text-start px-4 py-2 rounded-md ">
            Edit Space
          </button>
        </div>
        <div className=" md:w-4/6 grid md:grid-cols-1 grid-cols-1 md:flex-row flex-col gap-3  m-3 ">
          {testimonials.map((testimonial) => (
            <DashoardCard
              token={token}
              spaceId={spaceId}
              email={testimonial.email}
              key={testimonial._id}
              Id={testimonial._id}
              imgPath={testimonial.imgPath}
              name={testimonial.name}
              starRating={testimonial.starRating}
              testimonial={testimonial.testimonial}
              createdAt={testimonial.createdAt}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

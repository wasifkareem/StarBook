import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Wall from "../components/Wall";
import DashoardCard from "../components/DashoardCard";
import EditSpace from "../components/EditSpace";
import AddSpace from "../components/AddSpace";
import Razorpaykeys from "../components/Razorpaykeys";
import RPDash from "../components/RPDash";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import Switch from "react-switch";

const Dashboard = () => {
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [wallPageToggle, setWallPageToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const [keyToggle, setKeyToggle] = useState(false);
  const location = useLocation();
  const { ReloadSpaceInfo } = useSelector((state) => state?.info);
  const spaceId = location.pathname.split("/")[3];
  const { ReloadCards } = useSelector((state) => state?.info);
  const [testimonials, setTestimonials] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const { userId } = useAuth();
  const { isKey } = useSelector((state) => state?.pay);
  const [RPInfo, setRPInfo] = useState();
  useEffect(() => {
    const getSpace = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/space/fetch-space?spaceId=${spaceId}`
      );
      setSpaceInfo(res?.data);
      setTestimonials(res.data.testimonials);
    };
    getSpace();
  }, [ReloadSpaceInfo, ReloadCards]);

  useEffect(() => {
    if (isKey) {
      const getData = async () => {
        try {
          setIsFetching(true);
          const res = await axios.get(
            `http://localhost:3000/api/tip/fetch-payments?userId=${userId}&label=${spaceId}`
          );
          setRPInfo(res.data);
          setIsFetching(false);
        } catch (error) {
          if (error.response.status === 401) {
            setIsFetching(false);
            toast.error(
              "Authentication failed, please check the keys and Re-enter!"
            );
          }
        }
      };

      getData();
    }
  }, [userId, isKey, spaceInfo]);

  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const publicTestimonials = testimonials?.filter(
    (testimonial) => testimonial.WOF === true
  );
  if (!spaceInfo) {
    return <Loader />;
  }

  return (
    <>
      {toggle ? (
        <AddSpace spaceInfo={spaceInfo} setToggle={setToggle} isEdit={true} />
      ) : null}
      {wallPageToggle ? (
        <Wall
          spaceId={spaceId}
          publicTestimonials={publicTestimonials}
          setWallPageToggle={setWallPageToggle}
        />
      ) : null}
      <hr />
      <div className=" flex flex-col md:flex-row w-full md:h-40 justify-between py-4 px-5 ">
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
            <p className=" text-slate-500 md:mt-1">
              Space public url :
              <Link
                style={{ overflowWrap: "anywhere" }}
                className=" underline"
                target="_blank"
                rel="noopener noreferrer"
                to={`/public/${spaceInfo?._id}`}
              >
                {" "}
                {window.location.origin}/{spaceInfo?._id}
              </Link>
            </p>
          </div>
        </div>
        {isKey ? (
          isFetching ? (
            <div className=" border md:w-[430px] border-slate-200 text-white px-6 py-3 rounded">
              <Skeleton count={2} className=" w-5/6 h-6 " />
              <Skeleton count={1} className=" w-2/6 h-8 " />
            </div>
          ) : (
            <RPDash RPInfo={RPInfo} spaceInfo={spaceInfo} />
          )
        ) : (
          <div className=" md:w-[430px] border border-slate-300 flex flex-col  justify-between px-3 py-6 rounded text-slate-800">
            <p className=" text-center text font-mono">
              {" "}
              Add Razorpay keys to enable tip jar
            </p>
            <Switch
              className=" self-center"
              onChange={handleChange}
              checked={checked}
            />
          </div>
        )}
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
          <button
            onClick={() => setToggle(true)}
            className=" w-full hover:bg-slate-200 transition-colors  font-semibold text-slate-800 text-start px-4 py-2 rounded-md "
          >
            Edit Space
          </button>
        </div>
        <div className=" md:w-4/6 grid md:grid-cols-1 grid-cols-1 md:flex-row flex-col gap-3  m-3 ">
          {testimonials?.length === 0 ? (
            <p className=" text-center text-2xl md:text-4xl font-semibold text-slate-200 md:mt-40 mt-12">
              No Testimonials! Send the public URL to your best customers and
              ask them for feedback.{" "}
            </p>
          ) : !testimonials ? (
            <>
              <div className=" transition-all relative flex flex-col gap-2 border border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
                <Skeleton className=" w-16 h-6 rounded-xl" />
                <Skeleton wrapper={starWrapper} count={5} className=" h-full" />
                <Skeleton count={2} className=" w-4/5 h-6 " />
                <div className="grid grid-cols-2 gap-3 w-4/5 mt-4">
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                </div>
              </div>
              <div className=" transition-all relative flex flex-col gap-2 border border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
                <Skeleton className=" w-16 h-6 rounded-xl" />
                <Skeleton wrapper={starWrapper} count={5} className=" h-full" />
                <Skeleton count={2} className=" w-4/5 h-6 " />
                <div className="grid grid-cols-2 gap-3 w-4/5 mt-4">
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                  <Skeleton className=" h-7 " />
                </div>
              </div>
            </>
          ) : (
            <div className=" transition-all flex flex-col gap-3">
              {testimonials?.toReversed().map((testimonial) => (
                <DashoardCard
                  spaceId={spaceId}
                  email={testimonial.email}
                  key={testimonial._id}
                  Id={testimonial._id}
                  imgPath={testimonial.imgPath}
                  name={testimonial.name}
                  starRating={testimonial.starRating}
                  testimonial={testimonial.testimonial}
                  createdAt={testimonial.createdAt}
                  WOF={testimonial.WOF}
                  tip={testimonial.tip}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const starWrapper = ({ children }) => {
  return (
    <div
      style={{
        display: "inline-block",
        clipPath:
          "polygon(50% 4%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
        width: "32px",
        height: "32px",
      }}
    >
      {children}
    </div>
  );
};
export default Dashboard;

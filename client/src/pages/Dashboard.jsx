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
import { SiRazorpay } from "react-icons/si";
import { MdVpnKey } from "react-icons/md";
import RPDash from "../components/RPDash";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [spaceInfo, setSpaceInfo] = useState(null);
  const [wallPageToggle, setWallPageToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [keyToggle, setKeyToggle] = useState(false);
  const location = useLocation();
  const { ReloadSpaceInfo } = useSelector((state) => state?.info);
  const spaceId = location.pathname.split("/")[2];
  const { token } = useSelector((state) => state?.user?.currentUser);
  const { ReloadCards } = useSelector((state) => state?.info);
  const [testimonials, setTestimonials] = useState(null);
  const [isKeyCleared, setIsKeyCleared] = useState(true);
  const { email } = useSelector(
    (state) => state?.user?.currentUser?.userObject
  );
  const { isKey } = useSelector((state) => state?.pay);
  console.log(isKey);
  const [RPInfo, setRPInfo] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isKey) {
      const getData = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/tip/fetch-payments?email=${email}&label=${spaceInfo?._id}`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
            }
          );
          setRPInfo(res.data); // Update state with successful response
        } catch (error) {
          if (error.response.status === 401) {
            toast.error(
              "Authentication failed, please check the keys and Re-enter!"
            );
          }
        }
      };

      getData();
    }

    return () => {};
  }, [email, isKey]);
  useEffect(() => {
    const getSpace = async () => {
      const res = await axios.get(
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
  }, [ReloadSpaceInfo]);

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
  }, [ReloadCards]);

  const publicTestimonials = testimonials?.filter(
    (testimonial) => testimonial.WOF === true
  );
  if (!spaceInfo || !testimonials) {
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
      <Navbar />
      <hr />
      <div className=" flex flex-col md:flex-row w-full justify-between py-4 px-5 ">
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
        {isKey ? (
          <RPDash RPInfo={RPInfo} spaceInfo={spaceInfo} />
        ) : (
          <div className=" border border-slate-300 flex flex-col justify-center px-5 rounded text-slate-800">
            <p> Add Razorpay keys to enable tip jar</p>
            <button
              onClick={() => setKeyToggle(true)}
              className=" bg-blue-900 text-white font-semibold rounded self-end mt-2 px-2 py-1"
            >
              Enable
            </button>
          </div>
        )}
        {keyToggle ? <Razorpaykeys setKeyToggle={setKeyToggle} /> : null}
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
          ) : (
            <div className=" transition-all flex flex-col gap-3">
              {testimonials?.map((testimonial) => (
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
                  WOF={testimonial.WOF}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

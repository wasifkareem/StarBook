import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/store";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaPenFancy } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { SiPlatformdotsh } from "react-icons/si";
import { VscPreview } from "react-icons/vsc";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation } from "react-router-dom";
import z from "zod";
import AddSpace from "../components/AddSpace";
import DashoardCard from "../components/DashoardCard.jsx";
import Insights from "../components/Insights.jsx";
import Loader from "../components/Loader.jsx";
import TwitterCard from "../components/TwitterCard.jsx";
import Wall from "../components/Wall.jsx";


const testimonialSchema = z.object({
  id: z.string(),
  createdAt: z.string(), 
  updatedAt: z.string(),
  imgPath: z.string(),
  starRating: z.number().optional(),
  testimonial: z.string(),
  name: z.string(),
  email: z.string().optional(),
  WOF: z.boolean(),
  tweet: z.boolean(),
  xId: z.string().optional(),
  tip: z.number().optional(),
  title: z.string().optional(),
  twitterHandle: z.string().optional(),
  entities: z.any().optional(),
  likes: z.number().optional(),
  imgMedia: z.string().optional(),
  date: z.string().optional(),
  poster: z.string().optional(),
  video: z.string().optional(),
  spaceId: z.string(),
});

export const spaceInfoSchema = z.object({
  id: z.string(),
  createdAt: z.iso.datetime(), 
  updatedAt: z.string(),
  ownerEmail: z.email(),
  spaceName: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  imgPath: z.string().optional().nullable(),
  headerTitle: z.string(),
  message: z.string(),
  tipBox: z.boolean().optional().nullable(),
  testimonials: z.array(testimonialSchema),
});

export type SpaceInfo = z.infer<typeof spaceInfoSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
 
const Dashboard = () => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo|null>(null);

  const [wallPageToggle, setWallPageToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [insightsToggle, setInsightsToggle] = useState(false);
  const [isBtn, setIsBtn] = useState("All");
  const location = useLocation();

  const { ReloadSpaceInfo } = useAppSelector((state) => state?.info);
  const spaceId = location.pathname.split("/")[3];
  const { ReloadCards } = useAppSelector((state) => state?.info);
  const [testimonials, setTestimonials] = useState<[Testimonial]|null>(null);
  const publicTestimonials = testimonials?.filter((t)=>t.WOF===true)
  const { userId } = useAuth();
  const manualTestimonials = testimonials?.filter((t)=>t.tweet==false);
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
  if (!spaceInfo) {
    return <Loader />;
  }
console.log(testimonials)
  return (
    <>
      {insightsToggle ? (
        <Insights
          insightsToggle={insightsToggle}
          spaceInfo={spaceInfo}
          setInsightsToggle={setInsightsToggle}
        />
      ) : null}
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
            src={spaceInfo?.imgPath ? spaceInfo?.imgPath : "/assets/review.png"}
            alt=""
          />
          <div>
            <div className=" flex gap-4">
              <h1 className=" text-4xl font-semibold text-slate-800 font-sans ">
                {spaceInfo?.spaceName}
              </h1>
              <Button
              variant="outline"
                onClick={() => setInsightsToggle(true)}
                
              >
                Generate Insights <FaPenFancy className=" " />
              </Button>
            </div>
            <p className=" text-slate-500 md:mt-1">
              Space public url :
              <Link
                style={{ overflowWrap: "anywhere" }}
                className=" underline"
                target="_blank"
                rel="noopener noreferrer"
                to={`/public/${spaceInfo?.id}`}
              >
                {" "}
                {window.location.origin}/{spaceInfo?.id}
              </Link>
            </p>
          </div>
        </div>
        {/* {isKey ? (
          <RPDash spaceInfo={spaceInfo} spaceId={spaceId} />
        ) : (
          <div className=" md:w-[430px] border border-slate-300 flex flex-col  justify-between  items-center py-6 rounded text-slate-800">
            <p className="  text-sm font-mono md:w-96 text-center">
              {" "}
              Add your Razorpay account by navigating to{" "}
              <span className=" font-semibold ">
                Manage Account &gt; Razorpay Details
              </span>{" "}
              and allow your happy customers to tip you while leaving reviews.
            </p>
          </div>
        )} */}
      </div>
      <hr />
      <div className=" flex flex-col md:flex-row">
        <div className=" md:w-1/4 bg-gray-50 h-screen  flex flex-col gap-1 md:pt-7 md:pl-3 md:px-2 ">
          <button
            onClick={() => setIsBtn("All")}
            className={` w-full flex gap-2 items-center hover:bg-slate-200 transition-colors  ${
              isBtn === "All" && "bg-slate-200"
            } text-slate-800 text-start px-4 py-2 rounded-md `}
          >
            <VscPreview />
            All
          </button>
          <button
            onClick={() => setIsBtn("Twitter")}
            className={` w-full hover:bg-slate-200 flex gap-2 items-center transition-colors  ${
              isBtn === "Twitter" && "bg-slate-200"
            }  text-slate-800 text-start px-4 py-2 rounded-md `}
          >
            <BsTwitterX/>
            Twitter
          </button>
          <button
            onClick={() => setWallPageToggle(true)}
            className=" w-full flex gap-2 items-center hover:bg-slate-200 transition-colors   text-slate-800 text-start px-4 py-2 rounded-md "
          >
            <IoMdHeartEmpty className=" text-xl"/>
            Wall of Fame
          </button>
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to={`/public/${spaceInfo?.id}`}
          >
            <button className=" w-full flex gap-2 items-center hover:bg-slate-200  transition-colors  text-slate-800 text-start px-4 py-2 rounded-md ">
              <SiPlatformdotsh/>
              Public landing page
            </button>
          </Link>
          <button
            onClick={() => setToggle(true)}
            className=" w-full flex gap-2 items-center hover:bg-slate-200 transition-colors   text-slate-800 text-start px-4 py-2 rounded-md "
          >
            <MdEdit className=" text-lg" />
            Edit Space
          </button>
        </div>
        {/* <hr className=" w-[1px] h-[500px] bg-gray-200 mt-10 mx-10" /> */}
        <div className=" md:w-3/4 grid md:grid-cols-1 grid-cols-1 md:flex-row lg:mx-36 flex-col gap-3  m-3 ">
          {manualTestimonials?.length === 0 && isBtn !== "Twitter" ? (
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
            <div className=" transition-all flex  md:mt-10 flex-col gap-3">
              {isBtn === "All" &&
                testimonials
                  ?.filter((t) => !t.tweet)
                  ?.toReversed()
                  .map((testimonial) => (
                    <DashoardCard
                    key={testimonial.id}
                      testimonial={testimonial}
                    />
                  ))}
              {isBtn === "Twitter" && (
                <TwitterCard spaceId={spaceId} testimonials={testimonials} />
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
const starWrapper = ({ children }: { children?: React.ReactNode }) => {
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

'use client'

import { Button } from "@/components/ui/button";
import { GalleryHorizontalEnd, Heart, SquarePen, StickyNote, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPenFancy } from "react-icons/fa";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import z from "zod";
import AddSpace from "@/components/AddSpace";
import Loader from "@/components/Loader";
import Link from "next/link";

// import DashoardCard from "../components/DashoardCard.jsx";
// import Insights from "../components/Insights.jsx";
// import Loader from "../components/Loader.jsx";
// import TwitterCard from "../components/TwitterCard.jsx";
// import Wall from "../components/Wall.jsx";


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

const dashboardPropsSchema = z.object({
    params:z.object({
        spaceId:z.string()
    })
})

type dashProps = z.infer<typeof dashboardPropsSchema>
export type SpaceInfo = z.infer<typeof spaceInfoSchema>
export type Testimonial = z.infer<typeof testimonialSchema>
 
const Dashboard = ({params}:dashProps) => {
  const [spaceInfo, setSpaceInfo] = useState<SpaceInfo|null>(null);
  

  const [wallPageToggle, setWallPageToggle] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [insightsToggle, setInsightsToggle] = useState(false);
  const [isBtn, setIsBtn] = useState("All");
  const {spaceId} = params;
  const [testimonials, setTestimonials] = useState<[Testimonial]|null>(null);
  const publicTestimonials = testimonials?.filter((t)=>t.WOF===true)
  const manualTestimonials = testimonials?.filter((t)=>t.tweet==false);
  useEffect(() => {
    const getSpace = async () => {
      const res = await fetch(
        `http://localhost:3010/api/space/fetch-space?spaceId=${spaceId}`
      );

      const data = await res.json()
      setSpaceInfo(data);
      setTestimonials(data.testimonials);
    };
    getSpace();
  }, []);
  if (!spaceInfo) {
    return <Loader />;
  }
  return (
    <>
   
      {/* {insightsToggle ? (
        <Insights
          insightsToggle={insightsToggle}
          spaceInfo={spaceInfo}
          setInsightsToggle={setInsightsToggle}
        />
      ) : null} */}
      {toggle ? (
        <AddSpace spaceInfo={spaceInfo} setToggle={setToggle} isEdit={true} />
      ) : null}
      {/* {wallPageToggle ? (
        <Wall
          spaceId={spaceId}
          publicTestimonials={publicTestimonials}
          setWallPageToggle={setWallPageToggle}
        />
      ) : null} */}
      <hr />
      <div className=" flex flex-col md:flex-row w-full md:h-40 lg:px-16 justify-between py-4 px-5 ">
        <div className=" w-fit flex gap-3 items-center">
          <img
            className=" hidden md:block w-32 object-cover rounded-lg h-32"
            src={spaceInfo?.imgPath ? spaceInfo?.imgPath : "/assets/review.png"}
            alt=""
          />
          <div>
            <div className=" flex gap-4">
              <h1 className=" text-4xl font-semibold text-slate-800 font-sans ">
                {spaceInfo?.spaceName}
              </h1>
              
            </div>
            <p className=" text-slate-500 md:mt-1">
              Space public url :
              <Link
                style={{ overflowWrap: "anywhere" }}
                className=" underline"
                target="_blank"
                rel="noopener noreferrer"
                href={`/public/${spaceInfo?.id}`}
              >
                {" "}
                {window.location.origin}/{spaceInfo?.id}
              </Link>
            </p>
          </div>
        </div>
        <div className=" hidden  md:flex justify-center items-center">

        <Button
        className=" p-5 py-8 rounded-xl hover:shadow-[0_0_20px_rgba(255,0,255,0.3),0_0_40px_rgba(0,255,255,0.2),0_0_60px_rgba(255,255,0,0.1)] transition-shadow duration-300"
        variant="outline"
        onClick={() => setInsightsToggle(true)}
        
        >
          Generate Insights <FaPenFancy className=" " />
              </Button>
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
        
        <div className=" md:w-1/4 md:sticky top-0  md:h-screen bg-gray-50 font-handwriting flex flex-col gap-1 md:pt-7 md:pl-3 md:px-2 ">
          <button
            onClick={() => setIsBtn("All")}
            className={` w-full flex gap-2 group items-center  transition-colors  ${
              isBtn === "All" && "bg-neutral-200"
            }  text-neutral-700  text-start px-4 py-2 rounded-md `}
          >
            <GalleryHorizontalEnd color="#404040" />
            <span className="group-hover:translate-x-2 transition-all">All</span>
          </button>
            <button
            onClick={() => setIsBtn("Twitter")}
            className={` w-full  group flex gap-2  items-center transition-colors  ${
              isBtn === "Twitter" && "bg-neutral-200"
            }  text-neutral-700 text-start px-4 py-2 rounded-md `}
            >
            <Twitter color="#404040" />
             <span className=" group-hover:translate-x-2 transition-all"> Twitter</span>
            </button>
            <button
            onClick={() => setWallPageToggle(true)}
            className=" w-full group flex gap-2 items-center  transition-colors   text-neutral-700 text-start px-4 py-2 rounded-md "
            >
            <Heart color="#404040" />
            <span className=" group-hover:translate-x-2 transition-all">Wall of Fame</span>
            </button>
            <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`/public/${spaceInfo?.id}`}
            >
            <button className=" w-full group flex gap-2 items-center   transition-colors  text-neutral-700 text-start px-4 py-2 rounded-md ">
            <StickyNote color="#404040" />              
            <span className=" group-hover:translate-x-2 transition-all">Public landing page</span>
            </button>
            </Link>
            <button
            onClick={() => setToggle(true)}
            className=" w-full group flex gap-2 items-center  transition-colors   text-neutral-700 text-start px-4 py-2 rounded-md "
            >
             <SquarePen color="#404040" />
            <span className=" group-hover:translate-x-2 transition-all">Edit Space</span>
            </button>
        </div>
        <div className=" md:w-3/4 flex rounded-2xl overflow-hidden border-[1px] border-gray-200 shadow shadow-gray-300  relative flex-col gap-3 ">
        <div className="bg-gray-50 border border-gray-200 self-end m-5 rounded-lg text-slate-600 hidden md:block top-0 px-4 py-3 text-sm w-fit">
          <div className="flex items-center gap-2">
            <span className="text-base">💡</span>
            <span className="font-medium text-gray-700">Tip:</span>
            <span>
              {isBtn === "All" 
          ? (
            <>
              Share your{" "}
              <a 
                href={`/public/${spaceInfo?.id}`}
                target="_blank" 
                rel="noopener noreferrer"
                className=" hover:underline font-semibold underline-offset-2 hover:text-blue-800"
              >
                public landing page
              </a>
              {" "}with customers to collect authentic reviews and grow your reputation!
            </>
          )
          : "Paste any tweet URL to instantly showcase social proof from Twitter on your testimonial wall!"
              }
            </span>
          </div>
        </div>
          {manualTestimonials?.length === 0 && isBtn !== "Twitter" ? (
            <p className=" text-center text-2xl md:text-4xl font-semibold text-slate-200  mt-12">
              No Testimonials! Send the public URL to your best customers and
              ask them for feedback.{" "}
            </p>
          ) : !testimonials ? (
            <>
              {/* <div className=" transition-all  relative flex flex-col gap-2 border border-slate-300 rounded-lg w-full px-5 py-4 pb-12  md:min-w-80">
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
              </div> */}
            </>
          ) : (
            <div className=" transition-all flex md:px-6 lg:px-10  h-full  pt-12 flex-col gap-3">
              {/* {isBtn === "All" &&
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
              )} */}
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

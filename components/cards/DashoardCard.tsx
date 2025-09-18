import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/stateful-button";
import { useAppContext } from "@/context/AppContext";
import { Testimonial } from "@/lib/schemas/testimonial.schema";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaSquareCheck } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

const DashoardCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [overlay, setOverlay] = useState(false);
  const dateObj = new Date(testimonial.date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    dateObj,
  );
  const { setReloadCards, state } = useAppContext();
  const addToWall = async () => {
    const res = await fetch(
      `/api/wall/update-wall?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}&WOF=true`,
      {
        method: "PUT",
      },
    );
    if (res.ok) {
      setReloadCards(!state.reloadCards);
      toast.success("Successfully added to Wall of Fame!");
    }
  };
  const removeFromWall = async () => {
    const res = await fetch(
      `/api/wall/update-wall?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}&WOF=false`,
      {
        method: "PUT",
      },
    );
    if (res.ok) {
      setReloadCards(!state.reloadCards);
    }
  };

  const handleDelete = async () => {
    const res = await fetch(
      `/api/testimonials/delete?spaceId=${testimonial.spaceId}&testimonialId=${testimonial.id}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      toast.error("Failed to delete testimonails, try again later!!!");
      return;
    }
    if (res.ok) {
      setReloadCards(!state.reloadCards);
      toast.success("Deleted!");
      return;
    }
  };
  return (
    <Card className=" transition-all relative flex flex-col gap-2   w-full px-5 py-4 pb-12 max-w-5xl self-center">
      <CardContent>
        {overlay ? (
          <div className=" rounded-lg flex flex-col justify-center items-center absolute top-0 bottom-0 right-0 left-0 border-[1px] bg-white z-50 gap-7">
            <p className="  text-xl text-slate-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold ">{testimonial.name}</span>&#39;s
              testimonial?
            </p>
            <div className=" flex gap-3">
              <Button
                className=" hover:ring-red-700  bg-red-700  text-white px-2 py-1 rounded-sm"
                onClick={handleDelete}
              >
                Delete
              </Button>
              <button
                className=" border border-slate-400 bg-secondary   text-slate-100 px-5 py-1 rounded-sm"
                onClick={() => setOverlay(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
        <div className=" flex justify-between">
          <div>
            <div className=" flex justify-between items-center">
              <label className=" relative bg-teal-800 text-white text-sm font-semibold px-5 py-1 rounded-xl">
                <FaSquareCheck
                  data-tooltip-id="tick-tip"
                  data-tooltip-content="The reviewer has given permission to share this review for marketing efforts"
                  className="absolute top-[-3px] right-[-4px] text-xl text-white bg-green-500 rounded-[4px]"
                />
                Text
              </label>
            </div>
            <div className=" flex justify-between mt-2 mb-4">
              <StarRatings
                starRatedColor="#ffa534"
                rating={testimonial.starRating}
                starSpacing="2px"
                starDimension="20px"
              />
            </div>
          </div>
          <div>
            <div className=" flex flex-col gap-2 items-cente&WOF=falser justify-center">
              {testimonial.WOF ? (
                <>
                  <button
                    title=""
                    className=" cursor-pointer"
                    onClick={removeFromWall}
                  >
                    <IoMdHeart className=" text-red-600 hover:text-red-500 transition-all text-3xl " />
                  </button>
                </>
              ) : (
                <>
                  {/* <Tooltip style={{ width: "180px" }} id="WOF-tooltip" /> */}

                  <button
                    data-tooltip-content="Add to Wall of fame"
                    data-tooltip-id="WOF-tooltip"
                    className="  cursor-pointer"
                    onClick={addToWall}
                  >
                    <CiHeart className="text-3xl fill-slate-700" />
                  </button>
                </>
              )}
              <button>
                <MdDelete
                  onClick={() => setOverlay(true)}
                  className="text-3xl text-slate-400 transition-all hover:text-slate-800"
                />
              </button>
            </div>
          </div>
        </div>

        <div className=" text-slate-900 max-w-[720px]  text-lg">
          {testimonial.testimonial}
        </div>
        <Separator className=" max-w-xl mt-4" />
        <div className=" grid grid-cols-2 gap-3 mt-3">
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Name</p>
            <div className=" flex gap-2  items-center">
              <Image
                width={100}
                height={100}
                className=" h-8 rounded-full w-8"
                src={testimonial.imgPath}
                alt=""
              />
              <p className=" text-sm text-slate-900 first-letter:uppercase">
                {testimonial.name}
              </p>
            </div>
          </div>
          {testimonial.title && (
            <div>
              <p className=" font-semibold text-slate-800 text-sm">Title</p>
              <div className=" flex items-center ">
                <p className=" text-sm text-slate-900">{testimonial.title}</p>
              </div>
            </div>
          )}
          {testimonial.tip && (
            <div>
              <p className=" font-semibold text-slate-800 text-sm">
                Tip Amount
              </p>
              <div className=" flex items-center ">
                <p className=" text-sm text-slate-900">
                  INR {testimonial.tip / 100}
                </p>
              </div>
            </div>
          )}
          <div>
            <p className=" font-semibold text-slate-800 text-sm">Email</p>
            <div className=" flex gap-2  items-center">
              <p className=" text-sm text-slate-900">{testimonial.email}</p>
            </div>
          </div>
          <div>
            <p className=" font-semibold text-slate-800 text-sm">
              Submitted At:
            </p>
            <div className=" flex gap-2  items-center">
              <p className=" text-sm text-slate-900">{formattedDate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashoardCard;

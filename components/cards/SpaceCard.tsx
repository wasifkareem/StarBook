import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
// import "reactjs-popup/dist/index.css";
import DeleteSpace from "@/components/dialog/DeleteSpace";
import z from "zod";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const spaceCardPropsSchema = z.object({
  imgPath:z.string(),
  spaceName:z.string(),
  spaceId:z.string(),
  testimonialCount:z.number()
})

type spaceCardProps = z.infer<typeof spaceCardPropsSchema>
const SpaceCard = ({ imgPath, spaceName, spaceId,testimonialCount }:spaceCardProps) => {
  const [toggle, setToggle] = useState(false);
  const handleDel = (e:React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle(true);
  };
  return (
    <>
      {toggle ? (
        <DeleteSpace
          spaceId={spaceId}
          spaceName={spaceName}
          setToggle={setToggle}
        />
      ) : null}
      <Link href={`/products/${spaceId}`}>
       <Card className=" overflow-hidden shadow-yellow-glow ">
          <CardContent className="flex flex-row relative pr-24">

          <button
            onClick={(e) => handleDel(e)}
            className="  absolute top-0 right-4 "
          >
            <MdDeleteForever className="text-2xl text-slate-400 hover:text-red-900 transition-colors" />
          </button>
          <img
            className=" h-32 w-32 object-cover border bg-white rounded-3xl"
            loading="lazy"
            src={imgPath ? imgPath : "/assets/review.png"}
            alt=""
          />
          <div className="xl px-5 py-3">
            <h2 className=" font-semibold text-xl">{spaceName}</h2>
            <p className=" text-shadow-muted-foreground">Testimonials:{testimonialCount}</p>
          </div>
          </CardContent>

          </Card>

      </Link>
    </>
  );
};

export default SpaceCard;

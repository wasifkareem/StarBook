import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import DeleteSpace from "./DeleteSpace";
import z from "zod";
import { Card } from "./ui/card";

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
      <Link to={`/app/products/${spaceId}`}>
       <Card className=" flex relative pr-24">

          <button
            onClick={(e) => handleDel(e)}
            className="  absolute top-2 right-2 "
          >
            <MdDeleteForever className="text-2xl text-slate-400 hover:text-red-900 transition-colors" />
          </button>
          <img
            className=" h-32 w-32 object-cover border"
            src={imgPath ? imgPath : "/assets/review.png"}
            alt=""
          />
          <div className="xl px-5 py-3">
            <h2 className=" font-semibold text-xl">{spaceName}</h2>
            <p>Testimonials:{testimonialCount}</p>
          </div>
          </Card>

      </Link>
    </>
  );
};

export default SpaceCard;

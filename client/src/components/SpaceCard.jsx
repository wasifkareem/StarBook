import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import DeleteSpace from "./DeleteSpace";

const SpaceCard = ({ imgPath, spaceName, spaceId, testimonials }) => {
  const [toggle, setToggle] = useState(false);
  console.log(spaceId)
  const handleDel = (e) => {
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
        <div className=" border relative border-slate-300 text-slate-800 md:w-[350px]  cursor-pointer rounded-md flex gap-3  overflow-hidden">
          <button
            onClick={(e) => handleDel(e)}
            className="  absolute top-1 right-1 "
          >
            <MdDeleteForever className="text-2xl text-slate-400 hover:text-red-900 transition-colors" />
          </button>
          <img
            className=" h-24 w-24 object-cover border"
            src={imgPath ? imgPath : "/assets/review.png"}
            alt=""
          />
          <div className="xl px-5 py-3">
            <h2 className=" font-semibold text-xl">{spaceName}</h2>
            <p>Testimonials:{testimonials?.length}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default SpaceCard;

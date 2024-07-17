import { Link } from "react-router-dom";

const SpaceCard = ({ imgPath, spaceName, spaceId, testimonials }) => {
  return (
    <Link to={`/products/${spaceId}`}>
      <div className=" border border-slate-300 text-slate-800 md:w-[350px]  cursor-pointer rounded-md flex gap-3  overflow-hidden">
        <img
          className=" h-24 w-24 object-cover"
          src={imgPath ? imgPath : "src/assets/review.png"}
          alt=""
        />
        <div className="xl px-5 py-3">
          <h2 className=" font-semibold text-xl">{spaceName}</h2>
          <p>Testimonials:{testimonials.length}</p>
        </div>
      </div>
    </Link>
  );
};

export default SpaceCard;

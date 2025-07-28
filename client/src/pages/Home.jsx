import { useEffect, useState } from "react";
import AddSpace from "../components/AddSpace";
import Navbar from "../components/Navbar";
import SpaceCard from "../components/SpaceCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useUser } from "@clerk/clerk-react";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useUser();
  const { ReloadSpaces } = useSelector((state) => state?.info);

  const [cardData, setCardData] = useState(null);
  const handleClick = () => {
    setToggle(true);
  };

  useEffect(() => {
    const getCards = async () => {
      const response = await axios.get(
        `https://starbook-1.onrender.com/api/space/fetch-spaces?email=${user?.primaryEmailAddress.emailAddress}`
      );
      setCardData(response.data);
    };
    getCards();
  }, [toggle, ReloadSpaces]);

  if (!cardData) {
    return <Loader />;
  }
  return (
    <>
      <div className=" mx-3 md:mx-28 mt-16 bg-dotted-net">
        <div className=" flex justify-between items-center">
          <p className=" text-lg md:text-3xl font-semibold text-slate-800">
            Spaces
          </p>
          <button
            onClick={handleClick}
            className=" flex items-center gap-1 md:gap-3 bg-slate-700 text-white font-semibold py-1 md:py-3  rounded px-2 md:px-8"
          >
            <span className=" text-xl md:text-3xl font-normal"> &#43;</span>{" "}
            Create Space
          </button>
        </div>
        <div className=" mt-12 md:flex md:flex-wrap gap-2 justify-start">
          {cardData.length === 0 ? (
            <p className=" text-slate-200 text-2xl md:text-4xl font-semibold text-center md:mt-28">
              No spaces available. Create a new space, start collecting
              testimonials and use our free embed to showcase them on your
              website
            </p>
          ) : null}
          {cardData?.map((card) => (
            <SpaceCard
              spaceName={card.spaceName}
              key={card.id}
              spaceId={card.id}
              imgPath={card.imgPath}
              testimonials={card.testimonials}
            />
          ))}
        </div>
      </div>
      {toggle ? <AddSpace setToggle={setToggle} isEdit={false} /> : null}
    </>
  );
};

export default Home;

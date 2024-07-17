import { useEffect, useState } from "react";
import AddSpace from "../components/AddSpace";
import Navbar from "../components/Navbar";
import SpaceCard from "../components/SpaceCard";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const { email } = useSelector(
    (state) => state?.user?.currentUser?.userObject
  );
  const { token } = useSelector((state) => state?.user?.currentUser);
  const [cardData, setCardData] = useState(null);
  const handleClick = () => {
    setToggle(true);
  };

  useEffect(() => {
    const getCards = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/space/fetch-spaces?email=${email}`,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      setCardData(response.data);
    };
    getCards();
  }, [toggle]);

  if (!cardData) {
    return <Loader />;
  }
  return (
    <>
      <Navbar />
      <div className=" mx-3 md:mx-28 mt-16">
        <div className=" flex justify-between items-center">
          <p className=" text-lg md:text-3xl font-semibold text-slate-800">
            Spaces
          </p>
          <button
            onClick={handleClick}
            className=" flex items-center gap-1 md:gap-3 bg-slate-800 text-white font-semibold py-1 md:py-3  rounded-sm px-2 md:px-8"
          >
            <span className=" text-xl md:text-3xl font-normal"> &#43;</span>{" "}
            Create Space
          </button>
        </div>
        <div className=" mt-12 md:flex md:flex-wrap gap-2 justify-start">
          {cardData?.map((card) => (
            <SpaceCard
              spaceName={card.spaceName}
              key={card._id}
              spaceId={card._id}
              imgPath={card.imgPath}
              testimonials={card.testimonials}
            />
          ))}
        </div>
      </div>
      {toggle ? <AddSpace setToggle={setToggle} /> : null}
    </>
  );
};

export default Home;

import { useEffect, useState } from "react";
import AddSpace from "../components/AddSpace";
import Navbar from "../components/Navbar";
import SpaceCard from "../components/SpaceCard";
import axios from "axios";
import { useAppSelector } from "../redux/store";
import Loader from "../components/Loader";
import { useUser } from "@clerk/clerk-react";
import z from "zod";

const spaceSchema = z.object({
  id: z.string(),
  spaceName: z.string(),
  ownerEmail: z.email(),
  headerTitle: z.string(),
  message: z.string(),
  imgPath: z.url(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  tipBox: z.boolean(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

const spaceArraySchema = z.array(spaceSchema)

type Space = z.infer<typeof spaceSchema>
const Home = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useUser();
  const { ReloadSpaces } = useAppSelector((state) => state?.info);
  console.log(ReloadSpaces)

  const [cardData, setCardData] = useState<Space[] | null>(null);
  console.log(cardData)
  const handleClick = () => {
    setToggle(true);
  };

  useEffect(() => {
    const getCards = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/space/fetch-spaces?email=${user?.primaryEmailAddress?.emailAddress}`
      );
      const validatedData = spaceArraySchema.parse(response.data)
      
      setCardData(validatedData);
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
            />
          ))}
        </div>
      </div>
      {toggle ? <AddSpace setToggle={setToggle} isEdit={false} /> : null}
    </>
  );
};

export default Home;

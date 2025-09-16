'use client';

import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
// import { useAppSelector } from "@/redux/store";
// import AddSpace from "@/components/extra/AddSpace";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { MdCreateNewFolder } from "react-icons/md";
import z from "zod";
import SpaceCard from "@/components/SpaceCard";
import AddSpace from "@/components/AddSpace";
import { useAppContext } from "@/context/AppContext";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

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
    _count:z.object({
      testimonials:z.number()
    })
  })
  
  const spaceArraySchema = z.array(spaceSchema)
  
  type Space = z.infer<typeof spaceSchema>

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const { user } = useUser();
//   const { ReloadSpaces } = useAppSelector((state) => state?.info);
  const [cardData, setCardData] = useState<Space[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {state} = useAppContext()
  console.log(state.pro)
  const maxSpaces = state.pro? 10:2
  const handleClick = () => {
    if(maxSpaces > (cardData?.length || 0)) {
      setToggle(true);
    } else {
      if(!state.pro) {
        toast.warning(`Space limit reached:${maxSpaces}`,{
          action:{
            label:'Upgrade to Pro',
            onClick:() => window.location.href = '/billing'
          }
        })
      } else {
        toast.warning(`Space limit reached:${maxSpaces}`)
      }
    }
  };

  
  

  useEffect(() => {
    const getCards = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(
          `/api/space/fetch-spaces?email=${user.primaryEmailAddress.emailAddress}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch spaces');
        }

        const data = await response.json();
        const validatedData = spaceArraySchema.parse(data);
        setCardData(validatedData);
      } catch (err) {
        console.error('Error fetching spaces:', err);
        setError('Failed to load spaces');
      } finally {
        setLoading(false);
      }
    };

    getCards();
  }, [toggle, user?.primaryEmailAddress?.emailAddress,state.reloadSpaces]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="mx-3 md:mx-28 mt-16">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mx-3 md:mx-28 mt-16 bg-dotted-net">
        <div className="flex justify-between items-center">
          <p className="text-lg md:text-3xl font-semibold text-slate-800">
            Spaces
          </p>
          <Button 
            onClick={handleClick}
            variant="outline" 
            size="lg"
            className=" hover:text-secondary"
          >
            <MdCreateNewFolder />
            Create Space
          </Button>
        </div>
        <Separator className=" mt-16 "/>
        <div className="mt-20 md:mt-16 flex flex-col md:flex-row md:flex-wrap gap-4 justify-start">
          {cardData?.length === 0 ? (
            <p className="text-slate-200 text-2xl md:text-4xl text-center md:mt-28">
              No spaces available. Create a new space, start collecting
              testimonials and use our free embed to showcase them on your
              website
            </p>
          ) : null}
          {cardData?.map((card) => (
            <SpaceCard
              testimonialCount={card._count.testimonials}
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
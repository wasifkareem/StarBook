import { useState } from "react";
import TweetCard from "./TweetCard";
import { Button } from "@/components/ui/button";
import { RiTwitterXFill } from "react-icons/ri";
import z from "zod";
import { testimonialSchema } from "@/lib/schemas/space.schema";
import { useAppContext } from "@/context/AppContext";
import { Tooltip } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";

const twitterCardPropsSchema = z.object({
  spaceId:z.string(),
  testimonials:z.array(testimonialSchema)
})

export type twitterCardProps = z.infer<typeof twitterCardPropsSchema>
const TwitterCard = ({ spaceId, testimonials }:twitterCardProps) => {
  const [url, setUrl] = useState("");
    const {setReloadTweets,state} = useAppContext()
  const [isFetching, setIsFetching] = useState(false);
  const id = url.split("/")[5];
  const tweetData = testimonials?.filter((t) => t.tweet);
  const maxTweets = state.pro?25:7;
  

  const handleClick = async () => {
    if(testimonials.length>=maxTweets){
      toast.warning('Testimonial limit reached:7',{
        action:{
          label:'Upgrade to Pro',
          onClick:() => window.location.href = '/billing'
        }
      })
    return
    }
    setIsFetching(true);
    try {
      if(id==undefined){
        toast.warning('Invalid URL')
        setIsFetching(false)
        return
      }
      const response = await fetch(
        `/api/testimonials/fetch-tweet?xId=${id}`,
        
      );
      console.log(response)
      if(!response.ok){
        toast.error('Something went wrong, try again!!');
        setIsFetching(false)
      }

      const tweet =await response.json()
      const data = {
        tweet: true,
        spaceId: spaceId,
        testimonial: tweet.text,
        imgPath: tweet.user.profile_image_url_https,
        name: tweet.user.name,
        twitterHandle: tweet.user.screen_name,
        imgMedia: tweet?.photos?.[0]?.url,
        entities: tweet.entities,
        poster: tweet?.video?.poster,
        likes: tweet.favorite_count,
        video: tweet?.video?.variants[tweet?.video.variants.length - 1]?.src,
        date: tweet.created_at,
        xId: tweet.id_str,
      };
      const res = await fetch(
        `/api/testimonials/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      if (res.ok) {
        toast.success("Testimonial Created");
        setReloadTweets(!state.reloadTweets);
        setIsFetching(false);
        setUrl("");
      }else{
        toast.error('Something went wrong!!');
        setIsFetching(false)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex w-full my-5 px-4">
        <div className=" flex flex-col md:flex-row items-center gap-2 w-full justify-center ">
            <label className="font-semibold hidden md:block" htmlFor="">
              Tweet URL :{" "}
            </label>
            <input
              value={url}
              className="outline-cyan-700 w-full max-w-[450px] self-center rounded border border-slate-300 px-2 py-1"
              type="text"
              placeholder="https://x.com/elonmusk/status/1830650370336473253"
              onChange={(e) => setUrl(e.target.value)}
            />
            {!url.trim()?<Tooltip>
            <TooltipTrigger className=" cursor-not-allowed">
            
            <Button variant="outline" className="mx-2 shrink-0"  >
            <RiTwitterXFill />
           
            Get tweet
            </Button>
            </TooltipTrigger>
            <TooltipContent>
              Add a URL first!!
            </TooltipContent>
            </Tooltip>: <Button variant="outline" className="mx-2 shrink-0" onClick={handleClick}  >
            <RiTwitterXFill className={`${isFetching && "animate-spin"}`} />
            Get tweet
            </Button>}
        </div>
      </div>
      <div className="w-full flex justify-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 items-start gap-10 lg:gap-3 w-fit h-fit light">
          {Array(3)
            .fill(0)
            .map((_, colIndex) => (
              <div className="grid gap-3 w-auto" key={colIndex}>
                {tweetData
                  .toReversed()
                  ?.filter((_, index) => index % 3 === colIndex)
                  .map((testimonial) => (
                    <TweetCard
                      isAdmin={true}
                      imgPath={testimonial.imgPath}
                      spaceId={spaceId}
                      xId={testimonial.xId}
                      Id={testimonial.id}
                      key={testimonial.id}
                      WOF={testimonial.WOF}
                      name={testimonial.name}
                      testimonial={testimonial?.testimonial}
                      twitterHandle={testimonial?.twitterHandle}
                      entities={testimonial?.entities}
                      likes={testimonial?.likes}
                      date={testimonial?.date}
                      imgMedia={testimonial?.imgMedia}
                      poster={testimonial?.poster}
                      video={testimonial?.video}
                      createdAt={testimonial.createdAt}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TwitterCard;

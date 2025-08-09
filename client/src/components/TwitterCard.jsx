import axios from "axios";
import { useState } from "react";
import TweetCard from "./TweetCard";
import { useDispatch } from "react-redux";
import { ReloadCards } from "../redux/InfoRedux";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import { BsTwitterX } from "react-icons/bs";
import { RiTwitterXFill } from "react-icons/ri";

const TwitterCard = ({ spaceId, testimonials }) => {
  const [url, setUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const id = url.split("/")[5];
  const tweetData = testimonials?.filter((t) => t.tweet);
  const dispatch = useDispatch();
  const handleClick = async () => {
    setIsFetching(true);
    try {
      const getTweetData = await axios.get(
        "http://localhost:3000/api/testimonials/fetch-tweet",
        {
          params: { xId: id },
        }
      );

      let tweet = getTweetData?.data;
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
      const res = await axios.post(
        `http://localhost:3000/api/testimonials/create`,
        data
      );
      if (res.status == 200) {
        dispatch(ReloadCards());
        toast.success("🎊 Testimonial Created");
        setIsFetching(false);
        setUrl("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className=" flex w-full my-5 justify-center">
        <div>
          <label className=" font-semibold" htmlFor="">
            Tweet URL :{" "}
          </label>
          <input
            value={url}
            className="  outline-cyan-700 w-[450px] rounded border border-slate-300 px-2 py-1"
            type="text"
            placeholder="https://x.com/elonmusk/status/1830650370336473253"
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className=" bg-white"></div>
        <Button variant="outline" className=" mx-2" onClick={handleClick}>
          <RiTwitterXFill className={`${isFetching && "animate-spin"}`} />
          Get tweet
        </Button>
      </div>
      <div className=" w-full flex justify-center">
        <div className=" grid grid-cols-3 items-start gap-3 w-fit h-fit  light bg-white">
          {Array(3)
            .fill()
            .map((_, colIndex) => (
              <div className="grid gap-3 w-fit" key={colIndex}>
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

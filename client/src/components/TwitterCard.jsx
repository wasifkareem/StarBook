import axios from "axios";
import { useState } from "react";
import TweetCard from "./TweetCard";
import { useDispatch } from "react-redux";
import { ReloadCards } from "../redux/InfoRedux";
import { toast } from "react-toastify";

const TwitterCard = ({ spaceId, testimonials }) => {
  const [url, setUrl] = useState("");
  const id = url.split("/")[5];
  const tweetData = testimonials?.filter((t) => t.tweet);
  console.log(tweetData)
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      const getTweetData = await axios.get(
        `https://react-tweet.vercel.app/api/tweet/${id}`
      );

      const data = {
        xId: id,
        tweet: true,
        spaceId: spaceId,
        testimonial: getTweetData?.data?.data?.text,
      };
      const res = await axios.post(
        `https://starbook.onrender.com/api/testimonials/create`,
        data
      );
      console.log(res);
      if (res.status == 200) {
        dispatch(ReloadCards());
        toast.success("🎊 Testimonial Created");
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
        <button
          className=" bg-slate-600 text-white font-semibold px-2 rounded mx-2 py-1"
          onClick={handleClick}
        >
          Get tweet
        </button>
      </div>
      <div className=" w-full flex justify-center">
        <div className=" grid grid-cols-2 items-start gap-3 w-fit h-fit  light bg-white">
          {Array(2)
            .fill()
            .map((_, colIndex) => (
              <div className="grid gap-3 w-fit" key={colIndex}>
                {tweetData
                  .toReversed()
                  ?.filter((_, index) => index % 2 === colIndex)
                  .map((testimonial) => (
                    <TweetCard
                    isAdmin={true}
                    imgPath={testimonial.imgPath}
                    spaceId={spaceId}
                    xId={testimonial.xId}
                    Id={testimonial._id}
                    key={testimonial._id}
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

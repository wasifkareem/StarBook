import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReloadSpaces } from "../redux/InfoRedux";
import { IoWarningOutline } from "react-icons/io5";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Insights = ({ setInsightsToggle, spaceInfo, insightsToggle }) => {
  const [aiInsights, setAiInsights] = useState(null);
  const [isfetching, setIsfetching] = useState(true);
  useEffect(() => {
    const handleInsights = async () => {
      try {
        const InsightsRes = await axios.post(
          `http://localhost:3000/api/AI/get-insights?spaceId=${spaceInfo?.id}`
        );
        if (spaceInfo?.testimonials?.length === 0) {
          toast.error("No Testimonails found to create Insights");
          return;
        }
        if (InsightsRes.status !== 200) {
          toast.error("Something went wrong, Can't generate insights");
          setInsightsToggle(false);
          return;
        }
        setIsfetching(false);
        setAiInsights(InsightsRes?.data);
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong, Can't generate insights");
        setInsightsToggle(false);
      }
    };
    handleInsights();
  }, [insightsToggle === true]);
  return (
    <div
      onClick={() => setInsightsToggle(false)}
      className=" z-50 flex  overflow-y-auto justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" rounded absolute top-10 md:min-h-[500px] pb-10 bg-slate-900 text-white py-5 px-4 w-4/6 flex   flex-col gap-2"
      >
        <div className=" flex items-center justify-between">
          <h2>
            Insights from all the testimonials in{" "}
            <strong>{spaceInfo?.spaceName}</strong>{" "}
            <span className="  text-gray-600"> - Powered by Gemini AI</span>
          </h2>
          <button
            onClick={() => setInsightsToggle(false)}
            className=" border rounded-lg px-2 self-end text-3xl mr-3 mt-1 "
          >
            &times;
          </button>
        </div>
        {isfetching ? (
          <div className=" mt-36 text-center self-center animate-pulse text-2xl text-gray-300">
            AI model is analyzing testimonials and tweets from this space and
            generating Insights
          </div>
        ) : (
          <div className=" font-mono flex flex-col gap-3">
            <div className=" flex flex-col gap-2 ">
              <label className=" opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1">
                Things that users love about {spaceInfo?.spaceName} ❤️
              </label>
              <Markdown>{aiInsights?.positive}</Markdown>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className="opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1">
                Issues :
              </label>
              <p dangerouslySetInnerHTML={{ __html: aiInsights?.negative }}></p>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className="opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1">
                Suggestions :
              </label>
              <ol className=" flex flex-col gap-2">
                <li>
                  {" "}
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {aiInsights?.suggestions?.one}
                  </Markdown>
                </li>
                <Markdown remarkPlugins={[remarkGfm]}>
                  {aiInsights?.suggestions?.two}
                </Markdown>
                <Markdown remarkPlugins={[remarkGfm]}>
                  {aiInsights?.suggestions?.three}
                </Markdown>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;

"use client";

import { SpaceInfo } from "@/lib/schemas/space.schema";
import { SquareX } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface AiInsights {
  negative: string;
  positive: string;
  suggestions: {
    one: string;
    two: string;
    three: string;
  };
}

interface InsightsProps {
  setInsightsToggle: (toggle: boolean) => void;
  spaceInfo: SpaceInfo;
}

const Insights = ({ setInsightsToggle, spaceInfo }: InsightsProps) => {
  const [aiInsights, setAiInsights] = useState<AiInsights | null>(null);
  const [isfetching, setIsfetching] = useState(true);

  useEffect(() => {
    let isCancelled = false;

    const handleInsights = async () => {
      try {
        if (spaceInfo?.testimonials?.length === 0) {
          toast.error("No Testimonials found to create Insights");
          return;
        }

        const InsightsRes = await fetch(
          `/api/get-insights?spaceId=${spaceInfo?.id}`,
          { method: "POST" },
        );

        if (isCancelled) return;

        if (!InsightsRes.ok) {
          toast.error("Something went wrong, Can't generate insights");
          setInsightsToggle(false);
          return;
        }

        const data = await InsightsRes.json();
        setIsfetching(false);
        setAiInsights(data);
      } catch (err) {
        if (isCancelled) return;
        console.error(err);
        toast.error("Something went wrong, Can't generate insights");
        setIsfetching(false);
      }
    };

    if (spaceInfo?.id) {
      handleInsights();
    }

    return () => {
      isCancelled = true;
    };
  }, [spaceInfo?.id, spaceInfo?.testimonials?.length, setInsightsToggle]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInsightsToggle(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setInsightsToggle]);

  return (
    <div
      onClick={() => setInsightsToggle(false)}
      className=" z-50 flex overflow-y-auto justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" rounded-2xl absolute top-10 md:min-h-[750px] pb-10  bg-white py-5 px-4 w-4/6 flex md:px-10 md:pt-10 flex-col gap-2"
      >
        <div className=" flex items-center justify-between">
          <h2>
            Insights from all the testimonials in{" "}
            <strong>{spaceInfo?.spaceName}</strong>{" "}
            <span className="  text-gray-600"> - Powered by Gemini AI</span>
          </h2>
          <button
            onClick={() => setInsightsToggle(false)}
            className=" rounded-lg self-end text-3xl "
          >
            <SquareX />
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
              <label className=" opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1 md:mt-3">
                Things that users love about {spaceInfo?.spaceName} ❤️
              </label>
              <Markdown>{aiInsights?.positive}</Markdown>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className="opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1 md:mt-3">
                Issues :
              </label>
              <p
                dangerouslySetInnerHTML={{ __html: aiInsights?.negative || "" }}
              ></p>
            </div>
            <div className=" flex flex-col gap-2 ">
              <label className="opacity-100 w-fit text-gray-600  bg-gray-200 px-2 rounded py-1 md:mt-3">
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

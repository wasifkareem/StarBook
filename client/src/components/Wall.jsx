import { useEffect, useState } from "react";
import { CopyBlock, irBlack } from "react-code-blocks";
import { useWindowDimensions } from "../utils/windowDimensions";
import Testimonials from "./Testimonials";

const Wall = ({ publicTestimonials, setWallPageToggle, spaceId }) => {
  const { width } = useWindowDimensions();
  const [theme, setTheme] = useState(false);
  const code = ` <iframe id="starbook-${spaceId}" src="http://localhost:5174/embed/${spaceId}?dark=${theme}" frameborder="0" scrolling="no" width="100%"></iframe>
 <script src="https://cdn.jsdelivr.net/npm/@iframe-resizer/parent"></script>
 <script>
  iframeResize({license: "GPLv3",log: true, checkOrigin: false,}, '#starbook-${spaceId}');
 </script>
`;
  const handleClick = () => {
    setTheme(!theme);
  };
  const arrayCount = () => {
    if (width > 1900) {
      return 5;
    } else if (width > 1536) {
      return 4;
    } else if (width > 1150) {
      return 3;
    } else if (width > 782) {
      return 2;
    } else {
      return 1;
    }
  };

  useEffect(()=>{
    const handleEsc =(e)=>{
      if(e.key==="Escape"){
        setWallPageToggle(false)
      }
    };
    window.addEventListener("keydown",handleEsc);
    return ()=>window.removeEventListener("keydown",handleEsc)
   },[])
  return (
    <div
      className="  z-40 overflow-y-auto  fixed top-0 bottom-0 left-0 right-0 flex flex-col md:justify-center md:items-center "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className=" absolute top-16 md:min-h-[700px] h-fit rounded-lg   bg-white z-50 md:w-[90%] flex flex-col ">
        <button
          onClick={() => setWallPageToggle(false)}
          className=" self-end text-3xl mr-3 mt-1 "
        >
          &times;
        </button>
        <div className="flex flex-col justify-center">
          <p className=" text-center font-bold text-3xl mb-4">
            Embed a Wall of Fame
          </p>
          <div className=" w-5/6 self-center md:flex md:flex-col">
            {publicTestimonials && (
              <CopyBlock
                showLineNumbers={false}
                theme={irBlack}
                codeBlock
                language="javascript"
                text={code}
              />
            )}
            <button
              style={{
                backgroundColor: theme ? null : "rgb(37, 40, 44)",
                color: theme ? "rgb(37, 40, 44)" : "white",
              }}
              onClick={handleClick}
              className=" border border-slate-800 w-fit px-2 p-1 rounded-lg self-center mt-5"
            >
              {theme ? "Light theme" : "Dark Theme"}
            </button>
          </div>
        </div>
        {publicTestimonials?.length <= 0 ? (
          <p className=" text-center md:mt-32 mt-20 font-semibold text-slate-200 md:text-5xl text-xl">
            Wall of fame is empty, add some testimonials
          </p>
        ) : (
          <>
            <p className=" text-center font-semibold text-xl mt-6 md:mt-16 text-gray-700">
              Live Preview ⮟
            </p>
            <div className=" flex justify-center">
              <div className="grid grid-cols-1 w-fit lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  my-10 gap-3 items-start mx-10">
                {Array(arrayCount())
                  .fill()
                  .map((_, colIndex) => (
                    <div className="grid gap-3 justify-center" key={colIndex}>
                      {publicTestimonials
                        ?.filter((_, index) => index % arrayCount() === colIndex)
                        .map((testimonial) => (
                          <Testimonials
                           email={testimonial.email}
                            key={testimonial._id}
                            imgPath={testimonial.imgPath}
                            name={testimonial.name}
                            starRating={testimonial.starRating}
                            text={testimonial.testimonial}
                            testimonial={testimonial}
                            createdAt={testimonial.createdAt}
                            theme={theme}
                            tip={testimonial.tip}
                            title={testimonial?.title}
                            xId={testimonial.xId}
                            tweet={testimonial.tweet}
                          />
                        ))}
                    </div>
                  ))}
              </div>
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Wall;

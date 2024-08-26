import { CopyBlock, irBlack } from "react-code-blocks";
import Testimonials from "./Testimonials";
import { useState } from "react";

const Wall = ({ publicTestimonials, setWallPageToggle, spaceId }) => {
  const [theme, setTheme] = useState(false);
  const code = `  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.10/iframeResizer.min.js"></script> 
  <iframe id='testimonialto-portfolio-space-tag-all-light' src="http://localhost:5173/embed/${spaceId}?
   dark=${theme}" frameborder="0" scrolling="no" width="100%"></iframe>
  <script type="text/javascript">iFrameResize({log: false, checkOrigin: false}, '#testimonialto-portfolio-space-tag-all-light');</script>
`;
  const handleClick = () => {
    setTheme(!theme);
  };
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
                wrapLongLines={true}
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
        {publicTestimonials.length <= 0 ? (
          <p className=" text-center md:mt-32 mt-20 font-semibold text-slate-200 md:text-5xl text-xl">
            Wall of fame is empty, add some testimonials
          </p>
        ) : (
          <>
            <p className=" text-center font-semibold text-xl mt-6 md:mt-16 text-gray-700">
              Live Preview ⮟
            </p>
            <div className="   grid md:grid-cols-3 p-5 md:p-10 grid-cols-1 md:flex-row flex-col gap-3  m-3">
              {publicTestimonials.map((testimonial) => (
                <Testimonials
                  email={testimonial.email}
                  key={testimonial._id}
                  imgPath={testimonial.imgPath}
                  name={testimonial.name}
                  starRating={testimonial.starRating}
                  testimonial={testimonial.testimonial}
                  createdAt={testimonial.createdAt}
                  theme={theme}
                  tip={testimonial.tip}
                  title={testimonial.title}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wall;

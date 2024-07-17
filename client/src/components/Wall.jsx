import { CopyBlock, irBlack } from "react-code-blocks";
import Testimonials from "./Testimonials";

const Wall = ({ publicTestimonials, setWallPageToggle, spaceId }) => {
  return (
    <div
      className=" z-40 overflow-y-auto  fixed top-0 bottom-0 left-0 right-0 flex flex-col md:justify-center md:items-center "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className=" md:mt-32 min-h-screen md:min-h-[700px] bg-white z-50 md:w-[90%] flex flex-col ">
        <button
          onClick={() => setWallPageToggle(false)}
          className=" self-end text-3xl mr-3 mt-1 "
        >
          &times;
        </button>
        <div className="flex flex-col justify-center">
          <p className=" text-center font-bold text-2xl">
            Embed a Wall of Fame
          </p>
          <div className=" w-4/5 self-center">
            <CopyBlock
              showLineNumbers={false}
              theme={irBlack}
              wrapLongLines={true}
              codeBlock
              language="javascript"
              text={`<iframe src="http://localhost:5174/embed/${spaceId}" frameborder="0" scrolling="no" width="100%"></iframe>
`}
            />
          </div>
        </div>
        {publicTestimonials.length <= 0 ? (
          <p className=" text-center md:mt-64 font-semibold text-slate-200 text-5xl">
            Wall of fame is empty, add some testimonials
          </p>
        ) : (
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
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wall;

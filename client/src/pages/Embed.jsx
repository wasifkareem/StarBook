import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Loader from "../components/Loader";
import { useWindowDimensions } from "../utils/windowDimensions";

const Embed = () => {
  const location = useLocation();
  const theme = location.search.split("=")[1];
  const spaceId = location.pathname.split("/")[2];
  const [testimonials, setTestimonials] = useState(null);
  const { width } = useWindowDimensions();
  useEffect(() => {
    const getTestimonials = async () => {
      const res = await axios.get(
        `https://starbook.onrender.com/api/wall/fetch-wall?spaceId=${spaceId}`
      );
      setTestimonials(res?.data);
    };
    getTestimonials();
  }, []);

  if (!testimonials) {
    return (
      <div className=" flex justify-center items-center  h-screen w-screen">
        <img
          className=" h-16"
          src="/assets/Spinner@1x-1.0s-200px-200px.svg"
          alt=""
        />
      </div>
    );
  }
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

  return (
    <div className=" flex justify-center">
      <div className="grid grid-cols-1 w-fit lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5  my-10 gap-3 items-start mx-10">
        {Array(arrayCount())
          .fill()
          .map((_, colIndex) => (
            <div className="grid gap-3 justify-center" key={colIndex}>
              {testimonials
                .filter((_, index) => index % arrayCount() === colIndex)
                .map((testimonial) => (
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
                    title={testimonial?.title}
                  />
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Embed;

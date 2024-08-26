import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import Loader from "../components/Loader";

const Embed = () => {
  const location = useLocation();
  const theme = location.search.split("=")[1];
  const spaceId = location.pathname.split("/")[2];
  const [testimonials, setTestimonials] = useState(null);
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
          src="/public/assets/Spinner@1x-1.0s-200px-200px.svg"
          alt=""
        />
      </div>
    );
  }
  return (
    <div className=" flex justify-center">
      <div className=" w-fit  grid sm:grid-cols-2 lg:grid-cols-3 p-5 md:p-10   gap-3  m-3">
        <script
          src="/node_modules/@iframe-resizer/child/index.umd.js"
          type="text/javascript"
          async
        ></script>
        {testimonials?.map((testimonial) => (
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
    </div>
  );
};

export default Embed;

import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Testimonials from "../components/Testimonials";

const Embed = () => {
  const location = useLocation();
  const spaceId = location.pathname.split("/")[2];
  const [testimonials, setTestimonials] = useState([]);
  useEffect(() => {
    const getTestimonials = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/wall/fetch-wall?spaceId=${spaceId}`
      );
      setTestimonials(res?.data);
    };
    getTestimonials();
  }, []);

  return (
    <div className="   grid md:grid-cols-3 p-5 md:p-10 grid-cols-1 md:flex-row flex-col gap-3  m-3">
      {testimonials.map((testimonial) => (
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
  );
};

export default Embed;

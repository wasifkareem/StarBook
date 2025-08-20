import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export function MyComponent() {
  const [rating, setRating] = useState(3);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value, index) => console.log(value, index);

  return (
    <div
      style={{
        direction: "ltr",
        fontFamily: "sans-serif",
        touchAction: "none",
      }}
    >
      <Rating onClick={function noRefCheck() {}} />
    </div>
  );
}

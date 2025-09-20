import Image from "next/image";
import React from "react";

const Loader = ({}) => {
  return (
    <div className=" w-full h-screen flex justify-center items-center">
      <Image width={150} height={100} alt="loader" src="/assets/starload.gif" />
    </div>
  );
};

export default Loader;

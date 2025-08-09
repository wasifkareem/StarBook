import React from "react";

const Billing = () => {
  return (
    <div className=" flex w-screen items-center justify-center flex-col">
      <h1
        style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}
        className=" md:text-4xl  text-2xl mt-10 mb-3 font-semibold text-slate-800"
      >
        One-Time purchase, lifetime use
      </h1>
      <p>No multiple Plans, No decision fatigue</p>
      <div className=" flex flex-col border border-yellow-600 px-10 py-5 mt-10 rounded-lg">
        <p className=" self-center md:text-3xl text-yellow-600 text-2xl font-semibold">
          ₹2000
          <span className=" text-sm font-normal text-slate-800">/lifetime</span>
        </p>
        <ul className=" mt-5">
          <li>150 testimonials</li>
          <li>5 spaces</li>
          <li>All future updates included</li>
          <li>Technical support</li>
        </ul>
        <button className=" w-fit self-center mt-10 px-3 py-2  bg-yellow-600 text-white font-semibold">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Billing;

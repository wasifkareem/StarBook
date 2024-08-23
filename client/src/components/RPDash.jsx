import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isKeyAvailable } from "../redux/payRedux";
import { useAuth, useUser } from "@clerk/clerk-react";

const RPDash = ({ RPInfo, spaceInfo }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  return (
    <div className=" shadow-blue-300 shadow-md  md:w-[430px] relative bg-blue-500 opacity-90 text-white px-6 py-3 rounded flex flex-col gap-2">
      <p>
        Total Tip collected for <strong>"{spaceInfo?.spaceName}"</strong>
        <br />
        since last 30 days
      </p>

      <p className=" text-2xl font-mono bg-blue-400 w-fit px-2 rounded-lg py-1">
        <span className=" text-gray-600 font-semibold">₹</span>{" "}
        {(RPInfo / 100).toFixed(2)}
      </p>
    </div>
  );
};

export default RPDash;

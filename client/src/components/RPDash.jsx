import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isKeyAvailable } from "../redux/payRedux";

const RPDash = ({ RPInfo, spaceInfo }) => {
  const { email } = useSelector(
    (state) => state?.user?.currentUser?.userObject
  );
  const { token } = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const deleteKeys = async () => {
    const res = await axios.put(
      `http://localhost:3000/api/tip/delete-keys?email=${email}`,
      {},
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200) {
      dispatch(isKeyAvailable(false));
    }
  };

  return (
    <div className=" border md:w-[430px] relative bg-blue-400 text-white px-6 py-3 rounded flex flex-col gap-2">
      <button
        onClick={deleteKeys}
        className="absolute right-0 top-0 bg-slate-800 text-sm rounded-sm px-2 py-1 m-1"
      >
        clear keys
      </button>
      <p>
        Total Tip collected for <strong>"{spaceInfo?.spaceName}"</strong>
        <br />
        since last 30 days
      </p>

      <p className=" text-2xl">₹ {(RPInfo / 100).toFixed(2)}</p>
    </div>
  );
};

export default RPDash;

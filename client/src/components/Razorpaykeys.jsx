import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearKeys, isKeyAvailable, keyIdInfo } from "../redux/payRedux";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

const Razorpaykeys = ({ setKeyToggle, setToggle }) => {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const { isKey } = useSelector((state) => state?.pay);
  const [idVal, setIdVal] = useState(null);
  const [secretVal, setSecretVal] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const { keyId } = useSelector((state) => state?.pay);
  console.log(keyId);

  // useEffect(() => {
  //   const getKeyId = async()=>{
  //    const res = await axios.get(`https://starbook.onrender.com/api/auth/get-keyId?userId=${userId}`)

  //   }

  // }, [])

  const onSubmit = async () => {
    if (!secretVal || !idVal) {
      setIsEmpty(true);
      setTimeout(() => {
        setIsEmpty(false);
      }, 4000);
    } else {
      try {
        const data = {
          keyId: idVal,
          keySecret: secretVal,
          userId: userId,
        };
        const res = await axios.put(
          "https://starbook.onrender.com/api/auth/add-keys",
          data
        );
        if (res.status === 200) {
          toast.success(
            "Keys added successfully. This key will enable Razorpay analytics for all the spaces."
          );
          dispatch(isKeyAvailable(true));
          dispatch(keyIdInfo(res?.data?.keyId));
        }
      } catch (err) {
        toast.error("Something went wrong!");
      }
    }
  };

  const deleteKeys = async () => {
    const res = await axios.put(
      `https://starbook.onrender.com/api/tip/delete-keys?userId=${userId}`,
      {}
    );
    if (res.status === 200) {
      dispatch(clearKeys());
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <p className=" font-semibold">
        Razorpay Details{" "}
        <span className=" text-slate-400 text-sm font-normal">
          - Enable your Tip Collector by putting your Razorpay keys here
        </span>
      </p>
      <hr className=" my-6" />
      <div className=" flex items-center w-full justify-center">
        <div className=" flex flex-col gap-4  items-center w-fit ">
          {isKey ? (
            <p className=" text-sm leading-8">
              A Razorpay account with{" "}
              <span className=" rounded-sm bg-gray-200 py-1 px-2 text-gray-700 font-mono text-sm">
                key id: {keyId}
              </span>{" "}
              is found. Make sure the Razorpay keys are valid otherwise the tip
              collector won't work.
            </p>
          ) : (
            <>
              <div className=" flex justify-between w-96 items-center">
                <label className=" text-sm" htmlFor="">
                  Key Id:
                </label>
                <input
                  value={isKey ? keyId : null}
                  className=" text-sm text-gray-700 md:w-56 border border-gray-400 rounded px-2 outline-1 outline-gray-400"
                  type="text"
                  disabled={isKey}
                  onChange={(e) => setIdVal(e.target.value)}
                />
              </div>
              <div className=" flex justify-between w-96 items-center">
                <label className=" text-sm" htmlFor="">
                  Key Secret:
                </label>
                <input
                  className=" text-sm text-gray-700 md:w-56 border border-gray-400 rounded px-2 outline-1 outline-gray-400"
                  type="password"
                  onChange={(e) => setSecretVal(e.target.value)}
                />
              </div>
            </>
          )}
          {isEmpty && (
            <p className=" flex items-center gap-2 text-sm self-end text-red-600">
              <IoWarningOutline /> All fields are mandetory
            </p>
          )}
          {isKey ? (
            <button
              className=" border border-gray-400 w-fit px-2 py-1 text-sm rounded self-end"
              onClick={deleteKeys}
            >
              Remove Account
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className=" border border-gray-400 w-fit px-2 py-1 text-sm rounded self-end"
            >
              Add Keys
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Razorpaykeys;

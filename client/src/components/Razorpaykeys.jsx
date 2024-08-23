import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isKeyAvailable } from "../redux/payRedux";
import { useAuth } from "@clerk/clerk-react";
import { Fade, Zoom } from "react-reveal";
import { useEffect, useRef, useState } from "react";

const Razorpaykeys = ({ setKeyToggle, setToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const dispatch = useDispatch();
  const { userId } = useAuth();
  const { isKey } = useSelector((state) => state?.pay);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data) => {
    data.userId = userId;
    try {
      const res = await axios.put(
        "http://localhost:3000/api/auth/add-keys",
        data
      );

      if (res.status === 200) {
        toast.success(
          "Keys added successfully, This key will enable razorpay analytics for all the spaces"
        );
        dispatch(isKeyAvailable(true));
        setToggle(false);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };
  const deleteKeys = async () => {
    setIsFetching(true);
    const res = await axios.put(
      `http://localhost:3000/api/tip/delete-keys?userId=${userId}`,
      {}
    );
    if (res.status == 200) {
      dispatch(isKeyAvailable(false));
      setIsFetching(false);
    } else {
      toast.error("Something went wrong!");
    }
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    // Add event listener to document
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Remove event listener when component is unmounted
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <>
      {isKey ? (
        <div
          ref={dropdownRef}
          className="relative transition-all flex flex-col gap-2 shadow shadow-slate-400 z-10 bg-white px-4 py-3 mt-10 md:mt-2 rounded text-slate-800 h-40 w-72"
        >
          <div className=" absolute top-[-10px] -z-10 right-20 rotate-45 border-l border-t  bg-white w-5 h-5"></div>
          <p>
            Your Razorpay account is linked, turn on the{" "}
            <strong>"tip collector"</strong> in your space and let your happy
            customers tip you.
          </p>
          <div className=" flex gap-2 justify-end">
            <button
              type="delete"
              onClick={deleteKeys}
              className=" bg-slate-800 w-32 h-8 flex justify-center text-white rounded-sm text-sm px-2 py-1 border border-slate-700 "
            >
              {isFetching ? (
                <img
                  className=" h-6 "
                  src="/src/assets/Spinner@1x-1.0s-200px-200px.svg"
                />
              ) : (
                "Remove Account"
              )}
            </button>
            <button
              onClick={() => setToggle(false)}
              className="bg-slate-50 rounded-sm text-sm px-2 py-1 border border-slate-700 "
            >
              Cancel
            </button>
          </div>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)}>
        {isKey ? null : (
          <div
            ref={dropdownRef}
            className="relative transition-all flex flex-col gap-2 shadow shadow-slate-400 z-10 bg-white px-4 py-3 mt-10 md:mt-2 rounded text-slate-800"
          >
            <div className=" absolute top-[-10px] -z-10 right-20 rotate-45 border-l border-t  bg-white w-5 h-5"></div>

            <p className=" mb-4 bg-gray-200 px-2 py-2 ">
              Enable your Tip Collector by putting you Razorpay keys here
            </p>
            <div className=" flex flex-row justify-between font-semibold">
              <label htmlFor="">Key Id:</label>
              <input
                className=" border border-slate-400 md:w-72 h-8 px-2 font-normal outline-cyan-600 rounded w-54"
                type="text"
                {...register("keyId", {
                  required: true,
                })}
              />
            </div>
            {errors?.keyId?.type === "required" && (
              <p className=" m-0 text-end text-red-700">
                This field is required
              </p>
            )}
            <div className=" flex flex-row justify-between font-semibold">
              <label htmlFor="">Key Secret:</label>
              <input
                className=" border border-slate-400 font-normal px-2 md:w-72 h-8 outline-cyan-600 rounded w-54"
                type="password"
                {...register("keySecret", {
                  required: true,
                })}
              />
            </div>
            {errors?.keySecret?.type === "required" && (
              <p className=" text-end text-red-700">This field is required</p>
            )}
            <div className="flex flex-row gap-2 items-center justify-end">
              <button
                type="submit"
                disabled={!isDirty || !isValid}
                className={` ${
                  !isDirty || !isValid ? "cursor-not-allowed" : "cursor-pointer"
                }
          ${!isDirty || !isValid ? "bg-blue-300" : "bg-blue-800"}
          bg-blue-800 text-white py-2 mt-3 transition-all md:w-fit md:self-end md:px-4 rounded`}
              >
                Enable
              </button>
              <button
                className=" border-slate-600 border py-2 mt-3 md:w-fit md:self-end md:px-4 rounded"
                onClick={() => setToggle(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default Razorpaykeys;

import axios from "axios";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isKeyAvailable } from "../redux/payRedux";

const Razorpaykeys = ({ setKeyToggle }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const { email } = useSelector(
    (state) => state?.user?.currentUser?.userObject
  );
  const { token } = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    data.email = email;
    try {
      const res = await axios.put(
        "http://localhost:3000/api/auth/add-keys",
        data,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Keys added successfully");
        dispatch(isKeyAvailable(true));
        setKeyToggle(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={() => setKeyToggle(false)}
      className=" z-50 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-2 bg-white px-4 py-3 mt-10 md:mt-2 rounded text-slate-800">
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
            <p className=" m-0 text-end text-red-700">This field is required</p>
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
              onClick={() => setKeyToggle(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Razorpaykeys;

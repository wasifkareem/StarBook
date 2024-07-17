import axios from "axios";
import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/userRedux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    try {
      setIsFetching(true);
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (res.status === 200) {
        setIsFetching(false);
        dispatch(loginSuccess(res.data));
        navigate("/home");
      }
    } catch (err) {
      setIsFetching(false);
      console.error("Error Signing up", err);
      toast.error(err.response.data);
    }
  };
  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <>
      <Navbar />

      <div className=" min-h-[90vh] min-w-screen  flex justify-center">
        <form
          className=" border mb-10 border-slate-300 py-4  mt-40 md:mt-24 flex flex-col px-4 w-[90%] md:w-[500px] h-[50%] gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className=" text-slate-500">Email</label>
          <input
            placeholder="Your Email"
            type="email"
            className=" h-10  focus:outline-none  bg-slate-200 pl-3 border-slate-300"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}

          <label className=" text-slate-500">Password</label>
          <input
            placeholder="Password"
            type="password"
            className="h-10  focus:outline-none  bg-slate-200 pl-3 border-slate-300"
            {...register("password", {
              required: true,
            })}
          />
          {errors?.password?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}

          <button
            className=" cursor-pointer bg-slate-800 w-36 h-10 flex justify-center items-center self-end px-4 font-semibold mt-3  text-white"
            type="submit"
          >
            {isFetching ? (
              <img
                className=" h-10"
                src="/src/assets/Spinner@1x-1.0s-200px-200px.svg"
                alt=""
              />
            ) : (
              "Submit"
            )}
          </button>
          <p className=" text-slate-800 ">
            Don&apos;t have an account?{" "}
            <span
              className=" font-semibold cursor-pointer"
              onClick={handleSignup}
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;

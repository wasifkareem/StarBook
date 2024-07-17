import Navbar from "../components/Navbar";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [isFetching, setIsFetching] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setIsFetching(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        firstName: data.firstName,
        email: data.email,
        password: data.password,
      });
      setIsFetching(false);
      if (res.data) {
        toast.success("Signup Successfull!");
        navigate("/login");
      }
    } catch (err) {
      setIsFetching(false);
      toast.error(err.response.data);
    }
  }; // your form submit function which will invoke after successful validation

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Navbar />
      <div className=" min-h-[90vh] min-w-screen  flex justify-center">
        <form
          className=" border border-slate-300 mb-10 md:mt-24 py-4  mt-40 flex flex-col px-4 w-[90%] md:w-[500px] h-[50%] gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className=" text-slate-500">First Name</label>
          <input
            placeholder="First Name"
            className="h-10  focus:outline-none  bg-slate-200 pl-3 border-slate-300"
            {...register("firstName", {
              required: true,
              maxLength: 20,
              pattern: /^[A-Za-z]+$/i,
            })}
          />
          {errors?.firstName?.type === "required" && (
            <p>This field is required</p>
          )}
          {errors?.firstName?.type === "maxLength" && (
            <p>First name cannot exceed 20 characters</p>
          )}
          {errors?.firstName?.type === "pattern" && (
            <p>Alphabetical characters only</p>
          )}

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
            Already have an account?{" "}
            <span
              className=" font-semibold cursor-pointer"
              onClick={handleLogin}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;

import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

const ReviewBox = ({ spaceInfo, toggle, setToggle }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [rating, setRating] = useState(5);
  const [ImgFile, setImgFile] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleImage = (e) => {
    setImgFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgPreview(url);
  };
  const onSubmit = async (data) => {
    console.log(data);
    try {
      setIsFetching(true);
      if (ImgFile) {
        const imgFile = new FormData();
        imgFile.append("my_file", ImgFile);
        const assetInfo = await axios.post(
          "http://localhost:3000/upload",
          imgFile
        );
        data.imgPath = assetInfo.data.url;
        data.spaceId = spaceInfo?._id;
        data.starRating = rating;
        const response = await axios.post(
          "http://localhost:3000/api/testimonials/create",
          data
        );
        console.log(response);
      }
      setImgPreview(null);
      reset();
      setIsFetching(false);
      setToggle(false);
      toast.success("Thanks for the shoutout, it means a lot to Us!🤗");
    } catch (err) {
      setIsFetching(false);
      alert(err);
    }
  };
  return (
    <div
      className=" overflow-y-auto fixed top-0 bottom-0 left-0 right-0 flex flex-col "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="md:flex md:flex-col bg-white rounded-lg m-5 p-3 md:w-fit md:self-center">
        <button
          onClick={() => setToggle(false)}
          className="hidden md:block self-end text-3xl "
        >
          &times;
        </button>
        <p className=" font-semibold text-xl text-slate-800">
          Write Text Testimonial to
        </p>
        <img
          className=" h-20 w-20 object-cover rounded-lg mt-3"
          src={spaceInfo?.imgPath}
          alt=""
        />
        <div className="  flex flex-col md:self-center">
          <p className=" font-semibold text-lg mt-10 md:text-xl "> QUESTIONS</p>
          <hr className=" w-8 h-1 bg-cyan-700 mt-2" />
          <ul className="  text-slate-700 mt-5 mx-5 list-disc md:text-lg text-[14px]">
            <li>{spaceInfo?.qOne}</li>
            <li>{spaceInfo?.qTwo}</li>
            <li>{spaceInfo?.qThree}</li>
          </ul>
        </div>
        <div className=" mt-5">
          <StarRatings
            starHoverColor="#ffa534"
            starRatedColor="#ffa534"
            changeRating={changeRating}
            starDimension="24px"
            starSpacing="2px"
            rating={rating}
          />
        </div>
        <form
          className="  self-center  mb-10 md:mb-2  py-4 flex flex-col  md:w-[500px]  gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            placeholder={
              rating <= 3
                ? "What issues did you face? How can we make it better?"
                : null
            }
            className=" h-24 md:h-36 p-2 focus:outline-blue-600  pl-3 border border-slate-400 rounded"
            {...register("testimonial", {
              required: true,
            })}
          />
          {errors?.testimonial?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-500">Your Name</label>
          <input
            placeholder="Name"
            className="h-14  focus:outline-blue-600  border pl-3 border-slate-400 rounded"
            {...register("name", {
              required: true,
            })}
          />
          {errors?.name?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-500">Your Email</label>
          <input
            type="email"
            placeholder="Email"
            className="h-14  focus:outline-blue-600  border pl-3 border-slate-400 rounded"
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-600 mt-4">Upload Your Photo</label>
          <div className=" flex gap-8 items-center ">
            <label
              className=" border focus:outline-blue-600  rounded-lg w-fit h-fit px-2 py-1 cursor-pointer text-slate-600 border-slate-600"
              htmlFor="upload-photo"
            >
              Choose File
            </label>

            {imgPreview ? (
              <img
                className=" h-16 rounded-full border w-16 "
                src={imgPreview}
                alt=""
              />
            ) : (
              <div className=" h-16 w-16 rounded-full bg-gray-200"></div>
            )}
          </div>

          <input
            type="file"
            id="upload-photo"
            style={{ display: "none" }}
            onChange={handleImage}
            accept=".jpg,.jpeg,.png"
          />

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3">
            <button
              className=" md:order-2 rounded-sm cursor-pointer bg-slate-800 w-full md:w-[80px] h-10 flex justify-center items-center self-center px-4 font-semibold mt-3 md:mt-0 text-white"
              type="submit"
            >
              {isFetching ? (
                <img
                  className=" h-10"
                  src="/src/assets/Spinner@1x-1.0s-200px-200px.svg"
                  alt=""
                />
              ) : (
                "Send"
              )}
            </button>
            <button
              onClick={() => setToggle(false)}
              className=" md:order-1 border md:w-[80px] h-10 border-slate-800 rounded-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewBox;

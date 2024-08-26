import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "react-toastify";

const ReviewBox = ({ spaceInfo, toggle, setToggle }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [rating, setRating] = useState(5);
  const [ImgFile, setImgFile] = useState(null);
  const [amount, setAmount] = useState();
  const [isPaid, setIsPaid] = useState(false);
  const [payDetails, setPayDetails] = useState(null);
  console.log(payDetails);
  const [selectedValue, setSelectedValue] = useState("");
  const [imgPreview, setImgPreview] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { userId } = useAuth();
  const changeRating = (newRating) => {
    setRating(newRating);
  };
  const { isKey } = useSelector((state) => state?.pay);
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
    try {
      if (!ImgFile) {
        toast.warning("Please upload a photo of yours");
        return;
      }
      if (!isChecked) {
        toast.warning(
          "Please give permission to share your testimonials on our socials!"
        );
        return;
      }

      setIsFetching(true);
      const imgFile = new FormData();
      imgFile.append("my_file", ImgFile);
      const assetInfo = await axios.post(
        "https://starbook.onrender.com/upload",
        imgFile
      );
      data.imgPath = assetInfo.data.url;
      data.spaceId = spaceInfo?._id;
      data.starRating = rating;
      data.tip = payDetails?.amount;
      const response = await axios.post(
        "https://starbook.onrender.com/api/testimonials/create",
        data
      );
      setImgPreview(null);
      reset();
      setIsFetching(false);
      setToggle(false);
      toast.success("Thanks for the shoutout, it means a lot to Us!🤗");
    } catch (err) {
      setIsFetching(false);
      toast.error("Something went wrong at our end! try again later.");
    }
  };
  const paymentHandler = async (e) => {
    const API_URL = "https://starbook.onrender.com/api/tip/";
    e.preventDefault();
    const orderUrl = `${API_URL}order?userId=${userId}&amount=${amount}&currency=${selectedValue}&label=tip_${spaceInfo?._id}`;
    const response = await axios.get(orderUrl);
    const { data } = response;
    setPayDetails(data);
    const options = {
      key: data.keyId,
      name: spaceInfo.name,
      image: spaceInfo.imgPath,
      order_id: data.id,
      handler: async (response) => {
        try {
          const url = `${API_URL}validate?userId=${userId}`;
          const captureResponse = await axios.post(url, response);
          console.log(captureResponse);
          if (captureResponse.status == 201) {
            setIsPaid(true);
          }
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#53546b",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
  };
  return (
    <div
      className="overflow-y-auto fixed top-0 bottom-0 left-0 right-0 flex flex-col "
      style={{ backgroundColor: "#0000007f" }}
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
            maxLength={280}
            className=" h-24 md:h-36 p-2 focus:outline-blue-600  pl-3 border border-slate-400 rounded"
            {...register("testimonial", {
              required: true,
            })}
          />
          {errors?.testimonial?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-500">
            Your Name<span className=" text-red-500 text-sm">*</span>
          </label>
          <input
            placeholder="Name"
            className="h-10 focus:outline-blue-600  border pl-3 border-slate-400 "
            {...register("name", {
              required: true,
            })}
            maxLength={30}
          />
          {errors?.name?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-500">
            Your Email<span className=" text-red-500 text-sm">*</span>
          </label>
          <input
            type="email"
            placeholder="Email"
            className="h-10  focus:outline-blue-600  border pl-3 border-slate-400 "
            {...register("email", {
              required: true,
            })}
          />
          {errors?.email?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}
          <label className=" text-slate-500">Your Title and Company</label>
          <input
            type="text"
            maxLength={40}
            placeholder="Content Marketing head at Adobe"
            className="h-10  focus:outline-blue-600  border pl-3 border-slate-400 "
            {...register("title")}
          />

          <label className=" text-slate-600 mt-4">
            Upload Your Photo<span className=" text-red-500 text-sm">*</span>
          </label>
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
          {isPaid && isKey ? (
            <span className=" bg-green-500 px-4 py-2 rounded-3xl text-white text-center ">
              Your Tip of {payDetails?.currency} {payDetails?.amount / 100} has
              been recieved by the seller
            </span>
          ) : (
            isKey &&
            spaceInfo?.tipBox && (
              <div className=" bg-blue-700 rounded py-3 px-2 mt-4">
                <label className=" text-white font-mono text-sm">
                  This seller is accepting tips, show them some love(Optional)
                </label>
                <div className=" flex gap-3 mt-3">
                  <div className=" flex w-44 shadow shadow-slate-800">
                    <select
                      value={selectedValue}
                      onChange={(e) => setSelectedValue(e.target.value)}
                      className=" rounded-l-sm outline-none bg-gray-800 text-gray-300 text-sm font-semibold border-r border-slate-500"
                      name=""
                      id=""
                    >
                      <option className="" value="INR">
                        INR
                      </option>
                    </select>
                    <input
                      className="h-10 w-fit overflow-hidden  rounded-r-sm  pl-3 bg-gray-800 text-white outline-none "
                      type="number"
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={paymentHandler}
                    className="  bg-white rounded  shadow shadow-white border-slate-700 text-slate-800 font-semibold px-3 py-1"
                  >
                    Pay
                  </button>
                </div>
              </div>
            )
          )}
          <div className=" flex gap-2 mt-3 ">
            <Checkbox
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              label="I give permission to use this testimonial across social channels and other marketing efforts"
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3">
            <button
              className=" md:order-2 rounded-sm cursor-pointer bg-slate-800 w-full md:w-[80px] h-10 flex justify-center items-center self-center px-4 font-semibold mt-3 md:mt-0 text-white"
              type="submit"
            >
              {isFetching ? (
                <img
                  className=" h-10"
                  src="/assets/Spinner@1x-1.0s-200px-200px.svg"
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
function Checkbox({ label, isChecked, setIsChecked }) {
  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="hidden"
      />
      <div
        className={`w-6 p-1 h-6 border-2 flex justify-center self-start items-center border-blue-400 rounded-md ${
          isChecked ? "bg-blue-500" : "bg-gray-200"
        }`}
      >
        <FaCheck className="text-white" />
      </div>
      <span className="ml-2 text-slate-700">{label}</span>
    </label>
  );
}
export default ReviewBox;

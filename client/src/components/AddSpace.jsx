import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReloadSpaceInfo } from "../redux/InfoRedux";
import { useUser } from "@clerk/clerk-react";

const AddSpace = ({ setToggle, isEdit, spaceInfo }) => {
  const dispatch = useDispatch();
  const [headerPreview, setHeaderPreview] = useState(
    isEdit ? spaceInfo.headerTitle : null
  );
  const [msgPreview, setMsgPreview] = useState(
    isEdit ? spaceInfo.message : null
  );
  const [one, setOne] = useState(isEdit ? spaceInfo.qOne : null);
  const [two, setTwo] = useState(isEdit ? spaceInfo.qTwo : null);
  const [three, setThree] = useState(isEdit ? spaceInfo.qThree : null);
  const [isFetching, setIsFetching] = useState(false);
  const [ImgFile, setImgFile] = useState();
  const [imgPreview, setImgPreview] = useState(
    isEdit ? spaceInfo?.imgPath : null
  );
  const { user } = useUser();
  const { emailAddress } = user.primaryEmailAddress;
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const handleOne = (e) => {
    setValue("qOne", e.target.value);
    setOne(e.target.value);
  };
  const handleTwo = (e) => {
    setValue("qTwo", e.target.value);
    setTwo(e.target.value);
  };
  const handleThree = (e) => {
    setValue("qThree", e.target.value);
    setThree(e.target.value);
  };
  const handleImage = (e) => {
    setImgFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgPreview(url);
  };
  const onSubmit = async (data) => {
    try {
      setIsFetching(true);
      if (emailAddress) {
        if (ImgFile) {
          const imgFile = new FormData();
          imgFile.append("my_file", ImgFile);
          const assetInfo = await axios.post(
            "https://starbook-1.onrender.com/upload",
            imgFile
          );
          data.imgPath = assetInfo.data.url;
        }
        data.ownerEmail = emailAddress;
        if (isEdit === true) {
          const response = await axios.put(
            `https://starbook-1.onrender.com/api/space/update-space?spaceId=${spaceInfo.id}`,
            data
          );
          if (response.status == 200) {
            dispatch(ReloadSpaceInfo());
            reset();
            setIsFetching(false);
            setToggle(false);
            toast.success("Space Updated Successfully!.");
          }
        } else {
          const response = await axios.post(
            "https://starbook-1.onrender.com/api/space/create-space",
            data
          );
          if (response.status == 200) {
            reset();
            setIsFetching(false);
            setToggle(false);
            toast.success("Space Created.");
          }
        }
      }
    } catch (err) {
      setIsFetching(false);
      toast.error(err.response.data);
    }
  };

  const handleToggle = () => {
    setToggle(false);
  };
  return (
    <div
      style={{
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
      }}
      className=" z-50  bg-dotted-net overflow-y-auto fixed top-0 bottom-0 right-0 flex justify-center items-start left-0 bg-slate-100"
    >
      <div className=" flex justify-center flex-col min-w-[90%] shadow-lg bg-white  mt-20 min-h-[90%] rounded-lg mx-3 ">
        <button
          onClick={handleToggle}
          className=" self-end text-3xl mr-3 mt-1 "
        >
          &times;
        </button>

        <div className=" md:flex flex-row md:justify-center px-10 gap-4">
          <div className="hidden md:block w-2/5">
            <div className=" relative mx-auto w-[28rem] flex  flex-col justify-center rounded-md border border-slate-300 shadow-slate-400 shadow-lg py-3 pt-10">
              <label className=" flex items-center gap-1 absolute top-[-14px] left-2 bg-green-200 text-green-800 font-semibold rounded-xl px-4 py-1 text-sm">
                Space public page - Live Preview
                <div className=" text-red-500 shadow-2xl shadow-red-700  m-0 p-0 animate-pulse h-2 w-2 rounded-full bg-red-700"></div>
              </label>
              <img
                className=" h-20 rounded w-fit self-center"
                src={imgPreview ? imgPreview : "/assets/review.png"}
                alt=""
              />
              <h2 className="  w-[24rem] text-center break-words whitespace-normal self-center text-3xl font-semibold text-slate-700 mt-9">
                {headerPreview ? headerPreview : "Header goes here..."}
              </h2>
              <p className=" w-[24rem] text-center break-words whitespace-normal text-slate-600 self-center mt-4">
                {msgPreview ? msgPreview : " Your custom message goes here..."}
              </p>
              <div className=" mx-12 flex flex-col md:self-center">
                <p className=" font-semibold text-lg mt-10 md:mt-16 md:text-lg ">
                  {" "}
                  QUESTIONS
                </p>
                <hr className=" w-8 h-1 bg-cyan-700 mt-2" />
                <ul className=" w-[22rem] break-words whitespace-normal  text-slate-700 mt-5 list-disc md:text-md">
                  <li>
                    {one ? one : "Who are you / what are you working on?"}
                  </li>
                  <li>
                    {two ? two : "How has [our product / service] helped you?"}
                  </li>
                  <li>
                    {three
                      ? three
                      : "What is the best thing about [our product / service]"}
                  </li>
                </ul>
              </div>
              <button className=" w-3/5 md:w-60 mb-5 md:mb-14 bg-cyan-600 self-center py-3 mt-10 text-white font-semibold text-lg rounded">
                Send Text
              </button>
            </div>
          </div>
          <div className=" md:w-3/5 flex flex-col justify-center">
            <div className=" text-center flex flex-col gap-3">
              <h1 className=" font-bold text-4xl text-slate-900">
                {isEdit ? "Edit Space" : "Create a new Space"}
              </h1>
              {!isEdit && (
                <p className=" text-slate-600">
                  After the Space is created, it will generate a dedicated page
                  with public link for collecting testimonials.
                </p>
              )}
            </div>
            <form
              className="  self-center  mb-10  py-4   flex flex-col px-4 mx-5  md:w-[600px]  gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className=" text-slate-500">Space name</label>
              <input
                defaultValue={isEdit ? spaceInfo.spaceName : null}
                maxLength={40}
                placeholder="Space name"
                className="h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-300"
                {...register("spaceName", {
                  required: true,
                })}
              />
              {errors?.spaceName?.type === "required" && (
                <p className=" text-red-700">This field is required</p>
              )}
              <label className=" text-slate-500">Space logo</label>

              <div className="  border-dashed flex items-center gap-3  border border-slate-300 py-2 px-3">
                <label
                  className=" border rounded-lg px-2 py-1 cursor-pointer text-slate-600 border-slate-600"
                  htmlFor="upload-photo"
                >
                  Change
                </label>

                <input
                  type="file"
                  id="upload-photo"
                  style={{ display: "none" }}
                  onChange={handleImage}
                  accept=".jpg,.jpeg,.png"
                />
                <img
                  className=" h-20 rounded-full border w-20"
                  src={imgPreview ? imgPreview : "/assets/review.png"}
                  alt=""
                />
              </div>
              <label className=" text-slate-500">Header title</label>
              <input
                defaultValue={isEdit ? spaceInfo.headerTitle : null}
                maxLength={70}
                placeholder="Would you like to give a shoutout to xyz?"
                className=" h-10   border rounded focus:outline-cyan-600 pl-3 border-slate-300"
                {...register("headerTitle", {
                  required: true,
                })}
                onChange={(e) => setHeaderPreview(e.target.value)}
              />
              {errors?.headerTitle?.type === "required" && (
                <p className=" text-red-800">This field is required</p>
              )}

              <label className=" text-slate-500">Your custom message</label>
              <textarea
                defaultValue={isEdit ? spaceInfo.message : null}
                maxLength={250}
                className=" h-24  focus:outline-cyan-600  border rounded pl-3 border-slate-300"
                placeholder="Write a warm message to your customers, and ask them to give you lot of stars."
                {...register("message", {
                  required: true,
                })}
                onChange={(e) => setMsgPreview(e.target.value)}
              />
              {errors?.message?.type === "required" && (
                <p className=" text-red-800">This field is required</p>
              )}

              <label className="text-slate-500">Questions:</label>
              <input
                maxLength={70}
                defaultValue={
                  isEdit
                    ? spaceInfo.qOne
                    : "Who are you / what are you working on?"
                }
                className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-300"
                {...register("qOne", {
                  required: true,
                })}
                onChange={handleOne}
              />
              <input
                maxLength={70}
                className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-300"
                {...register("qTwo", {
                  required: true,
                })}
                defaultValue={
                  isEdit
                    ? spaceInfo.qTwo
                    : "How has [our product / service] helped you?"
                }
                onChange={handleTwo}
              />
              <input
                maxLength={70}
                className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-300"
                {...register("qThree", {
                  required: true,
                })}
                defaultValue={
                  isEdit
                    ? spaceInfo.qThree
                    : "What is the best thing about [our product / service]"
                }
                onChange={handleThree}
              />
              <button
                className=" cursor-pointer rounded bg-slate-700 w-52 h-10 flex justify-center items-center self-end px-4 mt-3  text-white"
                type="submit"
              >
                {isFetching ? (
                  <img
                    className=" m-2 h-7"
                    src="/assets/Spinner@1x-1.0s-200px-200px.svg"
                    alt=""
                  />
                ) : isEdit ? (
                  "Update Space"
                ) : (
                  "Create new Space"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpace;

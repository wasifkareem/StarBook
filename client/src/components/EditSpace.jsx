import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const EditSpace = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [ImgFile, setImgFile] = useState();
  const [imgPreview, setImgPreview] = useState();
  const { token } = useSelector((state) => state?.user?.currentUser);
  const { email } = useSelector(
    (state) => state?.user?.currentUser?.userObject
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImage = (e) => {
    setImgFile(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setImgPreview(url);
  };
  const onSubmit = async (data) => {
    try {
      setIsFetching(true);
      if (email) {
        if (ImgFile) {
          const imgFile = new FormData();
          imgFile.append("my_file", ImgFile);
          const assetInfo = await axios.post(
            "https://starbook.onrender.com/upload",
            imgFile
          );
          data.imgPath = assetInfo.data.url;
        }
        data.ownerEmail = email;
        const response = await axios.post(
          "https://starbook.onrender.com/api/space/create-space",
          data,
          {
            headers: {
              token: `Bearer ${token}`,
            },
          }
        );
      }
      reset();
      setIsFetching(false);
      //(false);
      toast.success("Space Created.");
    } catch (err) {
      setIsFetching(false);
      toast.error(err.response.data);
    }
  };

  const handleToggle = () => {
    //(false);
  };
  return (
    <div className=" z-50 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]">
      <div className=" flex justify-center flex-col min-w-[90%] bg-white  mt-20 min-h-[90%] rounded-lg mx-3 ">
        <button onClick={handleToggle} className=" self-end text-3xl ">
          &times;
        </button>
        <div className=" text-center">
          <h1 className=" font-bold text-2xl text-slate-800">
            Create a new Space
          </h1>
          <p className=" text-slate-600">
            After the Space is created, it will generate a dedicated page with
            public link for collecting testimonials.
          </p>
        </div>
        <form
          className=" border border-dotted self-center border-slate-400 mb-10 md:mt-24 py-4  mt-10 flex flex-col px-4 mx-5  md:w-[500px] h-[50%] gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className=" text-slate-500">Space name</label>
          <input
            placeholder="Space name"
            maxLength={5}
            className="h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-400"
            {...register("spaceName", {
              required: true,
            })}
          />
          {errors?.spaceName?.type === "required" && (
            <p>This field is required</p>
          )}
          <label className=" text-slate-500">Space logo</label>

          <div className="  border-dashed flex items-center gap-3  border border-slate-400 py-2 px-3">
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
              src={imgPreview ? imgPreview : "src/assets/review.png"}
              alt=""
            />
          </div>
          <label className=" text-slate-500">Header title</label>
          <input
            placeholder="Would you like to give a shoutout to xyz?"
            className=" h-10   border rounded focus:outline-cyan-600 pl-3 border-slate-400"
            {...register("headerTitle", {
              required: true,
            })}
          />
          {errors?.headerTitle?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}

          <label className=" text-slate-500">Your custom message</label>
          <textarea
            className=" h-24  focus:outline-cyan-600  border rounded pl-3 border-slate-400"
            placeholder="Write a warm message to your customers, and ask them to give you lot of stars."
            {...register("message", {
              required: true,
            })}
          />
          {errors?.message?.type === "required" && (
            <p className=" text-red-800">This field is required</p>
          )}

          <label className="text-slate-500">Questions:</label>
          <input
            defaultValue="Who are you / what are you working on?"
            className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-400"
            {...register("qOne", {
              required: true,
            })}
            onChange={(e) => setValue("qOne", e.target.value)}
          />
          <input
            className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-400"
            {...register("qTwo", {
              required: true,
            })}
            defaultValue="How has [our product / service] helped you?"
            onChange={(e) => {
              setValue("qTwo", e.target.value);
            }}
          />
          <input
            className=" h-10   focus:outline-cyan-600  border rounded pl-3 border-slate-400"
            {...register("qThree", {
              required: true,
            })}
            defaultValue="What is the best thing about [our product / service]"
            onChange={(e) => setValue("qThree", e.target.value)}
          />
          <button
            className=" cursor-pointer bg-slate-800 min-w-42 h-10 flex justify-center items-center self-end px-4 font-semibold mt-3  text-white"
            type="submit"
          >
            {isFetching ? (
              <img
                className=" h-10"
                src="/public/assets/Spinner@1x-1.0s-200px-200px.svg"
                alt=""
              />
            ) : (
              "Create new Space"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpace;

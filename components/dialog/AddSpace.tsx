"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";
import z from "zod";
import { spaceInfoSchema } from "@/lib/schemas/space.schema";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

export const addSpacePropsSchema = z.object({
  setToggle: z.any(),
  isEdit: z.boolean(),
  spaceInfo: spaceInfoSchema.optional(),
});

export const addSpaceFormSchema = z.object({
  spaceName: z.string(),
  headerTitle: z.string(),
  message: z.string(),
  qOne: z.string(),
  qTwo: z.string(),
  qThree: z.string(),
  imgPath: z.string(),
  ownerEmail: z.string().email(),
});

type addSpaceProps = z.infer<typeof addSpacePropsSchema>;
export type SpaceForm = z.infer<typeof addSpaceFormSchema>;

const AddSpace = ({ setToggle, isEdit, spaceInfo }: addSpaceProps) => {
  const [headerPreview, setHeaderPreview] = useState<string | null>(
    isEdit && spaceInfo ? spaceInfo.headerTitle : null
  );
  const [msgPreview, setMsgPreview] = useState<string | null>(
    isEdit && spaceInfo ? spaceInfo.message : null
  );
  const [one, setOne] = useState<string | null>(
    isEdit && spaceInfo ? spaceInfo.qOne : null
  );
  const [two, setTwo] = useState<string | null>(
    isEdit && spaceInfo ? spaceInfo.qTwo : null
  );
  const [three, setThree] = useState<string | null>(
    isEdit && spaceInfo ? spaceInfo.qThree : null
  );
  const [isFetching, setIsFetching] = useState(false);
  const [ImgFile, setImgFile] = useState<File | null>(null);
  const { setReloadCards, state } = useAppContext();
  const [imgPreview, setImgPreview] = useState<string | null>(
    isEdit && spaceInfo ? (spaceInfo?.imgPath ?? null) : null
  );
  const { user } = useUser();
  const emailAddress = user?.primaryEmailAddress?.emailAddress;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SpaceForm>();

  const handleOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("qOne", e.target.value);
    setOne(e.target.value);
  };

  const handleTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("qTwo", e.target.value);
    setTwo(e.target.value);
  };

  const handleThree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("qThree", e.target.value);
    setThree(e.target.value);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImgFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImgPreview(url);
    }
  };

  const onSubmit = async (data: SpaceForm) => {
    try {
      setIsFetching(true);

      if (!emailAddress) {
        toast.error("User email not found");
        setIsFetching(false);
        return;
      }

      // Handle image upload if new file is selected
      if (ImgFile) {
        const imgFile = new FormData();
        imgFile.append("my_file", ImgFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: imgFile,
        });

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const assetInfo = await response.json();
        data.imgPath = assetInfo.url;
      } else if (isEdit && spaceInfo?.imgPath) {
        // Keep existing image if no new file uploaded
        data.imgPath = spaceInfo.imgPath;
      }

      data.ownerEmail = emailAddress;
      if (isEdit === true) {
        const response = await fetch(
          `/api/space/update-space?spaceId=${spaceInfo?.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          reset();
          setIsFetching(false);
          setReloadCards(!state.reloadCards);
          setToggle(false);
          toast.success("Space Updated Successfully!");
        } else {
          throw new Error("Failed to update space");
        }
      } else {
        const response = await fetch("/api/space/create-space", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          reset();
          setIsFetching(false);
          setToggle(false);
          toast.success("Space Created.");
        } else {
          toast.error("Failed to create space");
          setIsFetching(false);
        }
      }
    } catch (err) {
      setIsFetching(false);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleToggle = () => {
    setToggle(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToggle(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  });

  return (
    <div
      style={{
        backgroundPosition: "0 0, 10px 10px",
        backgroundSize: "20px 20px",
        backgroundImage:
          "radial-gradient(circle, #cccccc 1px, transparent 1px), radial-gradient(circle, #cccccc 1px, transparent 1px)",
      }}
      className="z-50 overflow-y-auto fixed top-0 bottom-0 right-0 flex justify-center items-start left-0 bg-slate-100"
    >
      <div
        className="flex relative justify-center flex-col min-w-[90%] bg-white mt-20 min-h-[90%] rounded-lg mx-3"
        style={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={handleToggle}
          className="self-end text-3xl absolute top-5 right-5  "
        >
          <IoClose className=" text-neutral-500 border rounded-[5px] hover:text-neutral-600 " />
        </button>

        <div className="md:flex flex-row md:justify-center px-10 gap-4">
          {/* Preview section - keeping the same as original */}
          <div className="hidden md:block w-2/5">
            <div className="relative mx-auto w-[28rem] flex flex-col justify-center rounded-md border border-slate-300 shadow-slate-400 shadow-lg py-3 pt-10">
              <label className="flex items-center gap-1 absolute top-[-14px] left-2 bg-green-200 text-green-800 font-semibold rounded-xl px-4 py-1 text-sm">
                Space public page - Live Preview
                <div className="text-red-500 shadow-2xl shadow-red-700 m-0 p-0 animate-pulse h-2 w-2 rounded-full bg-red-700"></div>
              </label>
              <Image
                width={100}
                height={100}
                className="h-20 rounded w-fit self-center"
                src={imgPreview ? imgPreview : "/assets/review.png"}
                alt=""
              />
              <h2 className="w-[24rem] text-center break-words whitespace-normal self-center text-3xl font-semibold text-slate-700 mt-9">
                {headerPreview ? headerPreview : "Header goes here..."}
              </h2>
              <p className="w-[24rem] text-center break-words whitespace-normal text-slate-600 self-center mt-4">
                {msgPreview ? msgPreview : " Your custom message goes here..."}
              </p>
              <div className="mx-12 flex flex-col md:self-center">
                <p className="font-semibold text-lg mt-10 md:mt-16 md:text-lg">
                  QUESTIONS
                </p>
                <hr className="w-8 h-1 bg-cyan-700 mt-2" />
                <ul className="w-[22rem] break-words whitespace-normal text-slate-700 mt-5 list-disc md:text-md">
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
              <Button
                variant="secondary"
                className=" w-4/5 self-center mb-5 md:mb-9 md:w-80 mt-6 h-12 cursor-pointer"
              >
                Send Text
              </Button>
            </div>
          </div>

          {/* Form section - keeping the same structure */}
          <div className="md:w-3/5 flex flex-col justify-center">
            <div className="text-center flex flex-col gap-3">
              <h1 className="font-bold text-4xl text-slate-900">
                {isEdit ? "Edit Space" : "Create a new Space"}
              </h1>
              {!isEdit && (
                <p className="text-slate-600">
                  After the Space is created, it will generate a dedicated page
                  with public link for collecting testimonials.
                </p>
              )}
            </div>
            <form
              className="self-center mb-10 py-4 flex flex-col px-4 mx-5 md:w-[600px] gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* All form fields remain the same */}
              <label className="text-slate-500">Space name</label>
              <input
                defaultValue={
                  isEdit && spaceInfo ? spaceInfo.spaceName : undefined
                }
                maxLength={40}
                placeholder="Space name"
                className="h-10 focus:outline-cyan-600 border rounded-[6px] pl-3 border-slate-300"
                {...register("spaceName", {
                  required: true,
                })}
              />
              {errors?.spaceName?.type === "required" && (
                <p className="text-red-700">This field is required</p>
              )}

              <label className="text-slate-500">Space logo</label>
              <div className="border-dashed flex items-center gap-3 border border-slate-300 py-2 px-3">
                <label
                  className="border rounded-lg px-2 py-1 cursor-pointer text-slate-600 border-slate-300 hover:border-slate-300 transition-all"
                  htmlFor="upload-photo"
                >
                  Change
                </label>
                <input
                  type="file"
                  id="upload-photo"
                  style={{ display: "none" }}
                  onChange={handleImage}
                  accept=".jpg,.jpeg,.png,.webp"
                />
                <Image
                  width={100}
                  height={100}
                  className="h-20 rounded-full border w-20"
                  src={imgPreview ? imgPreview : "/assets/review.png"}
                  alt=""
                />
              </div>

              {/* Rest of the form fields remain the same */}
              <label className="text-slate-500">Header title</label>
              <input
                defaultValue={
                  isEdit && spaceInfo ? spaceInfo.headerTitle : undefined
                }
                maxLength={70}
                placeholder="Would you like to give a shoutout to xyz?"
                className="h-10 border rounded-[7px] focus:outline-cyan-600 pl-3 border-slate-300"
                {...register("headerTitle", {
                  required: true,
                })}
                onChange={(e) => setHeaderPreview(e.target.value)}
              />
              {errors?.headerTitle?.type === "required" && (
                <p className="text-red-800">This field is required</p>
              )}

              <label className="text-slate-500">Your custom message</label>
              <textarea
                defaultValue={
                  isEdit && spaceInfo ? spaceInfo.message : undefined
                }
                maxLength={250}
                className="h-24 focus:outline-cyan-600 border rounded-[7px] pl-3 border-slate-300"
                placeholder="Write a warm message to your customers, and ask them to give you lot of stars."
                {...register("message", {
                  required: true,
                })}
                onChange={(e) => setMsgPreview(e.target.value)}
              />
              {errors?.message?.type === "required" && (
                <p className="text-red-800">This field is required</p>
              )}

              <label className="text-slate-500">Questions:</label>
              <input
                maxLength={70}
                defaultValue={
                  isEdit && spaceInfo
                    ? spaceInfo.qOne
                    : "Who are you / what are you working on?"
                }
                className="h-10 focus:outline-cyan-600 border rounded-[7px] pl-3 border-slate-300"
                {...register("qOne", {
                  required: true,
                })}
                onChange={handleOne}
              />
              <input
                maxLength={70}
                className="h-10 focus:outline-cyan-600 border rounded-[7px] pl-3 border-slate-300"
                {...register("qTwo", {
                  required: true,
                })}
                defaultValue={
                  isEdit && spaceInfo
                    ? spaceInfo.qTwo
                    : "How has [our product / service] helped you?"
                }
                onChange={handleTwo}
              />
              <input
                maxLength={70}
                className="h-10 focus:outline-cyan-600 border rounded-[7px] pl-3 border-slate-300"
                {...register("qThree", {
                  required: true,
                })}
                defaultValue={
                  isEdit && spaceInfo
                    ? spaceInfo.qThree
                    : "What is the best thing about [our product / service]"
                }
                onChange={handleThree}
              />
              <Button
                className="cursor-pointer rounded-[7px]  w-40 self-end"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <Image
                    width={100}
                    height={100}
                    className="m-2 h-7 "
                    src="/assets/Spinner@1x-1.0s-200px-200px.svg"
                    alt=""
                  />
                ) : isEdit ? (
                  "Update Space"
                ) : (
                  "Create new Space"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSpace;

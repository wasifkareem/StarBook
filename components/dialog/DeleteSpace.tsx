import { useState } from "react";
import { toast } from "sonner";
import { IoWarningOutline } from "react-icons/io5";
import z from "zod";
import { useUser } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";

const deleteSpaceProps = z.object({
  setToggle:z.any(),
  spaceName:z.string(),
  spaceId:z.string()
})

type deleteSpaceProps = z.infer<typeof deleteSpaceProps>

const DeleteSpace = ({ setToggle, spaceName, spaceId }:deleteSpaceProps) => {
  const {user} = useUser();
  console.log(user)
  const [input, setInput] = useState<string|null>(null);
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const {setReloadSpaces} = useAppContext()

  const handleClick = async () => {
    if (input == spaceName) {
      const response = await fetch(`/api/space/delete-space?spaceId=${encodeURIComponent(spaceId)}&&userEmail=${user?.primaryEmailAddress?.emailAddress}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });

       if(!response.ok){
        throw new Error('Failed to delete space!!')
       }
       toast.success('Space deleted successfully 🚮')
       setReloadSpaces(true)
      } else {
      toast.warning("Make sure the space name is correct.");
    }
  };

  return (
    <div
      onClick={() => setToggle(false)}
      className=" z-50 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className=" rounded bg-white py-5 px-8 w-fit flex justify-center flex-col gap-2"
      >
        <IoWarningOutline className=" text-5xl text-center self-center text-red-900" />
        <p className=" text-center">
          This action might cause in irreversible data loss,
          <br /> if you want to continue, please type{" "}
          <span className="  px-1   text-center pb-1 font-semibold text-red-900">
            "{spaceName}"
          </span>{" "}
          below{" "}
        </p>
        <input
          onChange={handleChange}
          className=" outline-red-800 rounded-[7px] h-8 px-2 border border-slate-500"
          type="text"
        />
        <div className=" flex justify-center mt-4 gap-3">
          <Button
            onClick={handleClick}
            className=" text-white bg-red-900 hover:ring-red-900 border border-slate-300 px-3 py-1"
          >
            Delete
          </Button>
          <button
            onClick={() => setToggle(false)}
            className=" border rounded border-slate-300 font-semibold px-5 py-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSpace;

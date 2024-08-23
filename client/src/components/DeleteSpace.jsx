import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ReloadSpaces } from "../redux/InfoRedux";
import { IoWarningOutline } from "react-icons/io5";
import { Fade } from "react-reveal";

const DeleteSpace = ({ setToggle, spaceName, spaceId }) => {
  const [input, setInput] = useState();
  const dispatch = useDispatch();
  console.log(spaceName);
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = async () => {
    if (input == spaceName) {
      const res = await axios.delete(
        `http://localhost:3000/api/space/delete-space?spaceId=${spaceId}`
      );
      if (res.status == 200) {
        dispatch(ReloadSpaces());
        toast.success("Space deleted successfully.");
      } else {
        toast.success("An error occured!");
      }
    } else {
      toast.warning("Make sure the space name is correct.");
    }
  };

  return (
    <div
      onClick={() => setToggle(false)}
      className=" z-50 flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-[#0000007f]"
    >
      <Fade>
        <div
          onClick={(e) => e.stopPropagation()}
          className=" rounded bg-white py-5 px-4 w-fit flex justify-center flex-col gap-2"
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
            className=" outline-red-800 rounded h-8 px-2 border border-slate-500"
            type="text"
          />
          <div className=" flex justify-center gap-3">
            <button
              onClick={handleClick}
              className=" text-red-900 font-semibold border border-slate-300 px-3 py-1"
            >
              Delete
            </button>
            <button
              onClick={() => setToggle(false)}
              className=" border border-slate-300 font-semibold px-3 py-1"
            >
              Cancel
            </button>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default DeleteSpace;

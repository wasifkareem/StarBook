import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isKeyAvailable, tipToggle } from "../redux/payRedux";
import { useAuth, useUser } from "@clerk/clerk-react";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import Switch from "react-switch";
import { SiRazorpay } from "react-icons/si";
import { ReloadSpaceInfo } from "../redux/InfoRedux";

const RPDash = ({ spaceInfo, spaceId }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();
  const { isKey } = useSelector((state) => state?.pay);
  const [RPInfo, setRPInfo] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const { isTipOpen } = useSelector((state) => state?.pay);
  const { keyId } = useSelector((state) => state?.pay);
  useEffect(() => {
    if (spaceInfo?.tipBox) {
      const getData = async () => {
        try {
          setIsFetching(true);
          const res = await axios.get(
            `https://starbook.onrender.com/api/tip/fetch-payments?userId=${userId}&label=${spaceId}`
          );
          setRPInfo(res.data);
          setIsFetching(false);
        } catch (error) {
          if (error.response.status === 401) {
            setIsFetching(false);
            dispatch(tipToggle(false));

            toast.error(
              "Authentication failed, please check the keys and Re-enter!"
            );
          }
        }
      };

      getData();
    }
  }, [userId, spaceInfo?.tipBox, spaceInfo]);
  const handleChange = (nextChecked) => {
    const updateSpace = async () => {
      const res = await axios.put(
        `https://starbook.onrender.com/api/space/update-space?spaceId=${spaceId}`,
        { tipBox: nextChecked }
      );
      if (res.status === 200) {
        dispatch(ReloadSpaceInfo());
      }
    };
    updateSpace();
  };

  return (
    <div
      className={` relative shadow-slate-200 shadow  md:w-[430px] ${
        spaceInfo?.tipBox && !isFetching ? "bg-blue-500" : "bg-white"
      } opacity-90 text-white  ${!isFetching && "py-3 px-6"} rounded flex ${
        spaceInfo?.tipBox && !isFetching
          ? "border border-transparent"
          : "border border-slate-200"
      } flex-col gap-2 rounded-br-xl`}
    >
      <div
        style={{ clipPath: "polygon(10% 0, 100% 0, 100% 100%, 0 100%)" }}
        className="absolute flex items-center gap-2 bg-slate-700   right-0 p-1 rounded-br-xl bottom-0 pl-6   shadow-lg"
      >
        <img
          className=" h-6 shadow shadow-white rounded-full"
          src="/public/assets/rp-icon.jpg"
          alt=""
        />
        <label htmlFor="" className="text-white mb-1  text-sm">
          Tip collector
        </label>
        <Switch
          height={25}
          handleDiameter={17}
          onColor="#2d8fff"
          width={50}
          onChange={handleChange}
          checked={spaceInfo?.tipBox}
        />
      </div>
      {spaceInfo?.tipBox ? (
        isFetching ? (
          <div className=" text-white px-6 py-3 rounded">
            <Skeleton count={2} className="w-5/6 h-6" />
            <Skeleton
              count={1}
              style={{ width: "100px" }}
              className=" w-3 h-8"
            />
          </div>
        ) : (
          <>
            <p>
              Total Tip collected for <strong>"{spaceInfo?.spaceName}"</strong>
              <br />
              since last 30 days
            </p>
            <p className="text-2xl font-mono bg-blue-400 w-fit px-2 rounded-lg py-1">
              <span className="text-gray-600 font-semibold">₹</span>{" "}
              {(RPInfo / 100).toFixed(2)}
            </p>
          </>
        )
      ) : (
        <p className=" text-gray-700 text-[15px] h-full text-center">
          Activate your tip collector and let your happy customers tip you while
          writing reviews, we will show all the tip collected for this space
          here.
        </p>
      )}
    </div>
  );
};

export default RPDash;

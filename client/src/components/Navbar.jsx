import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { useState } from "react";
import Razorpaykeys from "./Razorpaykeys";
import { GrDashboard } from "react-icons/gr";

const Navbar = () => {
  const { isSignedIn } = useUser();
  const [toggle, setToggle] = useState(false);
  const { isKey } = useSelector((state) => state?.pay);

  const handleClick = () => {
    setToggle(!toggle);
  };
  const DotIcon = () => {
    return (
      <svg
        width="15px"
        height="15px"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.5 0h11c.828 0 1.5.677 1.5 1.512v18.21a.2.2 0 01-.334.149l-1.664-1.515a.497.497 0 00-.67 0l-1.664 1.514a.497.497 0 01-.67 0l-1.663-1.514a.497.497 0 00-.67 0L8.002 19.87a.497.497 0 01-.67 0l-1.664-1.514a.497.497 0 00-.67 0l-1.664 1.515a.2.2 0 01-.334-.15V1.512C3 .677 3.672 0 4.5 0zm6.808 13.4l-1.96-2.63c1.342-.21 2.254-1.288 2.552-2.694h.85a.75.75 0 100-1.499h-.763a4.427 4.427 0 00-.432-1.579h.945A1 1 0 1012.5 3h-5a1 1 0 100 1.998h2.135c.449.297.754.86.844 1.58H7.25a.75.75 0 100 1.498h3.1c-.252.756-.791 1.234-1.493 1.234-.285 0-.543-.02-.777-.056a1 1 0 00-1.258 1.489l2.89 3.86a1 1 0 001.596-1.204z"
          fill="#5C5F62"
        />
      </svg>
    );
  };

  return (
    <div className="  top-0 bg-white right-0 left-0 z-[999] shadow-lg shadow-slate-100 h-20 px-2 py-5 flex justify-between">
      <Link to={`${isSignedIn ? "/app" : "/"}`}>
        <div className=" flex gap-2 text-2xl font-bold italic ">
          <img
            className=" w-6 "
            src="/public/assets/star-logo.svg"
            alt="star-logo"
          />
          <p style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}>
            StarBook
          </p>
        </div>
      </Link>
      <div>
        <SignedIn>
          <div className=" flex gap-4">
            {toggle && (
              <div className=" transition-all absolute top-[73px] right-4 ">
                <Razorpaykeys setToggle={setToggle} />
              </div>
            )}
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  labelIcon={<GrDashboard />}
                  label="Dashboard"
                  href="/app"
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Link
                  labelIcon={<DotIcon />}
                  label="Billing"
                  href="/app/billing"
                />
              </UserButton.MenuItems>

              <UserButton.UserProfilePage
                label="Razorpay Details"
                url="custom"
                labelIcon={<DotIcon />}
              >
                <Razorpaykeys />
              </UserButton.UserProfilePage>
            </UserButton>
          </div>
        </SignedIn>
        <SignedOut>
          <Link to="/sign-in">
            <button className=" border rounded  border-slate-400 px-2 py-1 text-slate-800 bg-white">
              Sign In
            </button>
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default Navbar;

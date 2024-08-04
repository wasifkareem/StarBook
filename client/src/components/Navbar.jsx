import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const handleClick = () => {
    dispatch(logout());
    nav("/login");
  };
  return (
    <div className=" bg-slate-200 shadow-lg shadow-slate-100 px-2 py-5 flex justify-between">
      <Link to={"/home"}>
        <div className=" flex gap-2 text-2xl font-bold italic ">
          <img
            className=" w-6 "
            src="/src/assets/star-logo.svg"
            alt="star-logo"
          />
          <p style={{ textShadow: "2px 2px 1px rgba(255, 208, 0, 0.856)" }}>
            StarBook
          </p>
        </div>
      </Link>
      <div className=" flex">
        {currentUser ? (
          <button
            onClick={handleClick}
            className=" bg-slate-800 shadow-sm shadow-slate-900 rounded-sm text-white font-semibold px-4 py-1 flex items-center justify-center"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

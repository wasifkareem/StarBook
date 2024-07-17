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
    <div className=" bg-slate-200 px-2 py-5 flex justify-between">
      <Link to={"/home"}>
        <div className=" flex gap-2 text-2xl font-bold italic">
          <img
            className=" w-5"
            src="/src/assets/star-logo.svg"
            alt="star-logo"
          />
          StarBook
        </div>
      </Link>
      <div>
        {currentUser ? (
          <button
            onClick={handleClick}
            className=" bg-slate-800 rounded-sm text-white font-semibold px-4 py-1 flex items-center justify-center"
          >
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;

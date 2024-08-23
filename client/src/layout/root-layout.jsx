import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";
import { store } from "../redux/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
  const navigate = useNavigate();
  const loc = useLocation();
  const page = loc.pathname.split("/")[1];

  return (
    <ClerkProvider
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/sign-in"
    >
      <Provider store={store}>
        <header className="header">
          {page === "public" || page === "embed" ? null : <Navbar />}
        </header>
        <main>
          <Outlet />
          <ToastContainer />
        </main>
      </Provider>
    </ClerkProvider>
  );
}

import * as React from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

export default function AppLayout() {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/sign-in");
    }
  }, [isLoaded]);

  if (!isLoaded) return <Loader />;

  return (
    <>
      <Outlet />
    </>
  );
}

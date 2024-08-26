import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Import the layouts
import RootLayout from "./layout/root-layout";
import AppLayout from "./layout/app-layout";
import LandingPage from "./pages/LandingPage";

//Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Embed from "./pages/Embed";
import ReviewPage from "./pages/ReviewPage";
import SignInPage from "./pages/Login";
import Billing from "./pages/Billing";
import SignUpPage from "./pages/Signup";
import "@iframe-resizer/child";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
      { path: "/public/:id", element: <ReviewPage /> },
      { path: "/embed/:id", element: <Embed /> },

      {
        element: <AppLayout />,
        path: "app",
        children: [
          { path: "/app", element: <Home /> },
          { path: "/app/products/:id", element: <Dashboard /> },
          { path: "/app/billing", element: <Billing /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import ReviewPage from "./pages/ReviewPage";
import Embed from "./pages/Embed";
import "react-loading-skeleton/dist/skeleton.css";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={currentUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/home" /> : <Login />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products/:id" element={<Dashboard />} />
        <Route path="/embed/:id" element={<Embed />} />
        <Route path="/:id" element={<ReviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import Landing from "../components/Home/Landing";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {isAuth ? (
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-700 rounded-sm p-2 text-white font-bold cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      ):(
        <Landing/>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      Estamos en el home
      {isAuth && (
        <div>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-cyan-700 rounded-sm p-2 text-white font-bold cursor-pointer"
          >
            Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

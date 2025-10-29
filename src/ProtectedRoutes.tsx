import React from "react";
import { Outlet } from "react-router-dom";
import useAuth from "./context/useAuth";
import { Navigate } from "react-router-dom";
import SideBar from "./components/sideBar/SideBar";

const ProtectedRoutes: React.FC = () => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoutes;

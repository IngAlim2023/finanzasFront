import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { FaChartLine, FaUser } from "react-icons/fa";
import { TbArrowsShuffle } from "react-icons/tb";
import { IoMenu, IoClose } from "react-icons/io5";
import useAuth from "../../context/useAuth";
import { api } from "../../service/api";
import toast from "react-hot-toast";

const SideBar: React.FC = () => {
  const { setIsAuth, setNames, setId, setRol, setEmail, names, email } =
    useAuth();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await api.get("/usuarios/logout");
      setIsAuth(false);
      setId(0);
      setNames("");
      setRol(0);
      setEmail("");
      toast.success("Sesión cerrada exitosamente");
      navigate("/login");
    } catch (error) {
      toast.error("Error al cerrar sesión");
      console.error(error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: <MdDashboard size={20} />,
    },
    {
      to: "/investments",
      label: "Inversiones",
      icon: <FaChartLine size={20} />,
    },
    {
      to: "/financial",
      label: "Finanzas",
      icon: <TbArrowsShuffle size={20} />,
    },
  ];

  return (
    <aside
  className={`${
    isCollapsed ? "w-20" : "w-64"
  } h-screen bg-white text-gray-800 flex flex-col justify-between shadow-2xl transition-all duration-300 ease-in-out border-r border-gray-200`}
>
  {/* Header */}
  <div>
    <div className="p-6 flex items-center justify-between border-b border-gray-200">
      {!isCollapsed && (
        <div className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
          FinanzasApp
        </div>
      )}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors ml-auto text-gray-600"
        aria-label={isCollapsed ? "Expandir menú" : "Contraer menú"}
      >
        {isCollapsed ? <IoMenu size={24} /> : <IoClose size={24} />}
      </button>
    </div>

    {/* User Info */}
    {!isCollapsed && (
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white">
            <FaUser size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate text-gray-800">{names || "Usuario"}</p>
            <p className="text-xs text-gray-500 truncate">{email || "correo@example.com"}</p>
          </div>
        </div>
      </div>
    )}

    {/* Links */}
    <nav className="mt-4 flex flex-col gap-1 px-3">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all group ${
              isActive
                ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100 hover:translate-x-1"
            } ${isCollapsed ? "justify-center" : ""}`
          }
          title={isCollapsed ? label : ""}
        >
          <span className={`${isCollapsed ? "text-2xl" : "text-lg"} transition-all`}>
            {icon}
          </span>
          {!isCollapsed && <span>{label}</span>}
        </NavLink>
      ))}
    </nav>
  </div>

  {/* Logout */}
  <div className="border-t border-gray-200">
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`w-full flex items-center gap-3 px-6 py-4 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all ${
        isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
      } ${isCollapsed ? "justify-center" : ""}`}
      title={isCollapsed ? "Cerrar sesión" : ""}
    >
      <MdOutlineLogout size={20} className={isCollapsed ? "text-2xl" : ""} />
      {!isCollapsed && (
        <span>{isLoggingOut ? "Cerrando..." : "Cerrar sesión"}</span>
      )}
    </button>
  </div>
</aside>
  );
};

export default SideBar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineLogout } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import { TbArrowsShuffle } from "react-icons/tb";
import useAuth from "../../context/useAuth";

const SideBar: React.FC = () => {
  const { setIsAuth, setNames } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuth(false);
    setNames("");
    navigate("/login");
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
    <aside className="w-64 h-screen bg-emerald-600 text-white flex flex-col justify-between shadow-xl">
      {/* Header */}
      <div>
        <div className="p-6 text-2xl font-bold text-center tracking-wide border-b border-white/20">
          FinanzasApp
        </div>

        {/* Links */}
        <nav className="mt-6 flex flex-col gap-1">
          {links.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/20 shadow-md"
                    : "hover:bg-white/10 hover:translate-x-1"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-white/20">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold hover:bg-white/10 transition-all"
        >
          <MdOutlineLogout size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default SideBar;

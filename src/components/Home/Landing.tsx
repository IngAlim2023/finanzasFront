import React from "react";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { MdOutlineShield } from "react-icons/md";
import { RiPieChart2Line } from "react-icons/ri";
import { TbWallet } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  text-gray-800 px-6">
      {/* HEADER */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-lg text-white text-5xl">
          <TbWallet className="mr-2" />
        </div>
        <h1 className="mt-4 text-5xl font-ligth text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
            FinanzasApp
          </span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-md mx-auto">
          Gestiona tus finanzas personales de forma inteligente y visual.
        </p>
      </div>

      {/* BENEFICIOS */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl mb-10">
        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition  flex flex-col justify-center items-center">
          <div className="bg-emerald-100 flex justify-center items-center rounded-full p-3 m-2 transition-transform duration-300 hover:scale-110">
            <RiPieChart2Line className="text-emerald-500 text-4xl" />
          </div>
          <h3 className="text-m font-semibold mb-2">Gestión Completa</h3>
          <p className="text-gray-600 text-center mt-2">
            Registra ingresos, egresos e inversiones en un solo lugar.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-center items-center">
          <div className="bg-blue-100 flex justify-center items-center rounded-full p-3 m-2 transition-transform duration-300 hover:scale-110">
            <HiMiniArrowTrendingUp className="text-blue-500 text-4xl" />
          </div>
          <h3 className="text-m font-semibold mb-2 text-center">
            Estadísticas Detalladas
          </h3>
          <p className="text-gray-600 text-center mt-2">
            Visualiza tus finanzas con gráficas y reportes claros.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition flex flex-col justify-center items-center">
          <div className="bg-purple-100 flex justify-center items-center rounded-full p-3 m-2 transition-transform duration-300 hover:scale-110">
            <MdOutlineShield className="text-purple-600 text-4xl" />
          </div>
          <h3 className="text-ms font-semibold mb-2 text-center">
            Seguro y Confiable
          </h3>
          <p className="text-gray-600 text-center mt-2">
            Tus datos financieros protegidos y siempre accesibles.
          </p>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex gap-6">
        <button
          className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-xl shadow-md hover:bg-emerald-600 transition"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
        <button
          className="px-6 py-3 border-2 border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-500 hover:text-white transition"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </button>
      </div>

      {/* FOOTER */}
      <footer className="mt-16 text-sm text-gray-500">
        © {new Date().getFullYear()} FinanzasApp — Todos los derechos reservados
      </footer>
    </div>
  );
};

export default Landing;

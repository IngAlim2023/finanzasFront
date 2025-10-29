import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { api } from "../../service/api";
import toast from "react-hot-toast";

const NavBar: React.FC = () => {
  const { isAuth, setIsAuth, setNames, setId, setRol, setEmail, names } = useAuth();
  const navigate = useNavigate();

  const handleOut = async () => {
    try {
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
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo/Nombre */}
        <Link 
          to="/" 
          className="text-xl font-semibold bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent hover:from-emerald-600 hover:to-blue-600 transition-all"
        >
          {names || "FinanzasApp"}
        </Link>

        {/* Menú de navegación */}
        <ul className="flex items-center space-x-6">
          <li>
            <Link 
              to="/" 
              className="text-gray-700 font-semibold hover:text-emerald-500 transition-colors"
            >
              Inicio
            </Link>
          </li>
          
          {!isAuth ? (
            <li>
              <Link 
                to="/login" 
                className="text-gray-700 font-semibold hover:text-emerald-500 transition-colors"
              >
                Iniciar Sesión
              </Link>
            </li>
          ) : (
            <li>
              <button
                className="rounded-lg bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
                onClick={handleOut}
              >
                Cerrar Sesión
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
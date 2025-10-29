import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth";
import { api } from "../../service/api";

const NavBar: React.FC = () => {
  const { isAuth, setIsAuth, setNames, setId, setRol, setEmail } = useAuth();

  const handleOut = async () => {
    await api.get("/usuarios/logout");
    setIsAuth(false);
    setId(0);
    setNames('');
    setRol(0);
    setEmail('');
  };
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Finanzas</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
          </li>
          {!isAuth && (
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          )}
        </ul>
        {isAuth && (
          <button
            className="rounded-xl bg-emerald-500 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            onClick={handleOut}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

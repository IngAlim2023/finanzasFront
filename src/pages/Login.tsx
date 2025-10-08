import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../service/api";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth";

const Login: React.FC = () => {
  const [showP, setShowP] = useState<boolean>(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const { isAuth, setIsAuth, setNames, setId, setRol, setEmail } = useAuth();

  const onSubmit: any = async (data: any) => {
    try {
      const res = await api.post("usuarios/login", data);
      if (res.data.data) {
        setIsAuth(true);
        setId(res.data.data.id);
        setNames(res.data.data.names);
        setRol(res.data.data.rol);
        setEmail(res.data.data.email);
      }
      toast.success("Bienvenido");
      navigate("/");
    } catch (error: any) {
      toast.error("No se pudo conectar con el servidor.");
      console.error("Error desconocido:");
      console.log(error);
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold text-center text-cyan-700">
            Ingresar
          </h2>
          <input
            type="email"
            {...register("correo", { required: true })}
            placeholder="Correo"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <div className="relative">
            <input
              type={showP ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <div
              onClick={() => setShowP(!showP)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-cyan-700"
            >
              {showP ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </div>
          </div>
          <button
            type="submit"
            className="bg-cyan-700 hover:bg-cyan-800 transition-colors text-white font-semibold p-2 rounded-md cursor-pointer"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center m-2">
          <label>No tienes cuenta? </label>
          <Link
            to="/register"
            className="text-cyan-500 underline hover:text-cyan-800"
          >
            Registrarme
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

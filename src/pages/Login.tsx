import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../service/api";
import toast from "react-hot-toast";
import useAuth from "../context/useAuth";

type Input = {
  correo:string,
  password:string
}

const Login: React.FC = () => {
  const [showP, setShowP] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const { isAuth, setIsAuth, setNames, setId, setRol, setEmail } = useAuth();

  const onSubmit: SubmitHandler<Input> = async (data:Input) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-cyan-600 hover:text-cyan-800 font-semibold flex items-center gap-1 hover:cursor-pointer"
        >
          ← Volver
        </button>

        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-semibold text-center">Iniciar Sesión</h2>
          <h3 className="text-center text-gray-600">
            Accede a tu cuenta de FinanzasApp
          </h3>
          <input
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico no válido",
              },
            })}
            placeholder="Correo"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.correo && (
            <p className="text-sm text-red-500 mt-1">{errors.correo.message}</p>
          )}

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
            disabled={loading}
            className={`bg-cyan-700 text-white font-semibold p-2 rounded-md transition-colors ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-cyan-800 cursor-pointer"
            }`}
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="text-center m-2">
          <label className="text-gray-600">No tienes cuenta? </label>
          <Link
            to="/register"
            className="text-cyan-500 hover:underline hover:text-cyan-800 font-semibold"
          >
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

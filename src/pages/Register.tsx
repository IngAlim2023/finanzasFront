import React, { useEffect, useState } from "react";
import { api } from "../service/api";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

interface DataDocs {
  id: number;
  documento: string;
}

const Register: React.FC = () => {
  const [documentos, setDocumentos] = useState<DataDocs[]>([]);
  const [showP, setShowP] = useState<boolean>(false);

  const { register, handleSubmit, control } = useForm();
  const {isAuth} = useAuth()

  useEffect(() => {
    const loadDocs = async () => {
      const res = await api.get("/documentos");
      setDocumentos(res.data.data);
    };
    loadDocs();
  }, []);

  const options = documentos.map((val) => ({
    value: val.id,
    label: val.documento,
  }));

  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    try {
      await api.post("usuarios", data);
      toast.success("Ya estás registrado");
      navigate("/");
    } catch (error: any) {
      toast.error("No se pudo conectar con el servidor.");
      console.error("Error desconocido:");
    }
  };

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center text-cyan-700">
            Registro
          </h2>

          <input
            type="text"
            {...register("nombres", { required: true })}
            placeholder="Nombres"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="text"
            {...register("apellidos", { required: true })}
            placeholder="Apellidos"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <Controller
            name="iddocumento"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                onChange={(option) =>
                  field.onChange(option ? option.value : null)
                }
                value={options.find((option) => option.value === field.value)}
                className="text-left"
              />
            )}
          />

          <input
            type="text"
            {...register("documento", { required: true })}
            placeholder="Número de documento"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="email"
            {...register("correo", { required: true })}
            placeholder="Correo"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          {/* Password Input with toggle */}
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
            Registrarme
          </button>
        </form>
        <div className="text-center m-2">
          <label>Ya tienes cuenta? </label>
          <Link
            to="/login"
            className="text-cyan-500 underline hover:text-cyan-800"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

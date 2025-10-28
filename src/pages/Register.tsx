import React, { useEffect, useState } from "react";
import { api } from "../service/api";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import Select from "react-select";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import { LuLoaderPinwheel } from "react-icons/lu";

interface DataDocs {
  id: number;
  documento: string;
}

type Inputs = {
  nombres: string;
  apellidos: string;
  iddocumento: number;
  documento: string;
  correo: string;
  password: string;
};

const Register: React.FC = () => {
  const [documentos, setDocumentos] = useState<DataDocs[]>([]);
  const [showP, setShowP] = useState<boolean>(false);
  const [btnActivate, setBtnActivate] = useState<boolean>(true);
  const [correo, setCorreo] = useState<string>("");
  const [msgCorreo, setMsgCorreo] = useState<string>("");
  const [documento, setDocumento] = useState<string>("");
  const [msgDocumento, setMsgDocumento] = useState<string>("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { isAuth } = useAuth();

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
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    setBtnActivate(false);
    try {
      await api.post("usuarios", data);
      toast.success("Ya estás registrado");
      navigate("/");
      return;
    } catch (error: any) {
      toast.error("No se pudo conectar con el servidor.");
      setBtnActivate(true);
      return;
    }
  };

  //Validaciones de correo y password:
  useEffect(() => {
    // Si no hay cambios en correo o documento, no hace nada
    if (!correo && !documento) return;

    // Limpiar mensajes previos
    setMsgCorreo("");
    setMsgDocumento("");

    // Crea el temporizador del debounce
    const timeout = setTimeout(async () => {
      try {
        if (correo) {
          const { data } = await api.get(`/usuarios/verifyCorreo/${correo}`);
          setMsgCorreo(data.message);
        }

        if (documento) {
          const { data } = await api.get(
            `/usuarios/verifyDocumento/${documento}`
          );
          setMsgDocumento(data.message);
        }
      } catch (error) {
        console.error("Error al verificar correo/documento:", error);
      }
    }, 600); // ⏱️ Espera 600ms después de que el usuario deja de escribir

    // 🧹 Limpieza: si el usuario sigue escribiendo, se cancela la ejecución anterior
    return () => clearTimeout(timeout);
  }, [correo, documento]);

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
            {...register("nombres", {
              required: "Los nombres completos son obligatorios",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 89,
                message: "No puede superar los 89 caracteres",
              },
            })}
            placeholder="Nombres"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.nombres && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nombres.message}
            </p>
          )}

          <input
            type="text"
            {...register("apellidos", {
              required: "Los apellidos completos son obligatorios",
              minLength: {
                value: 5,
                message: "Debe tener al menos 5 caracteres",
              },
              maxLength: {
                value: 89,
                message: "No puede superar los 89 caracteres",
              },
            })}
            placeholder="Apellidos"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          {errors.apellidos && (
            <p className="text-red-500 text-sm mt-1">
              {errors.apellidos.message}
            </p>
          )}

          <Controller
            name="iddocumento"
            control={control}
            rules={{ required: "El tipo de documento es obligatorio" }}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                onChange={(option) =>
                  field.onChange(option ? option.value : null)
                }
                value={options.find((option) => option.value === field.value)}
                className="text-left"
                placeholder="Tipo de documento"
              />
            )}
          />
          {errors.iddocumento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.iddocumento.message}
            </p>
          )}

          <input
            type="number"
            {...register("documento", {
              required: "El documento es obligatorio",
              minLength: {
                value: 6,
                message: "Debe tener al menos 6 caracteres",
              },
              maxLength: {
                value: 89,
                message: "No puede superar los 25 caracteres",
              },
            })}
            placeholder="Número de documento"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            autoComplete="off"
            onChange={(e) => setDocumento(e.target.value)}
          />
          {errors.documento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.documento.message}
            </p>
          )}
          {msgDocumento != "" && (
            <div className="text-sm text-emerald-500">{msgDocumento}</div>
          )}

          <input
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              minLength: {
                value: 10,
                message: "Debe tener al menos 10 caracteres",
              },
              maxLength: {
                value: 120,
                message: "No puede superar los 120 caracteres",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo inválido",
              },
            })}
            placeholder="Correo"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            onChange={(e) => setCorreo(e.target.value)}
          />
          {errors.correo && (
            <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>
          )}
          {msgCorreo != "" && (
            <div className="text-sm text-emerald-500">{msgCorreo}</div>
          )}

          {/* Password Input with toggle */}
          <div className="relative">
            <input
              type={showP ? "text" : "password"}
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 5,
                  message: "Debe tener al menos 5 caracteres",
                },
                maxLength: {
                  value: 89,
                  message: "No puede superar los 89 caracteres",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{5,}$/,
                  message: "Debe tener letras y números",
                },
              })}
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              autoComplete="off"
            />
            <div
              onClick={() => setShowP(!showP)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-cyan-700"
            >
              {showP ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-cyan-700 hover:bg-cyan-800 transition-colors text-white font-semibold p-2 rounded-md cursor-pointer"
            disabled={!btnActivate}
          >
            {btnActivate ? (
              "Registrarme"
            ) : (
              <div className=" flex justify-center font-bold text-2xl">
                <LuLoaderPinwheel className="animate-spin" />
              </div>
            )}
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

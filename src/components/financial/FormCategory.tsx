import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "../../service/api";
import Select from "react-select";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import useAuth from "../../context/useAuth";
import toast from "react-hot-toast";

interface Props {
  setShowFormCategory: (showFormCategory: boolean) => void;
}

interface TipoMovimiento {
  id: number;
  tipo: string;
}

interface Inputs {
  nombre: string;
  idtipomovimiento: number;
}

const FormCategory: React.FC<Props> = ({ setShowFormCategory }) => {
  const [movimientos, setMovimientos] = useState<TipoMovimiento[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const { id } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/tiposMovimientos");
        setMovimientos(res.data.data);
      } catch (error) {
        toast.error("Error al cargar tipos de movimiento");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowFormCategory(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowFormCategory]);

  const options = movimientos
    .map((val) => ({
      value: val.id,
      label: val.tipo,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setIsSubmitting(true);
      const categoria = { ...data, idusuario: id };
      const res = await api.post("/categorias", categoria);
      
      if (res.status === 201) {
        toast.success("Categoría creada exitosamente");
        reset();
        setShowFormCategory(false);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Error al crear la categoría";
      toast.error(errorMsg);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-200/10 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setShowFormCategory(false)}
    >
      {/* Contenedor del modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={() => setShowFormCategory(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
          aria-label="Cerrar modal"
        >
          <IoClose size={24} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Nueva Categoría
        </h2>

        {/* Estado de carga */}
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando tipos de movimiento...</p>
          </div>
        ) : (
          /* Formulario */
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Tipo de movimiento
              </label>
              <Controller
                control={control}
                name="idtipomovimiento"
                rules={{ required: "El tipo de movimiento es obligatorio" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                    value={options.find((option) => option.value === field.value) || null}
                    placeholder="Seleccionar tipo..."
                    noOptionsMessage={() => "No hay opciones disponibles"}
                    isDisabled={isSubmitting}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: errors.idtipomovimiento ? "#ef4444" : base.borderColor,
                      }),
                    }}
                  />
                )}
              />
              {errors.idtipomovimiento && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.idtipomovimiento.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Nombre de la categoría
              </label>
              <input
                type="text"
                placeholder="Ej: Alimentación, Transporte..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isSubmitting}
                {...register("nombre", {
                  required: "El campo es requerido",
                  maxLength: { value: 45, message: "Máximo 45 caracteres." },
                  minLength: { value: 4, message: "Mínimo 4 caracteres." },
                })}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-2 rounded-lg transition-all duration-200 ${
                isSubmitting 
                  ? "opacity-50 cursor-not-allowed" 
                  : "hover:scale-[1.02]"
              }`}
            >
              {isSubmitting ? "Guardando..." : "Guardar categoría"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormCategory;
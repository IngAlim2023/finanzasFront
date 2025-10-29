import React, { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Select from "react-select";
import { api } from "../../service/api";
import useAuth from "../../context/useAuth";
import { LuLoaderPinwheel } from "react-icons/lu";
import toast from "react-hot-toast";

interface Props {
  setShowFormFinancial: (showFormFinancial: boolean) => void;
}

type Inputs = {
  idtipomovimiento: number;
  idcategoria: number;
  monto: number;
  fecha: Date;
  descripcion: string;
};

const FormFinancial: React.FC<Props> = ({ setShowFormFinancial }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const [movimientos, setMovimientos] = useState<any[]>([]);
  const [categoria, setCategorias] = useState<any[]>([]);
  const [idMovimiento, setIdMovimiento] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const { id } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      const res = await api.get("/tiposMovimientos");
      setMovimientos(res.data.data);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (idMovimiento === 0) return;
    const loadMovimientos = async () => {
      const res = await api.get(`/categorias/${id}/${idMovimiento}`);
      setCategorias(res.data.data);
    };
    loadMovimientos();
  }, [idMovimiento]);

  const options = movimientos.map((val) => ({
    value: val.id,
    label: val.tipo,
  }));

  const optionsCategorias = categoria.map((val) => ({
    value: val.id,
    label: val.nombre,
  }));

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    try {
      setLoading(true);
      const movimientos = { ...data, idusuario: id };
      const res = await api.post("/movimientos", movimientos);
      if (res.status === 201) {
        toast.success("Movimiento registrado con éxito!");
        setShowFormFinancial(false);
      }
    } catch (err) {
      toast.error("Error al registrar el movimiento.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-200/10 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setShowFormFinancial(false)}
    >
      {/* Contenedor del modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        {/* Botón de cerrar */}
        <button
          onClick={() => setShowFormFinancial(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors hover:cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Registrar Movimiento
        </h2>

        {/* Formulario */}
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
                  onChange={(option) => {
                    setIdMovimiento(option ? option.value : 0);
                    field.onChange(option ? option.value : null);
                  }}
                  value={options.find((option) => option.value === field.value)}
                  placeholder="Movimiento"
                />
              )}
            />
          </div>
          {errors.idtipomovimiento && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idtipomovimiento.message}
            </p>
          )}
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Categoria
            </label>
            <Controller
              control={control}
              name="idcategoria"
              rules={{ required: "la categoria es obligatoria" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsCategorias}
                  onChange={(option) => {
                    field.onChange(option ? option.value : null);
                  }}
                  value={optionsCategorias.find(
                    (option) => option.value === field.value
                  )}
                  placeholder="Categoria del movimiento"
                />
              )}
            />
          </div>
          {errors.idcategoria && (
            <p className="text-red-500 text-sm mt-1">
              {errors.idcategoria.message}
            </p>
          )}
          <div>
            <label className="block text-gray-600 text-sm mb-1">Cantidad</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              {...register("monto", {
                required: "El campo es requerido",
                min: { value: 1, message: "Debe ser mayor a 0" },
                max: { value: 999999999999, message: "Máximo 12 dígitos" },
              })}
            />
            {errors.monto && (
              <p className="text-red-500 text-sm mt-1">
                {errors.monto.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Fecha</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              {...register("fecha", {
                required: "El campo es requerido",
              })}
            />
            {errors.fecha && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fecha.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">
              Descripción del movimiento
            </label>
            <input
              type="text"
              placeholder="Ej: Alimentación, Transporte..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              {...register("descripcion", {
                required: "El campo es requerido",
                maxLength: { value: 45, message: "Máximo 45 caracteres." },
                minLength: { value: 4, message: "Mínimo 4 caracteres." },
              })}
            />
            {errors.descripcion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.descripcion.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold py-2 rounded-lg hover:scale-[1.02] transition-transform duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <LuLoaderPinwheel className="animate-spin" />
                Guardando...
              </div>
            ) : (
              "Guardar movimiento"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormFinancial;

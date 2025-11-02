import React, { useEffect, useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { api } from "../../service/api";
import useAuth from "../../context/useAuth";
import Select from "react-select";
import toast from "react-hot-toast";

interface Props {
  setShowFormMoneyReturns: (showFormMoneyReturns: boolean) => void;
}

type Inputs={
    idinversion:number;
    monto:number;
    fecha:Date;
}

const FormMoneyReturns: React.FC<Props> = ({ setShowFormMoneyReturns }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { id, setEventos, eventos } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [inversiones, setInversiones] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true)
    const loadData = async () => {
      const res = await api.get(`/inversiones/${id}`);

      setInversiones(res.data.data);
      setIsLoading(false)
    };
    loadData();
  }, [id]);

  const options = inversiones.map(val=>(
    {value:val.id, label:val.descripcion}
  ))

  const onSubmit:SubmitHandler<Inputs> = async (data:Inputs) => {
    setIsSubmitting(true)
    const dataUser ={...data, idusuario:id}
    try{
        console.log(dataUser)
        const res = await api.post('/retornos', dataUser);
        if(res.status ===201){
            toast.success('Retorno creado')
            setShowFormMoneyReturns(false)
            setIsSubmitting(false)
            setEventos(!eventos)
            return
        }
    }catch(e){
        return toast.error('No fue posible crear el retorno')
    }
  };
  return (
    <div
      className="fixed inset-0 bg-gray-200/10 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={() => setShowFormMoneyReturns(false)}
    >
      {/* Contenedor del modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 w-[90%] sm:w-[400px] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cerrar */}
        <button
          onClick={() => setShowFormMoneyReturns(false)}
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
                Elige la inversión
              </label>
              <Controller
                control={control}
                name="idinversion"
                rules={{ required: "La inversíon es obligatoria" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={options}
                    onChange={(option) =>
                      field.onChange(option ? option.value : null)
                    }
                    value={
                      options.find((option) => option.value === field.value) ||
                      null
                    }
                    placeholder="Seleccionar tipo..."
                    noOptionsMessage={() => "No hay opciones disponibles"}
                    isDisabled={isSubmitting}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: errors.idinversion
                          ? "#ef4444"
                          : base.borderColor,
                      }),
                    }}
                  />
                )}
              />
              {errors.idinversion && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.idinversion.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 text-sm mb-1">
                Monto
              </label>
              <input
                type="number"
                placeholder="$$$$"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isSubmitting}
                {...register("monto", {
                  required: "El campo es requerido",
                  maxLength: { value: 45, message: "Máximo 45 caracteres." },
                  minLength: { value: 4, message: "Mínimo 4 caracteres." },
                })}
              />
              {errors.monto && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.monto.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 text-sm mb-1">
                fecha
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                disabled={isSubmitting}
                {...register("fecha", {
                  required: "La fecha es requerida"
                })}
              />
              {errors.fecha && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fecha.message}
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

export default FormMoneyReturns;

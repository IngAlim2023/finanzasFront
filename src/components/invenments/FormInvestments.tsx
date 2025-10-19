import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth";
import { api } from "../../service/api";
import toast from "react-hot-toast";

const FormInvestments: React.FC = () => {
  const { register, handleSubmit } = useForm();
  const { id, setEventos, eventos } = useAuth();
  const onSubmit: any = async (data: any) => {
    const investment = { ...data, idusuario: id };

    const res = await api.post("/inversiones", investment);

    if (res.status != 201) {
      return toast.error("No se logro ingresar la inversión.");
    }

    setEventos(!eventos);
  };
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full flex flex-col justify-center items-center gap-2"
      >
        <textarea
          className="w-full max-w-md border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Descripción"
          {...register("descripcion", {
            required: true,
            maxLength: 200,
            minLength: 4,
          })}
        />
        <input
          className="w-full max-w-md border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="number"
          placeholder="Monto"
          {...register("monto", {
            required: true,
            maxLength: 13,
            minLength: 4,
          })}
        />
        <input
          className="w-full max-w-md border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          type="date"
          {...register("fecha", { required: true })}
        />
        <button className="bg-cyan-700 hover:bg-cyan-800 transition-colors rounded-md px-4 py-2 font-semibold text-white">
          Crear Inversión
        </button>
      </form>
    </div>
  );
};

export default FormInvestments;

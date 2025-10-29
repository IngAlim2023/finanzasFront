import React, { useEffect, useState } from "react";
import { api } from "../../../service/api";
import useAuth from "../../../context/useAuth";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";

const IncomeTotal: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const { id } = useAuth();
  useEffect(() => {
    const loadTotal = async () => {
      const res = await api.get(`/movimientos/user/incomes/${id}`);
      setTotal(res.data.data);
    };
    loadTotal();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4 w-80">
      <div className="text-cyan-700 text-4xl bg-emerald-200 p-2 rounded-xl">
        <HiMiniArrowTrendingUp className="text-emerald-500 text-4xl" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">Total Ingresos</p>
        <p className="text-2xl font-semibold text-emerald-500">${total}</p>
      </div>
    </div>
  );
};

export default IncomeTotal;

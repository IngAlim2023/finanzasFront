import React, { useEffect, useState } from "react";
import { api } from "../../../service/api";
import useAuth from "../../../context/useAuth";
import { HiMiniArrowTrendingDown } from "react-icons/hi2";

const ExpenseTotal: React.FC = () => {
  const [total, setTotal] = useState<number>(0);
  const { id } = useAuth();
  useEffect(() => {
    const loadTotal = async () => {
      const res = await api.get(`/movimientos/user/expenses/${id}`);
      setTotal(res.data.data);
    };
    loadTotal();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4 w-full sm:w-72 md:w-80">
      <div className="text-cyan-700 text-4xl bg-red-200 p-2 rounded-xl">
        <HiMiniArrowTrendingDown className="text-red-500 text-4xl" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">Total Egresos</p>
        <p className="text-2xl font-semibold text-red-500">${total}</p>
      </div>
    </div>
  );
};

export default ExpenseTotal;

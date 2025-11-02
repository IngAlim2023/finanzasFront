import React, { useEffect, useState } from "react";
import { api } from "../../../service/api";
import useAuth from "../../../context/useAuth";
import { GiReturnArrow } from "react-icons/gi";

const MoneyReturnsTotal: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);
  const { id, eventos } = useAuth();

  useEffect(() => {
    const loadBalance = async () => {
      try {
        // Obtener ingresos y egresos
        const [incomeRes] = await Promise.all([
          api.get(`/retornos/total/${id}`)
        ]);
        
        const totalIncome = incomeRes.data.data;
        
        setBalance(Number(totalIncome));
      } catch (error) {
        console.error("Error al cargar el balance:", error);
      }
    };
    
    loadBalance();
  }, [id, eventos]);

  // Determinar color según si es positivo o negativo
  const isPositive = balance >= 0;
  const colorClass = isPositive ? "text-green-500" : "text-orange-500";
  const bgColorClass = isPositive ? "bg-blue-200" : "bg-orange-200";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center gap-4 w-full sm:w-72 md:w-80">
      <div className={`text-4xl ${bgColorClass} p-2 rounded-xl`}>
        <GiReturnArrow className={`${colorClass} text-4xl`} />
      </div>
      <div>
        <p className="text-gray-500 text-sm text-center">Retornos Total</p>
        <p className={`text-2xl font-semibold ${colorClass}`}>
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default MoneyReturnsTotal;
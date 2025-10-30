import React, { useEffect, useState } from "react";
import { api } from "../../../service/api";
import useAuth from "../../../context/useAuth";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ChartFinancial: React.FC = () => {
  const { id } = useAuth();
  const [percIncomes, setPercIncomes] = useState<number>(0);
  const [percExpenses, setPercExpenses] = useState<number>(0);

  useEffect(() => {
    const loadBalance = async () => {
      try {
        // Obtener ingresos y egresos
        const [incomeRes, expenseRes] = await Promise.all([
          api.get(`/movimientos/user/incomes/${id}`),
          api.get(`/movimientos/user/expenses/${id}`),
        ]);

        const totalIncome = Number(incomeRes.data.data);
        const totalExpense = Number(expenseRes.data.data);

        // ✅ Evitar división por cero
        if (totalIncome === 0 && totalExpense === 0) {
          setPercIncomes(0);
          setPercExpenses(0);
        } else if (totalIncome === 0) {
          // Si no hay ingresos, los egresos son 100%
          setPercIncomes(0);
          setPercExpenses(100);
        } else {
          setPercIncomes((totalIncome / totalIncome) * 100);
          setPercExpenses((totalExpense / totalIncome) * 100);
        }
      } catch (error) {
        console.error("Error al cargar el balance:", error);
      }
    };

    loadBalance();
  }, []);

  const data = [
    { name: "Ingresos", movimiento: percIncomes },
    { name: "Egresos", movimiento: percExpenses },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{ background: "#fff", border: "1px solid #ccc", padding: 10 }}
        >
          <p>
            <strong>{label}</strong>
          </p>
          <p>Porcentaje: {Number(payload[0].value).toFixed(1)} %</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={CustomTooltip} />
          <Bar dataKey="movimiento" barSize={100}>
            {data.map((val, index) => (
              <Cell
                key={`cell-${index}`}
                fill={val.name === "Ingresos" ? "#10B971" : "#EA4335"}
              />
            ))}
            <LabelList
              dataKey="movimiento"
              position="top"
              formatter={(value) => `${Number(value)?.toFixed(1)}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartFinancial;

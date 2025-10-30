import React from "react";
import { useNavigate } from "react-router-dom";
import InvestmentsTotal from "../components/invenments/dashboard/InvestmentsTotal";
import IncomeTotal from "../components/invenments/dashboard/IncomeTotal";
import ExpenseTotal from "../components/invenments/dashboard/ExpenseTotal";
import BalanceTotal from "../components/invenments/dashboard/BalanceTotal";
import ChartFinancial from "../components/invenments/dashboard/ChartFinancial";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
      <div className="gap-2 flex text-gray-500">
        Aquí está un resumen de tus finanzas
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <InvestmentsTotal />
        <IncomeTotal/>
        <ExpenseTotal/>
        <BalanceTotal/>
      </div>
      <div className="flex gap-2">
        <ChartFinancial/>
      </div>
    </div>
  );
};

export default Dashboard;

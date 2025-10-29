import React from "react";
import { useNavigate } from "react-router-dom";
import InvestmentsTotal from "../components/invenments/dashboard/InvestmentsTotal";
import IncomeTotal from "../components/invenments/dashboard/IncomeTotal";
import ExpenseTotal from "../components/invenments/dashboard/ExpenseTotal";
import BalanceTotal from "../components/invenments/dashboard/BalanceTotal";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-full bg-gray-100 flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="gap-2 flex">
        <button
          className="p-2 text-white bg-cyan-700 rounded-sm cursor-pointer"
          onClick={() => navigate("/investments")}
        >
          Mis inversiones
        </button>
        <button className="p-2 text-white bg-cyan-700 rounded-sm cursor-pointer"
        onClick={() => navigate("/financial")}
        >
          Mis Movimientos
        </button>
      </div>
      <div className="flex gap-2">
        <InvestmentsTotal />
        <IncomeTotal/>
        <ExpenseTotal/>
        <BalanceTotal/>
      </div>
    </div>
  );
};

export default Dashboard;

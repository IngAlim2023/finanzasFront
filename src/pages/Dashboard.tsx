import React from "react";
import { useNavigate } from "react-router-dom";
import InvestmentsTotal from "../components/invenments/dashboard/InvestmentsTotal";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col items-center p-6 gap-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <div className="gap-2 flex">
        <button
          className="p-2 text-white bg-cyan-700 rounded-sm cursor-pointer"
          onClick={() => navigate("/investments")}
        >
          Mis inversiones
        </button>
        <button className="p-2 text-white bg-cyan-700 rounded-sm cursor-pointer">
          Mis Movimientos
        </button>
      </div>
      <div>
        <InvestmentsTotal />
      </div>
    </div>
  );
};

export default Dashboard;

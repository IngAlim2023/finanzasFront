import React, { useState } from "react";
import Cardfinancial from "../components/financial/Cardfinancial";
import FormCategory from "../components/financial/FormCategory";
import FormFinancial from "../components/financial/FormFinancial";

const Financial: React.FC = () => {
  const [showFormCategory, setShowFormCategory] = useState<boolean>(false);
  const [showFormFinancial, setShowFormFinancial] = useState<boolean>(false);
  return (
    <div>
      <div className="m-4 bg-white rounded-2xl shadow-lg p-6 transition-all duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Movimientos</h1>
            <h3 className="text-gray-500">Gestiona tus ingresos y egresos</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowFormCategory(true)}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              + Crear movimiento
            </button>
            <button
              onClick={() => setShowFormFinancial(true)}
              className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
            >
              + Registrar movimiento
            </button>
          </div>
        </div>

        <Cardfinancial />
      </div>

      {showFormCategory && (
        <FormCategory setShowFormCategory={setShowFormCategory} />
      )}
      {showFormFinancial && (
        <FormFinancial setShowFormFinancial={setShowFormFinancial} />
      )}
    </div>
  );
};

export default Financial;

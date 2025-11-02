import React, { useState } from "react";
import FormInvestments from "../components/invenments/FormInvestments";
import TableInvestments from "../components/invenments/TableInvestments";
import InvestmentsTotal from "../components/invenments/dashboard/InvestmentsTotal";
import MoneyReturnsTotal from "../components/invenments/dashboard/MoneyReturnsTotal";
import FormMoneyReturns from "../components/invenments/FormMoneyReturns";

const Investments: React.FC = () => {
  const [showFormMoneyReturns,setShowFormMoneyReturns] = useState<boolean>(false)
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Inversiones</h1>
          <h3 className="text-gray-500">Gestiona tus inversiones y retornos</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => console.log("Hola")}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            + Registrar inversión
          </button>
          <button
            onClick={() => setShowFormMoneyReturns(true)}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 px-5 py-2 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            + Registrar retorno
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <InvestmentsTotal/>
        <MoneyReturnsTotal/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-6xl mx-auto p-6">
        <div className="w-full max-w-sm">
          <FormInvestments />
        </div>
        <div className="w-full">
          <TableInvestments />
        </div>
      </div>
      {showFormMoneyReturns && (
        <FormMoneyReturns setShowFormMoneyReturns={setShowFormMoneyReturns} />
      )}
    </div>
  );
};

export default Investments;

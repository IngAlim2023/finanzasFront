import React, { useEffect, useState } from "react";
import useAuth from "../../../context/useAuth";
import { api } from "../../../service/api";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const InvestmentsTotal: React.FC = () => {
  const { id, eventos } = useAuth();
  const [total, setTotal] = useState<string>("0");

  useEffect(() => {
    const loadData = async () => {
      const res = await api.get(`/inversiones/total/${id}`);
      setTotal(res.data.data);
    };
    loadData();
  }, [eventos]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center gap-4 w-80">
      <div className="text-cyan-700 text-4xl">
        <FaMoneyBillTrendUp />
      </div>
      <div>
        <p className="text-gray-500 text-sm">Total Invertido</p>
        <p className="text-2xl font-semibold text-gray-800">
          ${Number(total).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default InvestmentsTotal;

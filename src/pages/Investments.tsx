import React from "react";
import FormInvestments from "../components/invenments/FormInvestments";
import TableInvestments from "../components/invenments/TableInvestments";

const Investments: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 max-w-6xl mx-auto p-6">
      <div className="w-full max-w-sm">
        <FormInvestments />
      </div>
      <div className="w-full">
        <TableInvestments />
      </div>
    </div>
  );
};

export default Investments;

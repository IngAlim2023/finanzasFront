import React from "react";
import FormInvestments from "../components/invenments/FormInvestments";
import TableInvestments from "../components/invenments/TableInvestments";

const Investments: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-4 max-w-4xl mx-auto">
      <FormInvestments />
      <TableInvestments />
    </div>
  );
};

export default Investments;

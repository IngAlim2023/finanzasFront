import React from "react";
import IncomeTotal from "../invenments/dashboard/IncomeTotal";
import ExpenseTotal from "../invenments/dashboard/ExpenseTotal";
import BalanceTotal from "../invenments/dashboard/BalanceTotal";

const Cardfinancial: React.FC = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <IncomeTotal />
      <ExpenseTotal />
      <BalanceTotal />
    </div>
  );
};

export default Cardfinancial;

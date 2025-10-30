import React from "react";
import IncomeTotal from "../invenments/dashboard/IncomeTotal";
import ExpenseTotal from "../invenments/dashboard/ExpenseTotal";
import BalanceTotal from "../invenments/dashboard/BalanceTotal";

const Cardfinancial: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <IncomeTotal />
      <ExpenseTotal />
      <BalanceTotal />
    </div>
  );
};

export default Cardfinancial;

import React from "react";

const ExpenseLi = ({ expense, click }) => {
  return (
    <li
      key={expense.id}
      className="expenseli"
      style={{ display: click ? "none" : "flex" }}
    >
      <h1>{expense.vendor}</h1>
      <p>
        {(+expense.amount).toLocaleString()} <span>{expense.currency}</span>
      </p>
    </li>
  );
};

export default ExpenseLi;

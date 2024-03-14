import React from "react";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <li key={expense.id} className="flex flex-row justify-between text-center items-center my-2 rounded-md bg-sky-200 dark:bg-sky-300">
      <div className="bg-slate-500 w-32 p-5 text-center text-white rounded-md">
        <strong>${expense.amount}</strong>
      </div>
      <div>
        <p> {expense.category}</p>
      </div>

      <div>
        <p>{expense.description}</p>{" "}
      </div>
      <div className="flex flex-col">
        <button className="bg-sky-400 px-5 py-0 rounded-md mx-2 my-1 hover:bg-sky-500" onClick={() => onEdit(expense.id)}>Edit</button>
        <button className="bg-rose-500 px-5 py-0 rounded-md mx-2 my-1 text-white hover:bg-rose-600" onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </li>
  );
};

export default ExpenseItem;



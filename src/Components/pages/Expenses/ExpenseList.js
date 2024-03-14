import React from "react";
import ExpenseItem from "./ExpenseItem";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { expenseActions } from "../../store/expense-slice";
import { FaDownload } from "react-icons/fa";
import Papa from "papaparse";



const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const expenseItems = useSelector((state) => state.expense.items);
  const deleteHandler = (id) => {
    dispatch(expenseActions.remove(id));
  };
  const editHandler = (id) => {
    dispatch(uiActions.toggle());
    props.onEdit(id);
  };
  const downloadCSV = () => {
    const csvData = Papa.unparse(expenseItems);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
  
    
      const linkHref = URL.createObjectURL(blob);
      link.href = linkHref;
      link.style = "visibility:hidden";
      link.download = "expenses.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    
  };
  return (
    <div >
      <section >
          <div className="flex justify-between my-5">
            {expenseItems.length !== 0 && (<h2 className="text-2xl font-semibold dark:text-white">Expenses List</h2>)}
            {expenseItems.length === 0 && (<h2 className="text-2xl font-semibold dark:text-white">No Expenses Added</h2>)}
            {expenseItems.length !== 0 && <button className="dark:text-white"  onClick={downloadCSV}><FaDownload size="1.5rem"/></button>}
          </div>
          <ul >
            {expenseItems.map((expense) => (
              <ExpenseItem
                key={expense.id}
                id={expense.id}
                expense={expense}
                onEdit={editHandler}
                onDelete={deleteHandler}
              />
            ))}
          </ul>
      </section>
    </div>
  );
};

export default ExpenseList;

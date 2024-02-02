import React from "react";
import classes from "./ExpenseList.module.css";
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
  
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, "expenses.csv");
    } else {
      const linkHref = URL.createObjectURL(blob);
      link.href = linkHref;
      link.style = "visibility:hidden";
      link.download = "expenses.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className={classes.expenses_container}>
      <section className={classes.expense}>
        <div className={classes.expensesList}>
          <div className={classes.heading}>
            {expenseItems.length !== 0 && (<h2 className={classes.heading}>Expenses List</h2>)}
            {expenseItems.length === 0 && (<h2 className={classes.noExpense}>No Expenses Added</h2>)}
            {expenseItems.length !== 0 && <button className={classes.download} onClick={downloadCSV}><FaDownload size="1.5rem"/></button>}
          </div>
          <ul className={classes.expensesList}>
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
        </div>
      </section>
    </div>
  );
};

export default ExpenseList;

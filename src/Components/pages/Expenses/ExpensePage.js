import { useState,useEffect } from "react";
import ExpenseList from "./ExpenseList";
import NewExpense from "./NewExpense/NewExpense";
import classes from "./ExpensePage.module.css";

const ExpensePage = () => {
  const [expensesList, setExpensesList] = useState([]);

  const addExpenseHandler = (expense) => {
    setExpensesList((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  useEffect(
    () => {
      addExpenseHandler();
    },
    [addExpenseHandler],
    expensesList
  );

  return (
    <div>
      <div>
        <NewExpense onAddExpense={addExpenseHandler} />
      </div>
      <div className={classes.expenses_container}>
        <ExpenseList expenses={expensesList} />
      </div>
    </div>
  );
};

export default ExpensePage;

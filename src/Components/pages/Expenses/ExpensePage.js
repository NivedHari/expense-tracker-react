import { useState } from "react";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "./ExpenseForm";
import classes from "./ExpensePage.module.css";

const ExpensePage = () => {
    const [expensesList, setExpensesList] = useState([]);
  
    const addExpenseHandler = (expense) => {
        setExpensesList((prevExpenses) => {
          return [expense, ...prevExpenses];
        });
      };
  
    return (
      <div>
        <div>
          <ExpenseForm onAddExpense={addExpenseHandler}/>
        </div>
        <div className={classes.expenses_container}>
          <ExpenseList expenses={expensesList} />
        </div>
      </div>
    );
  };
  

export default ExpensePage;

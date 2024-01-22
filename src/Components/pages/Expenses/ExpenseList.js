import React from "react";
import classes from "./ExpenseList.module.css";

const ExpenseList = (props) => {
  const deleteHandler =  (id)=> {
    props.onDelete(id);
   console.log(props.expenses);
  }
  const editHandler = (id) => {
    props.onEdit(id);
  }
  return (
    <section className={classes.expense}>
      <div className={classes.expensesList}>
        <h2>Expenses List</h2>
        <ul className={classes.expensesList}>
          {props.expenses.map((expense) => (
            <li key={expense.id}>
              <strong>Amount:</strong> ${expense.amount}{" "}
              <strong>Category:</strong> {expense.category}
              <strong>Description:</strong> {expense.description}{" "}
              <button className={classes.edit}onClick={() => editHandler(expense.id)}>Edit</button>
              <button className={classes.delete} onClick={() => deleteHandler(expense.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpenseList;

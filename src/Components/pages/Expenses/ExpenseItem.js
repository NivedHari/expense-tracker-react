import React from "react";
import classes from "./ExpenseItem.module.css";

const ExpenseItem = ({ expense, onEdit, onDelete }) => {
  return (
    <li key={expense.id}>
      <div className={classes.amountContainer}>
        <div className={classes.amountTitle}>Amount:</div>

        <div className={classes.amount}>
          <strong>${expense.amount}</strong>
        </div>
      </div>
        <div className={classes.categoryContainer}>
          Category:
          <p> {expense.category}</p>
        </div>

        <div className={classes.descriptionContainer}>
          Description: <p>{expense.description}</p>{" "}
        </div>
        <div className={classes.buttonContainer}>
          <button className={classes.edit} onClick={() => onEdit(expense.id)}>
            Edit
          </button>
          <button
            className={classes.delete}
            onClick={() => onDelete(expense.id)}
          >
            Delete
          </button>
        </div>
    </li>
  );
};

export default ExpenseItem;

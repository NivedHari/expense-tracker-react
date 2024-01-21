import React from 'react';
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
  return (
    <section className={classes.expense}>
      <div className={classes.expensesList}>
        <h2>Expenses List</h2>
        <ul className={classes.expensesList}>
          {props.expenses.map((expense) => (
            <li key={expense.id}>
              <strong>Amount:</strong> ${expense.amount} {" "}
              <strong>Description:</strong> {expense.description} {" "}
              <strong>Category:</strong> {expense.category}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpenseList;

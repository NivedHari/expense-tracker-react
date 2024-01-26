import React from "react";
import classes from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = (props) => {
  const deleteHandler = (id) => {
    props.onDelete(id);

    console.log(props.expenses);
  };
  const editHandler = (id) => {
    props.onEdit(id);
  };
  return (
    <section className={classes.expense}>
      <div className={classes.expensesList}>
        <h2>Expenses List</h2>
        <ul className={classes.expensesList}>
          {props.expenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={editHandler}
              onDelete={deleteHandler}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpenseList;




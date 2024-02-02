import React from "react";
import classes from "./NewExpense.module.css";
import ExpenseForm from "./ExpenseForm";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const NewExpense = (props) => {
    const { expenseToEdit } = props;
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.ui.isEditing);

  const addExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    console.log("Submitted Data:", expenseData);
    dispatch(uiActions.toggle());
  };

  const editExpenseDataHandler = (expenseData) => {
    props.onEditExpense(expenseData);
    props.setExpenseToEdit(null);
  }

  const startEditingHandler = () => {
    dispatch(uiActions.toggle());
  };

  const stopEditingHandler = () => {
    dispatch(uiActions.toggle());
    props.setExpenseToEdit(null);
  };

  return (
    <div className={classes.newExpense}>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onAddExpense={addExpenseDataHandler}
          onEditExpense={editExpenseDataHandler}
          onCancel={stopEditingHandler}
          expenseToEdit={expenseToEdit}
        />
      )}
    </div>
  );
};

export default NewExpense;

import React from "react";
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
    <div className="p-4 mt-20 mb-0 m-auto w-150 text-center shadow-md bg-sky-300 rounded rounded-b-none dark:bg-zinc-600">
      {!isEditing && (
        <button className="bg-blue-800 text-white hover:bg-blue-900 py-4 px-3 ml-5 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950" onClick={startEditingHandler}>Add New Expense</button>
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

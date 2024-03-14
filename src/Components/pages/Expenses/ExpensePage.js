import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { expenseActions } from "../../store/expense-slice";
import NewExpense from "./NewExpense/NewExpense";
import { uiActions } from "../../store/ui-slice";
import ExpenseList from "./ExpenseList";
import TotalExpense from "./TotalExpense";
import { fetchExpenseData, sendExpenseData } from "../../store/expense-actions";
import ReactLoading from "react-loading";

let isInitial = true;

const ExpensePage = (props) => {
  const dispatch = useDispatch();
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const expenses = useSelector((state) => state.expense.items);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(fetchExpenseData(email));
    // eslint-disable-next-line
  }, []);

  const expense = useSelector((state) => state.expense);
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (expense.changed) {
      dispatch(sendExpenseData(expense, email));
    }
  }, [expense, dispatch, email]);

  const addExpenseHandler = (expense) => {
    dispatch(
      expenseActions.add({
        id: expense.id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
      })
    );
  };

  const editExpenseItemHandler = (expense) => {
    dispatch(uiActions.toggle());
    dispatch(
      expenseActions.edit({
        id: expense.id,
        amount: expense.amount,
        category: expense.category,
        description: expense.description,
      })
    );
    setExpenseToEdit(null);
  };

  const editExpenseHandler = (id) => {
    const expenseToEdit = expenses.find((expense) => expense.id === id);
    setExpenseToEdit(expenseToEdit);
  };

  return (
    <Fragment>
      <div>
        <NewExpense
          onAddExpense={addExpenseHandler}
          onEditExpense={editExpenseItemHandler}
          expenseToEdit={expenseToEdit}
          setExpenseToEdit={setExpenseToEdit}
        />
      </div>
      <div>
        <TotalExpense />
      </div>

      <div className="w-150 m-auto shadow-md p-5 bg-sky-300 rounded rounded-t-none dark:bg-zinc-600">
        {!isLoading && (
          <ExpenseList expenses={expenses} onEdit={editExpenseHandler} />
        )}
        {isLoading && (
          <ReactLoading
            className="m-auto"
            type={"spin"}
            color={"#91abee"}
            height={50}
            width={50}
          />
        )}
      </div>
    </Fragment>
  );
};

export default ExpensePage;

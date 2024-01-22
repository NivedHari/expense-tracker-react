import React, { useState, useCallback, useContext, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import NewExpense from "./NewExpense/NewExpense";
import AuthContext from "../../store/auth-context";
import classes from "./ExpensePage.module.css";
import ExpenseForm from "./NewExpense/ExpenseForm";

const ExpensePage = (props) => {
  const [expensesList, setExpensesList] = useState([]);
  const authCtx = useContext(AuthContext);
  const uEmail = authCtx.email;
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-1a30a-default-rtdb.firebaseio.com/${uEmail}.json`
      );

      if (!response.ok) {
        throw new Error("Fetch Failed");
      }

      const data = await response.json();
      const expensesArray = Object.entries(data).map(([id, expense]) => ({
        id,
        ...expense,
      }));
      console.log(expensesArray);
      setExpensesList(expensesArray);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }, []);

  const addExpenseHandler = async (expense) => {
    setIsEditing(false);
    console.log(uEmail);
    try {
      const response = await fetch(
        `https://expense-tracker-1a30a-default-rtdb.firebaseio.com/${uEmail}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Post Failed!");
      }
      
      const data = await response.json();
      fetchData();
      
      console.log("Success:", data);

      setExpensesList((prevExpenses) => [expense, ...prevExpenses]);
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    }
  };

  useEffect(
    () => {
      fetchData();
    },
    [fetchData],
    expensesList
  );

  const deleteExpenseHandler = async (id) => {
    console.log(id);
    try {
      await fetch(
        `https://expense-tracker-1a30a-default-rtdb.firebaseio.com/${uEmail}/${id}.json`,
        {
          method: "DELETE",
        }
      );
      const updatedExpenses = expensesList.filter(
        (expense) => expense.id !== id
      );
      setExpensesList(updatedExpenses);
    } catch (error) {
      console.error("Error deleting the expense:", error);
    }
  };

  const editExpenseHandler = (id) => {
    console.log(id);
    setIsEditing(true);
    // const expenseToEdit = expensesList.find((expense) => expense.id === id);
    // console.log(expenseToEdit);
    setExpenseToEdit(id);
  };

  return (
    <div>
      <div className={classes.newExpense}>
        {!isEditing && (
          <button onClick={startEditingHandler}>Add New Expense</button>
        )}
        {isEditing && (
          <ExpenseForm
            onAddExpense={addExpenseHandler}
            onCancel={stopEditingHandler}
          />
        )}
      </div>
      <div className={classes.expenses_container}>
        <ExpenseList
          expenses={expensesList}
          onDelete={deleteExpenseHandler}
          onEdit={editExpenseHandler}
        />
      </div>
    </div>
  );
};

export default ExpensePage;

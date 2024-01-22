import React, { useState, useEffect,useContext } from "react";
import ExpenseList from "./ExpenseList";
import NewExpense from "./NewExpense/NewExpense";
import AuthContext from "../../store/auth-context";
import classes from "./ExpensePage.module.css";

const ExpensePage = () => {
  const [expensesList, setExpensesList] = useState([]);
  const authCtx = useContext(AuthContext);
  const uEmail = authCtx.email;

  useEffect(() => {
    const fetchData = async () => {
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
    };

    fetchData();
  }, []);

  const addExpenseHandler = async (expense) => {
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
      console.log("Success:", data);

      setExpensesList((prevExpenses) => [expense, ...prevExpenses]);
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    }
  };

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

import React, { useState, useCallback, useEffect } from "react";
import ExpenseList from "./ExpenseList";
import { expenseActions } from "../../store/expense-slice";
import { useSelector, useDispatch } from "react-redux";
import classes from "./ExpensePage.module.css";
import darkThemeClasses from "./DarkMode.module.css";
import ExpenseForm from "./NewExpense/ExpenseForm";
import { themeActions } from "../../store/theme-slice";
import Papa from 'papaparse';

const ExpensePage = (props) => {
  const dispatch = useDispatch();
  const [expensesList, setExpensesList] = useState([]);
  const uEmail = useSelector((state) => state.auth.email);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useSelector((state) => state.theme.darkMode);
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

      let newTotalAmount = expensesArray.reduce((total, expense) => {
        return total + parseFloat(expense.amount);
      }, 0);

      if (expensesArray.length === 0) {
        newTotalAmount = 0;
      }

      setExpensesList(expensesArray);
      setTotalAmount(newTotalAmount);
      dispatch(expenseActions.add({ array: expensesArray }));
    } catch (error) {
      console.error("Expenses are empty");
    }
    setIsLoading(false);
  }, [uEmail, dispatch]);

  const addExpenseHandler = async (expense) => {
    setIsLoading(true);
    setIsEditing(false);
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

      // const data = await response.json();
      fetchData();

      // console.log("Success:", data);

      setExpensesList((prevExpenses) => [expense, ...prevExpenses]);
    } catch (error) {
      console.error("Fetch error:", error);
      alert(error.message);
    }
  };

  const editExpenseItemHandler = async (expense) => {
    setIsLoading(true);
    setIsEditing(false);

    try {
      const response = await fetch(
        `https://expense-tracker-1a30a-default-rtdb.firebaseio.com/${uEmail}/${expense.id}.json`,
        {
          method: "PUT",
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
        throw new Error("Edit Failed!");
      }

      // const data = await response.json();
      fetchData();

      setExpenseToEdit(null);

      // console.log("Success:", data);
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
    setIsLoading(true);
    console.log(id);
    dispatch(expenseActions.remove({ itemId: id }));
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
      fetchData();
      if (updatedExpenses.length === 0) {
        setTotalAmount(0);
      }
      setExpensesList(updatedExpenses);
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting the expense:", error);
    }
  };

  const editExpenseHandler = (id) => {
    setIsEditing(true);
    const expenseToEdit = expensesList.find((expense) => expense.id === id);
    setExpenseToEdit(expenseToEdit, id);
  };

  const containerClasses = isDarkMode
    ? `${classes.amount_container} ${darkThemeClasses.darkContainer}`
    : classes.amount_container;
  const listClasses = isDarkMode
    ? `${classes.expenses_container} ${darkThemeClasses.darkContainer}`
    : classes.expenses_container;

  const amountClasses = isDarkMode
    ? `${classes.amount} ${darkThemeClasses.darkText}`
    : classes.amount;

  const toggleThemeHandler = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadHandler = () => {
    const csvData = Papa.unparse(expensesList, {
      header: true,
    });

    const csvBlob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const csvUrl = URL.createObjectURL(csvBlob);

    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "expenses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className={classes.outer} id="out">
      <div className={classes.newExpense}>
        {!isEditing && (
          <button onClick={startEditingHandler}>Add New Expense</button>
        )}
        {isEditing && (
          <ExpenseForm
            onAddExpense={addExpenseHandler}
            onEditExpense={editExpenseItemHandler}
            onCancel={stopEditingHandler}
            expenseToEdit={expenseToEdit}
          />
        )}
      </div>
      <div className={containerClasses}>
        <p className={amountClasses}>
          Total Expense : <strong>${totalAmount}</strong>
        </p>
        {totalAmount >= 10000 && (
          <button className={classes.premium} onClick={toggleThemeHandler}>
            Activate Premium
          </button>
        )}
      </div>
      <div className={listClasses}>
        {!isLoading && expensesList.length > 0 && (
          <div>
            <ExpenseList
              expenses={expensesList}
              onDelete={deleteExpenseHandler}
              onEdit={editExpenseHandler}
            />
            <button onClick={downloadHandler}>Download</button>

            
          </div>
        )}

        {!isLoading && expensesList.length === 0 && (
          <p className={classes.loading}>No Expenses Added</p>
        )}
        {isLoading && <p className={classes.loading}>Loading..</p>}
      </div>
    </div>
  );
};

export default ExpensePage;

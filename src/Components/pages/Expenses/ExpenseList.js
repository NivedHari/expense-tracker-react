import React,{useEffect,useState} from 'react';
import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-1a30a-default-rtdb.firebaseio.com/expenses.json"
        );

        if (!response.ok) {
          throw new Error("Fetch Failed");
        }

        const data = await response.json();
        // Assuming data is an object where each key is an expense ID
        const expensesArray = Object.values(data);

        setExpenses(expensesArray);
      } catch (error) {
        console.error("Fetch error:", error);
        // Handle fetch error (e.g., show an error message)
      }
    };

    fetchData();
  }, [expenses]); // Dependency array to ensure useEffect runs only once
  return (
    <section className={classes.expense}>
      <div className={classes.expensesList}>
        <h2>Expenses List</h2>
        <ul className={classes.expensesList}>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <strong>Amount:</strong> ${expense.amount} {" "}
              <strong>Category:</strong> {expense.category}
              <strong>Description:</strong> {expense.description} {" "}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExpenseList;

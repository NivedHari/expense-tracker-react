import { useState} from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted Data:", expenseData);
    setExpenseData({
      amount: "",
      description: "",
      category: "Food",
    });
    props.onSaveExpense(expenseData);
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label>Money Spent:</label>
          <input
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.control}>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className={classes.control}>
          <label>Category:</label>
          <select
            name="category"
            value={expenseData.category}
            onChange={handleChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Submit Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

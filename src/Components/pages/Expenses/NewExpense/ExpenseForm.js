import { useState, useEffect } from "react";
import classes from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const isEditMode = !!props.expenseToEdit;
  const [expenseData, setExpenseData] = useState({
    amount: "",
    description: "",
    category: "Food",
  });

  useEffect(() => {
    if (props.expenseToEdit) {
      setExpenseData({
        amount: props.expenseToEdit.amount,
        description: props.expenseToEdit.description,
        category: props.expenseToEdit.category,
        id: props.expenseToEdit.id,
      });
    }
  }, [props.expenseToEdit]);

  useEffect(() => {
    if (!isEditMode) {
      setExpenseData({
        amount: "",
        description: "",
        category: "Food",
      });
    }
  }, [isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (isEditMode) {
      props.onEditExpense(expenseData);
      setExpenseData({
        amount: "",
        description: "",
        category: "Food",
      });
    } else {
      props.onAddExpense(expenseData);
      setExpenseData({
        amount: "",
        description: "",
        category: "Food",
      });
    }
    
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
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

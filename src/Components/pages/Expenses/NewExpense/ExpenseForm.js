import { useState, useEffect } from "react";

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
    <form onSubmit={handleSubmit} >
      <div className="flex flex-wrap gap-4 mb-4 text-left ">
        <div >
          <label className="font-bold mb-2 block dark:text-white">Money Spent:</label>
          <input
            type="number"
            name="amount"
            value={expenseData.amount}
            onChange={handleChange}
            className="p-2 rounded w-80 border-2 border-slate-950"
            required

          />
        </div>
        <div >
          <label className="font-bold mb-2 block dark:text-white">Description:</label>
          <input
            type="text"
            name="description"
            value={expenseData.description}
            onChange={handleChange}
            className="p-2 rounded w-80 border-2 border-slate-950"
            required
          />
        </div>
        <div >
          <label className="font-bold mb-2 block dark:text-white">Category:</label>
          <select
            name="category"
            value={expenseData.category}
            onChange={handleChange}
            className="p-2 rounded w-80 border-2 border-slate-950"
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
      </div>
      <div className="text-right">
        <button className="hover:text-slate-700 dark:text-white" type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" className="bg-blue-800 text-white hover:bg-blue-900 py-4 px-3 ml-5 rounded-lg dark:bg-blue-900 dark:hover:bg-blue-950">Submit Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;

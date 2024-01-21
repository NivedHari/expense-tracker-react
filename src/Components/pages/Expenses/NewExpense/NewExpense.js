// import React, { useState } from "react";
// import ExpenseForm from "../ExpenseForm";
// import classes from "./NewExpense.module.css";

const NewExpense = (props) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const saveExpenseDataHandler = (enteredExpenseData) => {
//     const expenseData = {
//       ...enteredExpenseData,
//       id: Math.random().toString(),
//     };
//     props.onAddExpense(expenseData);  // Corrected function name
//     setIsEditing(false);
//   };

//   const startEditingHandler = () => {
//     setIsEditing(true);
//   };

//   const stopEditingHandler = () => {
//     setIsEditing(false);
//   };

//   return (
//     <div className={classes.newExpense}>
//       {!isEditing && (
//         <button onClick={startEditingHandler}>Add New Expense</button>
//       )}
//       {isEditing && (
//         <ExpenseForm
//           onSaveExpenseData={saveExpenseDataHandler}
//           onCancel={stopEditingHandler}
//         />
//       )}
//     </div>
//   );
};

export default NewExpense;

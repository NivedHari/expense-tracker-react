import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  items: [],
  totalExpense: 0,
  changed: false,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    replace(state,action) {
      state.items = action.payload.items;
      state.totalExpense = action.payload.totalExpense;
    },
    add(state, action) {
      const newItem = action.payload;
      state.totalExpense = Number(state.totalExpense) + Number(newItem.amount);
      state.changed= true;
      state.items.push({
        id: newItem.id,
        amount: newItem.amount,
        category: newItem.category,
        description: newItem.description
      });
    },
    remove(state, action) {
      const id = action.payload;
      const deletingItem = state.items.find(item=> item.id === id);
      state.totalExpense = Number(state.totalExpense) - Number(deletingItem.amount);
      state.changed= true;
      state.items=state.items.filter(item=> item.id !== id);
    },
    edit(state, action) {
      const editedItem = action.payload;
      const existingItem = state.items.find((item) => item.id === editedItem.id);
      state.totalExpense = Number(state.totalExpense) - Number(existingItem.amount) + Number(editedItem.amount);
      state.changed= true;
      existingItem.amount =  editedItem.amount;
      existingItem.category = editedItem.category;
      existingItem.description = editedItem.description;
    },
    clear(state, action){
      state.items = [];
    }
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

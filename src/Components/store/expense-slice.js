import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  items: [],
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    add(state, action) {
      const { array } = action.payload;
      state.items = array;
      console.log(state.items);
    },
    remove(state, action) {
      const { itemId } = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
      console.log(state.items);
    },
    edit(state, action) {
      const { editedArray } = action.payload;
      state.items = editedArray;
      console.log(state.items);
    },
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;

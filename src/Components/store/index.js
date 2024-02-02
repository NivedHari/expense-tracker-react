import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import expenseReducer from "./expense-slice";
import themeReducer from './theme-slice';
import uiReducer from './ui-slice';


const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer, ui: uiReducer },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const loadIsPremiumFromStorage = () => {
  const isPremium = localStorage.getItem("premium");
  return isPremium; 
};


const uiSlice = createSlice({
  name: "ui",
  initialState: { isEditing: false, isLoading:false, isPremium:loadIsPremiumFromStorage() },
  reducers: {
    toggle(state) {
      state.isEditing = !state.isEditing;
    },
    loading(state,action){
      state.isLoading = action.payload.loading;
    },
    premium(state,action) {
      state.isPremium = action.payload.premium;
      localStorage.setItem("premium", action.payload.premium);
    }
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;

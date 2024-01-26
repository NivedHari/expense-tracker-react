import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.querySelector("body").setAttribute("data-theme", "dark");
      } else{
        document.querySelector("body").setAttribute("data-theme",'light');
      }
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;

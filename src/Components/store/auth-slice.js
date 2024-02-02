import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const loadStateFromLocalStorage = () => {
  try {
    const authState = localStorage.getItem("authState");
    if (authState === null) {
      return {
        token: "",
        email: "",
        isAuthenticated: false,
        name: "",
        url: "",
        isVerified: false,
        isComplete: true,
      };
    }
    return JSON.parse(authState);
  } catch (error) {
    return {
      token: "",
      email: "",
      isAuthenticated: false,
    };
  }
};

const saveStateToLocalStorage = (state) => {
  try {
    const authState = JSON.stringify(state);
    localStorage.setItem("authState", authState);
  } catch (error) {
    console.log("error in localState");
  }
};

const removeStateFromLocalStorage = (state) => {
  try {
    localStorage.removeItem("authState");
  } catch (error) {
    console.log("error in localState");
  }
};

const initialAuthState = loadStateFromLocalStorage();

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      
      saveStateToLocalStorage(state);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      
      
      removeStateFromLocalStorage(state);
    },
    setProfile(state, action) {
      state.name = action.payload.name;
      state.url = action.payload.url;
      state.email = action.payload.email;
      state.isVerified = action.payload.isVerified;
    },
    setCompletion (state,action) {
      state.isComplete = action.payload.isComplete;
    }
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

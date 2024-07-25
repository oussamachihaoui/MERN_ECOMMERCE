import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./apis/userSlice";

const store = configureStore({
  reducer: { auth: authSlice, user: userSlice },
  devTools: true,
});

export default store;

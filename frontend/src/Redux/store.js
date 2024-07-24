import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

const store = configureStore({
  reducer: { auth: authSlice },
  devTools: true,
});

export default store;

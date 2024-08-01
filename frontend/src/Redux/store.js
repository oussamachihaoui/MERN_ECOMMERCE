import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./apis/userSlice";
import catagorySlice from "./apis/catagorySlice";

const store = configureStore({
  reducer: { auth: authSlice, user: userSlice, catagory: catagorySlice },
  devTools: true,
});

export default store;

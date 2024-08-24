import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./apis/userSlice";
import catagorySlice from "./apis/catagorySlice";
import productSlice from "./apis/productSlice";
import cartSlice from "./features/cartSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    catagory: catagorySlice,
    product: productSlice,
    cart: cartSlice,
  },
  devTools: true,
});

export default store;

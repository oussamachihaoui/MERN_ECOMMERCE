import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const addProductsToCart = createAsyncThunk(
  "/addProductToCart",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        `https://ecommerce-j630.onrender.com/api/cart/${id}`
      );
      toast.success("Added product to your cart");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

export const getAllCartProducts = createAsyncThunk(
  "/getCartProducts",
  async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(
        "https://ecommerce-j630.onrender.com/api/cart/"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  "/deleteProductFromCart",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(
        `https://ecommerce-j630.onrender.com/api/cart/${id}`
      );
      toast.success("Removed from your cart");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    //ADD PRODUCTS TO CART
    builder.addCase(addProductsToCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProductsToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.addProductsToCart = action.payload;
    });

    builder.addCase(addProductsToCart.rejected, (state) => {
      state.loading = false;
    });

    // GET ALL CART PRODUCTS
    builder.addCase(getAllCartProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCartProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allCartProducts = action.payload;
    });

    builder.addCase(getAllCartProducts.rejected, (state) => {
      state.loading = false;
    });

    // DELETE PRODUCT FROM CART

    builder.addCase(deleteProductFromCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProductFromCart.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedProductFromCart = action.payload;
    });

    builder.addCase(deleteProductFromCart.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;

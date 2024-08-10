import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// get all products
export const getAllProducts = createAsyncThunk("/products", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/product/");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
});

// get a specific product

export const getSpecificProduct = createAsyncThunk("/productId", async (id) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get(`http://localhost:5000/api/product/${id}`);
    return data;
  } catch (error) {
    console.log(data);
    toast.error(error.response.data.message);
  }
});

// create product

// update a product

// delete a product

const productSlice = createSlice({
  name: "product",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL PRODUCTS
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allProducts = action.payload;
    });

    builder.addCase(getAllProducts.rejected, (state) => {
      state.loading = false;
    });

    // GET A PRODUCT WITH ID

    builder.addCase(getSpecificProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getSpecificProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.getProductWithId = action.payload;
    });

    builder.addCase(getSpecificProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;

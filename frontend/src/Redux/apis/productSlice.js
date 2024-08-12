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
export const createProduct = createAsyncThunk(
  "/createProduct",
  async (product) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/product/",
        product
      );
      toast.success("Product created successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// update a product
export const updateProduct = createAsyncThunk(
  "/updateProduct",
  async ({ id, newUpdate }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/product/${id}`,
        newUpdate
      );
      toast.success("Updated successfully");

      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// delete a product
export const deleteProduct = createAsyncThunk("/deleteProduct", async (id) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.delete(
      `http://localhost:5000/api/product/${id}`
    );
    toast.success("Product is deleted successfully");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
});

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

    // CREATE A PRODUCT

    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.createdProduct = action.payload;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE PRODUCT
    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedProduct = action.payload;
    });

    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
    });

    //DELETE A PRODUCT
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedProduct = action.payload;
    });

    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;

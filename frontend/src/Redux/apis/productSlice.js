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
      return data;
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

// PRODUCT REVIEWS ////////////////////////////
// GET ALL REVIEWS FOR SPECIFC PRODUCT

export const getAllReviewsForSpecificProduct = createAsyncThunk(
  "/allReviews",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/${id}/reviews`
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// CREATE A REVIEW FOR SPECIFC PRODUCT

export const createReviewForProduct = createAsyncThunk(
  "/createReview",
  async ({ reviewId, review }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/product/${reviewId}/reviews`,
        review
      );
      toast.success("Added review");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

//   UPDATE A REVIEW FOR SPECIFC PRODUCT

export const updateReviw = createAsyncThunk(
  "/updateReview",
  async ({ reviewId, newReview }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/product/reviews/${reviewId}`,
        newReview
      );
      toast.success("Updated review");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// DELETE A REVIEW FOR SPECIFIC PRODUCT

export const deleteReview = createAsyncThunk(
  "/deleteReview",
  async (reviewId) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/product/reviews/${reviewId}`
      );
      toast.success("Deleted review");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

// FETCHING PRODUCTS//////////////////////

// Fetching new products by date
export const fetchNewProducts = createAsyncThunk("/newProducts", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/product/new");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Fetching products by num of reviews
export const fetchTopProducts = createAsyncThunk("/topProducts", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/product/top");
    return data;
  } catch (error) {
    console.log(error);
  }
});

// Fetching random products

export const fetchRandomProducts = createAsyncThunk(
  "/randomProducts",
  async () => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/product/random"
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

    //////////////////////////////////////////////////
    // REVIEWS

    // GET ALL REVIEWS FOR 1 PRODUCT

    builder.addCase(getAllReviewsForSpecificProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(
      getAllReviewsForSpecificProduct.fulfilled,
      (state, action) => {
        state.loading = false;
        state.allReviewsForSpecificProduct = action.payload;
      }
    );

    builder.addCase(getAllReviewsForSpecificProduct.rejected, (state) => {
      state.loading = false;
    });

    // CREATE REVIEW FOR A PRODUCT
    builder.addCase(createReviewForProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createReviewForProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.createdReviewForProduct = action.payload;
    });

    builder.addCase(createReviewForProduct.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE A REVIEW FOR A PRODUCT
    builder.addCase(updateReviw.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateReviw.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedReview = action.payload;
    });

    builder.addCase(updateReviw.rejected, (state) => {
      state.loading = false;
    });

    // DELETE REVIEW FROM A PRODUCT

    builder.addCase(deleteReview.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedReview = action.payload;
    });

    builder.addCase(deleteReview.rejected, (state) => {
      state.loading = false;
    });

    //////////////////////////////////////////////
    // FETCHING PRODUCTS

    //FETCHING NEW PRODUCTS BY DATE
    builder.addCase(fetchNewProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchNewProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allNewProducts = action.payload;
    });

    builder.addCase(fetchNewProducts.rejected, (state) => {
      state.loading = false;
    });

    // FETCHING TOP PRODUCTS BY NUM OF REVIEWS
    builder.addCase(fetchTopProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchTopProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.allTopProducts = action.payload;
    });

    builder.addCase(fetchTopProducts.rejected, (state) => {
      state.loading = false;
    });

    // FETCHING RANDOM PRODUCTS
    builder.addCase(fetchRandomProducts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchRandomProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.randomProducts = action.payload;
    });

    builder.addCase(fetchRandomProducts.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;

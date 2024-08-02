import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import toast from "react-hot-toast";

// create catagory
export const createCatagory = createAsyncThunk(
  "/catagory/create",
  async (catagory) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/catagory/",
        catagory
      );
      toast.success("Catagory is created successfully");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

// get all catagories

export const getAllCatagories = createAsyncThunk("/catagories", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/catagory/");
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

// update catagory

// delete catagory

export const deleteCatagory = createAsyncThunk(
  "/catagory/delete",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/catagory/${id}`
      );
      toast.success("Deleted catagory successfully");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const catagorySlice = createSlice({
  name: "catagory",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    // CREATE CATAGORY ///////////////////////////////
    builder.addCase(createCatagory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createCatagory.fulfilled, (state, action) => {
      state.loading = false;
      state.createdCatagory = action.payload;
    });

    builder.addCase(createCatagory.rejected, (state) => {
      state.loading = false;
    });

    // GET ALL CATAGORIES /////////////////////////////
    builder.addCase(getAllCatagories.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllCatagories.fulfilled, (state, action) => {
      state.loading = false;
      state.allCatagories = action.payload;
    });
    builder.addCase(getAllCatagories.rejected, (state) => {
      state.loading = false;
    });

    // DELETE A CATAGORY //////////////////////////////
    builder.addCase(deleteCatagory.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteCatagory.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedCatagory = action.payload;
    });

    builder.addCase(deleteCatagory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default catagorySlice.reducer;

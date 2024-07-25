import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setCredentials } from "../features/authSlice";

// LOG IN USER
export const login = createAsyncThunk(
  "user/signin",
  async (user, { dispatch, getState, rejectWithValue }) => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/auth",
        user
      );
      dispatch(setCredentials(data));
      toast.success("Logged In");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedIn = action.payload;
    });

    builder.addCase(login.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

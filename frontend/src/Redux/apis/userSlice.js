import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setCredentials, clearCredentials } from "../features/authSlice";

// LOG IN USER
export const login = createAsyncThunk(
  "user/signin",
  async (user, { dispatch }) => {
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

// LOG OUT

export const logout = createAsyncThunk("/user/logout", async (user) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/users/logout",
      user
    );

    toast.success("Logged Out successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    // LOG IN USER ////////////////////////////
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

    // LOG OUT USER ////////////////////////////
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedOut = action.payload;
    });

    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

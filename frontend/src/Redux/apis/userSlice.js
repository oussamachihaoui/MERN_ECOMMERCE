import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { setCredentials } from "../features/authSlice";

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

export const logout = createAsyncThunk("/user/logout", async (navigate) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.post("http://localhost:5000/api/users/logout");
    navigate("/");
    toast.success("Logged Out successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

// SIGN UP

export const signUp = createAsyncThunk("/user/signup", async (user) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.post("http://localhost:5000/api/users", user);

    toast.success("Account created Successfully");
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

export const updateUserCredentials = createAsyncThunk(
  "/user/update",
  async (user, { dispatch }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(
        "http://localhost:5000/api/users/",
        user
      );
      toast.success("Updated successfully");
      dispatch(setCredentials(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

// USER WISHLIST

export const getAllWishlist = createAsyncThunk("/wishlist", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/wishlist/");
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
});

export const addProductToWishlist = createAsyncThunk(
  "/addToWishlist",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        `http://localhost:5000/api/wishlist/${id}`
      );
      toast.success("Added to wishlist");
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

export const deleteProductFromWishlist = createAsyncThunk(
  "/deleteFromWishlist",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/wishlist/${id}`
      );
      return data;
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
);

///////////////////////////////////////////////////////////////
// ADMIN

export const getAllUsers = createAsyncThunk("/admin/users", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get("http://localhost:5000/api/users/");
    return data;
  } catch (error) {
    console.log(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk(
  "/admin/users/delete",
  async (id) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${id}`
      );
      toast.success("User is deleted successfully");
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

    // SIGN UP USER ////////////////////////////

    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.createdUser = action.payload;
    });

    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });

    // UPDATE USER CREDENTIALS /////////////////

    builder.addCase(updateUserCredentials.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateUserCredentials.fulfilled, (state, action) => {
      state.loading = false;
      state.userCredentialsUpdated = action.payload;
    });

    builder.addCase(updateUserCredentials.rejected, (state) => {
      state.loading = false;
    });

    ////////////////////////////////////////////
    //ADMIN

    //GET ALL USERS
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    });

    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
    });

    //DELETE USER BY ID
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedUserByAdmin = action.payload;
    });

    builder.addCase(deleteUser.rejected, (state) => {
      state.loading = false;
    });

    // WISHLIST USER ///////////////////////
    //GET ALL WISHLIST

    builder.addCase(getAllWishlist.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getAllWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.allWishlistProducts = action.payload;
    });

    builder.addCase(getAllWishlist.rejected, (state) => {
      state.loading = false;
    });

    // ADD PRODUCT TO WISHLIST
    builder.addCase(addProductToWishlist.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addProductToWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.addedToWishlist = action.payload;
    });

    builder.addCase(addProductToWishlist.rejected, (state) => {
      state.loading = false;
    });

    //DELETE PRODUCT FROM WISHLIST
    builder.addCase(deleteProductFromWishlist.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(deleteProductFromWishlist.fulfilled, (state, action) => {
      state.loading = false;
      state.deletedFromWishlist = action.payload;
    });

    builder.addCase(deleteProductFromWishlist.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;

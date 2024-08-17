import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createRoutesFromElements,
  RouterProvider,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Profile from "./Pages/User/Profile.jsx";
import AdminRoute from "./Pages/Admin/AdminRoute.jsx";
import { UsersList } from "./Pages/Admin/UsersList.jsx";
import CatagoryList from "./Pages/Admin/CatagoryList.jsx";
import ProductList from "./Pages/Products/ProductList.jsx";
import ProductDetails from "./Pages/Products/ProductDetails.jsx";
import AddProduct from "./Pages/Admin/AddProduct.jsx";
import UpdateProduct from "./Pages/Admin/UpdateProduct.jsx";
import WishList from "./Pages/Products/WishList.jsx";
import Home from "./Pages/Home.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/productDetails/:id" element={<ProductDetails />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/wishlist" element={<WishList />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="users" element={<UsersList />} />
        <Route path="categorylist" element={<CatagoryList />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="addProduct" element={<AddProduct />} />
        <Route path="updateProduct/:id" element={<UpdateProduct />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

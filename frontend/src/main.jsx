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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* ADMIN */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="users" element={<UsersList />} />
        <Route path="categorylist" element={<CatagoryList />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

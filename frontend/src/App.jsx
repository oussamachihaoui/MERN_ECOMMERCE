import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Navigation from "./Pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Navigation />
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;

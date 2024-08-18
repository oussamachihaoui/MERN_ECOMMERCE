import React from "react";
import Header from "../Components/Header";
import AdminMenu from "./Admin/AdminMenu";
import { useSelector } from "react-redux";
import SectionProducts from "../Components/SectionProducts";

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminMenu />}
      <div>
        <Header />
        <SectionProducts />
      </div>
    </>
  );
};

export default Home;

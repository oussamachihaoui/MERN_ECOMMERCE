import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import "./Navigation.css";

const Navigation = () => {
  // states
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  // handlers
  const toggledropDownOpen = function () {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleShowSideBar = function () {
    setShowSideBar(!showSideBar);
  };

  const closeSideBar = function () {
    setShowSideBar(false);
  };

  return (
    <div
      style={{ zIndex: 10 }}
      className={`${
        showSideBar ? "hidden" : "flex"
      } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#222] w-[4%] hover:w-[12%] h-[100vh]  fixed  `}
      id="navigation-container"
    >
      <div className="flex flex-col space-y-4 justify-center">
        {/* home */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/"}
        >
          <AiOutlineHome className="mr-2 mt-[3rem] " size={24} />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
        </Link>
        {/* shop */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/shop"}
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={24} />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
        </Link>
        {/* cart */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/cart"}
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={24} />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>
        </Link>
        {/* favorites */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/favorites"}
        >
          <MdFavoriteBorder className="mr-2 mt-[3rem] " size={24} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
        </Link>
      </div>
      {/* login */}
      <ul>
        <li>
          <Link
            className="flex items-center transition-transform transform hover:translate-x-1"
            to={"/login"}
          >
            <AiOutlineLogin className="mr-2 mt-[3rem] " size={24} />
            <span className="hidden nav-item-name mt-[3rem]">Log in</span>
          </Link>
        </li>
        {/* resgister */}
        <li>
          <Link
            className="flex items-center transition-transform transform hover:translate-x-1"
            to={"/register"}
          >
            <AiOutlineUserAdd className="mr-2 mt-[3rem] " size={24} />
            <span className="hidden nav-item-name mt-[3rem]">Sign up</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

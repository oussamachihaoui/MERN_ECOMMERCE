import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { MdFavoriteBorder } from "react-icons/md";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/apis/userSlice";
import { clearCredentials } from "../../Redux/features/authSlice";

const Navigation = () => {
  // consts
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  // handlers

  const handleLogoutUser = function (e) {
    e.preventDefault();
    dispatch(logout());
    dispatch(clearCredentials());
    navigate("/");
  };

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
      } xl:flex lg:flex md:flex sm:flex flex-col justify-between p-4 text-white bg-[#222] min-w-[4%] hover:w-[15%]  h-[100vh]  fixed  `}
      id="navigation-container"
    >
      <div className="flex flex-col space-y-4 justify-center">
        {/* home */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/"}
        >
          <AiOutlineHome className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Home</span>
        </Link>
        {/* shop */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/shop"}
        >
          <AiOutlineShopping className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Shop</span>
        </Link>
        {/* cart */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/cart"}
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>
        </Link>
        {/* favorites */}
        <Link
          className="flex items-center transition-transform transform hover:translate-x-1"
          to={"/favorites"}
        >
          <MdFavoriteBorder className="mr-2 mt-[3rem] " size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
        </Link>
      </div>
      {/* login */}
      <div className="relative">
        <button
          onClick={toggledropDownOpen}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo ? (
            <>
              <img
                src={userInfo.photo}
                alt="avatar_picture"
                className="w-7 h-7 mr-2"
              />
              <span className="text-white hidden nav-item-name">
                {userInfo.firstName}
              </span>
            </>
          ) : (
            <></>
          )}
          {userInfo && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 ml-1 ${
                dropDownOpen ? "transform rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={dropDownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          )}
        </button>

        {dropDownOpen && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-[#7f7e7e] text-white ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-400"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-400">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-400"
                onClick={handleLogoutUser}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={26} />
                <span className="hidden nav-item-name">Login</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center mt-5 transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd size={26} />
                <span className="hidden nav-item-name"> Signup</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navigation;

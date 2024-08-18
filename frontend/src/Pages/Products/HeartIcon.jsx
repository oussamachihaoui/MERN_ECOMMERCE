import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
} from "../../Redux/apis/userSlice";
import toast from "react-hot-toast";

const HeartIcon = ({ product }) => {
  //consts
  const dispatch = useDispatch();
  const { allWishlistProducts } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  const wishlist = allWishlistProducts?.wishlist;
  const isExists = wishlist?.some((p) => p._id === product._id);

  const toggleWishlist = function () {
    if (isExists) {
      dispatch(deleteProductFromWishlist(product._id));
    } else {
      dispatch(addProductToWishlist(product._id));
    }
  };

  return (
    <>
      {userInfo && (
        <div
          className="absolute top-2 right-5 cursor-pointer z-30"
          onClick={toggleWishlist}
        >
          {isExists ? (
            <FaHeart className="text-red-500" size={24} />
          ) : (
            <FaRegHeart className="text-white" size={24} />
          )}
        </div>
      )}
    </>
  );
};

export default HeartIcon;

import React, { useEffect } from "react";
import { FaHeart, FaRegHeart, FaVaadin } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToWishlist,
  deleteProductFromWishlist,
  getAllWishlist,
} from "../../Redux/apis/userSlice";

const HeartIcon = ({ product }) => {
  //consts
  const dispatch = useDispatch();
  const { allWishlistProducts } = useSelector((state) => state.user);

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
    <div
      className="absolute top-2 right-5 cursor-pointer z-50"
      onClick={toggleWishlist}
    >
      {isExists ? (
        <FaHeart className="text-pink-500" size={24} />
      ) : (
        <FaRegHeart className="text-white" size={24} />
      )}
    </div>
  );
};

export default HeartIcon;

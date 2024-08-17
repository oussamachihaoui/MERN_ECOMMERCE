import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlist } from "../Redux/apis/userSlice";

export const NumOfWishlistItems = () => {
  const dispatch = useDispatch();
  const { allWishlistProducts } = useSelector((state) => state.user);

  const numOfWishlist = allWishlistProducts?.wishlist?.length;

  useEffect(() => {
    dispatch(getAllWishlist());
  }, []);
  return (
    <div className="absolute left-4 top-8">
      {numOfWishlist > 0 ? (
        <span className="px-1 text-sm text-white bg-red-500 rounded-full">
          {numOfWishlist}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

import React from "react";
import { useSelector } from "react-redux";

export const NumOfWishlistItems = () => {
  const { allWishlistProducts } = useSelector((state) => state.user);

  const numOfWishlist = allWishlistProducts?.wishlist?.length;

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

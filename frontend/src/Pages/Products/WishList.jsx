import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllWishlist } from "../../Redux/apis/userSlice";
import Product from "./Product";
import AdminMenu from "../Admin/AdminMenu";
import { getAllCartProducts } from "../../Redux/features/cartSlice";

const WishList = () => {
  const dispatch = useDispatch();
  const { allWishlistProducts, loading, deletedFromWishlist, addedToWishlist } =
    useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  //on open
  useEffect(() => {
    dispatch(getAllWishlist());
  }, [addedToWishlist, deletedFromWishlist]);
  // consts

  const products = allWishlistProducts?.wishlist;

  return (
    <>
      {userInfo && userInfo.isAdmin && <AdminMenu />}
      <div className="font-[sans-serif] p-4 w-full mx-auto lg:max-w-6xl sm:max-w-2xl max-w-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <div className="fixed top-0 right-0 h-screen w-screen z-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            </>
          ) : (
            products?.map((pro) => <Product key={pro._id} product={pro} />)
          )}
        </div>
      </div>
    </>
  );
};

export default WishList;

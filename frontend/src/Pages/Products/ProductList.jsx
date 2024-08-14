import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/apis/productSlice";
import AdminMenu from "../Admin/AdminMenu";
import { getAllWishlist } from "../../Redux/apis/userSlice";

const ProductList = () => {
  //consts
  const {
    allProducts,
    loading,
    createdProduct,
    deletedProduct,
    updatedProduct,
  } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllWishlist());
  }, [createdProduct, deletedProduct, updatedProduct]);

  return (
    <>
      {userInfo.isAdmin && <AdminMenu />}
      <div className="w-[94%] mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-10  mb-5">
        {loading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </>
  );
};

export default ProductList;

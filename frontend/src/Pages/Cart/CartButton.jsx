import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteProductFromCart,
  addProductsToCart,
} from "../../Redux/features/cartSlice";

const CartButton = ({ productId }) => {
  // consts
  const dispatch = useDispatch();
  const { allCartProducts } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const exist = allCartProducts?.some((p) => p._id === productId);

  return (
    <>
      {exist ? (
        <button
          disabled={!userInfo && true}
          type="button"
          className="w-full px-4 py-2.5 border border-red-800 bg-transparent hover:bg-red-300 text-gray-800 text-sm font-semibold rounded-md"
          onClick={() => {
            dispatch(deleteProductFromCart(productId));
          }}
        >
          Remove from cart
        </button>
      ) : (
        <button
          disabled={!userInfo && true}
          type="button"
          className="w-full px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-300 text-gray-800 text-sm font-semibold rounded-md"
          onClick={() => {
            dispatch(addProductsToCart(productId));
          }}
        >
          Add To Cart
        </button>
      )}
    </>
  );
};

export default CartButton;

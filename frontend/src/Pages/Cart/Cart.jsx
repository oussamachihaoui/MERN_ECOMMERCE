import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductFromCart,
  getAllCartProducts,
} from "../../Redux/features/cartSlice";

import CartItem from "./CartItem";

const Cart = () => {
  //consts
  const dispatch = useDispatch();
  const {
    allCartProducts,
    deletedProductFromCart,
    loading,
    addProductsToCart,
  } = useSelector((state) => state.cart);

  //state
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);

  // on open
  useEffect(() => {
    dispatch(getAllCartProducts());
  }, [deletedProductFromCart, addProductsToCart]);

  // handler
  const handleUpdateTotalPrice = (price) => {
    return setTotalPrice(price);
  };

  useEffect(() => {
    setTax(totalPrice / 100);
  }, [totalPrice]);

  return (
    <div className="font-[sans-serif] bg-white h-full">
      <div className="max-w-7xl max-lg:max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          {`${
            allCartProducts?.length === 0
              ? "Your Cart is empty "
              : " Your shopping bag"
          }`}
        </h2>
        {/* <img src="./emptyCart.png" alt="" /> */}
        <div className="grid lg:grid-cols-3 gap-6 relative mt-8">
          <div className="lg:col-span-2 space-y-6">
            {/* item start */}
            {loading ? (
              <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                {allCartProducts?.map((product) => (
                  <CartItem
                    product={product}
                    key={product._id}
                    allProducts={allCartProducts}
                    handleUpdateTotalPrice={handleUpdateTotalPrice}
                  />
                ))}
              </>
            )}

            {/* item finish */}
          </div>
          {allCartProducts?.length > 0 && (
            <div className="bg-white h-max rounded-md p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] sticky top-0">
              <h3 className="text-lg font-bold text-gray-800">Order Summary</h3>
              <ul className="text-gray-500 text-sm space-y-3 mt-3">
                <li className="flex flex-wrap gap-4">
                  Shipping <span className="ml-auto font-bold">Free</span>
                </li>
                <li className="flex flex-wrap gap-4">
                  Tax <span className="ml-auto font-bold">{tax} DT</span>
                </li>
                <li className="flex flex-wrap gap-4 font-bold text-lg text-black">
                  Total <span className="ml-auto">{totalPrice + tax} DT</span>
                </li>
              </ul>
              <button
                type="button"
                className="mt-6 text-sm px-6 py-3 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white rounded-md"
              >
                Proceed to Checkout
              </button>
              {/* <div className="mt-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Secure payment
                </h4>
                <p className="text-sm text-gray-500">
                  Experience peace of mind with our secure payment options,
                  ensuring your transactions are protected and reliable.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Free delivery
                </h4>
                <p className="text-sm text-gray-500">
                  Enjoy the convenience of free delivery on all your orders,
                  providing a cost-effective and seamless shopping experience.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-800 mb-3">
                  Easy to return
                </h4>
                <p className="text-sm text-gray-500">
                  Simplify your shopping experience with hassle-free returns.
                  Our easy return process ensures convenience and customer
                  satisfaction.
                </p>
              </div>
            </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartProducts } from "../Redux/features/cartSlice";

const NumOfCartItems = () => {
  // consts
  const dispatch = useDispatch();
  const { allCartProducts } = useSelector((state) => state.cart);

  const length = allCartProducts?.length;

  console.log(length);

  // on open
  useEffect(() => {
    dispatch(getAllCartProducts());
  }, []);

  return (
    <div className="absolute left-4 top-8">
      {length > 0 ? (
        <span className="px-1 text-sm text-white bg-red-500 rounded-full">
          {length}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default NumOfCartItems;

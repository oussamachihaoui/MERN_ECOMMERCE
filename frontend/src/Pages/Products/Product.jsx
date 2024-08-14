import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="bg-zinc-200 rounded-md overflow-hidden cursor-pointer">
      <div className="w-full h-80  overflow-hidden group relative">
        <HeartIcon product={product} />
        <img
          src={product.photo}
          alt="Product 1"
          className="h-full w-full object-cover  transition-all"
        />
        <div className="absolute inset-0 bg-black/30  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex justify-center items-center h-full">
            <Link
              className="text-white font-extrabold text-xl -tracking-2"
              to={`/productDetails/${product._id}`}
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>
      </div>
      <div className="p-6 ">
        <div className="mb-6 flex items-center justify-center flex-wrap gap-4  mt-auto">
          <h3 className="text-lg font-bold text-gray-800">
            {product.productName}
          </h3>
          <p className="text-lg text-blue-600 font-bold">{`${product.price} DT`}</p>
        </div>
        <button
          type="button"
          className="w-full px-5 py-2.5 bg-blue-600 hover:bg-blue-700 font-bold text-white rounded-lg"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;

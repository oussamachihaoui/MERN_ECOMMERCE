import React from "react";
import { Link } from "react-router-dom";
import HeartIcon from "../Pages/Products/HeartIcon";
import Top from "./Top";

const TopProductUI = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative group">
        <img
          src={product.photo}
          alt={product.productName}
          className=" h-72 w-full object-cover  rounded-md transition-all"
        />
        <HeartIcon product={product} />
        <Top />
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

      <div className="p-4">
        <h2 className="flex justify-between items-center">
          <div>{product.productName}</div>
          <span className="bg-pink-100 text-red-800 text-xs font-medium mr-2 px-3.5 py-0.5 rounded-full">
            {product.price} DT
          </span>
        </h2>
      </div>
    </div>
  );
};

export default TopProductUI;

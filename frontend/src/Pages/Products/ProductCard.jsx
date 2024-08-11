import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getSpecificProduct } from "../../Redux/apis/productSlice";

const ProductCard = ({ product }) => {
  //consts
  const { productName, brand, price, description, photo } = product;

  return (
    <div className="relative flex w-80 flex-col  rounded-xl bg-gray-100/20 bg-clip-border text-gray-700 shadow-md mt-5">
      <div className="relative mx-4 mt-4 h-80 overflow-hidden rounded-xl  bg-clip-border text-gray-700 group">
        <img
          src={photo}
          className="h-full w-full object-cover"
          alt="product-avatar picture"
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
      <div className="p-6">
        <span className="  font-sans text-sm leading-relaxed text-gray-400 antialiased">
          {brand}
        </span>
        <div className="mb-2 flex items-center justify-between">
          <h2 className=" font-sans  font-medium leading-relaxed text-blue-gray-900 antialiased">
            {productName}
          </h2>
          <p className=" font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            {`${price}DT`}
          </p>
        </div>
        <p className=" font-sans text-sm font-normal leading-normal text-gray-700 antialiased opacity-75 truncate ">
          {description}
        </p>
      </div>
      <div className="p-6 pt-0">
        <button
          className="block w-full select-none rounded-lg bg-gray-900/10 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

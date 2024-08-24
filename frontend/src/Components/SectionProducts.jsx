import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRandomProducts } from "../Redux/apis/productSlice";
import { Link } from "react-router-dom";
import RandomProducts from "./RandomProducts";

const SectionProducts = () => {
  //consts
  const dispatch = useDispatch();
  const { randomProducts } = useSelector((state) => state.product);

  //on open
  useEffect(() => {
    dispatch(fetchRandomProducts());
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">Special Products</h1>

        <Link
          to="/productlist"
          className="bg-emerald-400 font-bold rounded-full text-white py-2 px-10 mr-[18rem] mt-[10rem]"
        >
          Shop
        </Link>
      </div>

      <div>
        <div className="flex justify-center flex-wrap mt-[2rem]">
          {randomProducts?.map((product) => (
            <RandomProducts product={product} key={product._id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionProducts;

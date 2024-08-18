import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "../Redux/apis/productSlice";
import TopProductUI from "./TopProductUI";
import ProductSlider from "./ProductSlider";
const Header = () => {
  //consts
  const dispatch = useDispatch();
  const { allTopProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchTopProducts());
  }, []);

  return (
    <div className="flex justify-around">
      <div className="xl:block lg:hidden md:hidden:sm:hidden">
        <div className="grid grid-cols-2">
          {allTopProducts?.map((pro) => (
            <TopProductUI product={pro} key={pro._id} />
          ))}
        </div>
      </div>
      <ProductSlider />
    </div>
  );
};

export default Header;

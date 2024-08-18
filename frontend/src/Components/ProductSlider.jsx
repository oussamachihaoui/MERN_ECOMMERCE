import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewProducts } from "../Redux/apis/productSlice";
import { Link } from "react-router-dom";
import HeartIcon from "../Pages/Products/HeartIcon";
import New from "./New";

const ProductSlider = () => {
  // consts
  const dispatch = useDispatch();
  const { allNewProducts, loading } = useSelector((state) => state.product);

  // on open
  useEffect(() => {
    dispatch(fetchNewProducts());
  }, []);

  // handler

  //slider settings
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 800,
  };

  return (
    <div className="p-2">
      {loading ? (
        <>
          <div className="fixed top-0 right-0 h-screen w-screen z-20 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        </>
      ) : (
        <Slider
          {...settings}
          className="xl:w-[50rem]  lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {allNewProducts?.map((product) => (
            <div
              className=" relative overflow-hidden rounded-2xl  group "
              key={product._id}
            >
              <img
                src={product.photo}
                alt={product.productName}
                className="relative"
              />
              <HeartIcon product={product} />
              <New />
              <Link
                className="absolute inset-0 bg-black/30 bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                to={`/productDetails/${product._id}`}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white ">
                    {product.productName}
                  </h3>
                  <p className="text-white">{product.price} DT</p>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default ProductSlider;

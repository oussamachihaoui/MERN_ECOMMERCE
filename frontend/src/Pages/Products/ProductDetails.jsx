import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllReviewsForSpecificProduct,
  getSpecificProduct,
} from "../../Redux/apis/productSlice";
import { useNavigate, useParams, Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import AdminMenu from "../Admin/AdminMenu";
import { BsBoxes } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import Review from "./Review";

const ProductDetails = () => {
  //consts
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getProductWithId, allReviewsForSpecificProduct } = useSelector(
    (state) => state.product
  );
  const { userInfo } = useSelector((state) => state.auth);

  //state
  const [activeTab, setActiveTab] = useState(1);
  const [ratingValue, setRatingValue] = useState(2);

  //handlers
  useEffect(() => {
    dispatch(getSpecificProduct(id));
    dispatch(getAllReviewsForSpecificProduct(id));
  }, []);

  if (!getProductWithId) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  const {
    productName,
    brand,
    price,
    description,
    photo,
    countInStock,
    reviews,
  } = getProductWithId;
  const numReviews = reviews.length;

  return (
    // <>
    //   <AdminMenu />
    //   <div className="bg-gray-100 ">
    //     <div className="container mx-auto px-4 py-8">
    //       <div className="flex flex-wrap -mx-4">
    //         {/* Product Images */}
    //         <div className=" w-full h-96 md:w-1/2 px-4 mb-8 relative">
    //           <img
    //             src={photo}
    //             alt="Product"
    //             className="w-full max-h-full  object-cover rounded-lg "
    //             id="mainImage"
    //           />
    //           <HeartIcon product={getProductWithId} />
    //           {/* <div className="flex gap-4 py-4 justify-center overflow-x-auto">
    //           <img
    //             src="https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxMnx8aGVhZHBob25lfGVufDB8MHx8fDE3MjEzMDM2OTB8MA&ixlib=rb-4.0.3&q=80&w=1080"
    //             alt="Thumbnail 1"
    //             className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
    //             onclick="changeImage(this.src)"
    //           />
    //           <img
    //             src="https://images.unsplash.com/photo-1484704849700-f032a568e944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw0fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
    //             alt="Thumbnail 2"
    //             className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
    //             onclick="changeImage(this.src)"
    //           />
    //           <img
    //             src="https://images.unsplash.com/photo-1496957961599-e35b69ef5d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
    //             alt="Thumbnail 3"
    //             className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
    //             onclick="changeImage(this.src)"
    //           />
    //           <img
    //             src="https://images.unsplash.com/photo-1528148343865-51218c4a13e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHxoZWFkcGhvbmV8ZW58MHwwfHx8MTcyMTMwMzY5MHww&ixlib=rb-4.0.3&q=80&w=1080"
    //             alt="Thumbnail 4"
    //             className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
    //             onclick="changeImage(this.src)"
    //           />
    //         </div> */}
    //         </div>
    //         {/* Product Details */}
    //         <div className="w-full md:w-1/2 px-4">
    //           <h2 className="text-3xl font-bold mb-2">{productName}</h2>
    //           <p className="text-gray-600 mb-4">{brand}</p>
    //           <div className="mb-4">
    //             <span className="text-2xl font-bold mr-2">{price} DT</span>
    //             {/* <span className="text-gray-500 line-through">$399.99</span> */}
    //           </div>
    //           <div className="flex items-center mb-4">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="size-6 text-yellow-500"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="size-6 text-yellow-500"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="size-6 text-yellow-500"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="size-6 text-yellow-500"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               viewBox="0 0 24 24"
    //               fill="currentColor"
    //               className="size-6 text-yellow-500"
    //             >
    //               <path
    //                 fillRule="evenodd"
    //                 d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
    //                 clipRule="evenodd"
    //               />
    //             </svg>
    //             <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
    //           </div>
    //           <p className="text-gray-700 mb-6">{description}</p>
    //           {/* <div className="mb-6">
    //           <h3 className="text-lg font-semibold mb-2">Color:</h3>
    //           <div className="flex space-x-2">
    //             <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black" />
    //             <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300" />
    //             <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" />
    //           </div>
    //         </div> */}
    //           <div className="mb-6">
    //             <label
    //               htmlFor="quantity"
    //               className="block text-sm font-medium text-gray-700 mb-1"
    //             >
    //               Quantity:
    //             </label>
    //             <input
    //               type="number"
    //               id="quantity"
    //               name="quantity"
    //               min={1}
    //               defaultValue={1}
    //               className="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
    //             />
    //           </div>
    //           <div className="flex space-x-4 mb-6">
    //             {userInfo?.isAdmin ? (
    //               <>
    //                 <button
    //                   className="bg-red-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //                   onClick={() => {
    //                     dispatch(deleteProduct(id));
    //                     navigate("/admin/productlist");
    //                   }}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth="1.5"
    //                     stroke="currentColor"
    //                     className="size-6"
    //                   >
    //                     <path
    //                       d="M16 9L13.0001 11.9999M13.0001 11.9999L10 15M13.0001 11.9999L10.0002 9M13.0001 11.9999L16.0002 15M8 6H19C19.5523 6 20 6.44772 20 7V17C20 17.5523 19.5523 18 19 18H8L2 12L8 6Z"
    //                       strokeWidth="1.5"
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                     />
    //                   </svg>
    //                   Delete Product
    //                 </button>
    //                 <Link
    //                   className="bg-[#ADFF2F] flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-[#a4ff50] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    //                   to={`/admin/updateProduct/${id}`}
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth="1.5"
    //                     stroke="currentColor"
    //                     className="size-6"
    //                   >
    //                     <path
    //                       d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
    //                       strokeWidth="1.5"
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       stroke="currentColor"
    //                     />
    //                     <path
    //                       d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
    //                       strokeWidth="1.5"
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       stroke="currentColor"
    //                     />
    //                   </svg>
    //                   Update Product
    //                 </Link>
    //               </>
    //             ) : (
    //               <>
    //                 <button className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth="1.5"
    //                     stroke="currentColor"
    //                     className="size-6"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
    //                     />
    //                   </svg>
    //                   Add to Cart
    //                 </button>
    //                 <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth="1.5"
    //                     stroke="currentColor"
    //                     className="size-6"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
    //                     />
    //                   </svg>
    //                   Wishlist
    //                 </button>
    //               </>
    //             )}
    //           </div>
    //           <div>
    //             <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
    //             <ul className="list-disc list-inside text-gray-700">
    //               <li>Industry-leading noise cancellation</li>
    //               <li>30-hour battery life</li>
    //               <li>Touch sensor controls</li>
    //               <li>Speak-to-chat technology</li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <AdminMenu />
      <div className="font-sans">
        <div className=" mx-auto p-4 lg:max-w-6xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-16 ">
            <div className="w-full lg:sticky top-0 text-center">
              <div className="lg:h-96 relative">
                <img
                  src={photo}
                  alt="Product"
                  className="w-full max-h-full  object-cover rounded-lg"
                />
                <HeartIcon product={getProductWithId} />
              </div>
              {/* <div className="flex flex-wrap gap-4 justify-center mx-auto mt-4">
                <img
                  src="https://readymadeui.com/images/product6.webp"
                  alt="Product1"
                  className="w-16 cursor-pointer rounded-md outline"
                />
                <img
                  src="https://readymadeui.com/images/product8.webp"
                  alt="Product2"
                  className="w-16 cursor-pointer rounded-md"
                />
                <img
                  src="https://readymadeui.com/images/product5.webp"
                  alt="Product3"
                  className="w-16 cursor-pointer rounded-md"
                />
                <img
                  src="https://readymadeui.com/images/product7.webp"
                  alt="Product4"
                  className="w-16 cursor-pointer rounded-md"
                />
              </div> */}
            </div>
            <div>
              <div className="flex flex-wrap items-start gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {productName}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">{brand}</p>
                </div>
                <div className="ml-auto flex flex-wrap gap-4">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="currentColor"
                      className="mr-1"
                      viewBox="0 0 64 64"
                    >
                      <path
                        d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                        data-original="#000000"
                      />
                    </svg>
                    100
                  </button>
                  {/* <button
                    type="button"
                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12px"
                      fill="currentColor"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M453.332 85.332c0 38.293-31.039 69.336-69.332 69.336s-69.332-31.043-69.332-69.336C314.668 47.043 345.707 16 384 16s69.332 31.043 69.332 69.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M384 170.668c-47.063 0-85.332-38.273-85.332-85.336C298.668 38.273 336.938 0 384 0s85.332 38.273 85.332 85.332c0 47.063-38.27 85.336-85.332 85.336zM384 32c-29.418 0-53.332 23.938-53.332 53.332 0 29.398 23.914 53.336 53.332 53.336s53.332-23.938 53.332-53.336C437.332 55.938 413.418 32 384 32zm69.332 394.668C453.332 464.957 422.293 496 384 496s-69.332-31.043-69.332-69.332c0-38.293 31.039-69.336 69.332-69.336s69.332 31.043 69.332 69.336zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M384 512c-47.063 0-85.332-38.273-85.332-85.332 0-47.063 38.27-85.336 85.332-85.336s85.332 38.273 85.332 85.336c0 47.059-38.27 85.332-85.332 85.332zm0-138.668c-29.418 0-53.332 23.938-53.332 53.336C330.668 456.063 354.582 480 384 480s53.332-23.938 53.332-53.332c0-29.398-23.914-53.336-53.332-53.336zM154.668 256c0 38.293-31.043 69.332-69.336 69.332C47.043 325.332 16 294.293 16 256s31.043-69.332 69.332-69.332c38.293 0 69.336 31.039 69.336 69.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M85.332 341.332C38.273 341.332 0 303.062 0 256s38.273-85.332 85.332-85.332c47.063 0 85.336 38.27 85.336 85.332s-38.273 85.332-85.336 85.332zm0-138.664C55.914 202.668 32 226.602 32 256s23.914 53.332 53.332 53.332c29.422 0 53.336-23.934 53.336-53.332s-23.914-53.332-53.336-53.332zm0 0"
                        data-original="#000000"
                      />
                      <path
                        d="M135.703 245.762c-7.426 0-14.637-3.864-18.562-10.774-5.825-10.218-2.239-23.254 7.98-29.101l197.95-112.852c10.218-5.867 23.253-2.281 29.1 7.977 5.825 10.218 2.24 23.254-7.98 29.101L146.238 242.965a21.195 21.195 0 0 1-10.535 2.797zm197.93 176c-3.586 0-7.211-.899-10.54-2.797L125.142 306.113c-10.22-5.824-13.801-18.86-7.977-29.101 5.8-10.239 18.856-13.844 29.098-7.977l197.953 112.852c10.219 5.824 13.8 18.86 7.976 29.101-3.945 6.91-11.156 10.774-18.558 10.774zm0 0"
                        data-original="#000000"
                      />
                    </svg>
                  </button> */}
                </div>
              </div>
              <hr className="my-8" />
              <div className="flex flex-wrap gap-4 items-start">
                <div>
                  <p className="text-gray-800 text-4xl font-bold">{`${price} DT`}</p>
                  {/* <p className="text-gray-500 text-sm mt-2">
                    <strike>$42</strike>{" "}
                    <span className="text-sm ml-1">Tax included</span>
                  </p> */}
                </div>
                <div className="flex flex-wrap gap-4 ml-auto">
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-pink-100 text-xs text-pink-600 rounded-md flex items-center"
                  >
                    <svg
                      className="w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 14 13"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                    </svg>
                    4.8
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                    onClick={() => {
                      setActiveTab(2);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M14.236 21.954h-3.6c-.91 0-1.65-.74-1.65-1.65v-7.201c0-.91.74-1.65 1.65-1.65h3.6a.75.75 0 0 1 .75.75v9.001a.75.75 0 0 1-.75.75zm-3.6-9.001a.15.15 0 0 0-.15.15v7.2a.15.15 0 0 0 .15.151h2.85v-7.501z"
                        data-original="#000000"
                      />
                      <path
                        d="M20.52 21.954h-6.284a.75.75 0 0 1-.75-.75v-9.001c0-.257.132-.495.348-.633.017-.011 1.717-1.118 2.037-3.25.18-1.184 1.118-2.089 2.28-2.201a2.557 2.557 0 0 1 2.17.868c.489.56.71 1.305.609 2.042a9.468 9.468 0 0 1-.678 2.424h.943a2.56 2.56 0 0 1 1.918.862c.483.547.708 1.279.617 2.006l-.675 5.401a2.565 2.565 0 0 1-2.535 2.232zm-5.534-1.5h5.533a1.06 1.06 0 0 0 1.048-.922l.675-5.397a1.046 1.046 0 0 0-1.047-1.182h-2.16a.751.751 0 0 1-.648-1.13 8.147 8.147 0 0 0 1.057-3 1.059 1.059 0 0 0-.254-.852 1.057 1.057 0 0 0-.795-.365c-.577.052-.964.435-1.04.938-.326 2.163-1.71 3.507-2.369 4.036v7.874z"
                        data-original="#000000"
                      />
                      <path
                        d="M4 31.75a.75.75 0 0 1-.612-1.184c1.014-1.428 1.643-2.999 1.869-4.667.032-.241.055-.485.07-.719A14.701 14.701 0 0 1 1.25 15C1.25 6.867 7.867.25 16 .25S30.75 6.867 30.75 15 24.133 29.75 16 29.75a14.57 14.57 0 0 1-5.594-1.101c-2.179 2.045-4.61 2.81-6.281 3.09A.774.774 0 0 1 4 31.75zm12-30C8.694 1.75 2.75 7.694 2.75 15c0 3.52 1.375 6.845 3.872 9.362a.75.75 0 0 1 .217.55c-.01.373-.042.78-.095 1.186A11.715 11.715 0 0 1 5.58 29.83a10.387 10.387 0 0 0 3.898-2.37l.231-.23a.75.75 0 0 1 .84-.153A13.072 13.072 0 0 0 16 28.25c7.306 0 13.25-5.944 13.25-13.25S23.306 1.75 16 1.75z"
                        data-original="#000000"
                      />
                    </svg>
                    {numReviews} Reviews
                  </button>
                  {/* IN STOCK */}
                  <button
                    type="button"
                    className="px-2.5 py-1.5 bg-gray-100 text-xs text-gray-800 rounded-md flex items-center"
                  >
                    <span className="mr-2"> {countInStock} In stock</span>
                    <BsBoxes />
                  </button>
                </div>
              </div>
              <hr className="my-8" />
              {/*<div>
                 <h3 className="text-xl font-bold text-gray-800">
                  Choose a Size
                </h3>
                <div className="flex flex-wrap gap-4 mt-4"> 
                   <button
                    type="button"
                    className="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0"
                  >
                    SM
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border hover:border-gray-800 border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0"
                  >
                    MD
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0"
                  >
                    LG
                  </button>
                  <button
                    type="button"
                    className="w-10 h-10 border hover:border-gray-800 font-semibold text-sm rounded-md flex items-center justify-center shrink-0"
                  >
                    XL
                  </button> 
                </div>
              </div>
              {/* <hr className="my-8" /> */}
              {/* <div>
                <h3 className="text-xl font-bold text-gray-800">
                  Choose a Color
                </h3>
                <div className="flex flex-wrap gap-4 mt-4">
                  <button
                    type="button"
                    className="w-10 h-10 bg-black border border-white hover:border-gray-800 rounded-md shrink-0"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-gray-400 border border-white hover:border-gray-800 rounded-md shrink-0"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-orange-400 border border-white hover:border-gray-800 rounded-md shrink-0"
                  />
                  <button
                    type="button"
                    className="w-10 h-10 bg-red-400 border border-white hover:border-gray-800 rounded-md shrink-0"
                  />
                </div>
              </div> */}
              {/* <hr className="my-8" /> */}
              <div className="flex flex-wrap gap-4">
                {userInfo ? (
                  <>
                    <button
                      type="button"
                      className="min-w-[200px] px-4 py-3 bg-red-800 hover:bg-red-900 text-white text-sm font-semibold rounded-md"
                      onClick={() => {
                        dispatch(deleteProduct(id));
                        navigate("/admin/productlist");
                      }}
                    >
                      Delete Product
                    </button>
                    <Link
                      className="min-w-[200px] px-4 py-2.5 border  bg-[#ADFF2F] hover:bg-[#a8e44e] text-center text-black text-sm font-semibold rounded-md"
                      to={`/admin/updateProduct/${id}`}
                    >
                      Update Product
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="min-w-[200px] px-4 py-3 bg-gray-800 hover:bg-gray-900 text-white text-sm font-semibold rounded-md"
                    >
                      Buy now
                    </button>
                    <button
                      type="button"
                      className="min-w-[200px] px-4 py-2.5 border border-gray-800 bg-transparent hover:bg-gray-50 text-gray-800 text-sm font-semibold rounded-md"
                    >
                      Add to cart
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 max-w-4xl">
            <ul className="flex border-b">
              <li
                className={`text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all ${
                  activeTab === 1
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : ""
                } `}
                onClick={() => {
                  setActiveTab(1);
                }}
              >
                Description
              </li>
              <li
                className={`text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all ${
                  activeTab === 2
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : ""
                } `}
                onClick={() => {
                  setActiveTab(2);
                }}
              >
                Reviews
              </li>
              <li
                className={`text-gray-500 font-semibold text-sm hover:bg-gray-100 py-3 px-8 cursor-pointer transition-all ${
                  activeTab === 3
                    ? "text-gray-800 border-b-2 border-gray-800"
                    : ""
                } `}
                onClick={() => {
                  setActiveTab(3);
                }}
              >
                Write your Review
              </li>
            </ul>
            <div className="mt-8">
              {activeTab === 1 && (
                <>
                  <h3 className="text-xl font-bold text-gray-800">
                    Product Description
                  </h3>
                  <p className="text-sm text-gray-500 mt-4">{description}</p>
                </>
              )}

              {activeTab === 2 && (
                <>
                  <div>
                    {reviews.length === 0 && (
                      <p>
                        No reviews on this product , Be the first to comment 😊
                      </p>
                    )}
                  </div>
                  {allReviewsForSpecificProduct.map((review) => (
                    <Review review={review} key={review._id} />
                  ))}
                </>
              )}

              {activeTab === 3 && (
                <div>
                  {!userInfo && (
                    <Link to={"/login"}>
                      Log in here and leave your review 😊{" "}
                    </Link>
                  )}

                  <form>
                    <label
                      htmlFor="Rating"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your rating
                    </label>
                    <Rating
                      name="simple-controlled"
                      value={ratingValue}
                      precision={0.5}
                      onChange={(e) => {
                        setRatingValue(e.target.value);
                      }}
                    />
                    <label
                      htmlFor="message"
                      className="block my-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Review
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 "
                      placeholder="Write your review here..."
                      defaultValue={""}
                    />
                  </form>
                </div>
              )}
            </div>

            {/* <ul className="space-y-3 list-disc mt-6 pl-4 text-sm text-gray-500">
              <li>
                A gray t-shirt is a wardrobe essential because it is so
                versatile.
              </li>
              <li>
                Available in a wide range of sizes, from extra small to extra
                large, and even in tall and petite sizes.
              </li>
              <li>
                This is easy to care for. They can usually be machine-washed and
                dried on low heat.
              </li>
              <li>
                You can add your own designs, paintings, or embroidery to make
                it your own.
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

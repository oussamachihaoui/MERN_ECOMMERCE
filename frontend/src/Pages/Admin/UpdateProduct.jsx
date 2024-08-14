import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";
import { getAllProducts, updateProduct } from "../../Redux/apis/productSlice";
import { getAllCatagories } from "../../Redux/apis/catagorySlice";

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  // on open
  useEffect(() => {
    dispatch(getAllCatagories());
    dispatch(getAllProducts());
  }, []);
  // consts
  const { id } = useParams();
  const { allCatagories } = useSelector((state) => state.catagory);
  const { allProducts } = useSelector((state) => state.product);
  const { loading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // filter for the specific product by id

  const product = allProducts?.find((p) => p._id.toString() === id);

  //state

  const [editProduct, setEditProduct] = useState({
    productName: "",
    brand: "",
    price: "",
    quantity: "",
    description: "",
    countInStock: "",
    catagory: "",
  });
  const [uploadImg, setUploadImg] = useState(null);

  //handlers

  const handleOnChangeProduct = function (e) {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async function (e) {
    e.preventDefault();
    if (uploadImg) {
      const formData = new FormData();
      formData.append("file", uploadImg);
      formData.append("upload_preset", "oussamaCh");

      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload",
        formData,
        { withCredentials: false }
      );

      dispatch(
        updateProduct({
          id: id,
          newUpdate: { ...editProduct, photo: data.url },
        })
      );
      navigate(`/productDetails/${id}`);
    } else {
      dispatch(updateProduct({ id: id, newUpdate: { ...editProduct } }));
      navigate(`/productDetails/${id}`);
    }
  };

  return (
    <>
      <AdminMenu />
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update a product
          </h2>
          <form onSubmit={handleUpdateProduct}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="productName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  id="productName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  defaultValue={product?.productName}
                  onChange={handleOnChangeProduct}
                />
              </div>
              <div className="sm:col-span-2">
                {/* {uploadImg && (
                  <div>
                    <img src={uploadImg} alt="" />
                  </div>
                )} */}
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file_input"
                >
                  Upload Image
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none "
                  id="file_input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadImg(e.target.files[0])}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product brand"
                  required=""
                  defaultValue={product?.brand}
                  onChange={handleOnChangeProduct}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product price"
                  required=""
                  defaultValue={product?.price}
                  onChange={handleOnChangeProduct}
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  min={0}
                  name="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={1}
                  defaultValue={product?.quantity}
                  onChange={handleOnChangeProduct}
                />
              </div>

              <div>
                <label
                  htmlFor="item-weight"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  In stock
                </label>
                <input
                  type="number"
                  name="countInStock"
                  id="item-weight"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder={1}
                  required=""
                  defaultValue={product?.countInStock}
                  onChange={handleOnChangeProduct}
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  name="catagory"
                  onChange={handleOnChangeProduct}
                  value={product?.catagory._id}
                >
                  <option>... Select a category ...</option>
                  {allCatagories?.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === product?.catagory.id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={8}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your product description here ..."
                  name="description"
                  onChange={handleOnChangeProduct}
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-4 focus:ring-sky-200 dark:focus:ring-sky-900  hover:bg-gray-300/50 "
            >
              {loading ? (
                <>
                  <span>Loading</span>
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                </>
              ) : (
                "Update product"
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;

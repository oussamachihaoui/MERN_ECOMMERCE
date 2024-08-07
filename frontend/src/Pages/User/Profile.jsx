import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCredentials } from "../../Redux/apis/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);
  //consts
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [updateUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [uploadImg, setUploadImg] = useState(null);

  const [isLoading, setIsLoading] = useState(loading);

  // handlers
  const handleOnChangeInputs = function (e) {
    setUpdatedUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const { password, confirmPassword } = updateUser;

  const handleUpdateUser = async function (e) {
    e.preventDefault();
    if (uploadImg && password === confirmPassword) {
      const formData = new FormData();
      formData.append("file", uploadImg);
      formData.append("upload_preset", "oussamaCh");

      const { data } = await axios.post(
        // "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload"
        "https://api.cloudinary.com/v1_1/dpcnuiynn/image/upload?upload_preset=oussamaCh",

        formData,
        { withCredentials: false }
      );

      dispatch(updateUserCredentials({ ...updateUser, photo: data.url }));
      navigate("/");
    } else {
      if (password === confirmPassword) {
        dispatch(updateUserCredentials(updateUser));
        navigate("/");
      } else {
        toast.error("Unmatched Passwords");
      }
    }
  };

  return (
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
        <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
          <a
            href="#"
            className="flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full"
          >
            Pubic Profile
          </a>
        </div>
      </aside>
      <form
        className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4"
        onSubmit={handleUpdateUser}
      >
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-2xl font-bold sm:text-xl">
              Public Profile
            </h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center justify-around  sm:flex-row sm:space-y-0">
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-gray-600"
                  src={userInfo.photo}
                  alt="Bordered avatar"
                />
                <div className="flex flex-col space-y-5 sm:ml-8 ">
                  <input
                    type="file"
                    className="py-3.5 px-7 text-base font-medium  focus:outline-none  rounded-lg   focus:z-10 focus:ring-4 focus:ring-indigo-200 file:mr-4 file:py-2 file:px-4  file:rounded-full file:border-0
                     file:text-sm file:font-semibold  file:bg-violet-50 file:text-violet-700  hover:file:bg-violet-100 "
                    onChange={(e) => {
                      setUploadImg(e.target.files[0]);
                    }}
                    multiple
                  />
                </div>
              </div>
              <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 "
                    >
                      Your first name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your first name"
                      defaultValue={userInfo.firstName}
                      name="firstName"
                      onChange={handleOnChangeInputs}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 "
                    >
                      Your last name
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your last name"
                      defaultValue={userInfo.lastName}
                      name="lastName"
                      onChange={handleOnChangeInputs}
                    />
                  </div>
                </div>
                <div className="mb-2 sm:mb-6">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-indigo-900 "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="your.email@mail.com"
                    name="email"
                    defaultValue={userInfo.email}
                    onChange={handleOnChangeInputs}
                  />
                </div>
                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                  <div className="w-full">
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 "
                    >
                      Your new password
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Your new password"
                      name="password"
                      onChange={handleOnChangeInputs}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="last_name"
                      className="block mb-2 text-sm font-medium text-indigo-900 "
                    >
                      Confirm your password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                      placeholder="Confirm your password"
                      name="confirmPassword"
                      onChange={handleOnChangeInputs}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={loading}
                    type="submit"
                    className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                    onClick={() => {
                      setIsLoading(!isLoading);
                    }}
                  >
                    {isLoading && (
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
                    )}
                    {isLoading ? "Loading" : "Save changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;

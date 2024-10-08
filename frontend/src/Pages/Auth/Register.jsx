import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../Redux/apis/userSlice";
import toast from "react-hot-toast";

const Register = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // consts
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // state
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // handlers

  const handleChangeForm = function (e) {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // check passwords
  const { password, confirmPassword } = newUser;

  const handleSubmitNewUser = function (e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(signUp(newUser));
      navigate("/");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <>
      {/* component */}
      <div className="h-screen md:flex">
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-">
          <form className="bg-white" onSubmit={handleSubmitNewUser}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">Sign Up</h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Create your account. It’s free and only take a minute
            </p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none ring-0  focus:ring-transparent border-none"
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First name"
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none ring-0  focus:ring-transparent border-none"
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last name"
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className=" pl-2 outline-none ring-0  focus:ring-transparent border-none "
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                size={35}
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none ring-0  focus:ring-transparent border-none"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChangeForm}
                required={true}
              />
            </div>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none ring-0  focus:ring-transparent border-none"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-opacity-90 transition-colors"
            >
              Register
            </button>
            <Link
              className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:underline"
              to={"/login"}
            >
              Have an account already? Login
            </Link>
          </form>
        </div>
        <img
          className="relative overflow-hidden md:flex w-1/2  i justify-around items-center hidden  "
          src="https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </>
  );
};

export default Register;

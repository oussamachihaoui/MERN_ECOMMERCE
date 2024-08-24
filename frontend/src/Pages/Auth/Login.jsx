import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/apis/userSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  // consts
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedIn } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  //state
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  // handlers
  const handleChangeForm = function (e) {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = function (e) {
    e.preventDefault();
    dispatch(login(loginUser));
  };

  // on open
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  // UI
  return (
    <>
      {/* component */}
      <div className="h-screen md:flex">
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-">
          <form className="bg-white" onSubmit={handleSubmitForm}>
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>

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
                className=" border-none outline-none ring-0  focus:ring-transparent "
                type="email"
                name="email"
                id="email"
                placeholder="Email Address"
                size={35}
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
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
                className="outline-none ring-0 border-none focus:ring-transparent"
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChangeForm}
                required={true}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-opacity-90 transition-colors"
            >
              Login
            </button>
            <Link
              className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:underline"
              to={"/register"}
            >
              Don't have an account? Sign up
            </Link>
          </form>
        </div>
        <img
          className="relative overflow-hidden md:flex w-1/2  i justify-around items-center hidden"
          src="https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </>
  );
};

export default Login;

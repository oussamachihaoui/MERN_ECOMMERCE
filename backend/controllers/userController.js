import expressAsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";

// signUp
const registerUser = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, password, email, isAdmin, photo } = req.body;

  const userExists = await User.findOne({ email });

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill the inputs!");
  }

  if (userExists) {
    res.status(400).json({ message: "Email is already taken" });
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    isAdmin,
    photo,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
      photo: user.photo,
    });
  } else {
    res.status(400);
    throw new Error("Try again ..");
  }
});

// sign in
const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } else {
    throw new Error("Invalid Email or Password");
  }
});

// log out
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.cookie("JWT", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({
    message: "Logged out successfully",
  });
});

// update User credentials

const updateUserCredentials = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, password, photo } = req.body;
});

export { registerUser, authUser, logoutUser, updateUserCredentials };

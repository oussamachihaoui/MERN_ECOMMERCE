import expressAsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

// signUp
const registerUser = expressAsyncHandler(async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("Email is already taken");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
    });
  } else {
    throw new Error("Try again ..");
  }
});

// sign in
const authUser = expressAsyncHandler(async (req, res) => {
  res.send("auth user");
});

// log out
const logoutUser = expressAsyncHandler(async (req, res) => {
  res.send("logout user");
});

export { registerUser, authUser, logoutUser };

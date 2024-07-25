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
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).json({ message: "Invalid Email or password" });
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

  const user = await User.findOne(req.user._id);

  if (user) {
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.password = password || user.password;
    user.photo = photo || user.photo;

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      photo: updatedUser.photo,
    });
  } else {
    res.status(404);
    throw new Error("User is not found");
  }
});

// admin Actions

const getAllusers = expressAsyncHandler(async (req, res) => {
  const allUsers = await User.find({});
  res.json(allUsers);
});

const deleteUserById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cannot delete Admin");
      }

      await User.deleteOne({ _id: user._id });
      res.json({
        message: "user is deleted",
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error("User is not found");
  }
});

const getUserById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select("-password");

    if (user) {
      res.json(user);
    }
  } catch (error) {
    res.status(404).json({
      message: "user is not found",
    });
  }
});

export {
  registerUser,
  authUser,
  logoutUser,
  updateUserCredentials,
  getAllusers,
  deleteUserById,
  getUserById,
};

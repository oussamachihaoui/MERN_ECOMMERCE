import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../Models/userModel.js";

const authenticate = expressAsyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.JWT;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.secret_token);
      req.user = await User.findById(decoded.userID).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized , invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized , expired token");
  }
});

const authorizeAdmin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({
      message: "Admin authorization required",
    });
  }
});

export { authenticate, authorizeAdmin };

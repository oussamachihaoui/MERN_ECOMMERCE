// imports
import express from "express";
import dotenv from "dotenv";
import connect from "./connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import catagoryRoutes from "./routes/catagoryRoutes.js";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

//utils
dotenv.config();
connect();

// consts
const app = express();
const PORT = process.env.PORT || 8000;
app.use(
  cors({
    credentials: true,
    origin: "https://mern-ecommerce-ubak.onrender.com",
  })
);

// app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/catagory", catagoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/cart", cartRoutes);
//listen
app.listen(PORT, () => {
  console.log(`Listening On port ${PORT}`);
});

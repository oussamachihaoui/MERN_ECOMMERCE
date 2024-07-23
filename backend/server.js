// imports
import express from "express";
import dotenv from "dotenv";
import connect from "./connectDB.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
//utils
dotenv.config();
connect();

// consts
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);

//listen
app.listen(PORT, () => {
  console.log(`Listening On port ${PORT}`);
});

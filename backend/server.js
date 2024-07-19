import express from "express";
import dotenv from "dotenv";
import connect from "./connectDB.js";

dotenv.config();
connect();

// consts
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening On port ${PORT}`);
});

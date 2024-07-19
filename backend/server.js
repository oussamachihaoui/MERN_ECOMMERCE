import express from "express";
import dotenv from "dotenv";

dotenv.config();
// consts
const app = express();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening On port ${PORT}`);
});

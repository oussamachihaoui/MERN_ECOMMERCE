import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      maxLength: 32,
      require: true,
      trim: true,
    },
    photo: {
      type: String,
      default:
        "https://seetruetechnology.com/wp-content/uploads/2022/02/BG-7.jpg",
    },
  },
  { timestamps: true }
);

const Catagory = mongoose.model("Catagory", catagorySchema);

export default Catagory;

import mongoose from "mongoose";

const catagorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxLength: 32,
    require: true,
    trim: true,
  },
});

const Catagory = mongoose.model("Catagory", catagorySchema);

export default Catagory;

import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    comment: { type: String, require: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    rating: { type: Number, require: true },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    productName: { type: String, require: true },
    brand: { type: String, require: true },
    photo: { type: String, require: true },
    quantity: { type: Number, require: true, default: 0 },
    price: { type: Number, require: true, default: 0 },
    description: { type: String, require: true },
    cataogry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      require: true,
    },
    reviews: [reviewSchema],
    rating: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, require: true, default: 0 },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);
const Product = mongoose.model("Product", productSchema);

export { Review, Product };

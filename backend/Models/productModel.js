import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
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
    photo: {
      type: String,
      require: true,
      default:
        "https://mahadevfastfoodvns.websites.co.in/twenty-seventeen/img/product-placeholder.png",
    },
    quantity: { type: Number, require: true, default: 1 },
    price: { type: Number, require: true, default: 0 },
    description: { type: String, require: true },
    catagory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catagory",
      require: true,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, require: true, default: 0 },
    countInStock: { type: Number, require: true, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
export const Product = mongoose.model("Product", productSchema);

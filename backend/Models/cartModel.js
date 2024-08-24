import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product", default: [] },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

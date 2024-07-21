import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    photo: {
      type: String,
      default: "../assets/avatar/default_user_photo.webp",
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;

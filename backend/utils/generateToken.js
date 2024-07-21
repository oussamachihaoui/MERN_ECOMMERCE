import jwt from "jsonwebtoken";

const generateToken = async (res, userID) => {
  const token = jwt.sign({ userID }, process.env.secret_token, {
    expiresIn: "30d",
  });

  res.cookie("JWT", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default generateToken;

import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // MS expires in 7 days
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "developemnt",
  });

  return token;
};

import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unaithorized - No token Provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unaithorized - Invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unaithorized - User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protected middleware : ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

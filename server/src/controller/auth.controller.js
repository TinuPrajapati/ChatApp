import {cloudinary} from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";

// Signup Controller
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res.status(201).json({ message: "User created successfully", newUser });
    } else {
      return res.status(400).json({
        message: "Failed to create new user,due to invalid User data",
      });
    }
  } catch (error) {
    console.log(`Error in signup controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("u",user)
    // check user is exist or not
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log("i",isPasswordCorrect)
    // check password is correct or not
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });
    // generate token
    generateToken(user._id, res);
    console.log(res)
    res.status(200).json({ message: "User logged in successfully", user });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update Profile Route
export const updateProfile = async (req, res) => {
  try {
    const { name,email } = req.body;
    const {path,filename}= req.file;
    const id = req.user._id;

    if (!path) {
      return res
        .status(400)
        .json({ message: "Please provide profile picture" });
    }
    const user = await User.findById(id);
    if(user.filename!==""){
      await cloudinary.uploader.destroy(user.filename);
    }

    const updateUserDetails = await User.findByIdAndUpdate(
      id,
      { profile: path,name,email,filename },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully", updateUserDetails });
  } catch (error) {
    console.log(`Error in update profile controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in check auth controller: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

import { UserModel } from "../models/auth.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "All fields (username, email, password) are required",
      success: false,
    });
  }
  try {
    const emailExist = await UserModel.findOne({ email });

    if (emailExist) {
      return res
        .status(400)
        .json({ message: "Email is already registered", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    return res.status(201).json({
      message: "User has been registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
export const login = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields (email, password) are required",
      success: false,
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User do not exist", success: false });
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const result = generateToken(res, user._id);
    const { UserPassword = null, ...userWithoutPassword } = user._doc;
    return res.status(201).json({
      message: "User has been logged in successfully",
      success: true,
      userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const verify = async (req, res) => {
  try {
    return res.json({ message: "verified", user: req.user , success: true,});
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return res
        .status(400)
        .json({ message: "User was not found", success: false });
    }
    const user = await UserModel.findOne({ username }).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ message: "User was not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "user profile has been loaded", user,  success: true,});
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const id = req.user._id
    const users = await UserModel.find({_id: {$ne: {_id:id}}}).select("-password -followings");
    if (!users) {
      return res.status(400).json({ message: "No User is found ", success: false, });
    }
    return res
      .status(200)
      .json({ message: "user profile has been loaded", users, success: true, });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const followUser = async (req, res) => {
  try {
    const currentUserId = req.user._id

    const targetUserId = req.params.id;

    if (currentUserId == targetUserId) {
      return res.status(400).json({ message: "you can't follow yourself ", success: false,});
    }
    const currentUser = await UserModel.findOneAndUpdate(
      {
        _id: currentUserId,
        following: { $ne: targetUserId },
      },
      {
        $push: { following: targetUserId },
      },
      { returnDocument: true },
    );
    if (!currentUser) {
      return res
        .status(400)
        .json({ message: "you have already followed the user" , success: false});
    }
    const targetUser = await UserModel.findByIdAndUpdate(
      targetUserId,
      {
        $push: { followers: currentUserId },
      },
      { returnDocument: true },
    );

    if (!targetUser) {
      return res
        .status(400)
        .json({ message: "No user have been found" });
    }
    return res
      .status(200)
      .json({ message: "user profile has been loaded", success: true,  });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id
    const {username, imagePreview:profilePic} = req.body
    const updatedUser = await UserModel.findByIdAndUpdate(userId, {$set:{username, profilePic}}, {returnDocument: 'after'})
    return res
      .status(200)
      .json({ message: "", success:true });
  } catch (error) {
    console.error("Error in creating the post", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
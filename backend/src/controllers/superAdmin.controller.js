import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { SuperAdmin } from "../models/superAdmin.model.js";
import institutionModel from "../models/institution.model.js";

export const superAdminRegister = async (req, res) => {
  console.log("request");

  const { username, password, email, fullName, phoneNumber } = req.body;
  if (!username || !email || !password || !fullName) {
    return res.status(400).json({
      message: "All fields (username, email, password, fullName) are required",
      success: false,
    });
  }
  try {
    const emailExist = await SuperAdmin.findOne({
      $or: [{ email }, { username }],
    });
    if (emailExist) {
      const isEmailDup = emailExist.email === email;
      return res.status(400).json({
        message: isEmailDup
          ? "Email is already registered"
          : "Username is already taken",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new SuperAdmin({
      email,
      password: hashedPassword,
      username,
      fullName,
      phoneNumber,
    });

    await newUser.save();
    return res.status(201).json({
      message: "SuperAdmin has been registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const superAdminLogin = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields (email, password) are required",
      success: false,
    });
  }
  try {
    const user = await SuperAdmin.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Admin does not exist", success: false });
    }
    console.log(user);

    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
    const result = generateToken(res, user._id);
    const { password: dbPassword, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      message: "Admin has been logged in successfully",
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const superAdminVerify = async (req, res) => {
  try {
    return res.json({ message: "verified", user: req.user, success: true });
  } catch (error) {
    console.error("Verification Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const superAdminProfile = async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) {
      return res
        .status(400)
        .json({ message: "Admin email parameter is required", success: false });
    }
    const user = await SuperAdmin.findOne({ email }).select("-password");
    if (!user) {
      return res
        .status(404) // Using 404 since the user was not found
        .json({ message: "Admin was not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Admin profile has been loaded", user, success: true });
  } catch (error) {
    console.error("Profile Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const updateSuperAdminProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, phoneNumber } = req.body;

    const updatedUser = await SuperAdmin.findByIdAndUpdate(
      userId,
      { $set: { username, phoneNumber } },
      { returnDocument: "after" },
    ).select("-password");

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Error in updating the superadmin", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

export const createInstutitionAndInstitutionAdmin = async (req, res) => {
  try {
    const {
      name,
      shortName,
      email,
      address,
      logoUrl,
      establishedYear,
      website,
      status,
    } = req.body;
    const {
      fullName,
      password,
      email: institutionAdminEmail,
      address,
    } = req.body;
    if (!req.user && req.user.role != "superadmin") {
      return res.status(200).json({
        message: "Access denied! only the Super Admin can Perform this task",
        success: false,
      });
    }
    const institutionAlreadyExist = await institutionModel.findOne({ name });
    if (institutionAlreadyExist) {
      return res.status(200).json({
        message: "Institution Already Exist",
        success: false,
      });
    }
    const institution = new institutionModel({
      name,
      shortName,
      email,
      logoUrl,
      establishedYear,
      website,
      status,
      address,
    });
    await institution.save();
    return res
      .status(200)
      .json({
        message: "Institution created SuccessFully",
        user,
        success: true,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

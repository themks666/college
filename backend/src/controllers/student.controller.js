import { StudentModel } from "../models/student.model.js";

export const getAllStudents = async (req, res) => {
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



export const StudentLogin = async (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields (email, password) are required",
      success: false,
    });
  }
  try {
    const student = await StudentModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Student do not exist", success: false });
    }
    const matchedPassword = await bcrypt.compare(password, student.password);
    if (!matchedPassword) {
      return res
        .status(400)
        .json({ message: "Invalid credentials", success: false });
    }
     const token = jwt.sign({userId: student._id, role="student"}, process.env.SECRET_JWT, {expiresIn: "30d"})
    const { password = null, ...userWithoutPassword } = student._doc;
    return res.status(201).json({
      message: "Student has been logged in successfully",
      success: true,
      userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
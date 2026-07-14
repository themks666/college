import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "you haven't provided any username"],
      minLength: 3,
    },
    profilePic:{
      type:String,
    },
    bio:{
      type:String,
    },
    isVerified:{
      type:Boolean,
      default:false
    },
    email: {
      type: String,
      unique: true,
      required: [true, "you haven't provided any email"],
    },
    password: {
      type: String,
      required: [true, "you haven't provided any password"],
      minLength: 6,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);
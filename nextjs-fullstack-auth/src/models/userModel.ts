import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Provide an Username"],
    unique: [true, "Username not available please choose something else"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an Email address"],
    unique: [true, "Email allready axists"],
  },
  password: {
    type: String,
    required: [true, "Please Provide a Passqord"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    mobile: { type: String, unique: true },
    aadhar: { type: String, unique: true },
    otp: String,
    otpExpiry: Date,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    aadhar: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpiry: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },

    // Common fields
    role: {
      type: String,
      enum: ["patient", "doctor"],
      default: "patient",
      // required: true,
    },

    otp: { type: String },
    otpExpiry: { type: Date },

    // Patient specific
    aadhar: {
      type: String,
      unique: true,
      sparse: true, // only for patient
    },
    doctor: { type: String }, 
    service: { type: String },
    tokenNumber: { type: Number },
    tokenDate: { type: Date },

    // Doctor specific
    password: { type: String },
    specialization: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);

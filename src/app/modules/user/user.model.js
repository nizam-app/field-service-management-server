import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    role: {
        type: String,
        enum: ["customer", "agent", "dispatcher", "technician", "admin"],
        default: "customer",
        required: true,
    },
    isBlocked: { type: Boolean, default: false },
    commissionRate: { type: Number, default: 0 }, // for freelancer
    bonusRate: { type: Number, default: 0 }, // for internal techs
    walletBalance: { type: Number, default: 0 },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
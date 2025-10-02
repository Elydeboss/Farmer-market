import { Request, Response } from "express";
import User from "../models/user.schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../config/email";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (role === "admin") {
      return res.status(403).json({ message: "You cannot self-register as an admin" });
    }

    //  Sanitize role (allow only these on public signup)
    const allowedRoles = ["farmer", "buyer", "logistics"];
    const userRole = allowedRoles.includes(role) ? role : "buyer";
    //  Validation checks
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    //  generate OTP on register
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); 
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role : userRole,
      otp,                
      otpExpires,         
      isVerified: false   
    });

    //  send OTP by email
    await sendEmail(
      user.email,
      "Verify your Agrolink account",
      `Welcome to Agrolink! Your verification code is ${otp}. It will expire in 10 minutes.`
    );

    res.status(201).json({ message: "User registered. Please verify your email with the OTP sent." });
  } catch (error) {
    res.status(500).json({ error });
  }
};



export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || "secret", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, isVerified: user.isVerified });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// verify email using OTP
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email, otp, otpExpires: { $gt: new Date() } });
    if (!user) return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//  resend OTP
export const resendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail(
      user.email,
      "Resend Verification Code",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.json({ message: "New OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//  Create a new admin
export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isVerified: true, // admins are auto-verified
    });

    res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await user.save();

    // Send OTP by email
    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your OTP code is ${otp}. It will expire in 10 minutes.`
    );

    return res.json({ message: "OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;

    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: new Date() }, // must still be valid
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    // Clear OTP fields after use
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

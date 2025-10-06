import { Request, Response, NextFunction } from "express";
import User from "../models/user.schema";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "farmer" | "buyer" | "logistics" | "admin";
  };
}

export const ensureVerifiedFarmer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== "farmer") {
      return res.status(403).json({ message: "only farmers allowed" });
    }

    const user = await User.findById(req.user.id).select("role isVerified");
    if (!user) return res.status(401).json({ message: "user not found" });

    if (user.role !== "farmer") {
      return res.status(403).json({ message: "only farmers allowed" });
    }
    if (!user.isVerified) {
      return res.status(403).json({ message: "farmer is not verified by admin" });
    }

    next();
  } catch {
    return res.status(500).json({ message: "internal server error" });
  }
};

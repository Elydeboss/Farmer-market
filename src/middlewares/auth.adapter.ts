import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

/** roles we use across the app */
type Role = "farmer" | "buyer" | "logistics" | "admin";

declare global {
  namespace Express {
    interface UserPayload {
      id?: string;
      _id?: string;
      role: Role;
      isVerified?: boolean;
      // add extras if dev1 adds later
    }
    interface Request {
      user?: UserPayload;
    }
  }
}

const USE_STUB = process.env.USE_AUTH_STUB === "true";

let authMiddlewareReal: any;
let authorizeRolesReal: any;

if (!USE_STUB) {
  // dev1 real middleware
  // path per your repo
  const mod = require("../middleware/auth.middleware");
  authMiddlewareReal = mod.authMiddleware;
  authorizeRolesReal = mod.authorizeRoles;
}

// stub for local tests without token
function authMiddlewareStub(req: Request, res: Response, next: NextFunction) {
  const raw = req.header("x-dev-user");
  if (!raw) return res.status(401).json({ message: "no x-dev-user header, or turn off USE_AUTH_STUB" });
  try {
    req.user = JSON.parse(raw);
    next();
  } catch {
    return res.status(400).json({ message: "bad x-dev-user json" });
  }
}

function authorizeRolesStub(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const u = req.user;
    if (!u) return res.status(401).json({ message: "unauthorized" });
    if (!roles.includes(u.role)) return res.status(403).json({ message: "forbidden" });
    next();
  };
}

export const authMiddleware = USE_STUB ? authMiddlewareStub : authMiddlewareReal;
export const authorizeRoles = USE_STUB ? authorizeRolesStub : authorizeRolesReal;

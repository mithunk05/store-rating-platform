import jwt from "jsonwebtoken";
import config from "../config.js";
import { User } from "../models/index.js";

export const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findByPk(decoded.id);
    if (!req.user) throw new Error();
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};
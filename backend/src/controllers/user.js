import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { body, validationResult } from "express-validator";

// Validation schema can be moved to a separate file, shown inline for brevity

export const register = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("address").isLength({ max: 400 }),
  body("password").matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, address, password } = req.body;
    if (await User.findOne({ where: { email } }))
      return res.status(409).json({ message: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hash, role: "user" });
    res.status(201).json({ id: user.id });
  },
];

export const login = [
  body("email").isEmail(),
  body("password").exists(),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  },
];

export const updatePassword = [
  body("password").matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/),
  async (req, res) => {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.update({ password: hash }, { where: { id: req.user.id } });
    res.json({ message: "Password updated" });
  },
];

export const getProfile = async (req, res) => {
  const { id, name, email, address, role } = req.user;
  res.json({ id, name, email, address, role });
};
import { User, Store, Rating } from "../models/index.js";
import { Op } from "sequelize";
import { body, validationResult } from "express-validator";

export const dashboard = async (req, res) => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();
  res.json({ totalUsers, totalStores, totalRatings });
};

export const addUser = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("address").isLength({ max: 400 }),
  body("password").matches(/^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,16}$/),
  body("role").isIn(["admin", "user", "owner"]),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, address, password, role } = req.body;
    if (await User.findOne({ where: { email } }))
      return res.status(409).json({ message: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, address, password: hash, role });
    res.status(201).json({ id: user.id });
  },
];

export const listUsers = async (req, res) => {
  const { name, email, address, role, sort = "name", order = "ASC" } = req.query;
  let where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  if (role) where.role = role;
  const users = await User.findAll({ where, order: [[sort, order]] });
  res.json(users);
};

export const listStores = async (req, res) => {
  const { name, email, address, sort = "name", order = "ASC" } = req.query;
  let where = {};
  if (name) where.name = { [Op.like]: `%${name}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (address) where.address = { [Op.like]: `%${address}%` };
  const stores = await Store.findAll({ where, order: [[sort, order]] });
  // include average rating
  const result = await Promise.all(
    stores.map(async (store) => {
      const ratings = await Rating.findAll({ where: { storeId: store.id } });
      const avgRating =
        ratings.length
          ? (ratings.reduce((a, b) => a + b.value, 0) / ratings.length).toFixed(2)
          : "N/A";
      return { ...store.dataValues, avgRating };
    })
  );
  res.json(result);
};

export const userDetails = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) return res.status(404).json({ message: "User not found" });
  let extra = {};
  if (user.role === "owner") {
    const stores = await Store.findAll({ where: { ownerId: user.id } });
    const ratings = await Promise.all(
      stores.map(async (store) => {
        const ratings = await Rating.findAll({ where: { storeId: store.id } });
        return ratings.map((r) => r.value);
      })
    );
    const allRatings = ratings.flat();
    extra.avgRating =
      allRatings.length
        ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(2)
        : "N/A";
  }
  res.json({ ...user.dataValues, ...extra });
};
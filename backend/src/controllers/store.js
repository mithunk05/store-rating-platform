import { Store, Rating, User } from "../models/index.js";
import { Op } from "sequelize";
import { body, validationResult } from "express-validator";

export const listStores = async (req, res) => {
  // Implement sorting, filtering from query params
  const { sort = "name", order = "ASC" } = req.query;
  const stores = await Store.findAll({
    order: [[sort, order]],
    include: [{ model: Rating }],
  });
  const result = stores.map((store) => {
    const ratings = store.Ratings.map(r => r.value);
    const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : "N/A";
    return {
      id: store.id,
      name: store.name,
      address: store.address,
      avgRating,
    };
  });
  res.json(result);
};

export const searchStores = async (req, res) => {
  const { name = "", address = "" } = req.query;
  const stores = await Store.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.like]: `%${name}%` } },
        { address: { [Op.like]: `%${address}%` } },
      ],
    },
  });
  res.json(stores);
};

export const addStore = [
  body("name").isLength({ min: 20, max: 60 }),
  body("email").isEmail(),
  body("address").isLength({ max: 400 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, address, ownerId = null } = req.body;
    if (await Store.findOne({ where: { email } }))
      return res.status(409).json({ message: "Store already exists" });
    const store = await Store.create({ name, email, address, ownerId });
    res.status(201).json(store);
  },
];

export const updateStore = [
  body("name").optional().isLength({ min: 20, max: 60 }),
  body("email").optional().isEmail(),
  body("address").optional().isLength({ max: 400 }),
  async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    await Store.update(updates, { where: { id } });
    res.json({ message: "Store updated" });
  },
];

export const getStoreDetails = async (req, res) => {
  const { id } = req.params;
  const store = await Store.findByPk(id, {
    include: [{ model: Rating, include: [User] }],
  });
  if (!store) return res.status(404).json({ message: "Store not found" });
  const avgRating =
    store.Ratings.length
      ? (store.Ratings.reduce((a, b) => a + b.value, 0) / store.Ratings.length).toFixed(2)
      : "N/A";
  res.json({
    id: store.id,
    name: store.name,
    email: store.email,
    address: store.address,
    avgRating,
    ratings: store.Ratings.map((r) => ({
      id: r.id, user: r.User.name, value: r.value,
    })),
  });
};

export const getStoreUsers = async (req, res) => {
  // For owner: users who rated their store
  const { id } = req.params;
  const store = await Store.findByPk(id, {
    include: [{ model: Rating, include: [User] }],
  });
  if (!store) return res.status(404).json({ message: "Store not found" });
  res.json(
    store.Ratings.map((r) => ({
      userId: r.User.id,
      userName: r.User.name,
      userEmail: r.User.email,
      rating: r.value,
    }))
  );
};
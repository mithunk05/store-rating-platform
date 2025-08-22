import { Rating, Store } from "../models/index.js";

export const submitRating = async (req, res) => {
  const { storeId, value } = req.body;
  if (value < 1 || value > 5)
    return res.status(400).json({ message: "Rating must be 1-5" });

  let rating = await Rating.findOne({
    where: { userId: req.user.id, storeId },
  });
  if (rating)
    return res.status(409).json({ message: "Rating already submitted, use modify" });

  rating = await Rating.create({
    userId: req.user.id,
    storeId,
    value,
  });
  res.status(201).json(rating);
};

export const modifyRating = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;
  if (value < 1 || value > 5)
    return res.status(400).json({ message: "Rating must be 1-5" });
  const rating = await Rating.findByPk(id);
  if (!rating || rating.userId !== req.user.id)
    return res.status(404).json({ message: "Rating not found" });
  rating.value = value;
  await rating.save();
  res.json(rating);
};

export const getRatings = async (req, res) => {
  const { storeId } = req.params;
  const ratings = await Rating.findAll({ where: { storeId } });
  res.json(ratings);
};
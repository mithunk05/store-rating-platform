import express from "express";
import { submitRating, modifyRating, getRatings } from "../controllers/rating.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = express.Router();

router.post("/", authenticate, authorize(["user"]), submitRating);
router.put("/:id", authenticate, authorize(["user"]), modifyRating);
router.get("/:storeId", authenticate, getRatings);

export default router;
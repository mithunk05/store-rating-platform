import express from "express";
import {
  listStores, searchStores, addStore, updateStore, getStoreDetails, getStoreUsers
} from "../controllers/store.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = express.Router();

router.get("/", authenticate, listStores);
router.get("/search", authenticate, searchStores);
router.get("/:id", authenticate, getStoreDetails);
router.post("/", authenticate, authorize(["admin"]), addStore);
router.put("/:id", authenticate, authorize(["admin"]), updateStore);
// For Store Owner dashboard
router.get("/:id/ratings", authenticate, authorize(["owner"]), getStoreUsers);

export default router;
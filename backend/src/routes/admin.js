import express from "express";
import { dashboard, addUser, listUsers, listStores, userDetails } from "../controllers/admin.js";
import { authenticate, authorize } from "../middleware/auth.js";
const router = express.Router();

router.get("/dashboard", authenticate, authorize(["admin"]), dashboard);
router.post("/users", authenticate, authorize(["admin"]), addUser);
router.get("/users", authenticate, authorize(["admin"]), listUsers);
router.get("/users/:id", authenticate, authorize(["admin"]), userDetails);
router.get("/stores", authenticate, authorize(["admin"]), listStores);

export default router;
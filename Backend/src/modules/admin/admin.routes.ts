import { Router } from "express";
import { authenticate, requireRole } from "../../middleware/auth.js";
import {
  getStats,
  getUsers,
  updateUser,
  deleteUser,
  getAllBookings,
  getAllProperties,
  moderateProperty,
} from "./admin.controller.js";

const router = Router();

router.use(authenticate, requireRole("ADMIN"));

router.get("/stats", getStats);
router.get("/users", getUsers);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.get("/bookings", getAllBookings);
router.get("/properties", getAllProperties);
router.patch("/properties/:id", moderateProperty);

export default router;

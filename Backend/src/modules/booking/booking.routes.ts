import { Router } from "express";
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBooking,
  updateBookingStatus,
  getPropertyBookings,
} from "./booking.controller.js";
import { authenticate, requireRole } from "../../middleware/auth.js";

const router = Router();

router.post("/", authenticate, requireRole("CUSTOMER"), createBooking);
router.get("/", authenticate, getUserBookings);
router.get("/:id", authenticate, getBooking);
router.put("/:id", authenticate, updateBooking);
router.patch("/:id/status", authenticate, updateBookingStatus);
router.get("/property/:propertyId", authenticate, requireRole("OWNER"), getPropertyBookings);

export default router;
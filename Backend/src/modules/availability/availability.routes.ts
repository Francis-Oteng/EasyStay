import { Router } from "express";
import { getAvailability, setAvailability, setAvailabilityRange, blockDates, getCalendar } from "./availability.controller.js";
import { authenticate, requireRole } from "../../middleware/auth.js";

const router = Router();

router.get("/property/:propertyId", getAvailability);
router.get("/calendar/:propertyId", authenticate, requireRole("OWNER"), getCalendar);
router.post("/property/:propertyId", authenticate, requireRole("OWNER"), setAvailability);
router.post("/property/:propertyId/range", authenticate, requireRole("OWNER"), setAvailabilityRange);
router.post("/property/:propertyId/block", authenticate, requireRole("OWNER"), blockDates);

export default router;

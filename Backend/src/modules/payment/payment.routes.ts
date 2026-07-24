import { Router } from "express";
import { createPayment, getUserPayments, getPayment, updatePaymentStatus } from "./payment.controller.js";
import { authenticate, requireRole } from "../../middleware/auth.js";

const router = Router();

router.post("/", authenticate, requireRole("CUSTOMER"), createPayment);
router.get("/", authenticate, getUserPayments);
router.get("/:id", authenticate, getPayment);
router.patch("/:id/status", authenticate, updatePaymentStatus);

export default router;

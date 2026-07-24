import { Router } from "express";
import { handlePaymentWebhook, handleEmailWebhook } from "./webhooks.controller.js";

const router = Router();

router.post("/payment", handlePaymentWebhook);
router.post("/email", handleEmailWebhook);

export default router;

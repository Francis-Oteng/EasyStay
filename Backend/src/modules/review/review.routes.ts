import { Router } from "express";
import { getPropertyReviews, createReview, deleteReview } from "./review.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.get("/property/:propertyId", getPropertyReviews);
router.post("/", authenticate, createReview);
router.delete("/:id", authenticate, deleteReview);

export default router;
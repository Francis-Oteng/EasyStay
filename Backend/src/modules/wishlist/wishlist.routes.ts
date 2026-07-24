import { Router } from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "./wishlist.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticate, getWishlist);
router.post("/", authenticate, addToWishlist);
router.delete("/:propertyId", authenticate, removeFromWishlist);

export default router;
import { Router } from "express";
import { getProfile, updateProfile, changePassword, deactivateAccount } from "./users.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, updateProfile);
router.put("/password", authenticate, changePassword);
router.delete("/account", authenticate, deactivateAccount);

export default router;

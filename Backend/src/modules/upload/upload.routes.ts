import { Router } from "express";
import { upload, uploadImage, deleteUploadedFile } from "./upload.controller.js";
import { authenticate } from "../../middleware/auth.js";

const router = Router();

router.post("/", authenticate, upload.single("image"), uploadImage);
router.delete("/", authenticate, deleteUploadedFile);

export default router;
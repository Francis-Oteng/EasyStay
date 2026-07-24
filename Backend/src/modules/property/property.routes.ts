import { Router } from "express";
import multer from "multer";
import {
  listProperties, getMyProperties, getProperty, createProperty, updateProperty,
  deleteProperty, uploadImages, deleteImage, togglePublish, toggleFeatured,
  duplicateProperty, batchDelete, batchPublish, getPropertyStats, getNearbyProperties,
} from "./property.controller.js";
import { authenticate, requireRole } from "../../middleware/auth.js";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => { cb(null, "uploads/"); },
  filename: (_req, file, cb) => { cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`); },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  },
});

const router = Router();

router.get("/", listProperties);
router.get("/my", authenticate, requireRole("OWNER"), getMyProperties);
router.get("/nearby/:id", getNearbyProperties);
router.get("/stats/:id", authenticate, requireRole("OWNER"), getPropertyStats);
router.get("/:id", getProperty);
router.post("/", authenticate, requireRole("OWNER"), createProperty);
router.post("/batch/delete", authenticate, requireRole("OWNER"), batchDelete);
router.post("/batch/publish", authenticate, requireRole("OWNER"), batchPublish);
router.put("/:id", authenticate, requireRole("OWNER"), updateProperty);
router.delete("/:id", authenticate, requireRole("OWNER"), deleteProperty);
router.post("/:id/duplicate", authenticate, requireRole("OWNER"), duplicateProperty);
router.post("/:id/images", authenticate, requireRole("OWNER"), upload.array("images", 10), uploadImages);
router.delete("/:id/images/:imageId", authenticate, requireRole("OWNER"), deleteImage);
router.patch("/:id/publish", authenticate, requireRole("OWNER"), togglePublish);
router.patch("/:id/feature", authenticate, requireRole("OWNER"), toggleFeatured);

export default router;

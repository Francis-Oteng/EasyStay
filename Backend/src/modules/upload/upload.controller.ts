import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { AppError } from "../../middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, "../../../uploads");
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files (JPEG, PNG, GIF, WebP) are allowed", 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      throw new AppError("No file uploaded", 400);
    }

    res.status(201).json({
      success: true,
      data: {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
      message: "File uploaded successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUploadedFile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { filename } = req.body;

    if (!filename) {
      throw new AppError("Filename is required", 400);
    }

    const fs = await import("fs/promises");
    const filePath = path.join(__dirname, "../../../uploads", filename);

    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
    } catch {
      throw new AppError("File not found", 404);
    }

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
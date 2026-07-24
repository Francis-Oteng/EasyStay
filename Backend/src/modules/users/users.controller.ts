import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../config/database.js";
import { updateProfileSchema, changePasswordSchema } from "./users.schema.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        avatar: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { bookings: true, properties: true, reviews: true } },
      },
    });

    if (!user) throw new AppError("User not found", 404);
    res.json({ success: true, data: user });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateProfileSchema.parse(req.body);

    const updated = await prisma.user.update({
      where: { id: req.user!.id },
      data,
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        avatar: true,
        updatedAt: true,
      },
    });

    res.json({ success: true, data: updated, message: "Profile updated" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = changePasswordSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
    if (!user) throw new AppError("User not found", 404);

    const isCurrentValid = await bcrypt.compare(data.currentPassword, user.password);
    if (!isCurrentValid) throw new AppError("Current password is incorrect", 401);

    const hashedPassword = await bcrypt.hash(data.newPassword, 12);

    await prisma.user.update({
      where: { id: req.user!.id },
      data: { password: hashedPassword },
    });

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const deactivateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await prisma.user.update({
      where: { id: req.user!.id },
      data: { isActive: false },
    });

    res.json({ success: true, message: "Account deactivated" });
  } catch (error) {
    next(error);
  }
};

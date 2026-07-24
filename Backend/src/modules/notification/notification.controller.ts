import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: "desc" },
    });

    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.json({
      success: true,
      data: { notifications, unreadCount },
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id: req.params.id as string },
    });

    if (!notification) {
      throw new AppError("Notification not found", 404);
    }

    if (notification.userId !== req.user!.id) {
      throw new AppError("Not authorized", 403);
    }

    const updated = await prisma.notification.update({
      where: { id: req.params.id as string },
      data: { isRead: true },
    });

    res.json({
      success: true,
      data: updated,
      message: "Notification marked as read",
    });
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await prisma.notification.updateMany({
      where: { userId: req.user!.id, isRead: false },
      data: { isRead: true },
    });

    res.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    next(error);
  }
};
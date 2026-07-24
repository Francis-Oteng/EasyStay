import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getPropertyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const propertyId = req.params.propertyId as string;

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const reviews = await prisma.review.findMany({
      where: { propertyId },
      include: {
        customer: {
          select: { id: true, fullName: true, avatar: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const avgRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : null;

    res.json({
      success: true,
      data: { reviews, avgRating, total: reviews.length },
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { propertyId, rating, comment } = req.body;

    if (!propertyId || !rating || !comment) {
      throw new AppError("Property ID, rating, and comment are required", 400);
    }

    if (rating < 1 || rating > 5) {
      throw new AppError("Rating must be between 1 and 5", 400);
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const completedBooking = await prisma.booking.findFirst({
      where: {
        customerId: req.user!.id,
        propertyId,
        status: "COMPLETED",
      },
    });

    if (!completedBooking) {
      throw new AppError(
        "You can only review properties you have completed a stay at",
        403
      );
    }

    const existingReview = await prisma.review.findFirst({
      where: {
        customerId: req.user!.id,
        propertyId,
      },
    });

    if (existingReview) {
      throw new AppError("You have already reviewed this property", 409);
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        customerId: req.user!.id,
        propertyId,
      },
      include: {
        customer: {
          select: { id: true, fullName: true, avatar: true },
        },
      },
    });

    await prisma.notification.create({
      data: {
        message: `New review on ${property.name}`,
        type: "REVIEW",
        userId: property.ownerId,
      },
    });

    res.status(201).json({
      success: true,
      data: review,
      message: "Review created successfully",
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(error);
    }
  }
};

export const deleteReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const review = await prisma.review.findUnique({
      where: { id: req.params.id as string },
    });

    if (!review) {
      throw new AppError("Review not found", 404);
    }

    if (review.customerId !== req.user!.id) {
      throw new AppError("Not authorized to delete this review", 403);
    }

    await prisma.review.delete({ where: { id: req.params.id as string } });

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
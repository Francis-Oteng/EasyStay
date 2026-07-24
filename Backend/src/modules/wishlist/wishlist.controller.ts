import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const wishlist = await prisma.wishlist.findMany({
      where: { customerId: req.user!.id },
      include: {
        property: {
          include: {
            images: { take: 1, where: { isPrimary: true } },
            reviews: { select: { rating: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const data = wishlist.map((item) => {
      const avgRating =
        item.property.reviews.length > 0
          ? item.property.reviews.reduce((sum, r) => sum + r.rating, 0) /
            item.property.reviews.length
          : null;
      const { reviews, ...property } = item.property;
      return { ...item, property: { ...property, avgRating } };
    });

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { propertyId } = req.body;

    if (!propertyId) {
      throw new AppError("Property ID is required", 400);
    }

    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!property) {
      throw new AppError("Property not found", 404);
    }

    const existing = await prisma.wishlist.findUnique({
      where: {
        customerId_propertyId: {
          customerId: req.user!.id,
          propertyId,
        },
      },
    });

    if (existing) {
      throw new AppError("Property already in wishlist", 409);
    }

    const wishlistItem = await prisma.wishlist.create({
      data: {
        customerId: req.user!.id,
        propertyId,
      },
      include: {
        property: {
          include: {
            images: { take: 1, where: { isPrimary: true } },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: wishlistItem,
      message: "Added to wishlist",
    });
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(error);
    }
  }
};

export const removeFromWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const propertyId = req.params.propertyId as string;

    const existing = await prisma.wishlist.findUnique({
      where: {
        customerId_propertyId: {
          customerId: req.user!.id,
          propertyId,
        },
      },
    });

    if (!existing) {
      throw new AppError("Wishlist item not found", 404);
    }

    await prisma.wishlist.delete({
      where: {
        customerId_propertyId: {
          customerId: req.user!.id,
          propertyId,
        },
      },
    });

    res.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    next(error);
  }
};
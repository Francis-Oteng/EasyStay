import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { createPropertySchema, updatePropertySchema } from "./property.schema.js";
import { AppError } from "../../middleware/errorHandler.js";

export const listProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { city, minPrice, maxPrice, bedrooms, bathrooms, guests, amenities, search, sortBy, featured, page = "1", limit = "12" } = req.query;

    const where: Record<string, any> = { isPublished: true };

    if (city) where.city = { contains: String(city), mode: "insensitive" };
    if (minPrice) where.pricePerNight = { ...where.pricePerNight, gte: parseFloat(String(minPrice)) };
    if (maxPrice) where.pricePerNight = { ...where.pricePerNight, lte: parseFloat(String(maxPrice)) };
    if (bedrooms) where.bedrooms = { gte: parseInt(String(bedrooms)) };
    if (bathrooms) where.bathrooms = { gte: parseInt(String(bathrooms)) };
    if (guests) where.maxGuests = { gte: parseInt(String(guests)) };
    if (featured === "true") where.isFeatured = true;

    if (amenities) {
      const amenityList = String(amenities).split(",");
      where.amenities = { hasEvery: amenityList };
    }

    if (search) {
      const term = String(search);
      where.OR = [
        { name: { contains: term, mode: "insensitive" } },
        { description: { contains: term, mode: "insensitive" } },
        { city: { contains: term, mode: "insensitive" } },
        { country: { contains: term, mode: "insensitive" } },
      ];
    }

    const pageNum = Math.max(1, parseInt(String(page)));
    const limitNum = Math.min(50, Math.max(1, parseInt(String(limit))));
    const skip = (pageNum - 1) * limitNum;

    let orderBy: Record<string, any> = { createdAt: "desc" };
    if (sortBy === "price-asc") orderBy = { pricePerNight: "asc" };
    else if (sortBy === "price-desc") orderBy = { pricePerNight: "desc" };
    else if (sortBy === "rating-desc") orderBy = { createdAt: "desc" };
    else if (sortBy === "name-asc") orderBy = { name: "asc" };
    else if (sortBy === "featured") orderBy = [{ isFeatured: "desc" }, { createdAt: "desc" }];

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { take: 1, where: { isPrimary: true } },
          owner: { select: { id: true, fullName: true, avatar: true } },
          reviews: { select: { rating: true } },
          _count: { select: { bookings: { where: { status: { in: ["CONFIRMED", "COMPLETED"] } } } } },
        },
        skip,
        take: limitNum,
        orderBy,
      }),
      prisma.property.count({ where }),
    ]);

    const enriched = properties.map((p) => {
      const avgRating = p.reviews.length > 0 ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length : null;
      const { reviews, _count, ...rest } = p;
      return { ...rest, avgRating, totalBookings: _count.bookings };
    });

    res.json({
      success: true,
      data: { properties: enriched, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } },
    });
  } catch (error) {
    next(error);
  }
};

export const getMyProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const properties = await prisma.property.findMany({
      where: { ownerId: req.user!.id },
      include: {
        images: { orderBy: { isPrimary: "desc" } },
        reviews: { select: { rating: true } },
        _count: { select: { bookings: true, wishlists: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const enriched = properties.map((p) => {
      const avgRating = p.reviews.length > 0 ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length : null;
      const { reviews, _count, ...rest } = p;
      return { ...rest, avgRating, bookingCount: _count.bookings, wishlistCount: _count.wishlists };
    });

    res.json({ success: true, data: enriched });
  } catch (error) {
    next(error);
  }
};

export const getProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);

    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        images: { orderBy: { isPrimary: "desc" } },
        owner: { select: { id: true, fullName: true, email: true, phoneNumber: true, avatar: true } },
        reviews: { include: { customer: { select: { id: true, fullName: true, avatar: true } } }, orderBy: { createdAt: "desc" } },
        availabilities: { where: { isAvailable: true, date: { gte: new Date() } }, orderBy: { date: "asc" }, take: 90 },
      },
    });

    if (!property) throw new AppError("Property not found", 404);

    await prisma.property.update({ where: { id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

    const avgRating = property.reviews.length > 0 ? property.reviews.reduce((s, r) => s + r.rating, 0) / property.reviews.length : null;

    const [totalBookings, confirmedBookings, totalRevenue] = await Promise.all([
      prisma.booking.count({ where: { propertyId: id } }),
      prisma.booking.count({ where: { propertyId: id, status: { in: ["CONFIRMED", "COMPLETED"] } } }),
      prisma.payment.aggregate({
        _sum: { amount: true },
        where: { booking: { propertyId: id }, status: "COMPLETED" },
      }),
    ]);

    const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: property.reviews.filter((r) => r.rating === star).length,
    }));

    res.json({
      success: true,
      data: {
        ...property,
        avgRating,
        totalBookings,
        confirmedBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        ratingBreakdown,
      },
    });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const createProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createPropertySchema.parse(req.body);

    const property = await prisma.property.create({
      data: { ...data, ownerId: req.user!.id },
      include: { images: true, owner: { select: { id: true, fullName: true, avatar: true } } },
    });

    res.status(201).json({ success: true, data: property, message: "Property created successfully" });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const updateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized to update this property", 403);

    const data = updatePropertySchema.parse(req.body);

    const updated = await prisma.property.update({
      where: { id },
      data,
      include: { images: true, owner: { select: { id: true, fullName: true, avatar: true } } },
    });

    res.json({ success: true, data: updated, message: "Property updated successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const deleteProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized to delete this property", 403);

    await prisma.property.delete({ where: { id } });
    res.json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const uploadImages = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) throw new AppError("No images provided", 400);
    if (files.length > 10) throw new AppError("Maximum 10 images allowed", 400);

    const existingImages = await prisma.propertyImage.count({ where: { propertyId: id } });

    const images = await Promise.all(
      files.map((file, index) =>
        prisma.propertyImage.create({
          data: { url: `/uploads/${file.filename}`, publicId: file.filename, isPrimary: existingImages === 0 && index === 0, propertyId: id },
        })
      )
    );

    res.status(201).json({ success: true, data: images, message: "Images uploaded successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const deleteImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const image = await prisma.propertyImage.findUnique({ where: { id: String(req.params.imageId) }, include: { property: true } });
    if (!image) throw new AppError("Image not found", 404);
    if (image.property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    await prisma.propertyImage.delete({ where: { id: image.id } });
    res.json({ success: true, message: "Image deleted successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const togglePublish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const updated = await prisma.property.update({ where: { id }, data: { isPublished: !property.isPublished } });
    res.json({ success: true, data: updated, message: `Property ${updated.isPublished ? "published" : "unpublished"} successfully` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const toggleFeatured = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const updated = await prisma.property.update({ where: { id }, data: { isFeatured: !property.isFeatured } });
    res.json({ success: true, data: updated, message: `Property ${updated.isFeatured ? "featured" : "unfeatured"} successfully` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const duplicateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const original = await prisma.property.findUnique({ where: { id }, include: { images: true } });
    if (!original) throw new AppError("Property not found", 404);
    if (original.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const property = await prisma.property.create({
      data: {
        name: `${original.name} (Copy)`,
        description: original.description,
        category: original.category,
        address: original.address,
        city: original.city,
        country: original.country,
        pricePerNight: original.pricePerNight,
        bedrooms: original.bedrooms,
        bathrooms: original.bathrooms,
        maxGuests: original.maxGuests,
        amenities: original.amenities,
        latitude: original.latitude,
        longitude: original.longitude,
        isPublished: false,
        ownerId: req.user!.id,
      },
      include: { images: true, owner: { select: { id: true, fullName: true, avatar: true } } },
    });

    if (original.images.length > 0) {
      await prisma.propertyImage.create({
        data: { url: original.images[0].url, publicId: original.images[0].publicId, isPrimary: true, propertyId: property.id },
      });
    }

    res.status(201).json({ success: true, data: property, message: "Property duplicated successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const batchDelete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) throw new AppError("Property IDs array is required", 400);

    const result = await prisma.property.deleteMany({
      where: { id: { in: ids }, ownerId: req.user!.id },
    });

    res.json({ success: true, data: { deleted: result.count }, message: `${result.count} properties deleted` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const batchPublish = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { ids, published } = req.body;
    if (!ids || !Array.isArray(ids)) throw new AppError("Property IDs array is required", 400);

    const isPublished = published !== false;

    const result = await prisma.property.updateMany({
      where: { id: { in: ids }, ownerId: req.user!.id },
      data: { isPublished },
    });

    res.json({ success: true, data: { updated: result.count }, message: `${result.count} properties ${isPublished ? "published" : "unpublished"}` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const getPropertyStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const [totalBookings, confirmedBookings, cancelledBookings, totalRevenue, monthlyRevenue] = await Promise.all([
      prisma.booking.count({ where: { propertyId: id } }),
      prisma.booking.count({ where: { propertyId: id, status: { in: ["CONFIRMED", "COMPLETED"] } } }),
      prisma.booking.count({ where: { propertyId: id, status: "CANCELLED" } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { booking: { propertyId: id }, status: "COMPLETED" } }),
      prisma.payment.groupBy({
        by: ["createdAt"],
        _sum: { amount: true },
        where: { booking: { propertyId: id }, status: "COMPLETED", createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1) } },
      }),
    ]);

    const monthlyData = monthlyRevenue.reduce((acc: Record<string, number>, p) => {
      const month = `${p.createdAt.getFullYear()}-${String(p.createdAt.getMonth() + 1).padStart(2, "0")}`;
      acc[month] = (acc[month] || 0) + (p._sum.amount || 0);
      return acc;
    }, {});

    const occupancyRate = totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0;

    res.json({
      success: true,
      data: {
        totalBookings,
        confirmedBookings,
        cancelledBookings,
        totalRevenue: totalRevenue._sum.amount || 0,
        occupancyRate,
        viewCount: property.viewCount,
        monthlyRevenue: Object.entries(monthlyData).map(([month, revenue]) => ({ month, revenue })),
      },
    });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const getNearbyProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const property = await prisma.property.findUnique({ where: { id } });
    if (!property || !property.latitude || !property.longitude) throw new AppError("Property location not available", 404);

    const nearby = await prisma.property.findMany({
      where: {
        id: { not: id },
        isPublished: true,
        latitude: { gte: property.latitude - 0.5, lte: property.latitude + 0.5 },
        longitude: { gte: property.longitude - 0.5, lte: property.longitude + 0.5 },
      },
      include: { images: { take: 1, where: { isPrimary: true } }, reviews: { select: { rating: true } } },
      take: 6,
    });

    const enriched = nearby.map((p) => {
      const avgRating = p.reviews.length > 0 ? p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length : null;
      const { reviews, ...rest } = p;
      return { ...rest, avgRating };
    });

    res.json({ success: true, data: enriched });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

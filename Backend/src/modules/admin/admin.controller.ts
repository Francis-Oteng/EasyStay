import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const [
      totalUsers,
      totalOwners,
      totalProperties,
      publishedProperties,
      totalBookings,
      confirmedBookings,
      totalRevenue,
      recentBookings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "OWNER" } }),
      prisma.property.count(),
      prisma.property.count({ where: { isPublished: true } }),
      prisma.booking.count(),
      prisma.booking.count({ where: { status: "CONFIRMED" } }),
      prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "COMPLETED" } }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          customer: { select: { id: true, fullName: true } },
          property: { select: { id: true, name: true } },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalOwners,
          totalProperties,
          publishedProperties,
          totalBookings,
          confirmedBookings,
          totalRevenue: totalRevenue._sum.amount || 0,
        },
        recentBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { role, page = "1", limit = "20", search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: Record<string, any> = {};
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { fullName: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          fullName: true,
          email: true,
          phoneNumber: true,
          role: true,
          avatar: true,
          isActive: true,
          createdAt: true,
          _count: { select: { bookings: true, properties: true } },
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    res.json({
      success: true,
      data: { users, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { fullName, role, isActive } = req.body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError("User not found", 404);

    const data: Record<string, any> = {};
    if (fullName !== undefined) data.fullName = fullName;
    if (role !== undefined) data.role = role;
    if (isActive !== undefined) data.isActive = isActive;

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: { id: true, fullName: true, email: true, role: true, isActive: true, updatedAt: true },
    });

    res.json({ success: true, data: updated, message: "User updated" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new AppError("User not found", 404);

    await prisma.user.delete({ where: { id } });
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, page = "1", limit = "20" } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: Record<string, any> = {};
    if (status) where.status = status;

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          customer: { select: { id: true, fullName: true, email: true } },
          property: { select: { id: true, name: true, city: true } },
          payments: { select: { id: true, amount: true, status: true } },
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.booking.count({ where }),
    ]);

    res.json({
      success: true,
      data: { bookings, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProperties = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { isPublished, page = "1", limit = "20", search } = req.query;
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);

    const where: Record<string, any> = {};
    if (isPublished !== undefined) where.isPublished = isPublished === "true";
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { city: { contains: search as string, mode: "insensitive" } },
      ];
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          owner: { select: { id: true, fullName: true, email: true } },
          images: { take: 1 },
          _count: { select: { bookings: true } },
        },
        skip: (pageNum - 1) * limitNum,
        take: limitNum,
        orderBy: { createdAt: "desc" },
      }),
      prisma.property.count({ where }),
    ]);

    res.json({
      success: true,
      data: { properties, pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) } },
    });
  } catch (error) {
    next(error);
  }
};

export const moderateProperty = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { isPublished } = req.body;

    const property = await prisma.property.findUnique({ where: { id } });
    if (!property) throw new AppError("Property not found", 404);

    const updated = await prisma.property.update({
      where: { id },
      data: { isPublished },
      select: { id: true, name: true, isPublished: true },
    });

    res.json({
      success: true,
      data: updated,
      message: `Property ${isPublished ? "published" : "unpublished"}`,
    });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { createBookingSchema, updateBookingStatusSchema, updateBookingSchema } from "./booking.schema.js";
import { AppError } from "../../middleware/errorHandler.js";

export const createBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createBookingSchema.parse(req.body);

    const property = await prisma.property.findUnique({ where: { id: data.propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    if (!property.isPublished) throw new AppError("Property is not available for booking", 400);
    if (data.guests > property.maxGuests) throw new AppError(`Maximum ${property.maxGuests} guests allowed`, 400);

    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    if (checkIn >= checkOut) throw new AppError("Check-out must be after check-in", 400);
    if (checkIn < new Date()) throw new AppError("Check-in cannot be in the past", 400);

    const conflictingBooking = await prisma.booking.findFirst({
      where: {
        propertyId: data.propertyId,
        status: { in: ["PENDING", "CONFIRMED"] },
        AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
      },
    });
    if (conflictingBooking) throw new AppError("Property is not available for the selected dates", 409);

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * property.pricePerNight;

    const booking = await prisma.booking.create({
      data: {
        checkIn,
        checkOut,
        guests: data.guests,
        totalPrice,
        customerId: req.user!.id,
        propertyId: data.propertyId,
      },
      include: {
        property: { select: { id: true, name: true, city: true, pricePerNight: true } },
        customer: { select: { id: true, fullName: true, email: true } },
      },
    });

    await prisma.notification.create({
      data: {
        message: `New booking request for ${property.name}`,
        type: "BOOKING_REQUEST",
        userId: property.ownerId,
      },
    });

    res.status(201).json({ success: true, data: booking, message: "Booking created successfully" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const getUserBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user!;
    let where: Record<string, any> = {};

    if (user.role === "CUSTOMER") {
      where.customerId = user.id;
    } else if (user.role === "OWNER") {
      where.property = { ownerId: user.id };
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        property: {
          select: {
            id: true, name: true, city: true, country: true, pricePerNight: true,
            images: { take: 1, where: { isPrimary: true } },
            owner: { select: { id: true, fullName: true } },
          },
        },
        customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        payments: { select: { id: true, amount: true, status: true, method: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};

export const getBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: String(req.params.id) },
      include: {
        property: {
          select: {
            id: true, name: true, city: true, country: true, address: true, pricePerNight: true,
            images: true, owner: { select: { id: true, fullName: true, email: true } },
          },
        },
        customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        payments: { select: { id: true, amount: true, status: true, method: true, createdAt: true } },
      },
    });

    if (!booking) throw new AppError("Booking not found", 404);
    const user = req.user!;
    if (booking.customerId !== user.id && booking.property.owner.id !== user.id && user.role !== "ADMIN") {
      throw new AppError("Not authorized to view this booking", 403);
    }

    res.json({ success: true, data: booking });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const updateBookingStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateBookingStatusSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: String(req.params.id) },
      include: {
        property: true,
        payments: { where: { status: { in: ["COMPLETED", "PENDING"] } } },
      },
    });

    if (!booking) throw new AppError("Booking not found", 404);
    const user = req.user!;

    if (data.status === "CANCELLED") {
      if (booking.customerId !== user.id && booking.property.ownerId !== user.id && user.role !== "ADMIN") {
        throw new AppError("Not authorized to cancel this booking", 403);
      }

      const completedPayment = booking.payments.find((p) => p.status === "COMPLETED");
      if (completedPayment) {
        await prisma.payment.update({
          where: { id: completedPayment.id },
          data: { status: "REFUNDED", refundedAt: new Date() },
        });
      }
    } else if (data.status === "CONFIRMED" || data.status === "COMPLETED") {
      if (booking.property.ownerId !== user.id) {
        throw new AppError("Only the property owner can confirm or complete bookings", 403);
      }
    }

    const updated = await prisma.booking.update({
      where: { id: String(req.params.id) },
      data: { status: data.status },
      include: {
        property: { select: { id: true, name: true, ownerId: true } },
        customer: { select: { id: true, fullName: true } },
      },
    });

    const notificationMessage =
      data.status === "CONFIRMED" ? `Your booking for ${booking.property.name} has been confirmed`
      : data.status === "CANCELLED" ? `Booking for ${booking.property.name} has been cancelled`
      : data.status === "COMPLETED" ? `Booking for ${booking.property.name} has been completed`
      : `Booking status updated to ${data.status}`;

    const notificationUserId = user.id === booking.customerId ? booking.property.ownerId : booking.customerId;

    await prisma.notification.create({
      data: { message: notificationMessage, type: "BOOKING_UPDATE", userId: notificationUserId },
    });

    res.json({ success: true, data: updated, message: `Booking ${data.status.toLowerCase()} successfully` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updateBookingSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: String(req.params.id) },
      include: { property: true },
    });

    if (!booking) throw new AppError("Booking not found", 404);

    if (booking.customerId !== req.user!.id) {
      throw new AppError("Not authorized to update this booking", 403);
    }

    if (booking.status !== "PENDING") {
      throw new AppError("Can only update pending bookings", 400);
    }

    const updateData: Record<string, any> = {};

    if (data.checkIn) {
      const checkIn = new Date(data.checkIn);
      if (checkIn < new Date()) throw new AppError("Check-in cannot be in the past", 400);
      updateData.checkIn = checkIn;
    }

    if (data.checkOut) {
      const checkOut = new Date(data.checkOut);
      const checkIn = data.checkIn ? new Date(data.checkIn) : booking.checkIn;
      if (checkOut <= checkIn) throw new AppError("Check-out must be after check-in", 400);
      updateData.checkOut = checkOut;
    }

    if (data.guests) {
      if (data.guests > booking.property.maxGuests) {
        throw new AppError(`Maximum ${booking.property.maxGuests} guests allowed`, 400);
      }
      updateData.guests = data.guests;
    }

    if (data.checkIn || data.checkOut) {
      const checkIn = data.checkIn ? new Date(data.checkIn) : booking.checkIn;
      const checkOut = data.checkOut ? new Date(data.checkOut) : booking.checkOut;
      const conflicting = await prisma.booking.findFirst({
        where: {
          id: { not: booking.id },
          propertyId: booking.propertyId,
          status: { in: ["PENDING", "CONFIRMED"] },
          AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
        },
      });
      if (conflicting) throw new AppError("Property is not available for the selected dates", 409);

      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      updateData.totalPrice = nights * booking.property.pricePerNight;
    }

    const updated = await prisma.booking.update({
      where: { id: String(req.params.id) },
      data: updateData,
      include: {
        property: { select: { id: true, name: true, city: true, pricePerNight: true } },
        payments: { select: { id: true, amount: true, status: true } },
      },
    });

    res.json({ success: true, data: updated, message: "Booking updated" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const getPropertyBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const property = await prisma.property.findUnique({ where: { id: String(req.params.propertyId) } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const bookings = await prisma.booking.findMany({
      where: { propertyId: String(req.params.propertyId) },
      include: {
        customer: { select: { id: true, fullName: true, email: true, phoneNumber: true } },
        payments: { select: { id: true, amount: true, status: true, method: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: bookings });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

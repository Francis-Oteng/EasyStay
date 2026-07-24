import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { AppError } from "../../middleware/errorHandler.js";

export const getAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = String(req.params.propertyId);
    const { from, to } = req.query;

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new AppError("Property not found", 404);

    const where: Record<string, any> = { propertyId };
    if (from) where.date = { ...where.date, gte: new Date(String(from)) };
    if (to) where.date = { ...where.date, lte: new Date(String(to)) };

    const availabilities = await prisma.availability.findMany({
      where,
      orderBy: { date: "asc" },
    });

    const bookings = await prisma.booking.findMany({
      where: {
        propertyId,
        status: { in: ["PENDING", "CONFIRMED"] },
        ...(from && to ? { checkIn: { lt: new Date(String(to)) }, checkOut: { gt: new Date(String(from)) } } : {}),
      },
      select: { checkIn: true, checkOut: true },
    });

    res.json({ success: true, data: { availabilities, bookings } });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const setAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = String(req.params.propertyId);
    const { date, isAvailable } = req.body;

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);
    if (!date) throw new AppError("Date is required", 400);

    const availabilityDate = new Date(date);
    if (isNaN(availabilityDate.getTime())) throw new AppError("Invalid date", 400);

    const existing = await prisma.availability.findFirst({
      where: { propertyId, date: availabilityDate },
    });

    let availability;
    if (existing) {
      availability = await prisma.availability.update({
        where: { id: existing.id },
        data: { isAvailable: isAvailable !== false },
      });
    } else {
      availability = await prisma.availability.create({
        data: { propertyId, date: availabilityDate, isAvailable: isAvailable !== false },
      });
    }

    res.json({ success: true, data: availability, message: `Date marked as ${availability.isAvailable ? "available" : "unavailable"}` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const setAvailabilityRange = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = String(req.params.propertyId);
    const { startDate, endDate, isAvailable, daysOfWeek } = req.body;

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);
    if (!startDate || !endDate) throw new AppError("Start date and end date are required", 400);

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) throw new AppError("Invalid date range", 400);
    if (start > end) throw new AppError("Start date must be before end date", 400);

    const dates: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
      if (!daysOfWeek || daysOfWeek.includes(current.getDay())) {
        dates.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }

    let updated = 0;
    for (const d of dates) {
      const existing = await prisma.availability.findFirst({ where: { propertyId, date: d } });
      if (existing) {
        await prisma.availability.update({ where: { id: existing.id }, data: { isAvailable: isAvailable !== false } });
      } else {
        await prisma.availability.create({ data: { propertyId, date: d, isAvailable: isAvailable !== false } });
      }
      updated++;
    }

    res.json({ success: true, data: { updated }, message: `${updated} dates updated` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const blockDates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = String(req.params.propertyId);
    const { startDate, endDate } = req.body;

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);
    if (!startDate || !endDate) throw new AppError("Start date and end date are required", 400);

    const start = new Date(startDate);
    const end = new Date(endDate);

    const conflictingBookings = await prisma.booking.findFirst({
      where: {
        propertyId,
        status: { in: ["CONFIRMED"] },
        AND: [{ checkIn: { lt: end } }, { checkOut: { gt: start } }],
      },
    });

    if (conflictingBookings) throw new AppError("Cannot block dates with confirmed bookings", 409);

    const current = new Date(start);
    let count = 0;
    while (current <= end) {
      const existing = await prisma.availability.findFirst({ where: { propertyId, date: current } });
      if (existing) {
        await prisma.availability.update({ where: { id: existing.id }, data: { isAvailable: false } });
      } else {
        await prisma.availability.create({ data: { propertyId, date: new Date(current), isAvailable: false } });
      }
      count++;
      current.setDate(current.getDate() + 1);
    }

    res.json({ success: true, data: { blocked: count }, message: `${count} dates blocked` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const getCalendar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const propertyId = String(req.params.propertyId);

    const property = await prisma.property.findUnique({ where: { id: propertyId } });
    if (!property) throw new AppError("Property not found", 404);
    if (property.ownerId !== req.user!.id) throw new AppError("Not authorized", 403);

    const { month, year } = req.query;
    const now = new Date();
    const targetMonth = month ? parseInt(String(month)) - 1 : now.getMonth();
    const targetYear = year ? parseInt(String(year)) : now.getFullYear();

    const startOfMonth = new Date(targetYear, targetMonth, 1);
    const endOfMonth = new Date(targetYear, targetMonth + 1, 0);

    const [availabilities, bookings] = await Promise.all([
      prisma.availability.findMany({
        where: { propertyId, date: { gte: startOfMonth, lte: endOfMonth } },
        orderBy: { date: "asc" },
      }),
      prisma.booking.findMany({
        where: {
          propertyId,
          status: { in: ["PENDING", "CONFIRMED"] },
          checkIn: { lt: endOfMonth },
          checkOut: { gt: startOfMonth },
        },
        select: { checkIn: true, checkOut: true, status: true, id: true, totalPrice: true, guests: true },
      }),
    ]);

    const daysInMonth = endOfMonth.getDate();
    const calendar: Record<string, any> = {};

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(targetYear, targetMonth, day);
      const dateStr = date.toISOString().split("T")[0];

      const availability = availabilities.find(
        (a) => a.date.toISOString().split("T")[0] === dateStr
      );

      const dayBooking = bookings.find(
        (b) => b.checkIn <= date && b.checkOut > date
      );

      calendar[dateStr] = {
        date: dateStr,
        isAvailable: availability ? availability.isAvailable : true,
        isBlocked: availability ? !availability.isAvailable : false,
        hasBooking: !!dayBooking,
        bookingStatus: dayBooking?.status || null,
      };
    }

    res.json({ success: true, data: { calendar, month: targetMonth + 1, year: targetYear, propertyName: property.name } });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";
import { createPaymentSchema, updatePaymentStatusSchema } from "./payment.schema.js";
import { AppError } from "../../middleware/errorHandler.js";

export const createPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = createPaymentSchema.parse(req.body);

    const booking = await prisma.booking.findUnique({
      where: { id: data.bookingId },
      include: { payments: true },
    });

    if (!booking) throw new AppError("Booking not found", 404);

    if (booking.customerId !== req.user!.id) {
      throw new AppError("Not authorized to pay for this booking", 403);
    }

    if (booking.status !== "PENDING") {
      throw new AppError("Booking is not in a payable state", 400);
    }

    const existingPayment = await prisma.payment.findFirst({
      where: { bookingId: data.bookingId, status: { in: ["PENDING", "COMPLETED"] } },
    });

    if (existingPayment) {
      throw new AppError("Payment already exists for this booking", 409);
    }

    const payment = await prisma.payment.create({
      data: {
        amount: booking.totalPrice,
        method: data.method,
        currency: data.currency,
        description: data.description || `Payment for booking ${booking.id}`,
        bookingId: data.bookingId,
      },
      include: { booking: { include: { property: { select: { name: true } } } } },
    });

    res.status(201).json({ success: true, data: payment, message: "Payment initiated" });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

export const getUserPayments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const where: Record<string, any> = {};

    if (req.user!.role === "CUSTOMER") {
      where.booking = { customerId: req.user!.id };
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        booking: {
          select: {
            id: true,
            totalPrice: true,
            status: true,
            checkIn: true,
            checkOut: true,
            property: { select: { id: true, name: true, city: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.json({ success: true, data: payments });
  } catch (error) {
    next(error);
  }
};

export const getPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: String(req.params.id) },
      include: {
        booking: {
          include: {
            property: { select: { id: true, name: true, ownerId: true } },
            customer: { select: { id: true, fullName: true } },
          },
        },
      },
    });

    if (!payment) throw new AppError("Payment not found", 404);

    const user = req.user!;
    if (
      payment.booking.customerId !== user.id &&
      payment.booking.property.ownerId !== user.id &&
      user.role !== "ADMIN"
    ) {
      throw new AppError("Not authorized", 403);
    }

    res.json({ success: true, data: payment });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    next(error);
  }
};

export const updatePaymentStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data = updatePaymentStatusSchema.parse(req.body);

    const payment = await prisma.payment.findUnique({
      where: { id: String(req.params.id) },
      include: { booking: { include: { property: true } } },
    });

    if (!payment) throw new AppError("Payment not found", 404);

    const user = req.user!;
    if (payment.booking.property.ownerId !== user.id && user.role !== "ADMIN") {
      throw new AppError("Not authorized to update payment status", 403);
    }

    const updateData: Record<string, any> = { status: data.status };
    if (data.transactionId) updateData.transactionId = data.transactionId;
    if (data.status === "COMPLETED") updateData.paidAt = new Date();
    if (data.status === "REFUNDED") updateData.refundedAt = new Date();

    const updated = await prisma.payment.update({
      where: { id: String(req.params.id) },
      data: updateData,
      include: { booking: { select: { id: true, status: true } } },
    });

    if (data.status === "COMPLETED") {
      await prisma.booking.update({
        where: { id: payment.bookingId },
        data: { status: "CONFIRMED" },
      });

      await prisma.notification.create({
        data: {
          message: `Payment confirmed for ${payment.booking.property.name}`,
          type: "PAYMENT_CONFIRMED",
          userId: payment.booking.customerId,
        },
      });
    }

    if (data.status === "REFUNDED") {
      await prisma.notification.create({
        data: {
          message: `Refund processed for ${payment.booking.property.name}`,
          type: "PAYMENT_REFUNDED",
          userId: payment.booking.customerId,
        },
      });
    }

    res.json({ success: true, data: updated, message: `Payment ${data.status.toLowerCase()}` });
  } catch (error) {
    if (error instanceof AppError) return next(error);
    if (error instanceof Error && error.name === "ZodError") {
      res.status(400).json({ success: false, error: "Validation failed", details: (error as any).errors });
      return;
    }
    next(error);
  }
};

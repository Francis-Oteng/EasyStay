import { Request, Response, NextFunction } from "express";
import prisma from "../../config/database.js";

export const handlePaymentWebhook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { event, data } = req.body;

    await prisma.webhookEvent.create({
      data: {
        event: event || "unknown",
        source: "payment",
        payload: req.body,
      },
    });

    if (event === "payment_intent.succeeded" && data?.bookingId) {
      const payment = await prisma.payment.findFirst({
        where: { bookingId: data.bookingId },
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "COMPLETED", paidAt: new Date(), transactionId: data.transactionId },
        });

        await prisma.booking.update({
          where: { id: data.bookingId },
          data: { status: "CONFIRMED" },
        });

        await prisma.webhookEvent.updateMany({
          where: { event: event || "unknown", source: "payment" },
          data: { status: "PROCESSED", processedAt: new Date() },
        });
      }
    }

    if (event === "payment_intent.failed" && data?.bookingId) {
      await prisma.payment.updateMany({
        where: { bookingId: data.bookingId },
        data: { status: "FAILED" },
      });
    }

    res.json({ received: true });
  } catch (error) {
    await prisma.webhookEvent.updateMany({
      where: { source: "payment", status: "RECEIVED" },
      data: { status: "FAILED", error: (error as Error).message },
    }).catch(() => {});
    next(error);
  }
};

export const handleEmailWebhook = async (req: Request, res: Response): Promise<void> => {
  const { event, data } = req.body;

  await prisma.webhookEvent.create({
    data: {
      event: event || "unknown",
      source: "email",
      payload: req.body,
    },
  });

  if (event === "email.bounced" && data?.userId) {
    await prisma.user.update({
      where: { id: data.userId },
      data: { isActive: false },
    });
  }

  res.json({ received: true });
};

import { z } from "zod";

export const createPaymentSchema = z.object({
  bookingId: z.string(),
  method: z.enum(["CREDIT_CARD", "DEBIT_CARD", "PAYPAL", "STRIPE", "BANK_TRANSFER", "CASH"]),
  currency: z.string().default("USD"),
  description: z.string().optional(),
});

export const updatePaymentStatusSchema = z.object({
  status: z.enum(["COMPLETED", "FAILED", "REFUNDED"]),
  transactionId: z.string().optional(),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type UpdatePaymentStatusInput = z.infer<typeof updatePaymentStatusSchema>;

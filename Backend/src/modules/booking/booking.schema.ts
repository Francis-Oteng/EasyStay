import { z } from "zod";

export const createBookingSchema = z.object({
  propertyId: z.string(),
  checkIn: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid check-in date",
  }),
  checkOut: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid check-out date",
  }),
  guests: z.number().int().positive("Guests must be a positive integer"),
});

export const updateBookingStatusSchema = z.object({
  status: z.enum(["CONFIRMED", "CANCELLED", "COMPLETED"]),
});

export const updateBookingSchema = z.object({
  checkIn: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid check-in date" }).optional(),
  checkOut: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid check-out date" }).optional(),
  guests: z.number().int().positive("Guests must be a positive integer").optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
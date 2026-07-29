import { z } from "zod";

export const bookingSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  stayDuration: z.coerce.number().min(1, "Stay duration must be at least 1 day"),
  message: z.string().optional(),
});

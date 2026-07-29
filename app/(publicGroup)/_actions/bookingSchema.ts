import { z } from "zod";

export const bookingSchema = z.object({
  propertyId: z.string().min(1, "Property ID is required"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  startDate: z.string().min(1, "Start date is required"), 
  endDate: z.string().min(1, "End date is required"),     
});

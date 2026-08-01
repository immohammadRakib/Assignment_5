import * as z from "zod";


export const propertySchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),
  categoryId: z
    .string()
    .min(1, { message: "Please select a valid live category" }),
  pricePerDay: z
    .number({ message: "Price must be a valid number" })
    .positive({ message: "Price must be greater than ৳0" })
    .min(10, { message: "Minimum rent should be ৳10" }),
  location: z
    .string()
    .min(3, { message: "Location/Area details are required" }),
  city: z
    .string()
    .min(2, { message: "City name must be at least 2 characters" }),
  description: z
    .string()
    .min(15, { message: "Description must be at least 15 characters long to guide tenants" }),
});

export type PropertyFormData = z.infer<typeof propertySchema>;

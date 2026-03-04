import { z } from "zod";

// ---------------------------------------------------------------------------
// Product schemas
// ---------------------------------------------------------------------------

const validCategories = ["pro-series", "sparring", "bag-work"] as const;

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().nullish(),
  category: z.enum(validCategories, {
    error: "Category must be pro-series, sparring, or bag-work.",
  }),
  brand: z.string().nullish(),
  imageUrl: z.url("Invalid image URL.").nullish(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required."),
  description: z.string().nullish(),
  category: z.enum(validCategories, {
    error: "Category must be pro-series, sparring, or bag-work.",
  }),
  brand: z.string().nullish(),
  imageUrl: z.url("Invalid image URL.").nullish(),
  isActive: z.boolean(),
});

// ---------------------------------------------------------------------------
// Variant schemas
// ---------------------------------------------------------------------------

export const createVariantSchema = z.object({
  size: z.string().nullish(),
  color: z.string().nullish(),
  price: z.number().int("Price must be a whole number (in cents).").nonnegative("Price cannot be negative."),
  stock: z.number().int().nonnegative().default(0),
  weight: z.number().int().nonnegative().nullish(),
  imageUrl: z.url("Invalid image URL.").nullish(),
});

export const updateVariantSchema = z.object({
  size: z.string().nullish(),
  color: z.string().nullish(),
  price: z.number().int("Price must be a whole number (in cents).").nonnegative("Price cannot be negative."),
  stock: z.number().int().nonnegative(),
  weight: z.number().int().nonnegative().nullish(),
  imageUrl: z.url("Invalid image URL.").nullish(),
});

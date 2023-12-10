import { z } from 'zod';

// Zod schema for full name
const fullNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  lastName: z.string().min(1).max(20),
});

// Zod schema for address
const addressValidationSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
});

// Zod schema for orders
const ordersValidationSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

// Zod schema for the main user model
const createUserValidationSchema = z.object({
  userId: z.number(),
  username: z.string().min(1),
  password: z.string().min(1).max(30),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

const updateUserValidationSchema = z.object({
  userId: z.number().optional(),
  username: z.string().min(1),
  password: z.string().min(1).max(30),
  fullName: fullNameValidationSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.array(z.string().min(1)),
  address: addressValidationSchema,
  orders: z.array(ordersValidationSchema).optional(),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};

import { z } from "zod";

export const signUpValidation = z.object({
  email: z.string().email(), 
  password: z.string().min(8), 
  firstName: z.string(), 
  lastName: z.string().optional(), 
});

export const signInValidation = z.object({
    email: z.string().email(), 
    password: z.string().min(8), 
})

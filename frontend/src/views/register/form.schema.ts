import { z } from "zod";

export const schema = z.object({
  email: z.email("Not a valid email"),
  password: z.string().min(6, "At least 6 characters"),
  name: z.string().min(3, "At least 3 characters"),
  lastname: z.string().min(3, "At least 3 characters"),
});

export type RegisterFormT = z.infer<typeof schema>;

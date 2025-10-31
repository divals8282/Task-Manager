import { z } from "zod";

export const schema = z.object({
  email: z.email("Not a valid email"),
  password: z.string().min(6, "At least 6 characters"),
});

export type LoginFormT = z.infer<typeof schema>;

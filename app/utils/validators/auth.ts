import { z } from "zod";

export const registerValidator = z.object({
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  email: z.string().email(),
});

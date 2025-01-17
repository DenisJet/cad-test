import { z } from "zod";

export const formSchema = z.object({
  height: z.string().min(2).max(100),
  width: z.string().min(2).max(100),
  length: z.string().min(2).max(100),
});

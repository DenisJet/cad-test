import { z } from "zod";

export const formSchema = z.object({
  height: z.string().min(1).max(100),
  width: z.string().min(1).max(100),
  depth: z.string().min(1).max(100),
});

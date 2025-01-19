import { z } from "zod";

export const formSchema = z.object({
  height: z.string().min(1, { message: "Height is required" }),
  width: z.string().min(1, { message: "Width is required" }),
  depth: z.string().min(1, { message: "Depth is required" }),
});

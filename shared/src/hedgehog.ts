import { z } from "zod";

/**
 * Hedgehog interface shared between server and client
 */

export const hedgehogSchema = z.object({
  id: z.number(),
  name: z.string(),
  age: z.number(),
  gender: z.string()
});

export type Hedgehog = z.infer<typeof hedgehogSchema>;

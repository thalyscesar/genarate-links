import { z } from "zod";

export const NetworkSchema = z.object({
  facebook: z.string().url("URL inválida"),
  instagram: z.string().url("URL inválida"),
  youtube: z.string().url("URL inválida"),
});

export type NetworkSchemaType = z.infer<typeof NetworkSchema>;

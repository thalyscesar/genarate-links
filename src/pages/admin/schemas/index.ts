import z from "zod";

export const LinkSchema = z.object({
  linkName: z.string().nonempty("O nome do link é obrigatório"),
  linkUrl: z.string(),
  linkBackground: z.string(),
  linkColor: z.string(),
});

export type LinkSchemaType = z.infer<typeof LinkSchema>;

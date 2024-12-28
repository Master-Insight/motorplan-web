import { defineCollection, z } from "astro:content";

const planes = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
    image: z.string().optional(),
    cuotaEjemplo: z.number(),
    valorEjemplo: z.number().optional(),
  })
})

export const collections = { planes }
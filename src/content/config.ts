import { defineCollection, z } from "astro:content";

const planes = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number(),
    title: z.string(),
    subtitle: z.string().optional(),
  })
})

export const collections = { planes }
import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    section: z.enum(['intro', 'foundations', 'components', 'patterns', 'recipes']).default('intro'),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { docs };

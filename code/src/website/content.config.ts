import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ base: './docs', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    tab: z.string().optional(),
    description: z.string(),
    sort: z.int().optional()
  }),
});

export const collections = { docs };
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutorialSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  description: z.string(),
  focusKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  semanticEntities: z.array(z.string()).default([]),
  slug: z.string(),
  permalink: z.string(),
  canonicalURL: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedTime: z.string(),
  stepCount: z.number().int().positive(),
  materials: z.array(z.string()),
  featuredImage: z.string(),
  featuredImageAlt: z.string(),
  featuredImageTitle: z.string(),
  featuredImageWidth: z.number().default(1200),
  featuredImageHeight: z.number().default(800),
  stepImages: z.array(
    z.object({
      src: z.string(),
      alt: z.string(),
      title: z.string(),
      width: z.number().default(900),
      height: z.number().default(900),
    })
  ),
  worksheet: z.object({
    pdf: z.string(),
    svg: z.string(),
    preview: z.string(),
    title: z.string(),
  }),
  relatedTutorials: z.array(z.string()).default([]),
  relatedGuides: z.array(z.string()).default([]),
  faqs: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
  schemaType: z.string().default('HowTo'),
  author: z.string().default('Drawinging Editorial'),
  h1: z.string(),
  intro: z.string(),
  beforeYouStart: z.string(),
  refine: z.string(),
  shading: z.string().optional(),
  beginnerVariation: z.string(),
  detailedVariation: z.string().optional(),
  commonMistakes: z.array(z.string()),
  tips: z.array(z.string()),
  conclusion: z.string(),
  steps: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      tip: z.string(),
    })
  ),
});

const guideSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  description: z.string(),
  focusKeyword: z.string(),
  slug: z.string(),
  permalink: z.string(),
  canonicalURL: z.string(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  draft: z.boolean().default(false),
  noindex: z.boolean().default(false),
  h1: z.string(),
  relatedTutorials: z.array(z.string()).default([]),
});

const tutorials = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/tutorials' }),
  schema: tutorialSchema,
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: guideSchema,
});

export const collections = { tutorials, guides };

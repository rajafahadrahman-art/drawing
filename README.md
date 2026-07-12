# Drawinging

Premium step-by-step drawing tutorials, category collections, and printable worksheets for [drawinging.com](https://drawinging.com).

## 1. Project overview

Drawinging is a static educational content site built with Astro. It focuses on tutorials, SEO-safe keyword ownership, categories, worksheets, search, performance, and accessibility. It is **not** an online drawing tool—there is no canvas, accounts, or interactive drawing app in this phase.

## 2. Stack

- Astro (static site generation)
- Astro Content Collections (Markdown tutorials + guides)
- TypeScript where useful
- Local CSS design system
- Local SVG / WebP assets
- Sharp + PDFKit for asset generation
- Vercel static hosting

## 3. Installation

```bash
npm install
```

## 4. Local development

```bash
npm run generate:search-index
npm run dev
```

## 5. Production build

```bash
npm run build
npm run preview
```

`prebuild` generates worksheets, image placeholders, and the search index when needed.

## 6. Keyword CSV workflow

Place keyword exports at the repo root:

- `Drawing - Sheet1.csv` (primary)
- or `drawing-keywords.csv`

Planning outputs live in `/planning`:

- `keyword-master-map.csv`
- `keyword-clusters.json`
- `category-map.json`
- `content-plan.csv`
- `url-map.csv`
- `internal-link-map.json`
- `cannibalization-report.md`
- `publication-priority.md`
- `image-requirements.csv`
- `worksheet-map.csv`
- `orphan-page-report.md`

## 7. Clustering process

Do **not** create one page per keyword. Group shared-intent variants (easy/simple/step-by-step/how to) onto one primary tutorial.

Example: `rose drawing`, `easy rose drawing`, and `how to draw a rose` → `/rose-drawing/`.

## 8. Keyword ownership

- One focus keyword per indexable tutorial
- One tutorial per focus keyword
- Category hubs own collection intent (e.g. “flower drawing tutorials”)
- Tutorials own subject intent (e.g. “flower drawing”)

## 9. Cannibalization prevention

```bash
npm run validate:cannibalization
```

Detects duplicate focus keywords, permalinks, titles, H1s, descriptions, overlapping intros/FAQs, and category/tutorial conflicts.

## 10. Category management

Launch categories (public):

1. `/flower-drawings/`
2. `/animal-drawings/`
3. `/bird-drawings/`
4. `/insect-drawings/`
5. `/sea-animal-drawings/`
6. `/nature-drawings/`
7. `/vehicle-drawings/`
8. `/sports-drawings/`
9. `/seasonal-drawings/`
10. `/fantasy-drawings/`
11. `/symbol-drawings/`

A category appears in primary navigation only when it has at least three published tutorials.

## 11. Tutorial creation

Add Markdown in `src/content/tutorials/{slug}.md` using the content collection schema in `src/content.config.ts`.

Required highlights:

- exact `focusKeyword`
- exact-match `permalink`
- unique intro, steps, FAQs, tips, mistakes
- worksheet + image metadata
- related tutorials + guides

## 12. Permalink rules

Tutorials use short exact-match URLs at the site root:

- `https://drawinging.com/rose-drawing/`

Do **not** nest tutorials under category folders.

## 13. Content structure

Tutorial pages include breadcrumbs, H1, intro, summary box, featured image, TOC, materials, before-you-start, numbered steps, refine, optional shading, beginner/detailed variations, mistakes, tips, worksheet, related tutorials, FAQs, and conclusion.

## 14. Semantic entities

Add subject entities naturally in steps (petals, muzzle, wheelbase, etc.). Do not dump entity lists into visible copy.

## 15. Image placeholders

Generated under:

```text
public/images/tutorials/{slug}/{slug}.webp
public/images/tutorials/{slug}/{slug}-step-N.webp
public/images/tutorials/{slug}/{slug}-og.webp
```

## 16. Replacing dummy images

Upload final artwork using the **same filenames**. No code changes required.

## 17. Image SEO

- Featured filename/alt/title = exact focus keyword
- Step alts: `{focus keyword} step N`
- Fixed width/height, WebP, lazy-loading below the fold

## 18. Worksheet generation

```bash
npm run generate:worksheets
```

Creates PDF + SVG + preview WebP for each launch tutorial.

## 19. PDF validation

```bash
npm run validate:images
```

Confirms non-empty PDF/SVG/preview files and matching tutorial metadata.

## 20. Internal linking

Homepage → categories, popular tutorials, worksheets, learn hub  
Categories → tutorials + related categories  
Tutorials → parent category + related lessons + skill guide + worksheet  

```bash
npm run validate:links
```

## 21. Search

Static client-side search over `public/search-index.json` (titles, focus/secondary keywords, categories, difficulty, descriptions). Search UI pages are `noindex`.

## 22. SEO validation

```bash
npm run validate
npm run validate:seo
npm run validate:density
npm run validate:cannibalization
```

## 23. GitHub setup

```bash
git add .
git commit -m "Build Drawinging production site"
git push -u origin <branch>
```

## 24. Vercel deployment

- Framework: Astro
- Build command: `npm run build`
- Output: `dist`
- Config: `vercel.json`
- Domain: `drawinging.com`

## 25. Domain setup

Set the production canonical domain to `https://drawinging.com` (already configured in `astro.config.mjs` and content canonicals). Point DNS to Vercel and verify sitemap at `/sitemap-index.xml`.

## 26. Future content batches

1. Parse new CSV keywords into planning maps
2. Cluster by intent
3. Assign one focus keyword / permalink
4. Write unique tutorial content
5. Generate images + worksheets
6. Run validation suite
7. Publish only safe generic subjects (hold trademark/copyright risks)

## Scripts reference

| Command | Purpose |
|---|---|
| `npm run dev` | Local server |
| `npm run build` | Production build |
| `npm run preview` | Preview `dist` |
| `npm run generate:worksheets` | PDF/SVG/preview worksheets |
| `npm run generate:images` | Placeholder images |
| `npm run generate:search-index` | Search index |
| `npm run validate` | Full validation suite |
| `npm run validate:seo` | Titles/descriptions/canonicals |
| `npm run validate:links` | Internal links / orphans |
| `npm run validate:images` | Image + worksheet files |
| `npm run validate:density` | Focus keyword density < 1% |
| `npm run validate:cannibalization` | Ownership conflicts |

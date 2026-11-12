// Progressive step images — hand-crafted per tutorial, one cumulative layer per step.
// Runs in prebuild AFTER generate-images.mjs, so these step images replace the
// generic template ones. Artwork modules live in src/scripts/step-art/<slug>.mjs
// and export { slug, subject, captions, guides, layers, colorArt } (see kit.mjs).
// Flower is a special case: its approved pilot cards are static SVGs in
// src/scripts/step-art/flower-cards/.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { buildCards } from './step-art/kit.mjs';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const artDir = path.join(projectRoot, 'src', 'scripts', 'step-art');

const slugs = [
  'bee-drawing', 'bird-drawing', 'bunny-drawing', 'butterfly-drawing',
  'car-drawing', 'cat-drawing', 'christmas-tree-drawing', 'cloud-drawing',
  'dog-drawing', 'dolphin-drawing', 'dragon-drawing', 'eye-drawing',
  'fish-drawing', 'flower-drawing', 'fox-drawing', 'heart-drawing',
  'hibiscus-flower-drawing', 'horse-drawing', 'lion-drawing',
  'mountain-drawing', 'owl-drawing', 'plane-drawing', 'pumpkin-drawing',
  'rose-drawing', 'shark-drawing', 'snowman-drawing', 'soccer-ball-drawing',
  'star-drawing', 'sunflower-drawing', 'sunset-drawing', 'train-drawing',
  'tree-drawing', 'tulip-drawing', 'unicorn-drawing', 'volleyball-drawing',
];

let written = 0;
for (const slug of slugs) {
  const outDir = path.join(publicDir, 'images', 'tutorials', slug);
  await fs.mkdir(outDir, { recursive: true });
  if (slug === 'flower-drawing') {
    for (let i = 1; i <= 9; i++) {
      const svg = await fs.readFile(path.join(artDir, 'flower-cards', `flower-drawing-step-${i}.svg`));
      await sharp(svg).webp({ quality: 88 }).toFile(path.join(outDir, `flower-drawing-step-${i}.webp`));
      written++;
    }
    continue;
  }
  let mod;
  try {
    mod = (await import(path.join(artDir, `${slug}.mjs`))).default;
  } catch {
    console.warn(`step-art: no module for ${slug}, keeping existing images`);
    continue;
  }
  const cards = buildCards(mod);
  for (let i = 0; i < cards.length; i++) {
    await sharp(Buffer.from(cards[i])).webp({ quality: 88 }).toFile(path.join(outDir, `${slug}-step-${i + 1}.webp`));
    written++;
  }
}
console.log(`step-art: wrote ${written} progressive step images`);

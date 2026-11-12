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
import { buildCards, featuredCard } from './step-art/kit.mjs';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const artDir = path.join(projectRoot, 'src', 'scripts', 'step-art');

const metaList = JSON.parse(await fs.readFile(path.join(projectRoot, 'planning', 'launch-tutorials.json'), 'utf8'));
const meta = Object.fromEntries(metaList.map((x) => [x.slug, x]));
const titleCase = (v) => v.split(/[-\s]+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const shortSubject = (focus) => titleCase(focus.replace(/\bdrawing\b/gi, '').trim() || focus);

// Flower's colour artwork (its step cards are static SVGs; ported from the approved pilot).
function flowerColorArt() {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const petal = 'M450 357 C398 300, 400 235, 450 213 C500 235, 502 300, 450 357 Z';
  const shade = 'M450 351 C424 315, 426 285, 450 267 C474 285, 476 315, 450 351 Z';
  const fold = 'M450 343 C443 290, 444 250, 450 227';
  const rot = (d) => angles.map((a) => `<g transform="rotate(${a} 450 395)">${d}</g>`).join('');
  const dots = [[0, 0], [-20, -14], [20, -14], [-14, 16], [14, 16], [-26, 4], [26, 4], [0, -26], [0, 26]]
    .map(([dx, dy]) => `<circle cx="${450 + dx}" cy="${395 + dy}" r="4.5" fill="#8a5a00"/>`).join('');
  return `<path d="M437 447 C428 560, 428 665, 440 748 L462 748 C470 665, 470 560, 463 447 Z" fill="#8fce6e" stroke="#2e7d32" stroke-width="5" stroke-linejoin="round"/>
<g fill="#8fce6e" stroke="#2e7d32" stroke-width="5" stroke-linejoin="round"><path d="M434 648 C370 590, 310 592, 268 622 C306 668, 372 690, 436 684 Z"/><path d="M466 706 C536 652, 596 656, 636 690 C596 734, 532 752, 464 742 Z"/></g>
<g fill="none" stroke="#2e7d32" stroke-width="3.5"><path d="M432 660 C380 632, 322 624, 276 624"/><path d="M468 720 C522 692, 582 686, 626 690"/></g>
<g fill="#f9a8d4" stroke="#2b2620" stroke-width="5" stroke-linejoin="round">${rot(`<path d="${petal}"/>`)}</g>
<g fill="#db2777" opacity="0.28">${rot(`<path d="${shade}"/>`)}</g>
<g fill="none" stroke="#2b2620" stroke-width="3" opacity="0.65">${rot(`<path d="${fold}"/>`)}</g>
<circle cx="450" cy="395" r="46" fill="#ffc53d" stroke="#2b2620" stroke-width="5.5"/>${dots}`;
}

// Featured (1200x800) + OG (1200x630) images from the tutorial's own final artwork,
// replacing the shared category-template art from generate-images.mjs.
async function writeFeatured(slug, colorArt, outDir) {
  const m = meta[slug];
  if (!m || !colorArt) return;
  const common = { subject: shortSubject(m.focus), label: m.focus, art: colorArt };
  await sharp(Buffer.from(featuredCard({ ...common, badge: `${m.difficulty} step-by-step` })))
    .webp({ quality: 88 }).toFile(path.join(outDir, `${slug}.webp`));
  await sharp(Buffer.from(featuredCard({ ...common, badge: 'Drawinging tutorial', og: true })))
    .webp({ quality: 88 }).toFile(path.join(outDir, `${slug}-og.webp`));
  written += 2;
}

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
    await writeFeatured(slug, flowerColorArt(), outDir);
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
  await writeFeatured(slug, mod.colorArt, outDir);
}
console.log(`step-art: wrote ${written} progressive step + featured images`);

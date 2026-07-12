import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const tutorialsPath = path.join(projectRoot, 'planning', 'launch-tutorials.json');

const COLORS = {
  emerald: '#1F4D3A',
  charcoal: '#1C1A17',
  paper: '#F7F3EC',
  paperDark: '#E8D7B8',
  gold: '#C9974A',
  guide: '#D8C9AE',
  guideLight: '#EFE5D4',
};

const STEP_COUNTS = {
  beginner: 7,
  intermediate: 10,
  advanced: 12,
};

const CATEGORIES = [
  ['flower-drawings', 'Flower Drawings', 'flower drawing tutorials'],
  ['animal-drawings', 'Animal Drawings', 'animal drawing tutorials'],
  ['bird-drawings', 'Bird Drawings', 'bird drawing tutorials'],
  ['insect-drawings', 'Insect Drawings', 'insect drawing tutorials'],
  ['sea-animal-drawings', 'Sea Animal Drawings', 'sea animal drawing tutorials'],
  ['nature-drawings', 'Nature Drawings', 'nature drawing tutorials'],
  ['vehicle-drawings', 'Vehicle Drawings', 'vehicle drawing tutorials'],
  ['sports-drawings', 'Sports Drawings', 'sports drawing tutorials'],
  ['seasonal-drawings', 'Seasonal Drawings', 'seasonal drawing tutorials'],
  ['fantasy-drawings', 'Fantasy Drawings', 'fantasy drawing tutorials'],
  ['symbol-drawings', 'Symbol Drawings', 'symbol drawing tutorials'],
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function titleCase(value) {
  return value
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function shortSubject(focus) {
  return titleCase(focus.replace(/\bdrawing\b/gi, '').trim() || focus);
}

function hashString(value) {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  }
  return hash;
}

function guides(width, height) {
  const lines = [];
  for (let x = 120; x < width; x += 180) {
    lines.push(`<path d="M${x} 96v${height - 192}" stroke="${COLORS.guideLight}" stroke-width="2" stroke-dasharray="10 16"/>`);
  }
  for (let y = 120; y < height; y += 150) {
    lines.push(`<path d="M96 ${y}h${width - 192}" stroke="${COLORS.guideLight}" stroke-width="2" stroke-dasharray="10 16"/>`);
  }
  return lines.join('');
}

function categoryLines(category, width, height, seed = 0) {
  const cx = width * 0.58;
  const cy = height * 0.52;
  const scale = Math.min(width, height) / 800;
  const jitter = (seed % 17) - 8;

  const shapes = {
    'flower-drawings': `
      <circle cx="${cx}" cy="${cy}" r="${80 * scale}" stroke="${COLORS.gold}"/>
      <path d="M${cx} ${cy - 145 * scale}c75 ${55 * scale} 75 ${105 * scale} 0 ${145 * scale}c-75-${40 * scale}-75-${90 * scale} 0-${145 * scale}Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 145 * scale} ${cy}c55-${75 * scale} 105-${75 * scale} 145 0c-40 75-90 75-145 0Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx} ${cy + 70 * scale}v${150 * scale}" stroke="${COLORS.charcoal}"/>`,
    'animal-drawings': `
      <path d="M${cx - 150 * scale} ${cy + 35 * scale}c0-${120 * scale} ${300 * scale}-${120 * scale} ${300 * scale} 0v${40 * scale}c0 ${95 * scale}-${300 * scale} ${95 * scale}-${300 * scale} 0Z" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 95 * scale} ${cy - 70 * scale}l-${55 * scale}-${80 * scale}v${105 * scale}M${cx + 95 * scale} ${cy - 70 * scale}l${55 * scale}-${80 * scale}v${105 * scale}" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 50 * scale} ${cy + 30 * scale}h.1M${cx + 50 * scale} ${cy + 30 * scale}h.1M${cx - 45 * scale} ${cy + 82 * scale}c35 28 70 28 105 0" stroke="${COLORS.gold}"/>`,
    'bird-drawings': `
      <path d="M${cx - 230 * scale} ${cy + 40 * scale}c150-${230 * scale} 360-${230 * scale} 455-${70 * scale}c-155-15-250 55-300 160" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 220 * scale} ${cy + 45 * scale}c120-55 245-25 345 90c-145 80-285 50-345-90Z" stroke="${COLORS.charcoal}"/>
      <path d="M${cx + 160 * scale} ${cy - 65 * scale}l${85 * scale}-${25 * scale}-${48 * scale} ${70 * scale}" stroke="${COLORS.gold}"/>`,
    'insect-drawings': `
      <path d="M${cx - 25 * scale} ${cy - 35 * scale}c-120-${160 * scale}-${250 * scale}-${125 * scale}-${230 * scale} 20c115 65 195 58 230-20Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx + 25 * scale} ${cy - 35 * scale}c120-${160 * scale} 250-${125 * scale} 230 20c-115 65-195 58-230-20Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx} ${cy - 110 * scale}v${270 * scale}M${cx - 70 * scale} ${cy + 70 * scale}h${140 * scale}" stroke="${COLORS.charcoal}"/>`,
    'sea-animal-drawings': `
      <path d="M${cx - 300 * scale} ${cy}c170-${165 * scale} 390-${150 * scale} 520-${20 * scale}l110-${75 * scale}v${180 * scale}l-110-${70 * scale}c-155 125-365 125-520-15Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 70 * scale} ${cy - 80 * scale}c-60-${95 * scale}-${140 * scale}-${130 * scale}-${220 * scale}-${85 * scale}c45 75 110 105 200 105" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 280 * scale} ${cy + 190 * scale}c105-45 210-45 315 0s210 45 315 0" stroke="${COLORS.gold}"/>`,
    'nature-drawings': `
      <path d="M${cx - 360 * scale} ${cy + 175 * scale}h${720 * scale}" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 315 * scale} ${cy + 175 * scale}l${170 * scale}-${250 * scale}l${150 * scale} ${190 * scale}l${90 * scale}-${120 * scale}l${190 * scale} ${180 * scale}" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 295 * scale} ${cy - 190 * scale}c85-70 175-55 230 25c75-65 165-48 230 20" stroke="${COLORS.gold}"/>`,
    'vehicle-drawings': `
      <path d="M${cx - 310 * scale} ${cy + 70 * scale}h${620 * scale}l-${55 * scale}-${170 * scale}c-15-${45 * scale}-${55 * scale}-${72 * scale}-${110 * scale}-${72 * scale}h-${210 * scale}c-55 0-95 27-115 75l-70 167Z" stroke="${COLORS.emerald}"/>
      <circle cx="${cx - 170 * scale}" cy="${cy + 110 * scale}" r="${58 * scale}" stroke="${COLORS.charcoal}"/>
      <circle cx="${cx + 170 * scale}" cy="${cy + 110 * scale}" r="${58 * scale}" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 180 * scale} ${cy - 78 * scale}h${290 * scale}" stroke="${COLORS.gold}"/>`,
    'sports-drawings': `
      <circle cx="${cx}" cy="${cy}" r="${230 * scale}" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 170 * scale} ${cy - 165 * scale}c120 125 285 135 410 25M${cx - 210 * scale} ${cy + 60 * scale}c155-55 325 20 450 160" stroke="${COLORS.emerald}"/>
      <path d="M${cx} ${cy - 230 * scale}c-65 150-65 310 0 460" stroke="${COLORS.gold}"/>`,
    'seasonal-drawings': `
      <path d="M${cx} ${cy - 250 * scale}l${70 * scale} ${155 * scale}l${170 * scale} 25l-120 118l28 170l-148-82l-148 82l28-170l-120-118l170-25l70-155Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 100 * scale} ${cy + 195 * scale}c70 35 140 35 210 0" stroke="${COLORS.charcoal}"/>
      <path d="M${cx - 70 * scale} ${cy + 55 * scale}c55 32 105 32 160 0" stroke="${COLORS.gold}"/>`,
    'fantasy-drawings': `
      <path d="M${cx - 250 * scale} ${cy + 185 * scale}c30-${250 * scale} 180-${405 * scale} 430-${500 * scale}c-55 120-15 205 110 275c-170 10-265 90-300 255" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 180 * scale} ${cy + 155 * scale}c125-45 260-15 405 80" stroke="${COLORS.charcoal}"/>
      <path d="M${cx + 170 * scale} ${cy - 315 * scale}l${90 * scale}-${80 * scale}l-${35 * scale} ${115 * scale}" stroke="${COLORS.gold}"/>`,
    'symbol-drawings': `
      <path d="M${cx} ${cy + 210 * scale}s-${280 * scale}-${165 * scale}-${280 * scale}-${355 * scale}c0-95 70-160 160-160c58 0 100 28 120 70c20-42 62-70 120-70c90 0 160 65 160 160c0 190-280 355-280 355Z" stroke="${COLORS.emerald}"/>
      <path d="M${cx - 130 * scale} ${cy - 10 * scale}l90 80l205-220" stroke="${COLORS.gold}"/>
      <path d="M${cx - 250 * scale} ${cy + 250 * scale}h${500 * scale}" stroke="${COLORS.charcoal}"/>`,
  };

  return `
    <g fill="none" stroke-width="${Math.max(4, 7 * scale)}" stroke-linecap="round" stroke-linejoin="round" opacity="0.9" transform="translate(${jitter} 0)">
      ${shapes[category] ?? shapes['symbol-drawings']}
    </g>`;
}

function frame(width, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${COLORS.paper}"/>
  <rect x="34" y="34" width="${width - 68}" height="${height - 68}" rx="42" fill="none" stroke="${COLORS.paperDark}" stroke-width="3"/>
  ${guides(width, height)}
  ${body}
</svg>`;
}

function featuredSvg(tutorial, width, height, variant = 'featured') {
  const seed = hashString(`${tutorial.slug}:${variant}`);
  const subject = escapeXml(shortSubject(tutorial.focus));
  const label = escapeXml(tutorial.focus);
  const badge = variant === 'og' ? 'Drawinging tutorial' : `${tutorial.difficulty} step-by-step`;
  const categoryArt = categoryLines(tutorial.category, width, height, seed);

  return frame(
    width,
    height,
    `
    <path d="M86 ${height - 135}c170-80 340-78 512 6s335 82 516-20" fill="none" stroke="${COLORS.paperDark}" stroke-width="10" stroke-linecap="round" opacity="0.55"/>
    ${categoryArt}
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="118" font-size="26" font-weight="700" fill="${COLORS.emerald}" letter-spacing="5">DRAWINGING</text>
      <text x="84" y="192" font-size="${variant === 'og' ? 64 : 70}" font-weight="800" fill="${COLORS.charcoal}">${subject}</text>
      <text x="88" y="${variant === 'og' ? 250 : 260}" font-size="30" fill="${COLORS.emerald}">${escapeXml(badge)}</text>
      <rect x="84" y="${height - 150}" width="${Math.min(500, width - 168)}" height="62" rx="31" fill="#FFFFFF" opacity="0.75" stroke="${COLORS.paperDark}" stroke-width="2"/>
      <text x="116" y="${height - 110}" font-size="24" fill="${COLORS.charcoal}">${label}</text>
    </g>`,
  );
}

function stepSvg(tutorial, stepNumber, stepCount) {
  const width = 900;
  const height = 900;
  const seed = hashString(`${tutorial.slug}:step:${stepNumber}`);
  const subject = escapeXml(shortSubject(tutorial.focus));
  const progress = Math.round((stepNumber / stepCount) * 100);
  const opacity = 0.24 + stepNumber / stepCount * 0.62;

  return frame(
    width,
    height,
    `
    <g transform="translate(0 10)">
      <circle cx="450" cy="438" r="${170 + stepNumber * 8}" fill="none" stroke="${COLORS.guide}" stroke-width="3" stroke-dasharray="14 18"/>
      <path d="M250 ${580 - stepNumber * 6}c115-${150 + stepNumber * 7} 285-${155 + stepNumber * 5} 405 0" fill="none" stroke="${COLORS.guide}" stroke-width="4" stroke-dasharray="12 16"/>
      <g opacity="${opacity.toFixed(2)}">${categoryLines(tutorial.category, width, height, seed)}</g>
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="74" y="104" font-size="24" font-weight="700" fill="${COLORS.emerald}" letter-spacing="4">DRAWINGING</text>
      <text x="74" y="168" font-size="52" font-weight="800" fill="${COLORS.charcoal}">${subject}</text>
      <text x="74" y="218" font-size="28" fill="${COLORS.emerald}">Step ${stepNumber} of ${stepCount}</text>
      <rect x="74" y="764" width="752" height="54" rx="27" fill="#FFFFFF" opacity="0.8" stroke="${COLORS.paperDark}" stroke-width="2"/>
      <rect x="74" y="764" width="${Math.max(44, Math.round(752 * progress / 100))}" height="54" rx="27" fill="${COLORS.paperDark}" opacity="0.72"/>
      <text x="104" y="799" font-size="22" fill="${COLORS.charcoal}">Add one clear shape at a time - ${escapeXml(tutorial.focus)}</text>
    </g>`,
  );
}

function heroSvg() {
  const width = 1200;
  const height = 960;

  return frame(
    width,
    height,
    `
    <g transform="translate(170 170)" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M265 38c285 28 465 175 465 392 0 229-181 367-465 397" stroke="${COLORS.emerald}" stroke-width="22"/>
      <path d="M260 44v770" stroke="${COLORS.charcoal}" stroke-width="22"/>
      <path d="M260 44 170 175l90 62 90-62-90-131Z" fill="${COLORS.paperDark}" stroke="${COLORS.charcoal}" stroke-width="10"/>
      <path d="M205 160 260 44l55 116" fill="${COLORS.charcoal}" stroke="none"/>
      <path d="M385 630c138-34 245-100 316-202" stroke="${COLORS.gold}" stroke-width="12"/>
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="120" font-size="28" font-weight="700" fill="${COLORS.emerald}" letter-spacing="5">DRAWINGING</text>
      <text x="84" y="785" font-size="58" font-weight="800" fill="${COLORS.charcoal}">Learn to draw, one clear step at a time</text>
      <text x="88" y="840" font-size="30" fill="${COLORS.emerald}">Premium tutorials, printable worksheets, warm paper practice</text>
    </g>`,
  );
}

function categorySvg(id, name, focus) {
  const width = 1200;
  const height = 800;
  const subjectCount = String(focus);

  return frame(
    width,
    height,
    `
    <path d="M88 640c170-80 340-78 512 6s335 82 516-20" fill="none" stroke="${COLORS.paperDark}" stroke-width="10" stroke-linecap="round" opacity="0.55"/>
    ${categoryLines(id, width, height, hashString(id))}
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="118" font-size="26" font-weight="700" fill="${COLORS.emerald}" letter-spacing="5">DRAWINGING CATEGORY</text>
      <text x="84" y="198" font-size="70" font-weight="800" fill="${COLORS.charcoal}">${escapeXml(name)}</text>
      <text x="88" y="258" font-size="30" fill="${COLORS.emerald}">${escapeXml(subjectCount)}</text>
    </g>`,
  );
}

async function renderWebp(svg, outputPath, quality = 72) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

const PREMIUM_ASSET_SLUGS = new Set([
  'flower-drawing',
  'cat-drawing',
  'butterfly-drawing',
  'dog-drawing',
  'eye-drawing',
  'rose-drawing',
]);

const tutorials = JSON.parse(await fs.readFile(tutorialsPath, 'utf8'));
let tutorialImages = 0;

for (const tutorial of tutorials) {
  if (PREMIUM_ASSET_SLUGS.has(tutorial.slug)) {
    continue;
  }

  const tutorialDir = path.join(publicDir, 'images', 'tutorials', tutorial.slug);
  const stepCount = STEP_COUNTS[tutorial.difficulty] ?? STEP_COUNTS.beginner;

  await renderWebp(featuredSvg(tutorial, 1200, 800), path.join(tutorialDir, `${tutorial.slug}.webp`));
  await renderWebp(featuredSvg(tutorial, 1200, 630, 'og'), path.join(tutorialDir, `${tutorial.slug}-og.webp`));
  tutorialImages += 2;

  for (let step = 1; step <= stepCount; step += 1) {
    await renderWebp(stepSvg(tutorial, step, stepCount), path.join(tutorialDir, `${tutorial.slug}-step-${step}.webp`), 70);
    tutorialImages += 1;
  }
}

await renderWebp(heroSvg(), path.join(publicDir, 'images', 'homepage', 'hero-illustration.webp'), 74);

let categoryImages = 0;
for (const [id, name, focus] of CATEGORIES) {
  await renderWebp(categorySvg(id, name, focus), path.join(publicDir, 'images', 'categories', `${id}.webp`), 72);
  categoryImages += 1;
}

console.log(`generated ${tutorialImages} tutorial images for ${tutorials.length} tutorials`);
console.log('generated 1 homepage hero image');
console.log(`generated ${categoryImages} category cover images`);

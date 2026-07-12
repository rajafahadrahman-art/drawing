import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const tutorialsPath = path.join(projectRoot, 'planning', 'launch-tutorials.json');
const worksheetDir = path.join(publicDir, 'worksheets');
const previewDir = path.join(worksheetDir, 'previews');

const PAGE = {
  width: 794,
  height: 1123,
};

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

function titleFromFocus(focus) {
  return titleCase(focus);
}

function worksheetSketchSvg(category, cx, cy, scale = 1) {
  const s = scale;
  const sketches = {
    'flower-drawings': `
      <circle cx="${cx}" cy="${cy}" r="${18 * s}"/>
      <path d="M${cx} ${cy - 58 * s}c35 22 35 48 0 76c-35-28-35-54 0-76Z"/>
      <path d="M${cx - 58 * s} ${cy}c22-35 48-35 76 0c-28 35-54 35-76 0Z"/>
      <path d="M${cx} ${cy + 18 * s}v${85 * s}M${cx} ${cy + 70 * s}c35-7 58-27 70-58"/>`,
    'animal-drawings': `
      <path d="M${cx - 75 * s} ${cy - 8 * s}c0-60 150-60 150 0v45c0 50-150 50-150 0Z"/>
      <path d="M${cx - 48 * s} ${cy - 50 * s}l-35-55v68M${cx + 48 * s} ${cy - 50 * s}l35-55v68"/>
      <path d="M${cx - 28 * s} ${cy + 15 * s}h.1M${cx + 28 * s} ${cy + 15 * s}h.1M${cx - 28 * s} ${cy + 55 * s}c22 18 56 18 78 0"/>`,
    'bird-drawings': `
      <path d="M${cx - 110 * s} ${cy + 10 * s}c80-120 210-115 275-30c-90 0-150 38-185 115"/>
      <path d="M${cx - 110 * s} ${cy + 10 * s}c65-25 135-8 205 65c-85 45-160 25-205-65Z"/>
      <path d="M${cx + 85 * s} ${cy - 40 * s}l50-16l-28 40M${cx - 38 * s} ${cy + 76 * s}v40M${cx + 8 * s} ${cy + 78 * s}v40"/>`,
    'insect-drawings': `
      <path d="M${cx - 12 * s} ${cy - 28 * s}c-72-90-145-70-138 18c68 42 116 34 138-18Z"/>
      <path d="M${cx + 12 * s} ${cy - 28 * s}c72-90 145-70 138 18c-68 42-116 34-138-18Z"/>
      <path d="M${cx} ${cy - 82 * s}v${190 * s}M${cx - 42 * s} ${cy + 18 * s}h${84 * s}"/>`,
    'sea-animal-drawings': `
      <path d="M${cx - 150 * s} ${cy}c90-85 205-78 278-10l55-38v92l-55-34c-82 65-190 60-278-10Z"/>
      <path d="M${cx - 28 * s} ${cy - 42 * s}c-42-58-88-70-142-38c28 45 70 58 130 58"/>
      <path d="M${cx - 130 * s} ${cy + 96 * s}c55-25 110-25 165 0s110 25 165 0"/>`,
    'nature-drawings': `
      <path d="M${cx - 175 * s} ${cy + 90 * s}h${350 * s}"/>
      <path d="M${cx - 155 * s} ${cy + 90 * s}l88-130l78 100l45-62l112 132"/>
      <path d="M${cx - 145 * s} ${cy - 125 * s}c42-35 85-28 115 12c38-32 85-24 118 10"/>`,
    'vehicle-drawings': `
      <path d="M${cx - 160 * s} ${cy + 35 * s}h${320 * s}l-30-88c-10-28-30-42-62-42H${cx - 42 * s}c-32 0-55 14-68 42l-42 88Z"/>
      <circle cx="${cx - 88 * s}" cy="${cy + 58 * s}" r="${30 * s}"/>
      <circle cx="${cx + 88 * s}" cy="${cy + 58 * s}" r="${30 * s}"/>
      <path d="M${cx - 80 * s} ${cy - 38 * s}h${150 * s}"/>`,
    'sports-drawings': `
      <circle cx="${cx}" cy="${cy}" r="${118 * s}"/>
      <path d="M${cx - 82 * s} ${cy - 85 * s}c65 68 148 70 215 12M${cx - 105 * s} ${cy + 25 * s}c78-30 165 10 228 82"/>
      <path d="M${cx} ${cy - 118 * s}c-34 75-34 160 0 236"/>`,
    'seasonal-drawings': `
      <path d="M${cx} ${cy - 130 * s}l38 82l92 14l-65 64l15 92l-80-45l-80 45l15-92l-65-64l92-14l38-82Z"/>
      <path d="M${cx - 55 * s} ${cy + 90 * s}c40 18 80 18 120 0"/>`,
    'fantasy-drawings': `
      <path d="M${cx - 135 * s} ${cy + 96 * s}c18-130 95-214 225-260c-25 68-5 112 65 150c-88 8-138 50-158 142"/>
      <path d="M${cx - 95 * s} ${cy + 78 * s}c70-28 145-8 225 45M${cx + 62 * s} ${cy - 160 * s}l58-42l-22 70"/>`,
    'symbol-drawings': `
      <path d="M${cx} ${cy + 122 * s}s-148-88-148-188c0-55 40-88 88-88c30 0 50 15 60 38c10-23 30-38 60-38c48 0 88 33 88 88c0 100-148 188-148 188Z"/>
      <path d="M${cx - 62 * s} ${cy - 15 * s}l45 42l110-118"/>`,
  };

  return `<g fill="none" stroke="#111111" stroke-width="${2.6 * s}" stroke-linecap="round" stroke-linejoin="round">${sketches[category] ?? sketches['symbol-drawings']}</g>`;
}

function gridSvg(x, y, width, height, spacing = 24) {
  const lines = [];
  for (let px = x + spacing; px < x + width; px += spacing) {
    lines.push(`<path d="M${px} ${y}v${height}" stroke="#D6D6D6" stroke-width="1"/>`);
  }
  for (let py = y + spacing; py < y + height; py += spacing) {
    lines.push(`<path d="M${x} ${py}h${width}" stroke="#D6D6D6" stroke-width="1"/>`);
  }
  return lines.join('');
}

function worksheetSvg(tutorial) {
  const title = titleFromFocus(tutorial.focus);
  const materials = 'Pencil, eraser, black marker, coloring tools';
  const stepBoxes = Array.from({ length: 6 }, (_, index) => {
    const step = index + 1;
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 54 + col * 228;
    const y = 230 + row * 128;
    return `
      <rect x="${x}" y="${y}" width="204" height="104" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
      <text x="${x + 16}" y="${y + 30}" font-size="18" font-weight="700" fill="#111111">Step ${step}</text>
      <path d="M${x + 24} ${y + 68}c38-30 86-32 136 0" fill="none" stroke="#777777" stroke-width="2" stroke-dasharray="8 8"/>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PAGE.width}" height="${PAGE.height}" viewBox="0 0 ${PAGE.width} ${PAGE.height}">
  <rect width="${PAGE.width}" height="${PAGE.height}" fill="#FFFFFF"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="54" y="56" font-size="24" font-weight="700" fill="#111111">Drawinging</text>
    <text x="54" y="100" font-size="34" font-weight="800" fill="#111111">${escapeXml(title)} Worksheet</text>
    <text x="54" y="134" font-size="16" fill="#111111">Difficulty: ${escapeXml(tutorial.difficulty)}  |  Materials: ${escapeXml(materials)}</text>
    <path d="M54 160h686" stroke="#111111" stroke-width="2"/>
    <text x="54" y="204" font-size="20" font-weight="700" fill="#111111">Numbered step boxes</text>
    ${stepBoxes}
    <text x="54" y="516" font-size="20" font-weight="700" fill="#111111">Tracing area</text>
    <rect x="54" y="536" width="320" height="252" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    <path d="M74 662h280M214 556v212" stroke="#D6D6D6" stroke-width="1.4" stroke-dasharray="8 8"/>
    ${worksheetSketchSvg(tutorial.category, 214, 650, 0.78)}
    <text x="420" y="516" font-size="20" font-weight="700" fill="#111111">Blank practice area</text>
    <rect x="420" y="536" width="320" height="252" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    ${gridSvg(420, 536, 320, 252, 24)}
    <text x="54" y="836" font-size="20" font-weight="700" fill="#111111">Practice notes</text>
    <rect x="54" y="858" width="686" height="178" rx="14" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    <path d="M78 908h638M78 952h638M78 996h638" stroke="#BBBBBB" stroke-width="1.2"/>
    <text x="54" y="1082" font-size="14" fill="#111111">drawinging.com</text>
    <text x="560" y="1082" font-size="14" fill="#111111">Print, trace, and draw again.</text>
  </g>
</svg>`;
}

function drawGridPdf(doc, x, y, width, height, spacing = 18) {
  doc.save().strokeColor('#D0D0D0').lineWidth(0.5);
  for (let px = x + spacing; px < x + width; px += spacing) {
    doc.moveTo(px, y).lineTo(px, y + height).stroke();
  }
  for (let py = y + spacing; py < y + height; py += spacing) {
    doc.moveTo(x, py).lineTo(x + width, py).stroke();
  }
  doc.restore();
}

function drawWorksheetSketchPdf(doc, category, cx, cy, scale = 1) {
  const s = scale;
  doc.save().strokeColor('#111111').lineWidth(1.2 * s);

  switch (category) {
    case 'flower-drawings':
      doc.circle(cx, cy, 10 * s).stroke();
      doc.bezierCurveTo(cx, cy - 32 * s, cx + 38 * s, cy - 18 * s, cx, cy + 34 * s).stroke();
      doc.moveTo(cx, cy - 32 * s).bezierCurveTo(cx - 38 * s, cy - 18 * s, cx - 32 * s, cy + 24 * s, cx, cy + 34 * s).stroke();
      doc.moveTo(cx, cy + 12 * s).lineTo(cx, cy + 62 * s).stroke();
      break;
    case 'vehicle-drawings':
      doc.roundedRect(cx - 82 * s, cy - 8 * s, 164 * s, 42 * s, 5 * s).stroke();
      doc.moveTo(cx - 62 * s, cy - 8 * s).lineTo(cx - 35 * s, cy - 42 * s).lineTo(cx + 40 * s, cy - 42 * s).lineTo(cx + 64 * s, cy - 8 * s).stroke();
      doc.circle(cx - 48 * s, cy + 36 * s, 16 * s).stroke();
      doc.circle(cx + 50 * s, cy + 36 * s, 16 * s).stroke();
      break;
    case 'sports-drawings':
      doc.circle(cx, cy, 64 * s).stroke();
      doc.moveTo(cx - 50 * s, cy - 48 * s).bezierCurveTo(cx, cy - 12 * s, cx + 45 * s, cy - 15 * s, cx + 72 * s, cy - 42 * s).stroke();
      doc.moveTo(cx - 55 * s, cy + 22 * s).bezierCurveTo(cx, cy, cx + 50 * s, cy + 20 * s, cx + 68 * s, cy + 58 * s).stroke();
      break;
    case 'symbol-drawings':
      doc.moveTo(cx, cy + 72 * s)
        .bezierCurveTo(cx - 90 * s, cy + 20 * s, cx - 78 * s, cy - 72 * s, cx - 25 * s, cy - 54 * s)
        .bezierCurveTo(cx - 10 * s, cy - 48 * s, cx - 2 * s, cy - 34 * s, cx, cy - 20 * s)
        .bezierCurveTo(cx + 2 * s, cy - 34 * s, cx + 10 * s, cy - 48 * s, cx + 25 * s, cy - 54 * s)
        .bezierCurveTo(cx + 78 * s, cy - 72 * s, cx + 90 * s, cy + 20 * s, cx, cy + 72 * s)
        .stroke();
      break;
    default:
      doc.ellipse(cx, cy, 92 * s, 58 * s).stroke();
      doc.moveTo(cx - 92 * s, cy).bezierCurveTo(cx - 30 * s, cy - 80 * s, cx + 56 * s, cy - 70 * s, cx + 92 * s, cy).stroke();
      doc.moveTo(cx - 52 * s, cy + 62 * s).bezierCurveTo(cx, cy + 30 * s, cx + 55 * s, cy + 32 * s, cx + 95 * s, cy + 65 * s).stroke();
      break;
  }

  doc.restore();
}

async function writePdf(tutorial, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 36 });
    const stream = createWriteStream(outputPath);

    stream.on('finish', resolve);
    stream.on('error', reject);
    doc.on('error', reject);
    doc.pipe(stream);

    const title = titleFromFocus(tutorial.focus);
    const materials = 'Pencil, eraser, black marker, coloring tools';

    doc.fillColor('#111111');
    doc.font('Helvetica-Bold').fontSize(18).text('Drawinging', 36, 34);
    doc.fontSize(24).text(`${title} Worksheet`, 36, 68, { width: 520 });
    doc.font('Helvetica').fontSize(10).text(`Difficulty: ${tutorial.difficulty}  |  Materials: ${materials}`, 36, 112);
    doc.moveTo(36, 132).lineTo(559, 132).strokeColor('#111111').lineWidth(1).stroke();

    doc.font('Helvetica-Bold').fontSize(13).text('Numbered step boxes', 36, 150);
    for (let index = 0; index < 6; index += 1) {
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 36 + col * 176;
      const y = 172 + row * 92;
      doc.roundedRect(x, y, 156, 74, 8).stroke();
      doc.font('Helvetica-Bold').fontSize(11).text(`Step ${index + 1}`, x + 10, y + 10);
      doc.save().strokeColor('#777777').dash(6, { space: 5 });
      doc.moveTo(x + 18, y + 48).bezierCurveTo(x + 52, y + 28, x + 100, y + 28, x + 138, y + 48).stroke();
      doc.undash().restore();
    }

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Tracing area', 36, 392);
    doc.roundedRect(36, 412, 246, 188, 8).stroke();
    doc.save().strokeColor('#D0D0D0').dash(5, { space: 5 });
    doc.moveTo(52, 506).lineTo(266, 506).stroke();
    doc.moveTo(159, 428).lineTo(159, 584).stroke();
    doc.undash().restore();
    drawWorksheetSketchPdf(doc, tutorial.category, 159, 505, 0.55);

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Blank practice area', 314, 392);
    doc.roundedRect(314, 412, 246, 188, 8).stroke();
    drawGridPdf(doc, 314, 412, 246, 188, 18);

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Practice notes', 36, 630);
    doc.roundedRect(36, 650, 524, 120, 8).stroke();
    doc.save().strokeColor('#BBBBBB');
    for (const y of [686, 724, 762]) {
      doc.moveTo(54, y).lineTo(542, y).stroke();
    }
    doc.restore();

    doc.font('Helvetica').fontSize(9).fillColor('#111111').text('drawinging.com', 36, 800);
    doc.text('Print, trace, and draw again.', 420, 800);
    doc.end();
  });
}

async function renderPreview(svg, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(800, 1056, {
      fit: 'contain',
      background: '#FFFFFF',
    })
    .webp({ quality: 76, effort: 5 })
    .toFile(outputPath);
}

await fs.mkdir(worksheetDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

const PREMIUM_WORKSHEET_SLUGS = new Set([
  'flower-drawing',
  'cat-drawing',
  'butterfly-drawing',
  'dog-drawing',
  'eye-drawing',
  'rose-drawing',
]);

const tutorials = JSON.parse(await fs.readFile(tutorialsPath, 'utf8'));
let svgCount = 0;
let pdfCount = 0;
let previewCount = 0;
let pdfBytes = 0;

for (const tutorial of tutorials) {
  if (PREMIUM_WORKSHEET_SLUGS.has(tutorial.slug)) {
    continue;
  }

  const svg = worksheetSvg(tutorial);
  const svgPath = path.join(worksheetDir, `${tutorial.slug}-worksheet.svg`);
  const pdfPath = path.join(worksheetDir, `${tutorial.slug}-worksheet.pdf`);
  const previewPath = path.join(previewDir, `${tutorial.slug}-worksheet.webp`);

  await fs.writeFile(svgPath, svg);
  svgCount += 1;

  await writePdf(tutorial, pdfPath);
  const pdfStats = await fs.stat(pdfPath);
  if (pdfStats.size === 0) {
    throw new Error(`Generated PDF is empty: ${path.relative(projectRoot, pdfPath)}`);
  }
  pdfBytes += pdfStats.size;
  pdfCount += 1;

  await renderPreview(svg, previewPath);
  previewCount += 1;
}

console.log(`generated ${svgCount} worksheet SVG files`);
console.log(`generated ${pdfCount} worksheet PDF files (${pdfBytes} total bytes)`);
console.log(`generated ${previewCount} worksheet preview images`);

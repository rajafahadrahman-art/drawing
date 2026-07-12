import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const tutorialDir = path.join(publicDir, 'images', 'tutorials', 'flower-drawing');
const homepageDir = path.join(publicDir, 'images', 'homepage');
const worksheetDir = path.join(publicDir, 'worksheets');
const worksheetPreviewDir = path.join(worksheetDir, 'previews');

const COLORS = {
  paper: '#FBF9F4',
  white: '#FFFFFF',
  graphite: '#C8C0B5',
  graphiteDark: '#4A4844',
  graphiteSoft: '#E5DED2',
  green: '#0E5A43',
  greenSoft: '#DCEBE4',
  warmLine: '#D9CDBB',
  shadow: '#ECE5DA',
};

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

function petalPath(cx, cy, length, width, angle) {
  const tipX = cx + Math.cos(angle) * length;
  const tipY = cy + Math.sin(angle) * length;
  const leftX = cx + Math.cos(angle - Math.PI / 2) * width;
  const leftY = cy + Math.sin(angle - Math.PI / 2) * width;
  const rightX = cx + Math.cos(angle + Math.PI / 2) * width;
  const rightY = cy + Math.sin(angle + Math.PI / 2) * width;
  const c1X = cx + Math.cos(angle) * length * 0.34 + Math.cos(angle - Math.PI / 2) * width * 1.08;
  const c1Y = cy + Math.sin(angle) * length * 0.34 + Math.sin(angle - Math.PI / 2) * width * 1.08;
  const c2X = cx + Math.cos(angle) * length * 0.76 + Math.cos(angle - Math.PI / 2) * width * 0.58;
  const c2Y = cy + Math.sin(angle) * length * 0.76 + Math.sin(angle - Math.PI / 2) * width * 0.58;
  const c3X = cx + Math.cos(angle) * length * 0.76 + Math.cos(angle + Math.PI / 2) * width * 0.58;
  const c3Y = cy + Math.sin(angle) * length * 0.76 + Math.sin(angle + Math.PI / 2) * width * 0.58;
  const c4X = cx + Math.cos(angle) * length * 0.34 + Math.cos(angle + Math.PI / 2) * width * 1.08;
  const c4Y = cy + Math.sin(angle) * length * 0.34 + Math.sin(angle + Math.PI / 2) * width * 1.08;

  return `M${leftX.toFixed(1)} ${leftY.toFixed(1)}C${c1X.toFixed(1)} ${c1Y.toFixed(1)} ${c2X.toFixed(1)} ${c2Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}C${c3X.toFixed(1)} ${c3Y.toFixed(1)} ${c4X.toFixed(1)} ${c4Y.toFixed(1)} ${rightX.toFixed(1)} ${rightY.toFixed(1)}C${cx.toFixed(1)} ${cy.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)} ${leftX.toFixed(1)} ${leftY.toFixed(1)}Z`;
}

function leafPath(startX, startY, length, width, angle) {
  const tipX = startX + Math.cos(angle) * length;
  const tipY = startY + Math.sin(angle) * length;
  const c1X = startX + Math.cos(angle) * length * 0.34 + Math.cos(angle - Math.PI / 2) * width;
  const c1Y = startY + Math.sin(angle) * length * 0.34 + Math.sin(angle - Math.PI / 2) * width;
  const c2X = startX + Math.cos(angle) * length * 0.72 + Math.cos(angle - Math.PI / 2) * width * 0.58;
  const c2Y = startY + Math.sin(angle) * length * 0.72 + Math.sin(angle - Math.PI / 2) * width * 0.58;
  const c3X = startX + Math.cos(angle) * length * 0.72 + Math.cos(angle + Math.PI / 2) * width * 0.58;
  const c3Y = startY + Math.sin(angle) * length * 0.72 + Math.sin(angle + Math.PI / 2) * width * 0.58;
  const c4X = startX + Math.cos(angle) * length * 0.34 + Math.cos(angle + Math.PI / 2) * width;
  const c4Y = startY + Math.sin(angle) * length * 0.34 + Math.sin(angle + Math.PI / 2) * width;

  return `M${startX.toFixed(1)} ${startY.toFixed(1)}C${c1X.toFixed(1)} ${c1Y.toFixed(1)} ${c2X.toFixed(1)} ${c2Y.toFixed(1)} ${tipX.toFixed(1)} ${tipY.toFixed(1)}C${c3X.toFixed(1)} ${c3Y.toFixed(1)} ${c4X.toFixed(1)} ${c4Y.toFixed(1)} ${startX.toFixed(1)} ${startY.toFixed(1)}Z`;
}

function constructionGuides(cx, cy, size = 1, opacity = 1) {
  return `
    <g fill="none" stroke="${COLORS.graphite}" stroke-width="${2.2 * size}" stroke-linecap="round" stroke-dasharray="${10 * size} ${13 * size}" opacity="${opacity}">
      <circle cx="${cx}" cy="${cy}" r="${118 * size}"/>
      <circle cx="${cx}" cy="${cy}" r="${186 * size}"/>
      <path d="M${cx - 230 * size} ${cy}h${460 * size}M${cx} ${cy - 230 * size}v${460 * size}"/>
      <path d="M${cx - 162 * size} ${cy - 162 * size}l${324 * size} ${324 * size}M${cx + 162 * size} ${cy - 162 * size}l-${324 * size} ${324 * size}"/>
    </g>`;
}

function flowerLineArt({
  cx,
  cy,
  scale = 1,
  step = 9,
  outline = COLORS.graphiteDark,
  guideOpacity = 0.42,
  showGuides = true,
  strokeWidth = 4,
  includeLabels = false,
}) {
  const petals = [];
  const fourAngles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const fullAngles = [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2, Math.PI * 0.75, Math.PI, Math.PI * 1.25];
  const activePetals = step < 2 ? [] : step === 2 ? fourAngles : fullAngles;
  const refined = step >= 4;
  const petalLength = (refined ? 178 : 160) * scale;
  const petalWidth = (refined ? 54 : 48) * scale;

  for (const angle of activePetals) {
    petals.push(`<path d="${petalPath(cx, cy, petalLength, petalWidth, angle)}"/>`);
  }

  const centerRadius = (step >= 4 ? 45 : 36) * scale;
  const centerDetails = step >= 4
    ? Array.from({ length: 16 }, (_, index) => {
        const angle = (Math.PI * 2 * index) / 16;
        const dotX = cx + Math.cos(angle) * 20 * scale;
        const dotY = cy + Math.sin(angle) * 20 * scale;
        return `<circle cx="${dotX.toFixed(1)}" cy="${dotY.toFixed(1)}" r="${2.2 * scale}" fill="${outline}" stroke="none"/>`;
      }).join('')
    : '';

  const stem = step >= 5
    ? `<path d="M${cx - 3 * scale} ${cy + 42 * scale}C${cx + 18 * scale} ${cy + 170 * scale} ${cx - 22 * scale} ${cy + 270 * scale} ${cx + 12 * scale} ${cy + 395 * scale}"/>`
    : '';
  const firstLeaf = step >= 6
    ? `<path d="${leafPath(cx - 2 * scale, cy + 190 * scale, 118 * scale, 38 * scale, Math.PI * 0.86)}"/>
       <path d="M${cx - 2 * scale} ${cy + 190 * scale}C${cx - 42 * scale} ${cy + 226 * scale} ${cx - 75 * scale} ${cy + 251 * scale} ${cx - 108 * scale} ${cy + 253 * scale}"/>`
    : '';
  const secondLeaf = step >= 7
    ? `<path d="${leafPath(cx + 5 * scale, cy + 265 * scale, 130 * scale, 42 * scale, -0.42)}"/>
       <path d="M${cx + 5 * scale} ${cy + 265 * scale}C${cx + 48 * scale} ${cy + 248 * scale} ${cx + 90 * scale} ${cy + 231 * scale} ${cx + 124 * scale} ${cy + 212 * scale}"/>`
    : '';
  const shading = step >= 9
    ? `
      <g stroke="${outline}" stroke-width="${1.4 * scale}" opacity="0.42">
        ${fullAngles.map((angle) => {
          const x1 = cx + Math.cos(angle) * 72 * scale;
          const y1 = cy + Math.sin(angle) * 72 * scale;
          const x2 = cx + Math.cos(angle) * 132 * scale;
          const y2 = cy + Math.sin(angle) * 132 * scale;
          return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}C${((x1 + x2) / 2).toFixed(1)} ${(y1 + y2 - 16 * scale).toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
        }).join('')}
        <path d="M${cx - 18 * scale} ${cy + 92 * scale}C${cx - 4 * scale} ${cy + 205 * scale} ${cx - 28 * scale} ${cy + 286 * scale} ${cx - 5 * scale} ${cy + 366 * scale}"/>
      </g>`
    : '';
  const cleanOpacity = step >= 8 ? 1 : 0.86;
  const guideMarkup = showGuides ? constructionGuides(cx, cy, scale, guideOpacity) : '';
  const labelMarkup = includeLabels
    ? `<text x="${cx}" y="${cy + 448 * scale}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${22 * scale}" fill="${COLORS.graphiteDark}">simple flower line art</text>`
    : '';

  return `
    ${guideMarkup}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * scale}" stroke-linecap="round" stroke-linejoin="round" opacity="${cleanOpacity}">
      ${petals.join('')}
      <circle cx="${cx}" cy="${cy}" r="${centerRadius}"/>
      ${stem}
      ${firstLeaf}
      ${secondLeaf}
      ${shading}
    </g>
    <g>${centerDetails}</g>
    ${labelMarkup}`;
}

function paperTexture(width, height) {
  return `
    <rect width="${width}" height="${height}" fill="${COLORS.paper}"/>
    <filter id="paperNoise" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise"/>
      <feColorMatrix in="noise" type="saturate" values="0"/>
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.035"/>
      </feComponentTransfer>
    </filter>
    <rect width="${width}" height="${height}" filter="url(#paperNoise)" opacity="0.35"/>
  `;
}

function editorialFrame(width, height, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="22" flood-color="#B9A98F" flood-opacity="0.18"/>
    </filter>
  </defs>
  ${paperTexture(width, height)}
  <rect x="38" y="38" width="${width - 76}" height="${height - 76}" rx="38" fill="none" stroke="${COLORS.warmLine}" stroke-width="2"/>
  <path d="M80 ${height - 112}C245 ${height - 175} 395 ${height - 64} 565 ${height - 118}S915 ${height - 196} ${width - 86} ${height - 122}" fill="none" stroke="${COLORS.shadow}" stroke-width="12" stroke-linecap="round" opacity="0.7"/>
  ${body}
</svg>`;
}

function featureSvg(width, height, variant = 'feature') {
  const artCx = variant === 'og' ? 790 : 760;
  const artCy = variant === 'og' ? 306 : 362;
  const artScale = variant === 'og' ? 0.92 : 1.05;
  const headingSize = variant === 'og' ? 70 : 74;
  const subY = variant === 'og' ? 276 : 314;

  return editorialFrame(
    width,
    height,
    `
    <g filter="url(#softShadow)">
      <rect x="${artCx - 268 * artScale}" y="${artCy - 258 * artScale}" width="${535 * artScale}" height="${variant === 'og' ? 486 * artScale : 600 * artScale}" rx="36" fill="#FFFFFF" opacity="0.64"/>
    </g>
    ${flowerLineArt({ cx: artCx, cy: artCy, scale: artScale, step: 9, guideOpacity: 0.35, strokeWidth: 4.2 })}
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="118" font-size="25" font-weight="700" fill="${COLORS.green}" letter-spacing="5">DRAWINGING</text>
      <text x="84" y="205" font-size="${headingSize}" font-weight="800" fill="${COLORS.graphiteDark}">Flower</text>
      <text x="84" y="${variant === 'og' ? 276 : 286}" font-size="${headingSize}" font-weight="800" fill="${COLORS.graphiteDark}">Drawing</text>
      <text x="88" y="${subY + 62}" font-size="30" fill="${COLORS.green}">Beginner step-by-step tutorial</text>
      <rect x="84" y="${height - 150}" width="420" height="62" rx="31" fill="#FFFFFF" opacity="0.78" stroke="${COLORS.warmLine}" stroke-width="2"/>
      <text x="116" y="${height - 110}" font-size="23" fill="${COLORS.graphiteDark}">center, petals, stem, leaves</text>
    </g>`,
  );
}

function stepInstruction(step) {
  return [
    'Draw the center circle.',
    'Place four soft petals.',
    'Add the diagonal petals.',
    'Refine the center and curves.',
    'Pull a curved stem downward.',
    'Attach the first leaf.',
    'Balance with a second leaf.',
    'Clean the final outline.',
    'Add light graphite shading.',
  ][step - 1];
}

function stepSvg(step) {
  const width = 900;
  const height = 900;
  const guideOpacity = step >= 8 ? 0.22 : 0.48;
  const strokeWidth = step >= 8 ? 4.6 : 3.8;

  return editorialFrame(
    width,
    height,
    `
    <g transform="translate(0 18)">
      ${flowerLineArt({
        cx: 450,
        cy: 355,
        scale: 0.98,
        step,
        guideOpacity,
        strokeWidth,
        outline: step >= 8 ? COLORS.graphiteDark : '#5B5751',
      })}
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <rect x="72" y="72" width="112" height="112" rx="34" fill="${COLORS.green}"/>
      <text x="128" y="145" text-anchor="middle" font-size="52" font-weight="800" fill="#FFFFFF">${step}</text>
      <text x="214" y="116" font-size="24" font-weight="700" fill="${COLORS.green}" letter-spacing="4">FLOWER DRAWING</text>
      <text x="214" y="168" font-size="48" font-weight="800" fill="${COLORS.graphiteDark}">Step ${step} of 9</text>
      <rect x="78" y="756" width="744" height="72" rx="36" fill="#FFFFFF" opacity="0.82" stroke="${COLORS.warmLine}" stroke-width="2"/>
      <text x="450" y="802" text-anchor="middle" font-size="25" fill="${COLORS.graphiteDark}">${escapeXml(stepInstruction(step))}</text>
    </g>`,
  );
}

function homepageHeroSvg() {
  const width = 1200;
  const height = 900;

  return editorialFrame(
    width,
    height,
    `
    <g transform="translate(100 82)">
      <rect x="560" y="58" width="420" height="596" rx="46" fill="#FFFFFF" opacity="0.65" filter="url(#softShadow)"/>
      ${flowerLineArt({ cx: 770, cy: 292, scale: 0.92, step: 9, guideOpacity: 0.28, strokeWidth: 4 })}
      ${flowerLineArt({ cx: 590, cy: 420, scale: 0.38, step: 6, guideOpacity: 0.18, strokeWidth: 3 })}
      ${flowerLineArt({ cx: 954, cy: 452, scale: 0.34, step: 8, guideOpacity: 0.18, strokeWidth: 3 })}
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="126" font-size="28" font-weight="700" fill="${COLORS.green}" letter-spacing="5">DRAWINGING</text>
      <text x="84" y="235" font-size="78" font-weight="800" fill="${COLORS.graphiteDark}">Drawing</text>
      <text x="84" y="318" font-size="78" font-weight="800" fill="${COLORS.graphiteDark}">tutorials</text>
      <text x="88" y="386" font-size="31" fill="${COLORS.green}">Simple editorial guides for pencil practice</text>
      <rect x="84" y="704" width="510" height="70" rx="35" fill="#FFFFFF" opacity="0.78" stroke="${COLORS.warmLine}" stroke-width="2"/>
      <text x="122" y="749" font-size="25" fill="${COLORS.graphiteDark}">step-by-step art, worksheets, practice</text>
    </g>`,
  );
}

async function renderWebp(svg, outputPath, width, height, quality = 82) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(width, height, {
      fit: 'cover',
      position: 'center',
      background: COLORS.paper,
    })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

function worksheetStepArtSvg(step, x, y, scale = 1) {
  return flowerLineArt({
    cx: x,
    cy: y,
    scale,
    step,
    guideOpacity: step >= 8 ? 0.1 : 0.22,
    strokeWidth: 2,
    outline: '#111111',
    showGuides: step < 8,
  });
}

function worksheetSvg() {
  const stepBoxes = Array.from({ length: 9 }, (_, index) => {
    const step = index + 1;
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = 54 + col * 228;
    const y = 202 + row * 118;

    return `
      <rect x="${x}" y="${y}" width="204" height="96" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="1.8"/>
      <circle cx="${x + 25}" cy="${y + 25}" r="15" fill="#FFFFFF" stroke="#111111" stroke-width="1.4"/>
      <text x="${x + 25}" y="${y + 31}" text-anchor="middle" font-size="16" font-weight="700" fill="#111111">${step}</text>
      <g transform="translate(0 -4)">
        ${worksheetStepArtSvg(step, x + 121, y + 37, 0.15)}
      </g>`;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PAGE.width}" height="${PAGE.height}" viewBox="0 0 ${PAGE.width} ${PAGE.height}">
  <rect width="${PAGE.width}" height="${PAGE.height}" fill="#FFFFFF"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="54" y="54" font-size="24" font-weight="700" fill="#111111">Drawinging</text>
    <text x="54" y="98" font-size="34" font-weight="800" fill="#111111">Flower Drawing Worksheet</text>
    <text x="54" y="132" font-size="16" fill="#111111">Difficulty: Beginner  |  Materials: Pencil, eraser, black marker, coloring tools</text>
    <path d="M54 158h686" stroke="#111111" stroke-width="2"/>
    <text x="54" y="186" font-size="19" font-weight="700" fill="#111111">Nine numbered steps</text>
    ${stepBoxes}
    <text x="54" y="584" font-size="19" font-weight="700" fill="#111111">Tracing space</text>
    <rect x="54" y="604" width="320" height="252" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    <path d="M74 730h280M214 624v212" stroke="#D6D6D6" stroke-width="1.2" stroke-dasharray="8 8"/>
    ${worksheetStepArtSvg(9, 214, 698, 0.43)}
    <text x="420" y="584" font-size="19" font-weight="700" fill="#111111">Blank practice area</text>
    <rect x="420" y="604" width="320" height="252" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    ${gridSvg(420, 604, 320, 252, 24)}
    <text x="54" y="898" font-size="19" font-weight="700" fill="#111111">Practice notes</text>
    <rect x="54" y="918" width="686" height="112" rx="12" fill="#FFFFFF" stroke="#111111" stroke-width="2"/>
    <path d="M78 956h638M78 992h638" stroke="#BBBBBB" stroke-width="1.1"/>
    <text x="54" y="1082" font-size="14" fill="#111111">drawinging.com</text>
    <text x="556" y="1082" font-size="14" fill="#111111">Print, trace, and draw again.</text>
  </g>
</svg>`;
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

function drawPetalPdf(doc, cx, cy, length, width, angle) {
  const tipX = cx + Math.cos(angle) * length;
  const tipY = cy + Math.sin(angle) * length;
  const leftX = cx + Math.cos(angle - Math.PI / 2) * width;
  const leftY = cy + Math.sin(angle - Math.PI / 2) * width;
  const rightX = cx + Math.cos(angle + Math.PI / 2) * width;
  const rightY = cy + Math.sin(angle + Math.PI / 2) * width;

  doc.moveTo(leftX, leftY)
    .bezierCurveTo(
      cx + Math.cos(angle) * length * 0.34 + Math.cos(angle - Math.PI / 2) * width,
      cy + Math.sin(angle) * length * 0.34 + Math.sin(angle - Math.PI / 2) * width,
      cx + Math.cos(angle) * length * 0.75 + Math.cos(angle - Math.PI / 2) * width * 0.55,
      cy + Math.sin(angle) * length * 0.75 + Math.sin(angle - Math.PI / 2) * width * 0.55,
      tipX,
      tipY,
    )
    .bezierCurveTo(
      cx + Math.cos(angle) * length * 0.75 + Math.cos(angle + Math.PI / 2) * width * 0.55,
      cy + Math.sin(angle) * length * 0.75 + Math.sin(angle + Math.PI / 2) * width * 0.55,
      cx + Math.cos(angle) * length * 0.34 + Math.cos(angle + Math.PI / 2) * width,
      cy + Math.sin(angle) * length * 0.34 + Math.sin(angle + Math.PI / 2) * width,
      rightX,
      rightY,
    )
    .bezierCurveTo(cx, cy, cx, cy, leftX, leftY)
    .stroke();
}

function drawLeafPdf(doc, startX, startY, length, width, angle) {
  const tipX = startX + Math.cos(angle) * length;
  const tipY = startY + Math.sin(angle) * length;

  doc.moveTo(startX, startY)
    .bezierCurveTo(
      startX + Math.cos(angle) * length * 0.34 + Math.cos(angle - Math.PI / 2) * width,
      startY + Math.sin(angle) * length * 0.34 + Math.sin(angle - Math.PI / 2) * width,
      startX + Math.cos(angle) * length * 0.72 + Math.cos(angle - Math.PI / 2) * width * 0.58,
      startY + Math.sin(angle) * length * 0.72 + Math.sin(angle - Math.PI / 2) * width * 0.58,
      tipX,
      tipY,
    )
    .bezierCurveTo(
      startX + Math.cos(angle) * length * 0.72 + Math.cos(angle + Math.PI / 2) * width * 0.58,
      startY + Math.sin(angle) * length * 0.72 + Math.sin(angle + Math.PI / 2) * width * 0.58,
      startX + Math.cos(angle) * length * 0.34 + Math.cos(angle + Math.PI / 2) * width,
      startY + Math.sin(angle) * length * 0.34 + Math.sin(angle + Math.PI / 2) * width,
      startX,
      startY,
    )
    .stroke();
}

function drawFlowerPdf(doc, cx, cy, scale = 1, step = 9) {
  const fourAngles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const fullAngles = [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2, Math.PI * 0.75, Math.PI, Math.PI * 1.25];
  const activePetals = step < 2 ? [] : step === 2 ? fourAngles : fullAngles;

  doc.save().strokeColor('#111111').lineWidth(1.2 * scale).lineCap('round').lineJoin('round');
  for (const angle of activePetals) {
    drawPetalPdf(doc, cx, cy, 62 * scale, 18 * scale, angle);
  }
  doc.circle(cx, cy, (step >= 4 ? 15 : 12) * scale).stroke();
  if (step >= 5) {
    doc.moveTo(cx - 1 * scale, cy + 15 * scale)
      .bezierCurveTo(cx + 7 * scale, cy + 58 * scale, cx - 8 * scale, cy + 92 * scale, cx + 4 * scale, cy + 132 * scale)
      .stroke();
  }
  if (step >= 6) {
    drawLeafPdf(doc, cx, cy + 65 * scale, 42 * scale, 13 * scale, Math.PI * 0.86);
  }
  if (step >= 7) {
    drawLeafPdf(doc, cx + 2 * scale, cy + 88 * scale, 46 * scale, 14 * scale, -0.42);
  }
  if (step >= 9) {
    doc.save().strokeColor('#777777').lineWidth(0.5 * scale);
    for (const angle of fullAngles) {
      doc.moveTo(cx + Math.cos(angle) * 26 * scale, cy + Math.sin(angle) * 26 * scale)
        .lineTo(cx + Math.cos(angle) * 48 * scale, cy + Math.sin(angle) * 48 * scale)
        .stroke();
    }
    doc.restore();
  }
  doc.restore();
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

async function writeWorksheetPdf(outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 36 });
    const stream = createWriteStream(outputPath);

    stream.on('finish', resolve);
    stream.on('error', reject);
    doc.on('error', reject);
    doc.pipe(stream);

    doc.fillColor('#111111');
    doc.font('Helvetica-Bold').fontSize(18).text('Drawinging', 36, 34);
    doc.fontSize(24).text('Flower Drawing Worksheet', 36, 68, { width: 520 });
    doc.font('Helvetica').fontSize(10).text('Difficulty: Beginner  |  Materials: Pencil, eraser, black marker, coloring tools', 36, 112);
    doc.moveTo(36, 132).lineTo(559, 132).strokeColor('#111111').lineWidth(1).stroke();

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Nine numbered steps', 36, 150);
    for (let index = 0; index < 9; index += 1) {
      const step = index + 1;
      const col = index % 3;
      const row = Math.floor(index / 3);
      const x = 36 + col * 176;
      const y = 172 + row * 78;

      doc.roundedRect(x, y, 156, 62, 7).stroke();
      doc.circle(x + 17, y + 17, 10).stroke();
      doc.font('Helvetica-Bold').fontSize(8).text(String(step), x + 14, y + 12, { width: 6, align: 'center' });
      drawFlowerPdf(doc, x + 84, y + 18, 0.34, step);
    }

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Tracing space', 36, 430);
    doc.roundedRect(36, 450, 246, 188, 8).stroke();
    doc.save().strokeColor('#D0D0D0').dash(5, { space: 5 });
    doc.moveTo(52, 544).lineTo(266, 544).stroke();
    doc.moveTo(159, 466).lineTo(159, 622).stroke();
    doc.undash().restore();
    drawFlowerPdf(doc, 159, 514, 1, 9);

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Blank practice area', 314, 430);
    doc.roundedRect(314, 450, 246, 188, 8).stroke();
    drawGridPdf(doc, 314, 450, 246, 188, 18);

    doc.font('Helvetica-Bold').fontSize(13).fillColor('#111111').text('Practice notes', 36, 668);
    doc.roundedRect(36, 688, 524, 82, 8).stroke();
    doc.save().strokeColor('#BBBBBB');
    for (const y of [722, 754]) {
      doc.moveTo(54, y).lineTo(542, y).stroke();
    }
    doc.restore();

    doc.font('Helvetica').fontSize(9).fillColor('#111111').text('drawinging.com', 36, 800);
    doc.text('Print, trace, and draw again.', 420, 800);
    doc.end();
  });
}

async function renderWorksheetPreview(svg, outputPath) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(800, 1056, {
      fit: 'contain',
      background: '#FFFFFF',
    })
    .webp({ quality: 78, effort: 5 })
    .toFile(outputPath);
}

async function main() {
  await renderWebp(featureSvg(1200, 800), path.join(tutorialDir, 'flower-drawing.webp'), 1200, 800, 84);
  await renderWebp(featureSvg(1200, 630, 'og'), path.join(tutorialDir, 'flower-drawing-og.webp'), 1200, 630, 84);

  for (let step = 1; step <= 9; step += 1) {
    await renderWebp(stepSvg(step), path.join(tutorialDir, `flower-drawing-step-${step}.webp`), 900, 900, 82);
  }

  await renderWebp(homepageHeroSvg(), path.join(homepageDir, 'drawing-tutorials-hero.webp'), 1200, 900, 84);

  const flowerWorksheetSvg = worksheetSvg();
  const worksheetSvgPath = path.join(worksheetDir, 'flower-drawing-worksheet.svg');
  const worksheetPdfPath = path.join(worksheetDir, 'flower-drawing-worksheet.pdf');
  const worksheetPreviewPath = path.join(worksheetPreviewDir, 'flower-drawing-worksheet.webp');

  await fs.mkdir(worksheetDir, { recursive: true });
  await fs.writeFile(worksheetSvgPath, flowerWorksheetSvg);
  await writeWorksheetPdf(worksheetPdfPath);

  const pdfStats = await fs.stat(worksheetPdfPath);
  if (pdfStats.size === 0) {
    throw new Error(`Generated PDF is empty: ${path.relative(projectRoot, worksheetPdfPath)}`);
  }

  await renderWorksheetPreview(flowerWorksheetSvg, worksheetPreviewPath);

  console.log('generated flower tutorial assets');
  console.log('generated flower worksheet SVG, PDF, and preview');
}

await main();

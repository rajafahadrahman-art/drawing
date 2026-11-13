// Step-by-step guide worksheets — one printable worksheet per tutorial, built
// from the SAME step images shown on the tutorial guide pages
// (public/images/tutorials/<slug>/<slug>-step-N.webp, written earlier in
// prebuild by generate-step-images.mjs). Runs LAST in the worksheets chain so
// its PDF / SVG / preview outputs replace the legacy template worksheets for
// every tutorial, including the six premium ones.
import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const worksheetDir = path.join(publicDir, 'worksheets');
const previewDir = path.join(worksheetDir, 'previews');
const metaList = JSON.parse(
  await fs.readFile(path.join(projectRoot, 'planning', 'launch-tutorials.json'), 'utf8'),
);

const INK = '#22302A';
const GREEN = '#0E6B45';
const CTA = '#C94A0E';
const ACCENT = '#FFC53D';
const MUTED = '#55645C';
const CREAM = '#FFF7E8';
const BORDER = '#F0DFC2';

const titleCase = (v) =>
  v.split(/[-\s]+/).filter(Boolean).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
const subjectOf = (focus) => titleCase(focus.replace(/\bdrawing\b/gi, '').trim() || focus);
const article = (word) => (/^[aeiou]/i.test(word) ? 'an' : 'a');
const esc = (v) =>
  String(v).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

async function stepImages(slug) {
  const dir = path.join(publicDir, 'images', 'tutorials', slug);
  const files = await fs.readdir(dir).catch(() => []);
  const steps = files
    .map((f) => f.match(new RegExp(`^${slug}-step-(\\d+)\\.webp$`)))
    .filter(Boolean)
    .map((m) => Number(m[1]))
    .sort((a, b) => a - b);
  return steps.map((n) => path.join(dir, `${slug}-step-${n}.webp`));
}

// ---------- PDF ----------
const PW = 595.28;
const PH = 841.89;
const M = 36;
const CW = PW - M * 2; // 523.28
const CELL = 165;
const GAP = (CW - CELL * 3) / 2;
const ROWH = CELL + 12;

function pdfHeader(doc, title, meta, steps) {
  doc.save();
  doc.rect(0, 0, PW, 118).fill(CREAM);
  doc.rect(0, 118, PW, 4).fill(ACCENT);
  doc.fillColor(GREEN).font('Helvetica-Bold').fontSize(10.5);
  doc.text('D R A W I N G I N G', M, 26);
  doc.fillColor(INK).fontSize(24);
  doc.text(`How to Draw ${article(title)} ${title}`, M, 44, { width: CW });
  doc.fillColor(MUTED).font('Helvetica').fontSize(11);
  doc.text(
    `Step-by-step worksheet  ·  Difficulty: ${meta.difficulty}  ·  ${steps} steps  ·  You need: a pencil, an eraser, and colours`,
    M, 82, { width: CW },
  );
  doc.fillColor(CTA).font('Helvetica-Bold').fontSize(11);
  doc.text('Follow the pictures in order — each step adds one new part.', M, 99);
  doc.restore();
}

function pdfFooter(doc, title, page, pages) {
  doc.save();
  doc.fillColor(MUTED).font('Helvetica').fontSize(8.5);
  doc.text('drawinging.com', M, PH - 30);
  doc.text(`How to Draw ${article(title)} ${title} — Worksheet · Page ${page} of ${pages}`, M, PH - 30, {
    width: CW,
    align: 'right',
  });
  doc.restore();
}

function pdfStepCell(doc, jpeg, x, y) {
  doc.save();
  doc.roundedRect(x - 2, y - 2, CELL + 4, CELL + 4, 10).strokeColor(BORDER).lineWidth(1.4).stroke();
  doc.image(jpeg, x, y, { width: CELL, height: CELL });
  doc.restore();
}

function pdfGridBox(doc, x, y, w, h) {
  doc.save();
  doc.roundedRect(x, y, w, h, 10).fill('#FFFFFF');
  doc.roundedRect(x, y, w, h, 10).strokeColor('#CDBFA3').lineWidth(1.2).stroke();
  doc.strokeColor('#E9E1CC').lineWidth(0.6);
  for (let gx = x + 20; gx < x + w - 6; gx += 20) doc.moveTo(gx, y + 4).lineTo(gx, y + h - 4).stroke();
  for (let gy = y + 20; gy < y + h - 6; gy += 20) doc.moveTo(x + 4, gy).lineTo(x + w - 4, gy).stroke();
  doc.restore();
}

async function writePdf(meta, title, jpegs) {
  const out = path.join(worksheetDir, `${meta.slug}-worksheet.pdf`);
  const pages = 2;
  await new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 0 });
    const stream = createWriteStream(out);
    stream.on('finish', resolve);
    stream.on('error', reject);
    doc.on('error', reject);
    doc.pipe(stream);

    // Page 1 — header + up to 9 steps (3x3)
    pdfHeader(doc, title, meta, jpegs.length);
    const first = jpegs.slice(0, 9);
    first.forEach((jpeg, i) => {
      const x = M + (i % 3) * (CELL + GAP);
      const y = 140 + Math.floor(i / 3) * ROWH;
      pdfStepCell(doc, jpeg, x, y);
    });
    if (jpegs.length > 9) {
      doc.fillColor(MUTED).font('Helvetica-Bold').fontSize(11);
      doc.text('More steps on page 2 →', M, 140 + 3 * ROWH + 2);
    }
    pdfFooter(doc, title, 1, pages);

    // Page 2 — remaining steps + practice
    doc.addPage();
    doc.save();
    doc.rect(0, 0, PW, 64).fill(CREAM);
    doc.rect(0, 64, PW, 4).fill(ACCENT);
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(16);
    doc.text(`How to Draw ${article(title)} ${title} — keep going!`, M, 24);
    doc.restore();

    let y = 88;
    const rest = jpegs.slice(9);
    if (rest.length) {
      rest.forEach((jpeg, i) => {
        pdfStepCell(doc, jpeg, M + i * (CELL + GAP), y);
      });
      y += ROWH + 14;
    }

    doc.fillColor(CTA).font('Helvetica-Bold').fontSize(16);
    doc.text('Now draw it yourself!', M, y);
    y += 26;
    // Final artwork as the reference + first practice box
    pdfStepCell(doc, jpegs[jpegs.length - 1], M, y);
    doc.fillColor(MUTED).font('Helvetica').fontSize(9.5);
    doc.text('Your finished drawing', M, y + CELL + 6, { width: CELL, align: 'center' });
    pdfGridBox(doc, M + CELL + GAP, y, CW - CELL - GAP, CELL + 22);
    y += CELL + 40;
    // Second, bigger practice box
    doc.fillColor(INK).font('Helvetica-Bold').fontSize(12.5);
    doc.text('Draw it again — this time without looking!', M, y);
    y += 20;
    pdfGridBox(doc, M, y, CW, 168);
    y += 184;
    doc.fillColor(MUTED).font('Helvetica').fontSize(10.5);
    doc.text(
      'Tip: draw your first lines very lightly. When the shape looks right, go over them darker and rub out the guide lines.',
      M, y, { width: CW },
    );
    pdfFooter(doc, title, 2, pages);
    doc.end();
  });
  return out;
}

// ---------- SVG (full guide on one tall sheet) ----------
function worksheetSvg(meta, title, dataUris) {
  const W = 794;
  const margin = 54;
  const cell = 218;
  const gap = 16;
  const headH = 176;
  const rows = Math.ceil(dataUris.length / 3);
  const stepsH = rows * (cell + 14);
  const practiceY = headH + stepsH + 26;
  const H = practiceY + 300 + 56;
  const cells = dataUris
    .map((uri, i) => {
      const x = margin + (i % 3) * (cell + gap);
      const y = headH + Math.floor(i / 3) * (cell + 14);
      return `<rect x="${x - 2}" y="${y - 2}" width="${cell + 4}" height="${cell + 4}" rx="12" fill="#FFFFFF" stroke="${BORDER}" stroke-width="2"/><image href="${uri}" x="${x}" y="${y}" width="${cell}" height="${cell}"/>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect width="${W}" height="150" fill="${CREAM}"/>
  <rect y="150" width="${W}" height="5" fill="${ACCENT}"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="${margin}" y="46" font-size="15" font-weight="700" letter-spacing="4" fill="${GREEN}">DRAWINGING</text>
    <text x="${margin}" y="88" font-size="34" font-weight="800" fill="${INK}">How to Draw ${article(title)} ${esc(title)}</text>
    <text x="${margin}" y="116" font-size="16" fill="${MUTED}">Step-by-step worksheet · Difficulty: ${esc(meta.difficulty)} · ${dataUris.length} steps · You need: a pencil, an eraser, and colours</text>
    <text x="${margin}" y="140" font-size="16" font-weight="700" fill="${CTA}">Follow the pictures in order — each step adds one new part.</text>
    ${cells}
    <text x="${margin}" y="${practiceY + 8}" font-size="24" font-weight="800" fill="${CTA}">Now draw it yourself!</text>
    <rect x="${margin - 2}" y="${practiceY + 24}" width="${cell + 4}" height="${cell + 4}" rx="12" fill="#FFFFFF" stroke="${BORDER}" stroke-width="2"/>
    <image href="${dataUris[dataUris.length - 1]}" x="${margin}" y="${practiceY + 26}" width="${cell}" height="${cell}"/>
    <text x="${margin}" y="${practiceY + 262}" font-size="14" fill="${MUTED}">Your finished drawing</text>
    <rect x="${margin + cell + gap}" y="${practiceY + 24}" width="${W - margin * 2 - cell - gap}" height="${cell + 4}" rx="12" fill="#FFFFFF" stroke="#CDBFA3" stroke-width="2"/>
    <text x="${margin}" y="${H - 22}" font-size="14" fill="${MUTED}">drawinging.com · Print as many copies as you like!</text>
  </g>
</svg>`;
}

// ---------- Preview (page-1 style render, A4 ratio) ----------
function previewSvg(meta, title, dataUris) {
  const W = 794;
  const H = 1123;
  const margin = 54;
  const cell = 218;
  const gap = 16;
  const headH = 176;
  const cells = dataUris
    .slice(0, 9)
    .map((uri, i) => {
      const x = margin + (i % 3) * (cell + gap);
      const y = headH + Math.floor(i / 3) * (cell + 14);
      return `<rect x="${x - 2}" y="${y - 2}" width="${cell + 4}" height="${cell + 4}" rx="12" fill="#FFFFFF" stroke="${BORDER}" stroke-width="2"/><image href="${uri}" x="${x}" y="${y}" width="${cell}" height="${cell}"/>`;
    })
    .join('\n');
  const bandY = headH + 3 * (cell + 14) + 18;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  <rect width="${W}" height="150" fill="${CREAM}"/>
  <rect y="150" width="${W}" height="5" fill="${ACCENT}"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="${margin}" y="46" font-size="15" font-weight="700" letter-spacing="4" fill="${GREEN}">DRAWINGING</text>
    <text x="${margin}" y="88" font-size="34" font-weight="800" fill="${INK}">How to Draw ${article(title)} ${esc(title)}</text>
    <text x="${margin}" y="116" font-size="16" fill="${MUTED}">Step-by-step worksheet · ${dataUris.length} steps · plus a draw-it-yourself practice page</text>
    <text x="${margin}" y="140" font-size="16" font-weight="700" fill="${CTA}">Follow the pictures in order — each step adds one new part.</text>
    ${cells}
    <rect x="${margin}" y="${bandY}" width="${W - margin * 2}" height="86" rx="14" fill="${CREAM}" stroke="${BORDER}" stroke-width="2"/>
    <text x="${margin + 24}" y="${bandY + 38}" font-size="20" font-weight="800" fill="${INK}">Page 2: draw it yourself!</text>
    <text x="${margin + 24}" y="${bandY + 64}" font-size="15" fill="${MUTED}">Big practice boxes to draw your own ${esc(title.toLowerCase())}.</text>
    <text x="${margin}" y="${H - 24}" font-size="14" fill="${MUTED}">drawinging.com</text>
  </g>
</svg>`;
}

// ---------- Run ----------
await fs.mkdir(worksheetDir, { recursive: true });
await fs.mkdir(previewDir, { recursive: true });

let done = 0;
for (const meta of metaList) {
  const paths = await stepImages(meta.slug);
  if (!paths.length) {
    console.warn(`guide-worksheets: SKIP ${meta.slug} — no step images found (run generate-step-images first)`);
    continue;
  }
  const title = subjectOf(meta.focus);
  const webpBuffers = await Promise.all(paths.map((p) => fs.readFile(p)));
  const jpegs = await Promise.all(
    webpBuffers.map((b) => sharp(b).jpeg({ quality: 82 }).toBuffer()),
  );
  // JPEG data URIs (not WebP): SVG renderers such as librsvg, which sharp
  // uses for the preview render, cannot decode WebP images embedded in SVG.
  const dataUris = jpegs.map(
    (b) => `data:image/jpeg;base64,${b.toString('base64')}`,
  );

  await writePdf(meta, title, jpegs);
  await fs.writeFile(
    path.join(worksheetDir, `${meta.slug}-worksheet.svg`),
    worksheetSvg(meta, title, dataUris),
  );
  await sharp(Buffer.from(previewSvg(meta, title, dataUris)))
    .resize(800, 1131)
    .webp({ quality: 78 })
    .toFile(path.join(previewDir, `${meta.slug}-worksheet.webp`));
  done += 1;
}
console.log(`guide-worksheets: wrote ${done} step-by-step worksheets (PDF + SVG + preview)`);

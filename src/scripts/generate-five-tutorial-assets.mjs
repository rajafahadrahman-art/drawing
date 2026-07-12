import { createWriteStream } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');

const COLORS = {
  paper: '#FBF9F4',
  white: '#FFFFFF',
  graphite: '#C8C0B5',
  graphiteDark: '#4A4844',
  green: '#0E5A43',
  warmLine: '#D9CDBB',
  shadow: '#ECE5DA',
};

const PAGE = { width: 794, height: 1123 };

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function constructionGuides(cx, cy, size = 1, opacity = 1) {
  return `
    <g fill="none" stroke="${COLORS.graphite}" stroke-width="${2.2 * size}" stroke-linecap="round" stroke-dasharray="${10 * size} ${13 * size}" opacity="${opacity}">
      <circle cx="${cx}" cy="${cy}" r="${118 * size}"/>
      <circle cx="${cx}" cy="${cy}" r="${186 * size}"/>
      <path d="M${cx - 230 * size} ${cy}h${460 * size}M${cx} ${cy - 230 * size}v${460 * size}"/>
    </g>`;
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

function catArt({ cx, cy, scale = 1, step = 9, outline = COLORS.graphiteDark, guideOpacity = 0.42, showGuides = true, strokeWidth = 4 }) {
  const s = scale;
  const guides = showGuides ? constructionGuides(cx, cy - 40 * s, s * 0.85, guideOpacity) : '';
  const head = step >= 1 ? `<circle cx="${cx}" cy="${cy - 90 * s}" r="${78 * s}"/>` : '';
  const faceGuides = step >= 2
    ? `<path d="M${cx - 78 * s} ${cy - 90 * s}h${156 * s}M${cx} ${cy - 168 * s}v${156 * s}" stroke-dasharray="${8 * s} ${8 * s}"/>`
    : '';
  const chest = step >= 3
    ? `<ellipse cx="${cx}" cy="${cy + 55 * s}" rx="${95 * s}" ry="${110 * s}"/>
       <ellipse cx="${cx + 55 * s}" cy="${cy + 70 * s}" rx="${70 * s}" ry="${95 * s}"/>`
    : '';
  const ears = step >= 4
    ? `<path d="M${cx - 55 * s} ${cy - 145 * s}l-28 ${-58 * s}l52 ${28 * s}Z"/>
       <path d="M${cx + 55 * s} ${cy - 145 * s}l28 ${-58 * s}l-52 ${28 * s}Z"/>
       <path d="M${cx - 58 * s} ${cy - 152 * s}l-12 ${-28 * s}l28 ${14 * s}"/>
       <path d="M${cx + 58 * s} ${cy - 152 * s}l12 ${-28 * s}l-28 ${14 * s}"/>`
    : '';
  const face = step >= 5
    ? `<ellipse cx="${cx - 28 * s}" cy="${cy - 98 * s}" rx="${14 * s}" ry="${18 * s}"/>
       <ellipse cx="${cx + 28 * s}" cy="${cy - 98 * s}" rx="${14 * s}" ry="${18 * s}"/>
       <circle cx="${cx - 28 * s}" cy="${cy - 98 * s}" r="${5 * s}" fill="${outline}" stroke="none"/>
       <circle cx="${cx + 28 * s}" cy="${cy - 98 * s}" r="${5 * s}" fill="${outline}" stroke="none"/>
       <path d="M${cx} ${cy - 78 * s}l-12 ${12 * s}h24Z"/>
       <path d="M${cx} ${cy - 66 * s}c-18 ${14 * s} -32 ${14 * s} -42 ${8 * s}M${cx} ${cy - 66 * s}c18 ${14 * s} 32 ${14 * s} 42 ${8 * s}"/>`
    : '';
  const paws = step >= 6
    ? `<path d="M${cx - 55 * s} ${cy + 40 * s}v${95 * s}c0 ${18 * s} 18 ${28 * s} 36 ${18 * s}"/>
       <path d="M${cx + 10 * s} ${cy + 45 * s}v${90 * s}c0 ${18 * s} 18 ${28 * s} 36 ${18 * s}"/>
       <ellipse cx="${cx - 38 * s}" cy="${cy + 148 * s}" rx="${22 * s}" ry="${12 * s}"/>
       <ellipse cx="${cx + 28 * s}" cy="${cy + 148 * s}" rx="${22 * s}" ry="${12 * s}"/>`
    : '';
  const hind = step >= 7
    ? `<path d="M${cx + 70 * s} ${cy + 40 * s}c35 ${20 * s} 55 ${70 * s} 30 ${115 * s}c-12 ${18 * s} -40 ${22 * s} -55 ${8 * s}"/>`
    : '';
  const tailWhiskers = step >= 8
    ? `<path d="M${cx + 95 * s} ${cy + 90 * s}c55 ${-40 * s} 95 ${-20 * s} 110 ${35 * s}c8 ${28 * s} -10 ${48 * s} -38 ${42 * s}"/>
       <path d="M${cx - 18 * s} ${cy - 72 * s}c-55 ${-8 * s} -85 ${-28 * s} -105 ${-48 * s}M${cx - 18 * s} ${cy - 66 * s}c-58 0 -90 ${-12 * s} -115 ${-22 * s}M${cx - 18 * s} ${cy - 60 * s}c-52 ${12 * s} -82 ${18 * s} -108 ${22 * s}"/>
       <path d="M${cx + 18 * s} ${cy - 72 * s}c55 ${-8 * s} 85 ${-28 * s} 105 ${-48 * s}M${cx + 18 * s} ${cy - 66 * s}c58 0 90 ${-12 * s} 115 ${-22 * s}M${cx + 18 * s} ${cy - 60 * s}c52 ${12 * s} 82 ${18 * s} 108 ${22 * s}"/>`
    : '';
  const fur = step >= 9
    ? `<g stroke-width="${1.5 * s}" opacity="0.45">
         <path d="M${cx - 70 * s} ${cy - 40 * s}c8 ${12 * s} 6 ${22 * s} -2 ${30 * s}"/>
         <path d="M${cx + 70 * s} ${cy - 30 * s}c-8 ${12 * s} -6 ${22 * s} 2 ${30 * s}"/>
         <path d="M${cx - 40 * s} ${cy + 100 * s}c10 ${8 * s} 18 ${8 * s} 28 0"/>
         <path d="M${cx + 20 * s} ${cy + 20 * s}c6 ${14 * s} 4 ${24 * s} -4 ${32 * s}"/>
       </g>`
    : '';

  return `
    ${guides}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * s}" stroke-linecap="round" stroke-linejoin="round">
      ${head}${faceGuides}${chest}${ears}${face}${paws}${hind}${tailWhiskers}${fur}
    </g>`;
}

function butterflyArt({ cx, cy, scale = 1, step = 9, outline = COLORS.graphiteDark, guideOpacity = 0.42, showGuides = true, strokeWidth = 4 }) {
  const s = scale;
  const guides = showGuides ? constructionGuides(cx, cy, s * 0.9, guideOpacity) : '';
  const center = step >= 1 ? `<path d="M${cx} ${cy - 160 * s}v${320 * s}" stroke-dasharray="${8 * s} ${8 * s}"/>` : '';
  const body = step >= 2
    ? `<ellipse cx="${cx}" cy="${cy - 70 * s}" rx="${18 * s}" ry="${22 * s}"/>
       <ellipse cx="${cx}" cy="${cy}" rx="${24 * s}" ry="${40 * s}"/>
       <ellipse cx="${cx}" cy="${cy + 70 * s}" rx="${16 * s}" ry="${55 * s}"/>`
    : '';
  const upper = step >= 3
    ? `<path d="M${cx - 18 * s} ${cy - 20 * s}C${cx - 120 * s} ${cy - 160 * s} ${cx - 220 * s} ${cy - 120 * s} ${cx - 210 * s} ${cy - 20 * s}C${cx - 200 * s} ${cy + 40 * s} ${cx - 90 * s} ${cy + 30 * s} ${cx - 18 * s} ${cy + 10 * s}Z"/>
       <path d="M${cx + 18 * s} ${cy - 20 * s}C${cx + 120 * s} ${cy - 160 * s} ${cx + 220 * s} ${cy - 120 * s} ${cx + 210 * s} ${cy - 20 * s}C${cx + 200 * s} ${cy + 40 * s} ${cx + 90 * s} ${cy + 30 * s} ${cx + 18 * s} ${cy + 10 * s}Z"/>`
    : '';
  const lower = step >= 4
    ? `<path d="M${cx - 16 * s} ${cy + 20 * s}C${cx - 90 * s} ${cy + 10 * s} ${cx - 150 * s} ${cy + 70 * s} ${cx - 130 * s} ${cy + 130 * s}C${cx - 100 * s} ${cy + 165 * s} ${cx - 40 * s} ${cy + 140 * s} ${cx - 16 * s} ${cy + 90 * s}Z"/>
       <path d="M${cx + 16 * s} ${cy + 20 * s}C${cx + 90 * s} ${cy + 10 * s} ${cx + 150 * s} ${cy + 70 * s} ${cx + 130 * s} ${cy + 130 * s}C${cx + 100 * s} ${cy + 165 * s} ${cx + 40 * s} ${cy + 140 * s} ${cx + 16 * s} ${cy + 90 * s}Z"/>`
    : '';
  const refine = step >= 5
    ? `<path d="M${cx - 210 * s} ${cy - 40 * s}c20 ${-30 * s} 60 ${-50 * s} 95 ${-35 * s}M${cx + 210 * s} ${cy - 40 * s}c-20 ${-30 * s} -60 ${-50 * s} -95 ${-35 * s}"/>`
    : '';
  const sections = step >= 6
    ? `<path d="M${cx - 18 * s} ${cy - 10 * s}C${cx - 110 * s} ${cy - 90 * s} ${cx - 170 * s} ${cy - 70 * s} ${cx - 185 * s} ${cy - 10 * s}"/>
       <path d="M${cx + 18 * s} ${cy - 10 * s}C${cx + 110 * s} ${cy - 90 * s} ${cx + 170 * s} ${cy - 70 * s} ${cx + 185 * s} ${cy - 10 * s}"/>
       <path d="M${cx - 16 * s} ${cy + 40 * s}C${cx - 70 * s} ${cy + 50 * s} ${cx - 100 * s} ${cy + 90 * s} ${cx - 95 * s} ${cy + 120 * s}"/>
       <path d="M${cx + 16 * s} ${cy + 40 * s}C${cx + 70 * s} ${cy + 50 * s} ${cx + 100 * s} ${cy + 90 * s} ${cx + 95 * s} ${cy + 120 * s}"/>`
    : '';
  const patterns = step >= 7
    ? `<circle cx="${cx - 120 * s}" cy="${cy - 40 * s}" r="${10 * s}"/>
       <circle cx="${cx + 120 * s}" cy="${cy - 40 * s}" r="${10 * s}"/>
       <circle cx="${cx - 80 * s}" cy="${cy + 90 * s}" r="${8 * s}"/>
       <circle cx="${cx + 80 * s}" cy="${cy + 90 * s}" r="${8 * s}"/>
       <path d="M${cx - 160 * s} ${cy - 70 * s}c20 ${10 * s} 35 ${8 * s} 48 ${-5 * s}M${cx + 160 * s} ${cy - 70 * s}c-20 ${10 * s} -35 ${8 * s} -48 ${-5 * s}"/>`
    : '';
  const antennae = step >= 8
    ? `<path d="M${cx - 8 * s} ${cy - 90 * s}C${cx - 40 * s} ${cy - 150 * s} ${cx - 70 * s} ${cy - 170 * s} ${cx - 85 * s} ${cy - 175 * s}"/>
       <path d="M${cx + 8 * s} ${cy - 90 * s}C${cx + 40 * s} ${cy - 150 * s} ${cx + 70 * s} ${cy - 170 * s} ${cx + 85 * s} ${cy - 175 * s}"/>
       <circle cx="${cx - 85 * s}" cy="${cy - 175 * s}" r="${5 * s}"/>
       <circle cx="${cx + 85 * s}" cy="${cy - 175 * s}" r="${5 * s}"/>
       <ellipse cx="${cx}" cy="${cy - 70 * s}" rx="${10 * s}" ry="${8 * s}"/>`
    : '';
  const shade = step >= 9
    ? `<g stroke-width="${1.4 * s}" opacity="0.4">
         <path d="M${cx - 100 * s} ${cy - 80 * s}c30 ${20 * s} 55 ${25 * s} 80 ${10 * s}"/>
         <path d="M${cx + 100 * s} ${cy - 80 * s}c-30 ${20 * s} -55 ${25 * s} -80 ${10 * s}"/>
         <path d="M${cx - 20 * s} ${cy + 20 * s}v${80 * s}"/>
       </g>`
    : '';

  return `
    ${guides}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * s}" stroke-linecap="round" stroke-linejoin="round">
      ${center}${body}${upper}${lower}${refine}${sections}${patterns}${antennae}${shade}
    </g>`;
}

function dogArt({ cx, cy, scale = 1, step = 10, outline = COLORS.graphiteDark, guideOpacity = 0.42, showGuides = true, strokeWidth = 4 }) {
  const s = scale;
  const guides = showGuides ? constructionGuides(cx - 20 * s, cy - 30 * s, s * 0.9, guideOpacity) : '';
  const headAngle = step >= 1
    ? `<ellipse cx="${cx - 40 * s}" cy="${cy - 70 * s}" rx="${70 * s}" ry="${78 * s}" transform="rotate(-8 ${cx - 40 * s} ${cy - 70 * s})"/>`
    : '';
  const muzzle = step >= 2
    ? `<ellipse cx="${cx - 95 * s}" cy="${cy - 40 * s}" rx="${48 * s}" ry="${36 * s}"/>
       <path d="M${cx - 40 * s} ${cy - 100 * s}c-35 ${-10 * s} -70 ${5 * s} -95 ${35 * s}"/>`
    : '';
  const faceGuides = step >= 3
    ? `<path d="M${cx - 110 * s} ${cy - 70 * s}h${140 * s}M${cx - 40 * s} ${cy - 140 * s}v${140 * s}" stroke-dasharray="${8 * s} ${8 * s}"/>`
    : '';
  const eyesNose = step >= 4
    ? `<ellipse cx="${cx - 70 * s}" cy="${cy - 85 * s}" rx="${12 * s}" ry="${10 * s}"/>
       <ellipse cx="${cx - 20 * s}" cy="${cy - 88 * s}" rx="${12 * s}" ry="${10 * s}"/>
       <circle cx="${cx - 70 * s}" cy="${cy - 85 * s}" r="${4 * s}" fill="${outline}" stroke="none"/>
       <circle cx="${cx - 20 * s}" cy="${cy - 88 * s}" r="${4 * s}" fill="${outline}" stroke="none"/>
       <ellipse cx="${cx - 115 * s}" cy="${cy - 42 * s}" rx="${18 * s}" ry="${14 * s}"/>
       <path d="M${cx - 115 * s} ${cy - 30 * s}c-10 ${12 * s} 10 ${12 * s} 0 0"/>`
    : '';
  const ears = step >= 5
    ? `<path d="M${cx - 70 * s} ${cy - 130 * s}l-35 ${-55 * s}l55 ${25 * s}Z"/>
       <path d="M${cx + 10 * s} ${cy - 135 * s}l40 ${-50 * s}l-20 ${60 * s}Z"/>`
    : '';
  const body = step >= 6
    ? `<ellipse cx="${cx + 40 * s}" cy="${cy + 55 * s}" rx="${110 * s}" ry="${95 * s}"/>
       <path d="M${cx - 10 * s} ${cy - 20 * s}c20 ${10 * s} 35 ${35 * s} 30 ${70 * s}"/>`
    : '';
  const legs = step >= 7
    ? `<path d="M${cx - 20 * s} ${cy + 80 * s}v${90 * s}c0 ${12 * s} 18 ${18 * s} 30 ${10 * s}"/>
       <path d="M${cx + 40 * s} ${cy + 90 * s}v${80 * s}c0 ${12 * s} 18 ${18 * s} 28 ${10 * s}"/>
       <path d="M${cx + 100 * s} ${cy + 70 * s}c15 ${40 * s} 10 ${85 * s} -5 ${100 * s}"/>
       <ellipse cx="${cx - 5 * s}" cy="${cy + 175 * s}" rx="${22 * s}" ry="${10 * s}"/>
       <ellipse cx="${cx + 55 * s}" cy="${cy + 175 * s}" rx="${22 * s}" ry="${10 * s}"/>
       <ellipse cx="${cx + 105 * s}" cy="${cy + 170 * s}" rx="${20 * s}" ry="${10 * s}"/>`
    : '';
  const refineFace = step >= 8
    ? `<path d="M${cx - 95 * s} ${cy - 25 * s}c15 ${18 * s} 40 ${18 * s} 55 ${5 * s}"/>
       <path d="M${cx - 85 * s} ${cy - 100 * s}c8 ${-8 * s} 18 ${-8 * s} 26 0"/>
       <path d="M${cx - 35 * s} ${cy - 102 * s}c8 ${-8 * s} 18 ${-8 * s} 26 0"/>`
    : '';
  const fur = step >= 9
    ? `<g stroke-width="${1.5 * s}" opacity="0.45">
         <path d="M${cx - 20 * s} ${cy - 50 * s}c8 ${10 * s} 6 ${18 * s} -2 ${24 * s}"/>
         <path d="M${cx + 60 * s} ${cy + 20 * s}c10 ${8 * s} 8 ${18 * s} 0 ${26 * s}"/>
         <path d="M${cx - 60 * s} ${cy - 20 * s}c12 ${6 * s} 18 ${4 * s} 24 ${-4 * s}"/>
         <path d="M${cx + 20 * s} ${cy + 100 * s}c8 ${10 * s} 6 ${16 * s} -2 ${22 * s}"/>
       </g>`
    : '';
  const shade = step >= 10
    ? `<g stroke-width="${1.4 * s}" opacity="0.4">
         <path d="M${cx - 100 * s} ${cy - 55 * s}c10 ${15 * s} 8 ${28 * s} -2 ${38 * s}"/>
         <path d="M${cx + 80 * s} ${cy + 40 * s}c-8 ${20 * s} -6 ${40 * s} 4 ${55 * s}"/>
         <ellipse cx="${cx - 115 * s}" cy="${cy - 42 * s}" rx="${10 * s}" ry="${7 * s}" opacity="0.3"/>
       </g>`
    : '';

  return `
    ${guides}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * s}" stroke-linecap="round" stroke-linejoin="round">
      ${headAngle}${muzzle}${faceGuides}${eyesNose}${ears}${body}${legs}${refineFace}${fur}${shade}
    </g>`;
}

function eyeArt({ cx, cy, scale = 1, step = 10, outline = COLORS.graphiteDark, guideOpacity = 0.42, showGuides = true, strokeWidth = 4 }) {
  const s = scale;
  const guides = showGuides ? constructionGuides(cx, cy, s * 0.85, guideOpacity) : '';
  const axis = step >= 1 ? `<path d="M${cx - 220 * s} ${cy}h${440 * s}" stroke-dasharray="${8 * s} ${8 * s}"/>` : '';
  const corners = step >= 2
    ? `<circle cx="${cx - 170 * s}" cy="${cy + 8 * s}" r="${4 * s}" fill="${outline}" stroke="none"/>
       <circle cx="${cx + 170 * s}" cy="${cy - 4 * s}" r="${4 * s}" fill="${outline}" stroke="none"/>`
    : '';
  const lids = step >= 3
    ? `<path d="M${cx - 170 * s} ${cy + 8 * s}C${cx - 90 * s} ${cy - 95 * s} ${cx + 70 * s} ${cy - 100 * s} ${cx + 170 * s} ${cy - 4 * s}"/>
       <path d="M${cx - 170 * s} ${cy + 8 * s}C${cx - 80 * s} ${cy + 78 * s} ${cx + 80 * s} ${cy + 70 * s} ${cx + 170 * s} ${cy - 4 * s}"/>`
    : '';
  const iris = step >= 4 ? `<circle cx="${cx + 10 * s}" cy="${cy}" r="${72 * s}"/>` : '';
  const pupil = step >= 5
    ? `<circle cx="${cx + 10 * s}" cy="${cy}" r="${28 * s}" fill="${outline}" stroke="none"/>
       <circle cx="${cx - 8 * s}" cy="${cy - 22 * s}" r="${14 * s}" fill="${COLORS.paper}" stroke="${outline}" stroke-width="${2 * s}"/>
       <circle cx="${cx + 28 * s}" cy="${cy + 18 * s}" r="${6 * s}" fill="${COLORS.paper}" stroke="none" opacity="0.7"/>`
    : '';
  const crease = step >= 6
    ? `<path d="M${cx - 140 * s} ${cy - 35 * s}C${cx - 60 * s} ${cy - 120 * s} ${cx + 60 * s} ${cy - 125 * s} ${cx + 150 * s} ${cy - 40 * s}"/>`
    : '';
  const scleraShade = step >= 7
    ? `<g stroke-width="${1.5 * s}" opacity="0.35">
         <path d="M${cx - 130 * s} ${cy + 5 * s}c30 ${25 * s} 60 ${28 * s} 90 ${8 * s}"/>
         <path d="M${cx + 50 * s} ${cy + 10 * s}c25 ${18 * s} 55 ${15 * s} 85 ${-5 * s}"/>
         <path d="M${cx - 100 * s} ${cy - 20 * s}c20 ${-8 * s} 40 ${-8 * s} 60 0"/>
       </g>`
    : '';
  const irisTex = step >= 8
    ? `<g stroke-width="${1.3 * s}" opacity="0.5">
         ${Array.from({ length: 12 }, (_, i) => {
           const a = (Math.PI * 2 * i) / 12;
           const x1 = cx + 10 * s + Math.cos(a) * 30 * s;
           const y1 = cy + Math.sin(a) * 30 * s;
           const x2 = cx + 10 * s + Math.cos(a) * 68 * s;
           const y2 = cy + Math.sin(a) * 68 * s;
           return `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`;
         }).join('')}
       </g>`
    : '';
  const lashes = step >= 9
    ? `<g stroke-width="${2.2 * s}">
         <path d="M${cx - 140 * s} ${cy - 30 * s}c-8 ${-28 * s} -5 ${-45 * s} 5 ${-55 * s}"/>
         <path d="M${cx - 80 * s} ${cy - 70 * s}c-2 ${-30 * s} 5 ${-48 * s} 18 ${-55 * s}"/>
         <path d="M${cx} ${cy - 85 * s}c5 ${-28 * s} 15 ${-42 * s} 30 ${-48 * s}"/>
         <path d="M${cx + 70 * s} ${cy - 75 * s}c8 ${-25 * s} 22 ${-38 * s} 38 ${-42 * s}"/>
         <path d="M${cx + 130 * s} ${cy - 35 * s}c10 ${-18 * s} 22 ${-28 * s} 38 ${-30 * s}"/>
         <path d="M${cx - 100 * s} ${cy + 55 * s}c-5 ${18 * s} -2 ${28 * s} 8 ${32 * s}"/>
         <path d="M${cx} ${cy + 65 * s}c2 ${16 * s} 8 ${24 * s} 18 ${26 * s}"/>
         <path d="M${cx + 90 * s} ${cy + 45 * s}c8 ${14 * s} 18 ${18 * s} 28 ${16 * s}"/>
         <path d="M${cx - 80 * s} ${cy - 145 * s}c40 ${-20 * s} 100 ${-25 * s} 160 ${-5 * s}"/>
       </g>`
    : '';
  const refine = step >= 10
    ? `<g stroke-width="${1.4 * s}" opacity="0.4">
         <path d="M${cx + 10 * s} ${cy - 50 * s}c20 ${8 * s} 30 ${25 * s} 28 ${45 * s}"/>
         <path d="M${cx - 140 * s} ${cy + 5 * s}c15 ${8 * s} 25 ${8 * s} 40 0"/>
         <ellipse cx="${cx - 155 * s}" cy="${cy + 5 * s}" rx="${12 * s}" ry="${8 * s}" opacity="0.25"/>
       </g>`
    : '';

  return `
    ${guides}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * s}" stroke-linecap="round" stroke-linejoin="round">
      ${axis}${corners}${lids}${iris}${pupil}${crease}${scleraShade}${irisTex}${lashes}${refine}
    </g>`;
}

function roseArt({ cx, cy, scale = 1, step = 10, outline = COLORS.graphiteDark, guideOpacity = 0.42, showGuides = true, strokeWidth = 4 }) {
  const s = scale;
  const guides = showGuides ? constructionGuides(cx, cy - 40 * s, s * 0.85, guideOpacity) : '';
  const center = step >= 1
    ? `<path d="M${cx} ${cy - 40 * s}c12 0 20 ${10 * s} 18 ${22 * s}c-2 ${14 * s} -16 ${20 * s} -28 ${14 * s}c-14 ${-6 * s} -16 ${-24 * s} -4 ${-34 * s}c8 ${-8 * s} 20 ${-6 * s} 28 ${4 * s}"/>`
    : '';
  const firstPetals = step >= 2
    ? `<path d="M${cx - 10 * s} ${cy - 55 * s}C${cx - 45 * s} ${cy - 80 * s} ${cx - 70 * s} ${cy - 40 * s} ${cx - 45 * s} ${cy - 15 * s}C${cx - 25 * s} ${cy} ${cx - 5 * s} ${cy - 10 * s} ${cx} ${cy - 25 * s}"/>
       <path d="M${cx + 10 * s} ${cy - 50 * s}C${cx + 50 * s} ${cy - 75 * s} ${cx + 75 * s} ${cy - 35 * s} ${cx + 48 * s} ${cy - 8 * s}C${cx + 28 * s} ${cy + 8 * s} ${cx + 8 * s} ${cy - 5 * s} ${cx} ${cy - 20 * s}"/>`
    : '';
  const middle = step >= 3
    ? `<path d="M${cx - 20 * s} ${cy - 70 * s}C${cx - 80 * s} ${cy - 110 * s} ${cx - 120 * s} ${cy - 40 * s} ${cx - 85 * s} ${cy + 10 * s}C${cx - 55 * s} ${cy + 45 * s} ${cx - 10 * s} ${cy + 30 * s} ${cx} ${cy} "/>
       <path d="M${cx + 15 * s} ${cy - 65 * s}C${cx + 85 * s} ${cy - 105 * s} ${cx + 125 * s} ${cy - 30 * s} ${cx + 90 * s} ${cy + 20 * s}C${cx + 55 * s} ${cy + 55 * s} ${cx + 15 * s} ${cy + 35 * s} ${cx + 5 * s} ${cy + 5 * s}"/>
       <path d="M${cx - 5 * s} ${cy + 15 * s}C${cx - 40 * s} ${cy + 70 * s} ${cx + 40 * s} ${cy + 75 * s} ${cx + 20 * s} ${cy + 20 * s}"/>`
    : '';
  const outer = step >= 4
    ? `<path d="M${cx - 40 * s} ${cy - 90 * s}C${cx - 130 * s} ${cy - 140 * s} ${cx - 175 * s} ${cy - 40 * s} ${cx - 130 * s} ${cy + 40 * s}C${cx - 90 * s} ${cy + 95 * s} ${cx - 20 * s} ${cy + 80 * s} ${cx} ${cy + 35 * s}"/>
       <path d="M${cx + 30 * s} ${cy - 85 * s}C${cx + 130 * s} ${cy - 135 * s} ${cx + 180 * s} ${cy - 30 * s} ${cx + 135 * s} ${cy + 50 * s}C${cx + 95 * s} ${cy + 105 * s} ${cx + 25 * s} ${cy + 85 * s} ${cx + 5 * s} ${cy + 40 * s}"/>
       <path d="M${cx - 50 * s} ${cy + 30 * s}C${cx - 90 * s} ${cy + 110 * s} ${cx + 70 * s} ${cy + 120 * s} ${cx + 45 * s} ${cy + 40 * s}"/>`
    : '';
  const overlaps = step >= 5
    ? `<path d="M${cx - 60 * s} ${cy - 20 * s}c20 ${25 * s} 45 ${30 * s} 70 ${10 * s}"/>
       <path d="M${cx + 40 * s} ${cy - 10 * s}c-15 ${30 * s} -40 ${40 * s} -70 ${25 * s}"/>
       <path d="M${cx} ${cy + 10 * s}c-25 ${20 * s} -20 ${45 * s} 5 ${55 * s}"/>`
    : '';
  const sepals = step >= 6
    ? `<path d="M${cx - 35 * s} ${cy + 70 * s}l-25 ${45 * s}l40 ${-20 * s}"/>
       <path d="M${cx} ${cy + 85 * s}l5 ${50 * s}l-10 0"/>
       <path d="M${cx + 35 * s} ${cy + 70 * s}l25 ${45 * s}l-40 ${-20 * s}"/>
       <path d="M${cx - 55 * s} ${cy + 55 * s}l-30 ${25 * s}l35 ${5 * s}"/>
       <path d="M${cx + 55 * s} ${cy + 55 * s}l30 ${25 * s}l-35 ${5 * s}"/>`
    : '';
  const stem = step >= 7
    ? `<path d="M${cx} ${cy + 95 * s}C${cx + 15 * s} ${cy + 180 * s} ${cx - 10 * s} ${cy + 260 * s} ${cx + 8 * s} ${cy + 340 * s}"/>
       <path d="M${cx + 25 * s} ${cy + 180 * s}l18 ${-8 * s}M${cx - 5 * s} ${cy + 240 * s}l-15 ${-6 * s}"/>`
    : '';
  const leaves = step >= 8
    ? `<path d="M${cx + 5 * s} ${cy + 200 * s}C${cx + 70 * s} ${cy + 170 * s} ${cx + 120 * s} ${cy + 190 * s} ${cx + 130 * s} ${cy + 230 * s}C${cx + 90 * s} ${cy + 235 * s} ${cx + 40 * s} ${cy + 225 * s} ${cx + 8 * s} ${cy + 210 * s}"/>
       <path d="M${cx + 5 * s} ${cy + 200 * s}C${cx + 55 * s} ${cy + 195 * s} ${cx + 95 * s} ${cy + 210 * s} ${cx + 130 * s} ${cy + 230 * s}"/>
       <path d="M${cx - 2 * s} ${cy + 255 * s}C${cx - 70 * s} ${cy + 230 * s} ${cx - 115 * s} ${cy + 250 * s} ${cx - 120 * s} ${cy + 295 * s}C${cx - 80 * s} ${cy + 295 * s} ${cx - 35 * s} ${cy + 280 * s} ${cx} ${cy + 265 * s}"/>
       <path d="M${cx - 2 * s} ${cy + 255 * s}C${cx - 50 * s} ${cy + 250 * s} ${cx - 90 * s} ${cy + 270 * s} ${cx - 120 * s} ${cy + 295 * s}"/>`
    : '';
  const clean = step >= 9
    ? `<path d="M${cx - 100 * s} ${cy - 40 * s}c30 ${-40 * s} 80 ${-50 * s} 120 ${-20 * s}" opacity="0.5"/>`
    : '';
  const shade = step >= 10
    ? `<g stroke-width="${1.4 * s}" opacity="0.4">
         <path d="M${cx - 40 * s} ${cy - 30 * s}c15 ${20 * s} 20 ${40 * s} 10 ${55 * s}"/>
         <path d="M${cx + 50 * s} ${cy}c-10 ${25 * s} -5 ${45 * s} 15 ${55 * s}"/>
         <path d="M${cx + 5 * s} ${cy + 150 * s}c5 ${40 * s} -5 ${80 * s} 2 ${120 * s}"/>
         <path d="M${cx + 40 * s} ${cy + 210 * s}c20 ${5 * s} 40 ${10 * s} 55 ${20 * s}"/>
       </g>`
    : '';

  return `
    ${guides}
    <g fill="none" stroke="${outline}" stroke-width="${strokeWidth * s}" stroke-linecap="round" stroke-linejoin="round">
      ${center}${firstPetals}${middle}${outer}${overlaps}${sepals}${stem}${leaves}${clean}${shade}
    </g>`;
}

const TUTORIALS = [
  {
    slug: 'cat-drawing',
    title: 'Cat Drawing',
    label: 'CAT DRAWING',
    steps: 9,
    tagline: 'Beginner step-by-step tutorial',
    chip: 'head, ears, paws, tail',
    art: catArt,
    instructions: [
      'Draw the cat head circle.',
      'Add face guidelines.',
      'Build chest and rear body.',
      'Draw the triangular ears.',
      'Add eyes, nose, and mouth.',
      'Draw front legs and paws.',
      'Shape the hind leg and body.',
      'Add the tail and whiskers.',
      'Clean, shade, or color.',
    ],
    artCx: 760,
    artCy: 380,
    artScale: 1.0,
  },
  {
    slug: 'butterfly-drawing',
    title: 'Butterfly Drawing',
    label: 'BUTTERFLY DRAWING',
    steps: 9,
    tagline: 'Beginner wing tutorial',
    chip: 'body, wings, patterns',
    art: butterflyArt,
    instructions: [
      'Draw the center guideline.',
      'Build the butterfly body.',
      'Add the upper wings.',
      'Add the lower wings.',
      'Refine the wing silhouette.',
      'Draw internal wing sections.',
      'Add wing patterns.',
      'Draw antennae and body detail.',
      'Shade or color the butterfly.',
    ],
    artCx: 760,
    artCy: 360,
    artScale: 0.95,
  },
  {
    slug: 'dog-drawing',
    title: 'Dog Drawing',
    label: 'DOG DRAWING',
    steps: 10,
    tagline: 'Realistic pencil tutorial',
    chip: 'muzzle, ears, fur, paws',
    art: dogArt,
    instructions: [
      'Set the head angle.',
      'Draw skull and muzzle shapes.',
      'Add facial guidelines.',
      'Place the eyes and nose.',
      'Draw the ears.',
      'Build the chest and body.',
      'Add legs and paws.',
      'Refine facial features.',
      'Add fur direction.',
      'Shade and finish the dog.',
    ],
    artCx: 780,
    artCy: 360,
    artScale: 0.95,
  },
  {
    slug: 'eye-drawing',
    title: 'Eye Drawing',
    label: 'EYE DRAWING',
    steps: 10,
    tagline: 'Realistic pencil tutorial',
    chip: 'lids, iris, lashes, values',
    art: eyeArt,
    instructions: [
      'Draw the eye axis.',
      'Mark inner and outer corners.',
      'Shape upper and lower eyelids.',
      'Place the iris.',
      'Add pupil and highlights.',
      'Draw the eyelid crease.',
      'Shade the eyeball.',
      'Add iris texture.',
      'Draw eyelashes and brows.',
      'Refine realistic values.',
    ],
    artCx: 760,
    artCy: 380,
    artScale: 1.05,
  },
  {
    slug: 'rose-drawing',
    title: 'Rose Drawing',
    label: 'ROSE DRAWING',
    steps: 10,
    tagline: 'Easy pencil tutorial',
    chip: 'petals, stem, leaves',
    art: roseArt,
    instructions: [
      'Draw the inner rose center.',
      'Add the first folded petals.',
      'Build the middle petal ring.',
      'Add larger outer petals.',
      'Refine petal overlaps.',
      'Draw the sepals.',
      'Add the curved stem.',
      'Draw the leaves.',
      'Clean the final outline.',
      'Shade or color the rose.',
    ],
    artCx: 760,
    artCy: 300,
    artScale: 0.95,
  },
];

async function renderWebp(svg, outputPath, width, height, quality = 82) {
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await sharp(Buffer.from(svg))
    .resize(width, height, { fit: 'cover', position: 'center', background: COLORS.paper })
    .webp({ quality, effort: 5 })
    .toFile(outputPath);
}

function featureSvg(tutorial, width, height, variant = 'feature') {
  const artCx = variant === 'og' ? 790 : tutorial.artCx;
  const artCy = variant === 'og' ? tutorial.artCy - 40 : tutorial.artCy;
  const artScale = variant === 'og' ? tutorial.artScale * 0.9 : tutorial.artScale;
  const headingSize = variant === 'og' ? 64 : 70;
  const words = tutorial.title.split(' ');

  return editorialFrame(
    width,
    height,
    `
    <g filter="url(#softShadow)">
      <rect x="${artCx - 260 * artScale}" y="${artCy - 240 * artScale}" width="${520 * artScale}" height="${variant === 'og' ? 460 * artScale : 560 * artScale}" rx="36" fill="#FFFFFF" opacity="0.64"/>
    </g>
    ${tutorial.art({ cx: artCx, cy: artCy, scale: artScale, step: tutorial.steps, guideOpacity: 0.32, strokeWidth: 4 })}
    <g font-family="Arial, Helvetica, sans-serif">
      <text x="84" y="118" font-size="25" font-weight="700" fill="${COLORS.green}" letter-spacing="5">DRAWINGING</text>
      <text x="84" y="205" font-size="${headingSize}" font-weight="800" fill="${COLORS.graphiteDark}">${escapeXml(words[0])}</text>
      <text x="84" y="${variant === 'og' ? 276 : 286}" font-size="${headingSize}" font-weight="800" fill="${COLORS.graphiteDark}">${escapeXml(words.slice(1).join(' '))}</text>
      <text x="88" y="${variant === 'og' ? 338 : 360}" font-size="28" fill="${COLORS.green}">${escapeXml(tutorial.tagline)}</text>
      <rect x="84" y="${height - 150}" width="440" height="62" rx="31" fill="#FFFFFF" opacity="0.78" stroke="${COLORS.warmLine}" stroke-width="2"/>
      <text x="116" y="${height - 110}" font-size="23" fill="${COLORS.graphiteDark}">${escapeXml(tutorial.chip)}</text>
    </g>`,
  );
}

function stepSvg(tutorial, step) {
  const width = 900;
  const height = 900;
  const guideOpacity = step >= tutorial.steps - 1 ? 0.22 : 0.48;
  const strokeWidth = step >= tutorial.steps - 1 ? 4.6 : 3.8;
  const cy = tutorial.slug === 'rose-drawing' ? 300 : tutorial.slug === 'eye-drawing' ? 400 : 360;

  return editorialFrame(
    width,
    height,
    `
    <g transform="translate(0 18)">
      ${tutorial.art({
        cx: 450,
        cy,
        scale: tutorial.slug === 'eye-drawing' ? 1.05 : 0.95,
        step,
        guideOpacity,
        strokeWidth,
        outline: step >= tutorial.steps - 1 ? COLORS.graphiteDark : '#5B5751',
      })}
    </g>
    <g font-family="Arial, Helvetica, sans-serif">
      <rect x="72" y="72" width="112" height="112" rx="34" fill="${COLORS.green}"/>
      <text x="128" y="145" text-anchor="middle" font-size="52" font-weight="800" fill="#FFFFFF">${step}</text>
      <text x="214" y="116" font-size="22" font-weight="700" fill="${COLORS.green}" letter-spacing="3">${escapeXml(tutorial.label)}</text>
      <text x="214" y="168" font-size="48" font-weight="800" fill="${COLORS.graphiteDark}">Step ${step} of ${tutorial.steps}</text>
      <rect x="78" y="756" width="744" height="72" rx="36" fill="#FFFFFF" opacity="0.82" stroke="${COLORS.warmLine}" stroke-width="2"/>
      <text x="450" y="802" text-anchor="middle" font-size="24" fill="${COLORS.graphiteDark}">${escapeXml(tutorial.instructions[step - 1])}</text>
    </g>`,
  );
}

function worksheetSvg(tutorial) {
  const stepCount = Math.min(tutorial.steps, 9);
  const stepBoxes = Array.from({ length: stepCount }, (_, index) => {
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
        ${tutorial.art({ cx: x + 121, cy: y + 52, scale: 0.14, step, guideOpacity: 0.15, strokeWidth: 2, outline: '#111111', showGuides: false })}
      </g>`;
  }).join('');

  const extra = tutorial.steps > 9
    ? `<text x="54" y="560" font-size="14" fill="#333333">Continue with steps 10+ on the practice page: refine details, fur/iris texture, and final shading.</text>`
    : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${PAGE.width}" height="${PAGE.height}" viewBox="0 0 ${PAGE.width} ${PAGE.height}">
  <rect width="${PAGE.width}" height="${PAGE.height}" fill="#FFFFFF"/>
  <text x="54" y="58" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700" fill="#0E5A43" letter-spacing="4">DRAWINGING</text>
  <text x="54" y="100" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800" fill="#111111">${escapeXml(tutorial.title)} Worksheet</text>
  <text x="54" y="132" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#333333">Difficulty: Beginner · Materials: HB pencil, 2B pencil, eraser, paper</text>
  <text x="54" y="158" font-family="Arial, Helvetica, sans-serif" font-size="16" fill="#333333">Follow the numbered boxes, then trace and practise on the lower page.</text>
  <rect x="54" y="172" width="686" height="2" fill="#111111"/>
  ${stepBoxes}
  ${extra}
  <text x="54" y="595" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#111111">Tracing section</text>
  <rect x="54" y="610" width="320" height="220" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="1.8"/>
  ${tutorial.art({ cx: 214, cy: 700, scale: 0.28, step: tutorial.steps, guideOpacity: 0.12, strokeWidth: 2.2, outline: '#777777', showGuides: false })}
  <text x="400" y="595" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" fill="#111111">Blank practice</text>
  <rect x="400" y="610" width="340" height="220" rx="10" fill="#FFFFFF" stroke="#111111" stroke-width="1.8"/>
  <path d="M430 680h280M430 740h280M430 800h180" stroke="#DDDDDD" stroke-width="1.5"/>
  <text x="54" y="880" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#555555">Tip: keep construction lines light until proportions feel correct.</text>
  <text x="54" y="1060" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#111111">Drawinging.com · Printable practice worksheet</text>
  <text x="540" y="1060" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#555555">For personal practice only</text>
</svg>`;
}

function writePdf(svgPath, pdfPath, title) {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({ size: [PAGE.width, PAGE.height], margin: 0, info: { Title: title, Author: 'Drawinging' } });
    const stream = createWriteStream(pdfPath);
    doc.pipe(stream);
    try {
      const png = await sharp(await fs.readFile(svgPath)).png().toBuffer();
      doc.image(png, 0, 0, { width: PAGE.width, height: PAGE.height });
      doc.end();
    } catch (error) {
      reject(error);
      return;
    }
    stream.on('finish', resolve);
    stream.on('error', reject);
  });
}

async function generateTutorial(tutorial) {
  const dir = path.join(publicDir, 'images', 'tutorials', tutorial.slug);
  await fs.mkdir(dir, { recursive: true });

  await renderWebp(featureSvg(tutorial, 1200, 800, 'feature'), path.join(dir, `${tutorial.slug}.webp`), 1200, 800);
  await renderWebp(featureSvg(tutorial, 1200, 630, 'og'), path.join(dir, `${tutorial.slug}-og.webp`), 1200, 630);

  for (let step = 1; step <= tutorial.steps; step += 1) {
    await renderWebp(stepSvg(tutorial, step), path.join(dir, `${tutorial.slug}-step-${step}.webp`), 900, 900);
  }

  const worksheetDir = path.join(publicDir, 'worksheets');
  const previewDir = path.join(worksheetDir, 'previews');
  await fs.mkdir(previewDir, { recursive: true });

  const svg = worksheetSvg(tutorial);
  const svgPath = path.join(worksheetDir, `${tutorial.slug}-worksheet.svg`);
  const pdfPath = path.join(worksheetDir, `${tutorial.slug}-worksheet.pdf`);
  const previewPath = path.join(previewDir, `${tutorial.slug}-worksheet.webp`);

  await fs.writeFile(svgPath, svg, 'utf8');
  await writePdf(svgPath, pdfPath, `${tutorial.title} Worksheet`);
  await renderWebp(svg, previewPath, 794, 1123, 85);

  console.log(`Generated assets for ${tutorial.slug}`);
}

async function main() {
  for (const tutorial of TUTORIALS) {
    await generateTutorial(tutorial);
  }
  console.log('All five tutorial asset sets generated.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

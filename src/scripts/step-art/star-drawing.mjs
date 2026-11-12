// Star Drawing — 7 steps. Star polygon computed once (centre 450,460, outer R240, inner r96) and reused.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="460" r="240"/><circle cx="450" cy="460" r="96"/><path d="M185 460 H715 M450 195 V725"/></g>`;

const STAR = `M450 220 L506 382 L678 386 L541 490 L591 654 L450 556 L309 654 L359 490 L222 386 L394 382 Z`;
const PENT = `M394 382 L506 382 L541 490 L450 556 L359 490 Z`;
const SPOKES = `M450 460 L450 220 M450 460 L678 386 M450 460 L591 654 M450 460 L309 654 M450 460 L222 386`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${STAR}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linejoin="round"><path d="${PENT}"/><path d="${SPOKES}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${STAR}"/></g>`;

const sparkle = (cx, cy, r) => `M${cx} ${cy - r} C${cx + r * 0.18} ${cy - r * 0.18} ${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} C${cx + r * 0.18} ${cy + r * 0.18} ${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} C${cx - r * 0.18} ${cy + r * 0.18} ${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} C${cx - r * 0.18} ${cy - r * 0.18} ${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r} Z`;
const L5 = (s) => `<g fill="${s}"><path d="${sparkle(248, 258, 26)}"/><path d="${sparkle(656, 246, 20)}"/><path d="${sparkle(668, 560, 16)}"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round">
<ellipse cx="450" cy="712" rx="215" ry="18" fill="#f3e3c2"/>
<path d="${STAR}" fill="#ffc53d" stroke="#2b2620" stroke-width="5.5"/>
<path d="M450 460 L450 556 L309 654 L359 490 Z M450 460 L541 490 L591 654 L450 556 Z" fill="#f5a623" opacity="0.6"/>
<path d="${PENT}" fill="none" stroke="#d98a06" stroke-width="3.5"/>
<path d="${SPOKES}" fill="none" stroke="#d98a06" stroke-width="3.5"/>
<ellipse cx="415" cy="330" rx="14" ry="26" fill="#ffffff" opacity="0.7" transform="rotate(-14 415 330)"/>
<g fill="#ffdf6b" stroke="#2b2620" stroke-width="3"><path d="${sparkle(248, 258, 26)}"/><path d="${sparkle(656, 246, 20)}"/><path d="${sparkle(668, 560, 16)}"/></g>
</g>`;

export default {
  slug: 'star-drawing',
  subject: 'Star Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the five points.',
    'Set the center and angles.',
    'Refine the outside contour.',
    'Add sparkle details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

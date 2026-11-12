// Volleyball Drawing — 7 steps. Ball centre (450,470) r235. Four seam curves (top, left,
// middle, bottom, right) defined once; colour panels are closed regions from the same curves.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="470" r="235"/><circle cx="450" cy="470" r="110"/><path d="M185 470 H715 M450 205 V735"/></g>`;

const CIRCLE = `<circle cx="450" cy="470" r="235"/>`;
const T = `M258 335 C352 282 518 270 644 338`;
const L = `M258 335 C306 452 312 556 338 664`;
const M = `M450 290 C442 392 444 516 466 622`;
const B = `M338 664 C420 606 506 596 588 652`;
const R = `M644 338 C612 448 604 556 588 652`;
const SEAMS = `${T} ${L} ${M} ${B} ${R}`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${CIRCLE}</g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round"><path d="${SEAMS}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="7">${CIRCLE}</g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round"><path d="M292 372 C340 462 348 552 366 636 M486 306 C480 400 482 506 498 606"/><circle cx="540" cy="360" r="3.5" fill="${s}" stroke="none"/><circle cx="566" cy="392" r="3.5" fill="${s}" stroke="none"/><circle cx="520" cy="398" r="3.5" fill="${s}" stroke="none"/></g>`;

const L6 = (s) => ``;

// Panel regions closed from the same seam curves (reversed where needed) + rim arcs.
const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="450" cy="722" rx="225" ry="18" fill="#f3e3c2"/>
<circle cx="450" cy="470" r="235" fill="#ffffff"/>
<path d="M258 335 C352 282 518 270 644 338 A235 235 0 0 0 258 335 Z" fill="#ffc53d"/>
<path d="M258 335 C306 452 312 556 338 664 C420 606 440 600 466 622 C444 516 442 392 450 290 C380 282 310 300 258 335 Z" fill="#ffffff"/>
<path d="M450 290 C500 292 580 306 644 338 C612 448 604 556 588 652 C506 596 440 600 466 622 C444 516 442 392 450 290 Z" fill="#3a7bd5"/>
<path d="M338 664 C420 606 506 596 588 652 A235 235 0 0 1 338 664 Z" fill="#ffc53d"/>
<circle cx="450" cy="470" r="235" fill="none" stroke="#2b2620" stroke-width="6"/>
<path d="${SEAMS}" fill="none" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="345" cy="330" rx="30" ry="17" fill="#ffffff" opacity="0.85" transform="rotate(-32 345 330)"/>
</g>`;

export default {
  slug: 'volleyball-drawing',
  subject: 'Volleyball Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the sphere.',
    'Set the curved panels and seams.',
    'Refine the outside contour.',
    'Add panel curve details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

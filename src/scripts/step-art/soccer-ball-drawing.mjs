// Soccer Ball Drawing — 7 steps. Ball centre (450,470) r235; central pentagon r78,
// seam spokes to r160 ring points, rim connectors to r235 — all defined once.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="470" r="235"/><circle cx="450" cy="470" r="90"/><path d="M185 470 H715 M450 205 V735"/></g>`;

const CIRCLE = `<circle cx="450" cy="470" r="235"/>`;
const PENT = `M450 392 L524 446 L496 533 L404 533 L376 446 Z`;
const SEAMS = `M450 392 L450 310 M524 446 L602 421 M496 533 L544 599 M404 533 L356 599 M376 446 L298 421 M450 310 L602 421 L544 599 L356 599 L298 421 Z M450 310 L450 235 M602 421 L674 397 M544 599 L588 660 M356 599 L312 660 M298 421 L226 397`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${CIRCLE}</g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round"><path d="${PENT}"/><path d="${SEAMS}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="7">${CIRCLE}</g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round"><path d="M438 351 H462 M555 425 L571 441 M489 573 L505 557 M395 557 L411 573 M329 441 L345 425"/><path d="M380 636 C430 618 480 618 530 636"/></g>`;

const L6 = (s) => ``;

const PATCH = `M450 208 L511 252 L488 324 L412 324 L389 252 Z`;
const PATCHES = [0, 72, 144, 216, 288].map((a) => `<g transform="rotate(${a} 450 470)"><path d="${PATCH}"/></g>`).join('');
const colorArt = `<g stroke-linejoin="round">
<ellipse cx="450" cy="722" rx="225" ry="18" fill="#f3e3c2"/>
<clipPath id="sbclip"><circle cx="450" cy="470" r="235"/></clipPath>
<circle cx="450" cy="470" r="235" fill="#ffffff" stroke="#2b2620" stroke-width="6"/>
<g fill="#2b2620" clip-path="url(#sbclip)">${PATCHES}</g>
<path d="${PENT}" fill="#2b2620"/>
<path d="${SEAMS}" fill="none" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="345" cy="330" rx="34" ry="20" fill="#ffffff" opacity="0.9" transform="rotate(-32 345 330)"/>
</g>`;

export default {
  slug: 'soccer-ball-drawing',
  subject: 'Soccer Ball Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the sphere.',
    'Set the pentagons and hexagons.',
    'Refine the outside contour.',
    'Add stitched seam details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

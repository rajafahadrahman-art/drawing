// Mountain Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M415 258 L268 652 L562 652 Z"/><path d="M606 352 L498 652 L714 652 Z"/><path d="M160 652 H740"/></g>`;

const RIDGE = `M168 652 L252 470 L292 512 L338 432 L415 258 L472 392 L512 340 L548 442 L606 352 L664 470 L732 652`;
const FACETS = `M415 258 L462 428 M415 258 L368 452 M415 258 L428 372 M606 352 L640 472 M472 392 L524 472`;
const SNOW1 = `M382 330 L396 306 L408 328 L420 304 L432 328 L446 310 C438 290 428 274 415 260 C402 274 392 298 382 330 Z`;
const SNOW2 = `M582 384 L595 364 L606 386 L618 366 L632 384 C626 366 618 356 606 348 C594 356 586 368 582 384 Z`;
const ROCKS = `M348 478 l-18 26 M486 436 l20 22 M560 486 l-14 24 M300 540 l22 8 M648 520 l-20 10`;
function pine(x, base, h) {
  return `M${(x - h * 0.34).toFixed(1)} ${base} L${x} ${base - h} L${(x + h * 0.34).toFixed(1)} ${base} Z M${x} ${base} v7`;
}
let treeline = '';
for (let x = 205; x <= 700; x += 47) treeline += `<path d="${pine(x, 648, 30)}"/>`;
const BIGPINES = `<path d="${pine(222, 656, 52)}"/><path d="${pine(688, 656, 58)}"/>`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="${RIDGE}"/><path d="M168 652 H732"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="${FACETS}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${RIDGE}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${SNOW1}"/><path d="${SNOW2}"/><path d="${ROCKS}"/>${treeline}</g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#aebfd6" stroke="#2b2620" stroke-width="5"><path d="${RIDGE} L732 652 L168 652 Z"/></g>
<g fill="#8fa5c2"><path d="M415 258 L472 392 L512 340 L548 442 L606 352 L664 470 L732 652 L560 652 C520 560 478 420 415 258 Z"/></g>
<g fill="#ffffff" stroke="#2b2620" stroke-width="4"><path d="${SNOW1}"/><path d="${SNOW2}"/></g>
<g fill="none" stroke="#5b7292" stroke-width="3.5"><path d="${FACETS}"/><path d="${ROCKS}"/></g>
<path d="M168 652 L168 616 C300 590 420 640 540 616 C620 602 690 622 732 608 L732 652 Z" fill="#7fb069" stroke="#2b2620" stroke-width="4"/>
<g fill="#2e7d32" stroke="#2b2620" stroke-width="2.5">${treeline}${BIGPINES}</g>
</g>`;

export default {
  slug: 'mountain-drawing',
  subject: 'Mountain Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the ridge line.',
    'Set the peak and slopes.',
    'Refine the outside contour.',
    'Add snow caps and rock details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

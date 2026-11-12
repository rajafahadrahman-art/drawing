// Pumpkin Drawing — 7 steps. One outline + one rib set, reused in layers and colour.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="493" rx="232" ry="171"/><path d="M450 290 V700 M200 493 H700"/></g>`;

const OUTLINE = `M450 322 C590 322 682 396 682 493 C682 590 590 664 450 664 C310 664 218 590 218 493 C218 396 310 322 450 322 Z`;
const RIBS = `M430 334 C404 420 404 566 430 652 M470 334 C496 420 496 566 470 652 M382 340 C340 420 340 566 382 646 M518 340 C560 420 560 566 518 646 M336 352 C272 424 272 562 336 634 M564 352 C628 424 628 562 564 634`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round"><path d="${RIBS}"/></g><g fill="none" stroke="${s}" stroke-width="5"><path d="${OUTLINE}"/></g>`;

const STEM = `M424 330 C428 296 440 272 466 258 C486 266 492 288 484 330 Z`;
const CURL = `M486 268 C530 240 576 258 572 292 C569 318 540 324 532 306 C526 292 538 280 550 286`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"><path d="${STEM}"/><path d="${CURL}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${OUTLINE}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round"><path d="M440 292 C442 302 442 312 441 322 M462 278 C464 292 464 308 462 324"/><path d="M382 420 C376 414 372 406 370 396 M518 566 C524 572 528 580 530 590 M336 470 C330 464 326 456 324 446 M564 500 C570 494 574 486 576 476"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="450" cy="688" rx="240" ry="20" fill="#f3e3c2"/>
<path d="${OUTLINE}" fill="#f28c28" stroke="#2b2620" stroke-width="5.5"/>
<path d="${RIBS}" fill="none" stroke="#d96f12" stroke-width="5"/>
<path d="M336 352 C272 424 272 562 336 634 C300 560 296 430 336 352 Z" fill="#d96f12" opacity="0.45"/>
<ellipse cx="330" cy="420" rx="18" ry="34" fill="#ffffff" opacity="0.35" transform="rotate(-16 330 420)"/>
<path d="${STEM}" fill="#5b8c3e" stroke="#2b2620" stroke-width="5"/>
<path d="M440 292 C442 302 442 312 441 322 M462 278 C464 292 464 308 462 324" fill="none" stroke="#3e6327" stroke-width="3.5"/>
<path d="${CURL}" fill="none" stroke="#5b8c3e" stroke-width="6"/>
</g>`;

export default {
  slug: 'pumpkin-drawing',
  subject: 'Pumpkin Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the ribs.',
    'Set the stem and vine curl.',
    'Refine the outside contour.',
    'Add grooves and stem ridges.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

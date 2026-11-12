// Tulip Drawing — 7 steps, from the tutorial's own step list.
// Upright cup with a three-point rim and petal seams, straight stem, two long leaves.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="338" rx="108" ry="112"/><path d="M450 208 V752 M312 500 C336 620 392 700 446 736 M588 540 C562 640 508 700 454 736"/></g>`;

// Step 1 is construction only — the guides carry it.
const L1 = () => ``;

// Step 2 — the cup: silhouette with three rim points, plus two petal seams.
const CUP = `M450 448 C398 448 384 380 388 272 C402 292 416 296 428 288 C432 262 440 246 450 238 C460 246 468 262 472 288 C484 296 498 292 512 272 C516 380 502 448 450 448 Z`;
const SEAMS = `<path d="M428 288 C424 340 428 396 438 440"/><path d="M472 288 C476 340 472 396 462 440"/>`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round"><path d="${CUP}"/>${SEAMS}</g>`;

// Step 3 — stem and two long leaves sweeping up from the base.
const STEM = `<path d="M441 448 C438 540 439 650 441 748"/><path d="M459 448 C462 540 461 650 459 748"/>`;
const LEAF_L = `M448 746 C340 700 292 580 300 428 C322 570 380 680 452 722 Z`;
const LEAF_R = `M452 746 C536 706 592 612 600 500 C584 616 530 706 456 724 Z`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${STEM}<path d="${LEAF_L}"/><path d="${LEAF_R}"/></g>`;

// Step 4 — refine the outside contour: re-trace cup and leaf edges with weight.
const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${CUP}"/><path d="${LEAF_L}"/><path d="${LEAF_R}"/></g>`;

// Step 5 — details: centre vein, inner seam shading lines, leaf veins.
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round"><path d="M450 268 C448 330 448 390 450 438"/><path d="M404 320 C402 370 406 410 414 436"/><path d="M496 320 C498 370 494 410 486 436"/><path d="M440 716 C368 664 322 570 318 452"/><path d="M462 718 C524 672 570 606 588 524"/></g>`;

// Step 6 is the clean step — nothing new.
const L6 = () => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#8fce6e" stroke="#2b2620" stroke-width="5"><path d="${LEAF_L}"/><path d="${LEAF_R}"/></g>
<path d="M441 448 C438 540 439 650 441 748 L459 748 C461 650 462 540 459 448 Z" fill="#7fb069" stroke="#2b2620" stroke-width="4.5"/>
<g fill="none" stroke="#2e7d32" stroke-width="3.5"><path d="M440 716 C368 664 322 570 318 452"/><path d="M462 718 C524 672 570 606 588 524"/></g>
<path d="${CUP}" fill="#f2698c" stroke="#2b2620" stroke-width="5.5"/>
<path d="M428 288 C424 340 428 396 438 440 C410 434 392 378 388 272 C402 292 416 296 428 288 Z" fill="#d63d63" opacity="0.45"/>
<path d="M472 288 C476 340 472 396 462 440 C490 434 508 378 512 272 C498 292 484 296 472 288 Z" fill="#d63d63" opacity="0.45"/>
<g fill="none" stroke="#2b2620" stroke-width="4">${SEAMS}<path d="M450 268 C448 330 448 390 450 438"/></g>
</g>`;

export default {
  slug: 'tulip-drawing',
  subject: 'Tulip Drawing',
  captions: [
    'Sketch the main shapes.',
    'Block in the cup petals.',
    'Set the stem and long leaves.',
    'Refine the outside contour.',
    'Add petal seams and veins.',
    'Clean the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

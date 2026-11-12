// Rose Drawing — 10 steps, from the tutorial's own step list.
// Bloom built around centre (450,410): spiral heart, folded petals, middle ring,
// outer scallop petals (rotated copies of one shape), sepals, stem, leaves.
const CX = 450, CY = 410;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="${CX}" cy="${CY}" r="52"/><circle cx="${CX}" cy="${CY}" r="150"/><path d="M${CX} 218 V752 M262 ${CY} H638"/></g>`;

const rot = (inner, angles) => angles.map((a) => `<g transform="rotate(${a} ${CX} ${CY})">${inner}</g>`).join('');

// Step 1 — tight spiral heart of the rose.
const SPIRAL = `M452 378 C476 380 488 396 486 414 C484 432 468 444 452 440 C437 436 430 422 437 410 C443 399 458 399 465 408 C471 416 466 427 456 426`;
const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round"><path d="${SPIRAL}"/></g>`;

// Step 2 — first folded petals: small scallop arcs hugging the spiral.
const FOLD = `<path d="M410 368 C404 336 424 316 450 314 C476 316 496 336 490 368"/>`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">${rot(FOLD, [0, 120, 240])}</g>`;

// Step 3 — middle ring: wider scallops offset between the folds.
const MID = `<path d="M402 348 C398 292 420 282 450 280 C480 282 502 292 498 348"/>`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">${rot(MID, [45, 135, 225, 315])}</g>`;

// Step 4 — outer petals: large scallops opening away from the centre.
const OUTER = `<path d="M392 332 C388 262 414 244 450 240 C486 244 512 262 508 332"/>`;
const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">${rot(OUTER, [0, 72, 144, 216, 288])}</g>`;

// Step 5 — refine the overlaps: fold creases inside outer and middle petals.
const FOLD_OUT = `<path d="M410 302 C422 272 438 262 450 262 C462 262 478 272 490 302"/>`;
const FOLD_MID = `<path d="M418 330 C430 306 442 300 450 300 C458 300 470 306 482 330"/>`;
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">${rot(FOLD_OUT, [0, 72, 144, 216, 288])}${rot(FOLD_MID, [45, 135, 225, 315])}</g>`;

// Step 6 — sepals: calyx cup under the bloom plus three pointed sepals.
const SEPALS = `<path d="M402 512 C418 546 482 546 498 512"/>
<path d="M446 528 C418 534 394 552 380 584 C408 584 434 562 448 540 Z"/>
<path d="M454 528 C482 534 506 552 520 584 C492 584 466 562 452 540 Z"/>
<path d="M436 540 C440 566 445 584 450 600 C455 584 460 566 464 540 C455 548 445 548 436 540 Z"/>`;
const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">${SEPALS}</g>`;

// Step 7 — stem with a subtle curve.
const STEM_L = `M443 582 C437 642 445 700 441 752`;
const STEM_R = `M457 582 C463 642 455 700 459 752`;
const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linecap="round"><path d="${STEM_L}"/><path d="${STEM_R}"/></g>`;

// Step 8 — two leaves with centre veins and side ticks.
const LEAF_L = `<path d="M443 664 C394 632 342 634 306 664 C342 698 396 700 443 682 Z"/><path d="M440 674 C394 662 350 662 312 666"/><path d="M392 666 L384 650 M352 664 L346 650"/>`;
const LEAF_R = `<path d="M457 712 C494 688 538 690 566 712 C538 738 492 740 457 726 Z"/><path d="M460 720 C492 708 528 708 560 714"/>`;
const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${LEAF_L}${LEAF_R}</g>`;

// Step 9 is the clean step (kit renders all layers dark, no guides) — nothing new.
const L9 = () => ``;

const OUTER_CLOSED = `<path d="M392 332 C388 262 414 244 450 240 C486 244 512 262 508 332 C480 318 420 318 392 332 Z"/>`;
const MID_CLOSED = `<path d="M402 348 C398 292 420 282 450 280 C480 282 502 292 498 348 C470 336 430 336 402 348 Z"/>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M443 582 C437 642 445 700 441 752 L459 752 C455 700 463 642 457 582 Z" fill="#7fb069" stroke="#2b2620" stroke-width="4.5"/>
<g fill="#8fce6e" stroke="#2b2620" stroke-width="5"><path d="M443 664 C394 632 342 634 306 664 C342 698 396 700 443 682 Z"/><path d="M457 712 C494 688 538 690 566 712 C538 738 492 740 457 726 Z"/></g>
<g fill="none" stroke="#2e7d32" stroke-width="3.5"><path d="M440 674 C394 662 350 662 312 666"/><path d="M460 720 C492 708 528 708 560 714"/></g>
<g fill="#8fce6e" stroke="#2b2620" stroke-width="5"><path d="M446 528 C418 534 394 552 380 584 C408 584 434 562 448 540 Z"/><path d="M454 528 C482 534 506 552 520 584 C492 584 466 562 452 540 Z"/><path d="M436 540 C440 566 445 584 450 600 C455 584 460 566 464 540 C455 548 445 548 436 540 Z"/></g>
<circle cx="${CX}" cy="${CY}" r="133" fill="#f78fb0"/>
<g fill="#f78fb0" stroke="#2b2620" stroke-width="5">${rot(OUTER_CLOSED, [0, 72, 144, 216, 288])}</g>
<g fill="#f0567f" stroke="#2b2620" stroke-width="5">${rot(MID_CLOSED, [45, 135, 225, 315])}</g>
<circle cx="${CX}" cy="${CY}" r="97" fill="#ef5a85"/>
<circle cx="${CX}" cy="${CY}" r="54" fill="#e8437c" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2b2620" stroke-width="5">${rot(FOLD, [0, 120, 240])}<path d="${SPIRAL}"/></g>
<g fill="none" stroke="#c2255c" stroke-width="4" opacity="0.55">${rot(FOLD_OUT, [0, 72, 144, 216, 288])}</g>
<g fill="none" stroke="#2b2620" stroke-width="3.5">${rot(FOLD_MID, [45, 135, 225, 315])}</g>
</g>`;

export default {
  slug: 'rose-drawing',
  subject: 'Rose Drawing',
  captions: [
    'Draw the inner center.',
    'Add the first folded petals.',
    'Build the middle ring of petals.',
    'Draw the large outer petals.',
    'Refine the petal overlaps.',
    'Add the pointed sepals.',
    'Draw the curved stem.',
    'Add the leaves and veins.',
    'Clean up the outline.',
    'Shade or color the rose.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

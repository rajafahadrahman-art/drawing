// Tree Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="300" r="140"/><circle cx="345" cy="355" r="88"/><circle cx="555" cy="355" r="88"/><path d="M450 90 V740"/></g>`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round">
<path d="M404 742 C430 736, 434 698, 435 636 C436 554, 437 496, 433 446 L467 446 C463 496, 464 554, 465 636 C466 698, 470 736, 496 742"/>
<path d="M180 742 H720"/></g>`;

const canopyPath = `M292 402 C262 372, 272 322, 308 306 C296 262, 338 224, 380 236 C396 192, 458 176, 496 208 C536 182, 592 210, 594 258 C634 268, 646 322, 616 350 C636 384, 606 420, 566 412 C540 442, 478 438, 452 412 C420 440, 352 436, 336 408 C318 416, 300 414, 292 402 Z`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="M450 452 C432 402, 398 372, 362 352"/>
<path d="M450 452 C468 398, 504 366, 544 346"/>
<path d="M450 446 C449 396, 450 348, 444 302"/>
<path d="${canopyPath}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${canopyPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M444 520 C446 556, 446 592, 444 626"/>
<path d="M458 668 C457 690, 457 708, 458 726"/>
<path d="M442 690 C443 702, 443 714, 442 726"/>
<path d="M340 330 c10 -12, 28 -12, 36 0 M420 268 c10 -12, 28 -12, 36 0 M492 322 c10 -12, 28 -12, 36 0 M382 356 c10 -12, 28 -12, 36 0 M470 380 c10 -12, 28 -12, 36 0"/>
</g>`;

const colorArt = `<g stroke-linejoin="round">
<path d="M180 742 H720" stroke="#2e7d32" stroke-width="5" stroke-linecap="round"/>
<g fill="#8fce6e" stroke="#2b2620" stroke-width="5"><path d="${canopyPath}"/></g>
<g fill="#6db457" opacity="0.85"><path d="M318 388 C344 366, 386 360, 414 378 C444 352, 492 352, 520 376 C548 358, 584 366, 600 388 C596 404, 560 420, 520 410 C480 428, 420 428, 384 410 C350 420, 322 408, 318 388 Z"/></g>
<g fill="none" stroke="#2e7d32" stroke-width="3.5" stroke-linecap="round"><path d="M340 330 c10 -12, 28 -12, 36 0 M420 268 c10 -12, 28 -12, 36 0 M492 322 c10 -12, 28 -12, 36 0 M382 356 c10 -12, 28 -12, 36 0 M470 380 c10 -12, 28 -12, 36 0"/></g>
<g fill="#b08968" stroke="#2b2620" stroke-width="5"><path d="M404 742 C430 736, 434 698, 435 636 C436 554, 437 496, 433 446 L467 446 C463 496, 464 554, 465 636 C466 698, 470 736, 496 742 Z"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4" stroke-linecap="round"><path d="M450 452 C432 402, 398 372, 362 352 M450 452 C468 398, 504 366, 544 346 M450 446 C449 396, 450 348, 444 302"/></g>
<g fill="none" stroke="#7a5230" stroke-width="3.5" stroke-linecap="round"><path d="M444 520 C446 556, 446 592, 444 626 M458 668 C457 690, 457 708, 458 726"/></g>
</g>`;

export default {
  slug: 'tree-drawing',
  subject: 'Tree Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the trunk.',
    'Add branches and canopy.',
    'Refine the outside contour.',
    'Add bark and leaf details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5],
  colorArt,
};

// Dolphin Drawing — 10 steps, from the tutorial's own step list.
const bodyPath = `M272 442 C400 330, 560 292, 672 306 C682 308, 690 316, 694 326 L690 362 C580 428, 430 512, 316 548 C274 549, 253 522, 250 480 C250 459, 258 450, 272 442 Z`;
const flukesPath = `M688 330 C706 296, 730 276, 754 276 C748 306, 732 328, 706 342 C730 352, 746 372, 748 398 C724 396, 700 378, 686 356 Z`;
const dorsalPath = `M452 330 C468 284, 496 256, 526 250 C524 290, 510 320, 486 340 C474 334, 462 331, 452 330 Z`;
const flipperPath = `M352 492 C378 534, 410 558, 442 564 C418 522, 388 500, 352 492 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${bodyPath}"/><path d="${flukesPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="M268 478 C232 488, 200 500, 172 516"/>
<path d="M172 516 C200 528, 236 524, 262 508"/>
<path d="M282 452 C300 430, 330 420, 360 424" stroke-width="4"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${dorsalPath}"/><path d="${flipperPath}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${bodyPath}"/><path d="${flukesPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<circle cx="300" cy="470" r="8" fill="${s}" stroke="none"/>
<path d="M312 510 C430 462, 556 404, 678 362" stroke-width="3.5"/></g>`;

const L6 = (s) => ``;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M348 392 C460 322, 566 296, 648 306"/>
<path d="M372 418 C470 352, 566 326, 636 332"/>
<path d="M286 500 C306 484, 330 476, 354 476"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M336 484 c12 -9, 27 -9, 38 -2"/>
<path d="M428 444 c12 -9, 27 -9, 38 -2"/>
<path d="M516 408 c12 -9, 27 -9, 38 -2"/>
<path d="M596 378 c12 -9, 27 -9, 38 -2"/>
<path d="M290 448 c8 -10, 20 -14, 32 -12"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linecap="round">
<path d="M456 334 C474 326, 492 324, 506 330"/>
<path d="M378 508 C392 520, 404 532, 414 546"/>
<path d="M692 332 C698 339, 698 347, 691 354"/>
<circle cx="300" cy="470" r="13" stroke-width="3.5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#5b8fc4" stroke="#2b2620" stroke-width="5"><path d="${flukesPath}"/><path d="${dorsalPath}"/></g>
<g fill="#dceefb" stroke="#2b2620" stroke-width="5.5"><path d="${bodyPath}"/></g>
<path d="M272 442 C400 330, 560 292, 672 306 C682 308, 690 316, 694 326 L690 362 C600 402, 486 442, 392 462 C330 474, 282 466, 264 452 C258 448, 264 444, 272 442 Z" fill="#6fa8d8"/>
<g fill="#6fa8d8" stroke="#2b2620" stroke-width="5"><path d="M268 478 C232 488, 200 500, 172 516 C200 528, 236 524, 262 508 Z"/></g>
<g fill="#5b8fc4" stroke="#2b2620" stroke-width="5"><path d="${flipperPath}"/></g>
<path d="M312 510 C430 462, 556 404, 678 362" fill="none" stroke="#3f74a8" stroke-width="3.5"/>
<path d="M182 510 C216 500, 246 490, 268 478" fill="none" stroke="#2b2620" stroke-width="4"/>
<circle cx="300" cy="470" r="9" fill="#2b2620"/>
<circle cx="297" cy="467" r="3" fill="#ffffff"/>
<g fill="none" stroke="#4a90c2" stroke-width="5">
<path d="M212 668 C262 640, 312 668, 362 668 C412 668, 462 640, 512 668 C562 668, 612 640, 662 668"/>
<path d="M300 716 C340 694, 380 716, 420 716 C460 716, 500 694, 540 716"/></g>
</g>`;

export default {
  slug: 'dolphin-drawing',
  subject: 'Dolphin Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the beak.',
    'Set the dorsal fin and flippers.',
    'Refine the outside contour.',
    'Add the eye and belly line.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
    'Add belly curve texture.',
    'Strengthen depth and overlap.',
    'Add final colour and finish.',
  ],
  guides: null,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

// Bee Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="272" cy="452" r="88"/><ellipse cx="520" cy="468" rx="188" ry="140"/><path d="M148 468 H762"/></g>`;

const headPath = `M202 452 a70 70 0 1 0 140 0 a70 70 0 1 0 -140 0`;
const thoraxPath = `M328 462 a70 90 0 1 0 140 0 a70 90 0 1 0 -140 0`;
const abdomenPath = `M442 470 a126 100 0 1 0 252 0 a126 100 0 1 0 -252 0`;
const wingFront = `M398 390 C376 306, 424 246, 488 252 C518 298, 496 372, 432 394 C420 398, 406 396, 398 390 Z`;
const wingBack = `M486 386 C478 322, 516 274, 560 282 C578 324, 552 374, 504 390 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5"><path d="${headPath}"/><path d="${thoraxPath}"/><path d="${abdomenPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${wingBack}"/><path d="${wingFront}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round">
<path d="M478 390 C500 440, 500 514, 476 564"/>
<path d="M540 372 C564 430, 564 516, 538 572"/>
<path d="M600 372 C622 428, 622 514, 598 570"/>
<path d="M652 398 C668 444, 668 502, 650 548"/>
<path d="M248 392 C226 348, 200 326, 172 322"/>
<path d="M282 384 C276 336, 258 306, 232 296"/>
<circle cx="165" cy="320" r="8" fill="${s}" stroke="none"/>
<circle cx="225" cy="293" r="8" fill="${s}" stroke="none"/>
<path d="M688 446 L744 470 L688 494 Z" stroke-linejoin="round"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${headPath}"/><path d="${thoraxPath}"/><path d="${abdomenPath}"/><path d="${wingFront}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<circle cx="252" cy="442" r="16" stroke-width="4"/>
<circle cx="248" cy="446" r="7" fill="${s}" stroke="none"/>
<path d="M222 478 C234 488, 250 490, 262 484"/>
<path d="M346 496 l-13 3 M350 524 l-12 6 M362 546 l-9 9 M388 556 l-5 11"/>
<path d="M420 376 C440 326, 462 291, 486 268"/>
<path d="M440 336 C458 327, 474 327, 488 335"/>
<path d="M392 550 C388 574, 380 592, 366 602 M452 566 C450 588, 444 604, 432 614 M520 568 C522 590, 528 604, 540 612"/>
<circle cx="447" cy="590" r="9" stroke-width="3.5"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#d6ecfa" stroke="#2b2620" stroke-width="5"><path d="${wingBack}"/><path d="${wingFront}"/></g>
<g fill="none" stroke="#7fb2d9" stroke-width="3"><path d="M420 376 C440 326, 462 291, 486 268"/></g>
<g fill="#ffd23f" stroke="#2b2620" stroke-width="5.5"><path d="${abdomenPath}"/></g>
<path d="M478 390 C500 440, 500 514, 476 564 C500 572, 520 573, 538 572 C564 516, 564 430, 540 372 C520 380, 500 384, 478 390 Z" fill="#2b2620"/>
<path d="M600 372 C622 428, 622 514, 598 570 C616 562, 634 556, 650 548 C668 502, 668 444, 652 398 C634 384, 616 378, 600 372 Z" fill="#2b2620"/>
<g fill="#e8a04c" stroke="#2b2620" stroke-width="5.5"><path d="${thoraxPath}"/></g>
<g fill="#ffd23f" stroke="#2b2620" stroke-width="5.5"><path d="${headPath}"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4">
<path d="M248 392 C226 348, 200 326, 172 322"/>
<path d="M282 384 C276 336, 258 306, 232 296"/>
<path d="M392 550 C388 574, 380 592, 366 602 M452 566 C450 588, 444 604, 432 614 M520 568 C522 590, 528 604, 540 612"/></g>
<circle cx="165" cy="320" r="8" fill="#2b2620"/>
<circle cx="225" cy="293" r="8" fill="#2b2620"/>
<path d="M688 446 L744 470 L688 494 Z" fill="#2b2620"/>
<circle cx="252" cy="442" r="16" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<circle cx="249" cy="445" r="8" fill="#2b2620"/>
<circle cx="246" cy="442" r="3" fill="#ffffff"/>
<path d="M222 478 C234 488, 250 490, 262 484" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<g fill="none" stroke="#8a5a1d" stroke-width="3.5"><path d="M346 496 l-13 3 M350 524 l-12 6 M362 546 l-9 9 M388 556 l-5 11"/></g>
<circle cx="447" cy="590" r="9" fill="#f28c28" stroke="#2b2620" stroke-width="3.5"/>
</g>`;

export default {
  slug: 'bee-drawing',
  subject: 'Bee Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the wings.',
    'Set the stripes and antennae.',
    'Refine the outside contour.',
    'Add fuzz, veins, and legs.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

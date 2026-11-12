// Heart Drawing — 7 steps, from the tutorial's own step list.
// Construction (two lobe circles, point V, centre line) lives in guides so it vanishes at the Clean step.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="375" cy="335" r="100"/><circle cx="525" cy="335" r="100"/><path d="M272 395 L450 690 L628 395 M450 230 V700"/></g>`;

const HEART = `M450 692 C330 596 240 500 240 402 C240 322 296 262 372 262 C414 262 442 284 450 312 C458 284 486 262 528 262 C604 262 660 322 660 402 C660 500 570 596 450 692 Z`;

const L1 = (s) => ``; // step 1 is the guide construction itself

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${HEART}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round"><g transform="translate(450 470) scale(0.78) translate(-450 -470)"><path d="${HEART}"/></g><path d="M450 332 C448 372 447 402 448 432"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${HEART}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"><path d="M318 356 C306 392 312 428 330 452"/><path d="M560 560 C590 520 606 470 604 420"/></g><circle cx="352" cy="472" r="5" fill="${s}"/><path d="M618 246 C622 260 626 264 640 268 C626 272 622 276 618 290 C614 276 610 272 596 268 C610 264 614 260 618 246 Z" fill="${s}"/>`;

const L6 = (s) => ``; // clean step: kit re-renders all layers dark with no guides

const colorArt = `<g stroke-linejoin="round">
<ellipse cx="450" cy="726" rx="215" ry="20" fill="#f3e3c2"/>
<path d="${HEART}" fill="#f97b8f" stroke="#2b2620" stroke-width="5.5"/>
<path d="M660 402 C660 500 570 596 450 692 C540 560 560 470 545 330 C610 345 660 365 660 402 Z" fill="#e14b6d" opacity="0.55"/>
<g transform="translate(450 470) scale(0.78) translate(-450 -470)"><path d="${HEART}" fill="none" stroke="#c22e52" stroke-width="4"/></g>
<ellipse cx="330" cy="392" rx="20" ry="38" fill="#ffffff" opacity="0.75" transform="rotate(-18 330 392)"/>
<circle cx="352" cy="472" r="6" fill="#ffffff" opacity="0.75"/>
<path d="M618 246 C622 260 626 264 640 268 C626 272 622 276 618 290 C614 276 610 272 596 268 C610 264 614 260 618 246 Z" fill="#ffc53d" stroke="#2b2620" stroke-width="3"/>
</g>`;

export default {
  slug: 'heart-drawing',
  subject: 'Heart Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the heart outline.',
    'Set the lobes and point.',
    'Refine the outside contour.',
    'Add shine and details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

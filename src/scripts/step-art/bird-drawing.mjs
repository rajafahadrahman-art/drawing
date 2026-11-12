// Bird Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="285" cy="332" r="80"/><ellipse cx="385" cy="505" rx="155" ry="168"/><path d="M160 700 H700"/></g>`;

const headPath = `M225 332 a60 60 0 1 0 120 0 a60 60 0 1 0 -120 0`;
const bodyPath = `M318 372 C402 348, 486 404, 504 492 C518 566, 478 636, 398 652 C316 668, 246 612, 240 516 C236 452, 264 396, 318 372 Z`;
const beakPath = `M230 316 L164 340 L232 360 Z`;
const wingPath = `M332 428 C408 408, 472 452, 470 532 C468 602, 402 640, 348 602 C308 572, 300 478, 332 428 Z`;
const tailPath = `M472 596 C534 634, 584 684, 602 734 C556 724, 496 680, 458 632 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${headPath}"/><path d="${bodyPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${beakPath}"/>
<path d="M168 340 L230 338" stroke-width="3.5"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${tailPath}"/>
<path d="M486 622 C528 654, 562 692, 576 724" stroke-width="3.5"/>
<path d="${wingPath}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${headPath}"/><path d="${bodyPath}"/><path d="${beakPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<circle cx="272" cy="324" r="12" stroke-width="4"/>
<circle cx="270" cy="326" r="6" fill="${s}" stroke="none"/>
<path d="M262 420 C252 500, 272 580, 322 626"/>
<path d="M336 470 c28 -16, 62 -14, 84 4 M330 524 c28 -16, 64 -14, 88 4 M344 576 c24 -12, 52 -10, 72 4"/>
<path d="M356 650 L352 682 M404 652 L404 684"/>
<path d="M336 690 C346 682, 360 682, 368 690 M388 692 C398 684, 412 684, 420 692"/>
<path d="M176 700 C320 682, 520 684, 668 706" stroke-width="6"/>
<path d="M560 696 C580 678, 600 670, 622 668" stroke-width="4"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#3d7ab5" stroke="#2b2620" stroke-width="5"><path d="${tailPath}"/></g>
<g fill="#7ec3e8" stroke="#2b2620" stroke-width="5.5"><path d="${bodyPath}"/></g>
<path d="M262 420 C252 500, 272 580, 322 626 C296 560, 288 486, 300 424 C286 414, 272 414, 262 420 Z" fill="#f6a04d"/>
<g fill="#7ec3e8" stroke="#2b2620" stroke-width="5.5"><path d="${headPath}"/></g>
<g fill="#4a90c9" stroke="#2b2620" stroke-width="5"><path d="${wingPath}"/></g>
<g fill="none" stroke="#dceefb" stroke-width="3.5"><path d="M336 470 c28 -16, 62 -14, 84 4 M330 524 c28 -16, 64 -14, 88 4 M344 576 c24 -12, 52 -10, 72 4"/></g>
<g fill="#f2a007" stroke="#2b2620" stroke-width="5"><path d="${beakPath}"/></g>
<path d="M168 340 L230 338" stroke="#2b2620" stroke-width="3"/>
<circle cx="272" cy="324" r="11" fill="#2b2620"/>
<circle cx="268" cy="320" r="3.5" fill="#ffffff"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5">
<path d="M356 650 L352 682 M404 652 L404 684"/>
<path d="M336 690 C346 682, 360 682, 368 690 M388 692 C398 684, 412 684, 420 692"/></g>
<path d="M176 700 C320 682, 520 684, 668 706" fill="none" stroke="#7a5230" stroke-width="8"/>
<path d="M560 696 C580 678, 600 670, 622 668" fill="none" stroke="#7a5230" stroke-width="5"/>
</g>`;

export default {
  slug: 'bird-drawing',
  subject: 'Bird Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the beak.',
    'Set the wing and tail feathers.',
    'Refine the outside contour.',
    'Add feathers, feet, and perch.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

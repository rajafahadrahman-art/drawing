// Cloud Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="302" cy="500" r="58"/><circle cx="392" cy="438" r="74"/><circle cx="498" cy="424" r="82"/><circle cx="592" cy="466" r="62"/><path d="M236 594 H664"/></g>`;

const OUTLINE = `M258 594 C240 548 252 502 296 484 C292 428 336 388 392 394 C404 344 470 322 518 356 C566 328 632 362 638 424 C688 438 706 500 672 542 C690 566 672 594 640 594 Z`;
const INNER_PUFFS = `M330 522 C350 480 400 464 436 480 M470 472 C500 438 556 438 584 468`;
const BASE_SHADOW = `M300 558 C380 530 520 530 606 558`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${OUTLINE}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="${INNER_PUFFS}"/><path d="${BASE_SHADOW}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linecap="round">
<path d="${OUTLINE}"/></g>`;

const VAPOR = `M362 428 c18 -16 44 -16 58 0 M516 542 c16 -12 38 -12 50 0 M288 542 c-8 -14 2 -30 16 -34 M596 500 c14 -8 30 -4 38 8`;
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="${VAPOR}"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linecap="round">
<g fill="#ffffff" stroke="#2b2620" stroke-width="5"><path d="${OUTLINE}"/></g>
<path d="M272 594 C306 550 384 540 452 548 C540 540 618 550 630 594 Z" fill="#c9dcee"/>
<g fill="none" stroke="#a9c6e2" stroke-width="4"><path d="${INNER_PUFFS}"/><path d="${BASE_SHADOW}"/></g>
<g fill="none" stroke="#d7e6f5" stroke-width="4"><path d="${VAPOR}"/></g>
<g fill="none" stroke="#2b2620" stroke-width="5"><path d="M258 594 C240 548 252 502 296 484 M640 594 C672 594 690 566 672 542 C706 500 688 438 638 424"/></g>
</g>`;

export default {
  slug: 'cloud-drawing',
  subject: 'Cloud Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the puffy lobes.',
    'Set the base shadow line.',
    'Refine the outside contour.',
    'Add soft vapor details.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

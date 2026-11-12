// Owl Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="472" rx="182" ry="252"/><circle cx="386" cy="354" r="50"/><circle cx="514" cy="354" r="50"/></g>`;

const bodyPath = `M285 520 C278 402, 298 306, 336 264 L318 206 L382 238 C424 222, 476 222, 518 238 L582 206 L564 264 C602 306, 622 402, 615 520 C606 650, 542 724, 450 724 C358 724, 294 650, 285 520 Z`;
const diskPath = `M450 306 C424 266, 344 258, 322 316 C302 368, 344 434, 450 484 C556 434, 598 368, 578 316 C556 258, 476 266, 450 306 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${bodyPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${diskPath}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<circle cx="386" cy="354" r="36"/>
<circle cx="514" cy="354" r="36"/>
<circle cx="386" cy="354" r="15" fill="${s}" stroke="none"/>
<circle cx="514" cy="354" r="15" fill="${s}" stroke="none"/>
<circle cx="381" cy="349" r="5" fill="#fff9ee" stroke="none"/>
<circle cx="509" cy="349" r="5" fill="#fff9ee" stroke="none"/>
<path d="M430 404 L470 404 L450 440 Z"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${bodyPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M302 462 C332 478, 346 556, 336 646"/>
<path d="M598 462 C568 478, 554 556, 564 646"/>
<path d="M368 540 l12 10 l12 -10 M438 540 l12 10 l12 -10 M508 540 l12 10 l12 -10"/>
<path d="M348 592 l12 10 l12 -10 M418 592 l12 10 l12 -10 M488 592 l12 10 l12 -10 M538 592 l10 9 l10 -9"/>
<path d="M388 644 l12 10 l12 -10 M458 644 l12 10 l12 -10"/>
<path d="M212 748 C340 732, 560 732, 688 748" stroke-width="6"/>
<path d="M382 722 C378 736, 384 746, 396 748 M404 724 C402 738, 408 746, 418 746"/>
<path d="M482 724 C480 738, 486 746, 496 746 M504 722 C500 736, 506 746, 518 748"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#b08153" stroke="#2b2620" stroke-width="5.5"><path d="${bodyPath}"/></g>
<path d="M292 470 C322 486, 334 560, 326 650 C302 600, 288 536, 292 470 Z" fill="#8a5a36"/>
<path d="M608 470 C578 486, 566 560, 574 650 C598 600, 612 536, 608 470 Z" fill="#8a5a36"/>
<path d="M450 500 C530 500, 566 560, 556 640 C546 700, 500 724, 450 724 C400 724, 354 700, 344 640 C334 560, 370 500, 450 500 Z" fill="#e6c795"/>
<g fill="none" stroke="#8a5a36" stroke-width="3.5">
<path d="M368 540 l12 10 l12 -10 M438 540 l12 10 l12 -10 M508 540 l12 10 l12 -10"/>
<path d="M348 592 l12 10 l12 -10 M418 592 l12 10 l12 -10 M488 592 l12 10 l12 -10 M538 592 l10 9 l10 -9"/>
<path d="M388 644 l12 10 l12 -10 M458 644 l12 10 l12 -10"/></g>
<g fill="#f3e3c2" stroke="#2b2620" stroke-width="5"><path d="${diskPath}"/></g>
<circle cx="386" cy="354" r="36" fill="#f5a623" stroke="#2b2620" stroke-width="4.5"/>
<circle cx="514" cy="354" r="36" fill="#f5a623" stroke="#2b2620" stroke-width="4.5"/>
<circle cx="386" cy="354" r="15" fill="#2b2620"/>
<circle cx="514" cy="354" r="15" fill="#2b2620"/>
<circle cx="381" cy="349" r="5" fill="#ffffff"/>
<circle cx="509" cy="349" r="5" fill="#ffffff"/>
<path d="M430 404 L470 404 L450 440 Z" fill="#f28c28" stroke="#2b2620" stroke-width="4"/>
<path d="M212 748 C340 732, 560 732, 688 748" fill="none" stroke="#6b4423" stroke-width="9"/>
<g fill="none" stroke="#2b2620" stroke-width="4">
<path d="M382 722 C378 736, 384 746, 396 748 M404 724 C402 738, 408 746, 418 746"/>
<path d="M482 724 C480 738, 486 746, 496 746 M504 722 C500 736, 506 746, 518 748"/></g>
</g>`;

export default {
  slug: 'owl-drawing',
  subject: 'Owl Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the facial disk.',
    'Set the large eyes and beak.',
    'Refine the outside contour.',
    'Add speckles, wings, and talons.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

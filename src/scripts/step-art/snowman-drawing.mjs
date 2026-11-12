// Snowman Drawing — 7 steps. Three stacked snowballs defined once and reused in layers + colour.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="300" r="78"/><circle cx="450" cy="462" r="112"/><circle cx="450" cy="632" r="134"/><path d="M450 170 V780 M180 766 H720"/></g>`;

const BALLS = `<circle cx="450" cy="300" r="78"/><circle cx="450" cy="462" r="112"/><circle cx="450" cy="632" r="134"/>`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5">${BALLS}</g>`;

const L3 = (s) => `<g stroke="${s}" stroke-linejoin="round"><g fill="${s}" stroke="none"><circle cx="428" cy="290" r="7.5"/><circle cx="472" cy="290" r="7.5"/><circle cx="434" cy="318" r="3.5"/><circle cx="450" cy="326" r="3.5"/><circle cx="466" cy="318" r="3.5"/><circle cx="450" cy="430" r="8"/><circle cx="450" cy="482" r="8"/><circle cx="450" cy="596" r="8"/><circle cx="450" cy="664" r="8"/></g><path d="M446 300 L552 318 L448 328 Z" fill="none" stroke-width="4.5"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5">${BALLS}</g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="M348 462 L252 410 M278 428 L264 406 M278 428 L254 430 M552 462 L648 410 M622 428 L636 406 M622 428 L646 430"/>
<path d="M402 224 L408 192 C440 184 460 184 492 192 L498 224 M372 226 C420 212 480 212 528 226 L528 244 C480 232 420 232 372 244 Z"/>
<path d="M378 360 C418 378 482 378 522 360 L522 392 C482 410 418 410 378 392 Z"/>
<path d="M494 398 L496 486 L544 480 L534 390"/>
<path d="M508 478 L508 492 M522 476 L522 490 M536 473 L536 487"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="450" cy="758" rx="250" ry="15" fill="#dceefb"/>
<g fill="none" stroke="#7a5230" stroke-width="6"><path d="M348 462 L252 410 M278 428 L264 406 M278 428 L254 430 M552 462 L648 410 M622 428 L636 406 M622 428 L646 430"/></g>
<circle cx="450" cy="632" r="134" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<circle cx="450" cy="462" r="112" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<circle cx="450" cy="300" r="78" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<path d="M356 706 C396 736 504 736 544 706 C530 742 370 742 356 706 Z" fill="#dceefb"/>
<path d="M494 398 L496 486 L544 480 L534 390 Z" fill="#d64545" stroke="#2b2620" stroke-width="4.5"/>
<path d="M378 360 C418 378 482 378 522 360 L522 392 C482 410 418 410 378 392 Z" fill="#d64545" stroke="#2b2620" stroke-width="4.5"/>
<path d="M495 428 H542 M496 456 L543 450" stroke="#a52a2a" stroke-width="4" fill="none"/>
<g fill="#2b2620"><circle cx="428" cy="290" r="7.5"/><circle cx="472" cy="290" r="7.5"/><circle cx="434" cy="318" r="3.5"/><circle cx="450" cy="326" r="3.5"/><circle cx="466" cy="318" r="3.5"/><circle cx="450" cy="430" r="8"/><circle cx="450" cy="482" r="8"/><circle cx="450" cy="596" r="8"/><circle cx="450" cy="664" r="8"/></g>
<path d="M446 300 L552 318 L448 328 Z" fill="#f08c1e" stroke="#2b2620" stroke-width="4.5"/>
<g stroke="#2b2620" stroke-width="5"><path d="M402 224 L408 192 C440 184 460 184 492 192 L498 224" fill="#3a3f44"/><path d="M372 226 C420 212 480 212 528 226 L528 244 C480 232 420 232 372 244 Z" fill="#3a3f44"/></g>
<path d="M404 208 L496 208 L494 194 L406 194 Z" fill="#d64545"/>
</g>`;

export default {
  slug: 'snowman-drawing',
  subject: 'Snowman Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the snowballs.',
    'Add the carrot nose and buttons.',
    'Refine the outside contour.',
    'Add the hat, scarf and arms.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

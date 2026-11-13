// Snake Drawing — 8 steps, cute S-curve snake, from the tutorial's own step list.
const SPINE = `M185 600 C260 540 330 545 395 600 C460 655 520 650 585 585 C640 530 668 478 674 420`;
const TOP = `M185 600 C262 512 332 517 397 572 C462 627 522 622 587 557 C642 502 660 458 664 416`;
const BOTTOM = `M690 428 C686 500 644 560 589 613 C524 678 462 683 397 628 C332 573 262 568 185 600`;
const BODY_FILL = `M185 600 C262 512 332 517 397 572 C462 627 522 622 587 557 C642 502 660 458 664 416 L690 428 C686 500 644 560 589 613 C524 678 462 683 397 628 C332 573 262 568 185 600 Z`;
const HEAD = `<ellipse cx="678" cy="390" rx="48" ry="44"/>`;
const DIAMONDS = [
  `M272 537 L290 552 L272 567 L254 552 Z`,
  `M388 565 L406 580 L388 595 L370 580 Z`,
  `M498 607 L516 622 L498 637 L480 622 Z`,
  `M580 555 L598 570 L580 585 L562 570 Z`,
];

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="${SPINE}"/><circle cx="678" cy="390" r="62"/><path d="M150 706 H770"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round"><path d="${SPINE}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${TOP}"/><path d="${BOTTOM}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5">${HEAD}</g>`;

const L4 = (s) => `<g stroke="${s}" stroke-linecap="round">
<ellipse cx="694" cy="380" rx="6.5" ry="8" fill="${s}" stroke="none"/>
<circle cx="696.5" cy="376.5" r="2.2" fill="#fff9ee" stroke="none"/>
<path d="M692 404 Q708 412 720 400" fill="none" stroke-width="4"/>
<path d="M724 396 C740 394 752 386 762 376 M762 376 L752 360 M762 376 L778 366" fill="none" stroke-width="4"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M235 549 Q221 576 235 601"/>
<path d="M300 536 Q286 563 300 588"/>
<path d="M362 562 Q348 589 362 614"/>
<path d="M425 596 Q411 623 425 648"/>
<path d="M490 612 Q476 639 490 664"/>
<path d="M550 584 Q536 611 550 636"/>
<path d="M608 522 Q594 549 608 574"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linejoin="round">
${DIAMONDS.map((d) => `<path d="${d}"/>`).join('')}
<circle cx="332" cy="546" r="5"/>
<circle cx="448" cy="604" r="5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="${BODY_FILL}" fill="#6db457" stroke="#2b2620" stroke-width="5.5"/>
<path d="M228 592 C300 566 350 562 398 600 C440 632 518 644 558 606 C578 587 596 566 606 548" fill="none" stroke="#fdf0c9" stroke-width="18" opacity="0.85"/>
<g fill="#2e7d32" stroke="#2b2620" stroke-width="4">${DIAMONDS.map((d) => `<path d="${d}"/>`).join('')}</g>
<g fill="#2e7d32"><circle cx="332" cy="546" r="5"/><circle cx="448" cy="604" r="5"/></g>
<ellipse cx="678" cy="390" rx="48" ry="44" fill="#6db457" stroke="#2b2620" stroke-width="5"/>
<path d="M724 396 C740 394 752 386 762 376 M762 376 L752 360 M762 376 L778 366" fill="none" stroke="#d93a2b" stroke-width="4.5"/>
<ellipse cx="694" cy="380" rx="6.5" ry="8" fill="#2b2620"/>
<circle cx="696.5" cy="376.5" r="2.2" fill="#ffffff"/>
<path d="M692 404 Q708 412 720 400" fill="none" stroke="#2b2620" stroke-width="4"/>
</g>`;

export default {
  slug: 'snake-drawing',
  subject: 'Snake Drawing',
  captions: [
    'Draw the wavy path.',
    'Build the body curves.',
    'Add the head.',
    'Add tongue and eye.',
    'Add belly scales.',
    'Add the pattern.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

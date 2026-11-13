// Frog Drawing — 8 steps, cute front-facing sitting frog.
// Wide oval body, two eye bumps with big eyes, folded back legs with webbed
// toes at the sides, small front legs, wide smile and a cream belly patch.
const BODY = `<ellipse cx="450" cy="505" rx="162" ry="138"/>`;
const BUMP_L = `M326 396 C322 356 338 330 368 328 C398 330 414 356 410 396`;
const BUMP_R = `M490 396 C486 356 502 330 532 328 C562 330 578 356 574 396`;
const THIGH_L = `M302 540 C252 556 226 606 240 656 C250 692 286 706 316 692 C300 640 296 588 302 540 Z`;
const THIGH_R = `M598 540 C648 556 674 606 660 656 C650 692 614 706 584 692 C600 640 604 588 598 540 Z`;
const FOOT_L = `M268 690 C250 706 252 720 272 722 L340 722 C352 714 350 700 336 694 C314 686 288 684 268 690 Z`;
const FOOT_R = `M632 690 C650 706 648 720 628 722 L560 722 C548 714 550 700 564 694 C586 686 612 684 632 690 Z`;
const BELLY = `<ellipse cx="450" cy="580" rx="90" ry="62"/>`;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="505" rx="162" ry="138"/><circle cx="368" cy="372" r="46"/><circle cx="532" cy="372" r="46"/><path d="M450 330 V730"/><path d="M170 736 H730"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${BODY}</g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${BUMP_L}"/><path d="${BUMP_R}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${THIGH_L}"/><path d="${THIGH_R}"/>
<path d="${FOOT_L}"/><path d="${FOOT_R}"/>
<g stroke-width="3.5"><path d="M292 700 L288 718 M318 698 L318 719"/>
<path d="M608 700 L612 718 M582 698 L582 719"/></g></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="M400 600 C394 640 392 668 394 694"/>
<path d="M428 616 C430 644 430 668 428 696"/>
<path d="M500 600 C506 640 508 668 506 694"/>
<path d="M472 616 C470 644 470 668 472 696"/>
<path d="M394 694 C386 700 382 712 390 718 L436 718 C444 712 440 700 428 696"/>
<path d="M506 694 C514 700 518 712 510 718 L464 718 C456 712 460 700 472 696"/>
<g stroke-width="3.5"><path d="M406 702 L404 716 M422 701 L423 717"/>
<path d="M494 702 L496 716 M478 701 L477 717"/></g>
<path d="M170 736 H730" stroke-width="4"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round">
<circle cx="368" cy="368" r="27"/><circle cx="532" cy="368" r="27"/>
<path d="M356 470 C398 502 502 502 544 470" stroke-width="5"/>
<ellipse cx="368" cy="374" rx="10" ry="14" fill="${s}" stroke="none"/>
<ellipse cx="532" cy="374" rx="10" ry="14" fill="${s}" stroke="none"/>
<circle cx="364" cy="366" r="4" fill="#fff9ee" stroke="none"/>
<circle cx="528" cy="366" r="4" fill="#fff9ee" stroke="none"/>
<circle cx="430" cy="440" r="3" fill="${s}" stroke="none"/>
<circle cx="470" cy="440" r="3" fill="${s}" stroke="none"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round">
<path d="M398 498 C424 512 476 512 502 498"/>
${BELLY}</g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M170 736 H730" stroke="#2e7d32" stroke-width="4"/>
<path d="${THIGH_L}" fill="#679c4a" stroke="#2b2620" stroke-width="5"/>
<path d="${THIGH_R}" fill="#679c4a" stroke="#2b2620" stroke-width="5"/>
<path d="${FOOT_L}" fill="#74b855" stroke="#2b2620" stroke-width="4.5"/>
<path d="${FOOT_R}" fill="#74b855" stroke="#2b2620" stroke-width="4.5"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M292 700 L288 718 M318 698 L318 719 M608 700 L612 718 M582 698 L582 719"/></g>
<ellipse cx="450" cy="505" rx="162" ry="138" fill="#74b855"/>
<path d="M326 398 C302 440 288 472 288 510 C288 590 356 646 450 646 C544 646 612 590 612 510 C612 472 598 440 574 398" fill="none" stroke="#2b2620" stroke-width="5.5"/>
<path d="${BUMP_L} L326 396 Z" fill="#74b855" stroke="none"/>
<path d="${BUMP_R} L490 396 Z" fill="#74b855" stroke="none"/>
<path d="${BUMP_L}" fill="none" stroke="#2b2620" stroke-width="5"/>
<path d="${BUMP_R}" fill="none" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="450" cy="580" rx="90" ry="62" fill="#f7ead1" stroke="#2b2620" stroke-width="3.5"/>
<path d="M398 498 C424 512 476 512 502 498" fill="none" stroke="#59893f" stroke-width="3.5"/>
<g fill="#74b855" stroke="#2b2620" stroke-width="4.5"><path d="M400 600 C394 640 392 668 394 694 C386 700 382 712 390 718 L436 718 C444 712 440 700 428 696 C430 668 430 640 428 616 C418 606 408 600 400 600 Z"/>
<path d="M500 600 C506 640 508 668 506 694 C514 700 518 712 510 718 L464 718 C456 712 460 700 472 696 C470 668 470 640 472 616 C482 606 492 600 500 600 Z"/></g>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M406 702 L404 716 M422 701 L423 717 M494 702 L496 716 M478 701 L477 717"/></g>
<circle cx="368" cy="368" r="27" fill="#ffffff" stroke="#2b2620" stroke-width="4.5"/>
<circle cx="532" cy="368" r="27" fill="#ffffff" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="368" cy="374" rx="10" ry="14" fill="#2b2620"/>
<ellipse cx="532" cy="374" rx="10" ry="14" fill="#2b2620"/>
<circle cx="364" cy="366" r="4" fill="#ffffff"/>
<circle cx="528" cy="366" r="4" fill="#ffffff"/>
<path d="M356 470 C398 502 502 502 544 470" fill="none" stroke="#2b2620" stroke-width="5"/>
<circle cx="430" cy="440" r="3" fill="#2b2620"/>
<circle cx="470" cy="440" r="3" fill="#2b2620"/>
</g>`;

export default {
  slug: 'frog-drawing',
  subject: 'Frog Drawing',
  captions: [
    'Draw the body oval.',
    'Add head and eye bumps.',
    'Sketch the back legs.',
    'Add the front legs.',
    'Draw eyes and smile.',
    'Add belly and throat.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

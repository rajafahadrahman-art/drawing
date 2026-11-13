// Turtle Drawing — 8 steps, side-view sea turtle, from the tutorial's own step list.
const DOME = `M270 522 C270 420 350 336 455 336 C560 336 640 420 640 522`;
const DOME_FILL = `M270 522 C270 420 350 336 455 336 C560 336 640 420 640 522 Z`;
const HEX = `M414 424 L438 394 L480 394 L504 424 L480 454 L438 454 Z`;
const FLIP_F = `M598 552 C636 584 644 634 618 664 C596 688 562 682 552 652 C544 622 562 578 598 552 Z`;
const FLIP_B = `M312 552 C282 580 274 624 296 650 C314 670 342 660 346 634 C349 606 336 572 312 552 Z`;
const TAIL = `M262 516 L224 532 L262 544 C256 534 256 526 262 516 Z`;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="455" cy="445" rx="225" ry="130"/><circle cx="674" cy="498" r="54"/><ellipse cx="592" cy="616" rx="62" ry="44"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linecap="round"><path d="${DOME}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="M270 522 H640"/>
<path d="M264 524 C344 552 566 552 646 524"/>
<path d="M310 580 C380 596 530 596 600 580" stroke-width="4"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5"><circle cx="674" cy="498" r="38"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${FLIP_F}"/><path d="${FLIP_B}"/><path d="${TAIL}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linejoin="round">
<path d="${HEX}"/>
<path d="M336 380 C322 424 320 470 330 514"/>
<path d="M574 380 C588 424 590 470 580 514"/>
<path d="M286 486 C370 466 540 466 624 486"/>
<path d="M372 362 C420 344 490 344 538 362"/></g>`;

const L6 = (s) => `<g stroke="${s}" stroke-linecap="round">
<ellipse cx="688" cy="490" rx="6" ry="7.5" fill="${s}" stroke="none"/>
<circle cx="690" cy="487" r="2" fill="#fff9ee" stroke="none"/>
<path d="M694 514 Q708 520 718 510" fill="none" stroke-width="4"/>
<g fill="none" stroke-width="3.5">
<circle cx="664" cy="474" r="4"/>
<circle cx="656" cy="502" r="3"/>
<path d="M586 596 C596 606 602 620 604 634"/>
<path d="M316 596 C310 608 308 620 310 632"/>
</g></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#cfeefb" stroke="#7cc7e8" stroke-width="3.5">
<circle cx="722" cy="416" r="10"/><circle cx="746" cy="382" r="7"/><circle cx="702" cy="374" r="5"/></g>
<path d="${TAIL}" fill="#8fce6e" stroke="#2b2620" stroke-width="5"/>
<path d="${FLIP_B}" fill="#8fce6e" stroke="#2b2620" stroke-width="5"/>
<path d="${FLIP_F}" fill="#8fce6e" stroke="#2b2620" stroke-width="5"/>
<path d="${DOME_FILL}" fill="#4f9e4d" stroke="#2b2620" stroke-width="5.5"/>
<g fill="#ecd28a" opacity="0.9">
<path d="${HEX}"/>
<circle cx="352" cy="446" r="27"/>
<circle cx="558" cy="446" r="27"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4">
<path d="${HEX}"/>
<path d="M336 380 C322 424 320 470 330 514"/>
<path d="M574 380 C588 424 590 470 580 514"/>
<path d="M286 486 C370 466 540 466 624 486"/>
<path d="M372 362 C420 344 490 344 538 362"/></g>
<path d="M264 524 C344 552 566 552 646 524 L646 540 C566 566 344 566 264 540 Z" fill="#dcb26a" stroke="#2b2620" stroke-width="4"/>
<circle cx="674" cy="498" r="38" fill="#8fce6e" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2e7d32" stroke-width="3.5">
<circle cx="664" cy="474" r="4"/><circle cx="656" cy="502" r="3"/>
<path d="M586 596 C596 606 602 620 604 634"/></g>
<ellipse cx="688" cy="490" rx="6" ry="7.5" fill="#2b2620"/>
<circle cx="690" cy="487" r="2" fill="#ffffff"/>
<path d="M694 514 Q708 520 718 510" fill="none" stroke="#2b2620" stroke-width="4"/>
</g>`;

export default {
  slug: 'turtle-drawing',
  subject: 'Turtle Drawing',
  captions: [
    'Draw the shell dome.',
    'Add rim and belly line.',
    'Sketch the head.',
    'Add the flippers.',
    'Draw the shell pattern.',
    'Add face details.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

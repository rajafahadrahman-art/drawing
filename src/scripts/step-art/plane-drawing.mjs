// Plane Drawing — 7 steps. Side-view airliner facing RIGHT, tail at left.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="455" cy="478" rx="285" ry="82"/><path d="M170 478 H770"/><path d="M196 292 L300 292 L292 440 L196 440 Z"/><path d="M402 528 L566 548 L652 690 L520 690 Z"/></g>`;

const FUSE = `M196 452 C300 420, 520 408, 640 428 C706 440, 736 458, 736 478 C736 502, 700 522, 628 534 C500 552, 320 540, 224 500 C200 490, 190 472, 196 452 Z`;
const FIN = `M300 432 C282 370, 262 322, 238 292 C228 279, 211 281, 205 298 C195 332, 191 392, 193 450`;
const WING = `M402 528 C460 522, 520 528, 566 548 C606 600, 640 648, 652 682 C655 695, 644 701, 627 696 C558 677, 468 608, 402 528 Z`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round"><path d="${FUSE}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${FIN}"/><path d="${WING}"/>
<path d="M196 498 C230 490, 268 494, 294 510 C272 527, 232 531, 204 523 Z"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linejoin="round"><path d="${FUSE}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M636 434 C664 440, 688 453, 694 469 C674 476, 650 471, 638 458 Z"/>
<g fill="${s}" stroke="none"><circle cx="352" cy="474" r="8"/><circle cx="397" cy="470" r="8"/><circle cx="442" cy="468" r="8"/><circle cx="487" cy="468" r="8"/><circle cx="532" cy="470" r="8"/><circle cx="577" cy="474" r="8"/></g>
<path d="M612 428 C624 458, 624 500, 610 532"/>
<path d="M438 556 C498 608, 556 654, 606 680"/>
<path d="M392 538 L390 590 M640 540 L640 584"/>
<g stroke-width="4"><circle cx="390" cy="604" r="14"/><circle cx="640" cy="598" r="13"/></g></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"><path d="${FIN}"/><path d="${WING}"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M150 706 C170 684, 210 682, 226 700 C244 686, 278 690, 288 706 Z" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<path d="M612 252 C632 232, 672 230, 688 248 C706 236, 738 242, 746 258 Z" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<path d="${FIN} C240 400, 272 428, 300 432 Z" fill="#3d9be9" stroke="#2b2620" stroke-width="5.5"/>
<path d="${FUSE}" fill="#f4f8fb" stroke="#2b2620" stroke-width="6"/>
<path d="M224 500 C320 540, 500 552, 628 534 C660 529, 690 520, 712 508 L712 522 C660 544, 480 560, 330 536 C280 527, 244 514, 224 500 Z" fill="#ef6461" opacity="0.9"/>
<g fill="#7fd4f7"><circle cx="352" cy="474" r="8"/><circle cx="397" cy="470" r="8"/><circle cx="442" cy="468" r="8"/><circle cx="487" cy="468" r="8"/><circle cx="532" cy="470" r="8"/><circle cx="577" cy="474" r="8"/></g>
<path d="M636 434 C664 440, 688 453, 694 469 C674 476, 650 471, 638 458 Z" fill="#7fd4f7" stroke="#2b2620" stroke-width="3.5"/>
<path d="${WING}" fill="#3d9be9" stroke="#2b2620" stroke-width="5.5"/>
<path d="M438 556 C498 608, 556 654, 606 680" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M196 498 C230 490, 268 494, 294 510 C272 527, 232 531, 204 523 Z" fill="#3d9be9" stroke="#2b2620" stroke-width="4.5"/>
<path d="M392 538 L390 590 M640 540 L640 584" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<circle cx="390" cy="604" r="14" fill="#3a3630" stroke="#2b2620" stroke-width="4"/><circle cx="640" cy="598" r="13" fill="#3a3630" stroke="#2b2620" stroke-width="4"/>
</g>`;

export default {
  slug: 'plane-drawing',
  subject: 'Plane Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the fuselage.',
    'Add the wings and tail fin.',
    'Refine the outside contour.',
    'Add windows and landing gear.',
    'Clean up the guide lines.',
    'Add colour, shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

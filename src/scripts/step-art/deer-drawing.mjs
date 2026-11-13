// Deer Drawing — 9 steps, standing side view facing right.
// Soft oval body, thick wedge neck flowing out of the chest, large elongated
// profile head with tapered muzzle, slim legs (far pair offset and shorter,
// subtle knee/hock hints, dark hooves), branched antlers, ears below the
// antlers, short tail and fawn spots. Final step in colour.
const BODY = `<ellipse cx="415" cy="452" rx="155" ry="94"/>`;
const NECK_BACK = `M498 372 C548 338 590 314 622 298`;
const NECK_FRONT = `M552 448 C585 405 615 368 638 338`;
const HEAD = `M626 282 C640 268 668 262 692 268 C716 274 734 286 742 300 C748 310 747 320 740 326 C728 336 706 340 690 338 C672 344 656 342 646 332 C634 322 628 306 626 296 C625 291 625 286 626 282 Z`;
const ANTLER_NEAR = `M650 264 C644 216 626 178 596 148 M646 226 C634 210 622 202 608 200 M622 180 C612 158 612 142 620 126 M596 148 C590 132 590 118 596 104`;
const ANTLER_FAR = `M668 262 C664 220 652 190 632 166 M656 202 C646 184 644 170 650 156`;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="415" cy="452" rx="155" ry="94"/><ellipse cx="686" cy="302" rx="64" ry="42"/><path d="M305 520 V726 M323 514 V706 M515 524 V726 M533 518 V706"/><path d="M170 728 H730"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${BODY}</g>
<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round"><path d="${NECK_BACK}"/><path d="${NECK_FRONT}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${HEAD}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="M316 506 L312 596 L316 684"/>
<path d="M331 510 L330 596 L331 684"/>
<path d="M526 512 L521 594 L525 684"/>
<path d="M541 516 L538 594 L541 684"/>
<path d="M296 512 L290 600 L296 702"/>
<path d="M314 518 L314 600 L314 702"/>
<path d="M506 520 L500 602 L506 702"/>
<path d="M524 524 L520 602 L524 702"/>
<path d="M308 684 H336 L338 702 H306 Z"/>
<path d="M518 684 H548 L550 702 H516 Z"/>
<path d="M288 702 H320 L322 722 H286 Z"/>
<path d="M498 702 H530 L532 722 H496 Z"/>
<path d="M170 728 H730" stroke-width="4"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${ANTLER_FAR}"/>
<path d="${ANTLER_NEAR}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="M664 260 C656 230 644 210 628 202 C622 224 632 246 650 258 Z"/>
<path d="M648 274 C626 244 596 230 572 238 C580 266 604 284 634 286 C644 286 650 282 648 274 Z"/>
<path d="M724 290 C736 286 746 294 745 305 C744 316 733 322 724 317 C717 312 716 295 724 290 Z" fill="${s}"/>
<path d="M702 333 C714 336 726 334 734 328" stroke-width="3.5"/>
<ellipse cx="690" cy="298" rx="6.5" ry="8.5" fill="${s}" stroke="none"/>
<circle cx="692" cy="294" r="2.4" fill="#fff9ee" stroke="none"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round">${BODY}
<path d="${NECK_BACK}"/><path d="${NECK_FRONT}"/>
<path d="${HEAD}"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="M282 396 C262 408 254 430 260 452 C264 466 278 468 284 456 C290 436 290 412 282 396 Z"/>
<g stroke-width="3.5"><ellipse cx="350" cy="405" rx="11" ry="7" transform="rotate(-10 350 405)"/>
<ellipse cx="415" cy="392" rx="12" ry="7.5" transform="rotate(-5 415 392)"/>
<ellipse cx="480" cy="400" rx="11" ry="7" transform="rotate(6 480 400)"/>
<ellipse cx="382" cy="442" rx="10" ry="6.5" transform="rotate(-8 382 442)"/>
<ellipse cx="452" cy="436" rx="10" ry="6.5" transform="rotate(4 452 436)"/></g></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M170 728 H730" stroke="#b08968" stroke-width="4"/>
<g fill="#b57a42" stroke="#2b2620" stroke-width="4.5"><path d="M316 506 L312 596 L316 684 L331 684 L330 596 L331 510 Z"/><path d="M526 512 L521 594 L525 684 L541 684 L538 594 L541 516 Z"/></g>
<path d="M282 396 C262 408 254 430 260 452 C264 466 278 468 284 456 C290 436 290 412 282 396 Z" fill="#cd9257" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="415" cy="452" rx="155" ry="94" fill="#cd9257" stroke="#2b2620" stroke-width="5.5"/>
<path d="M320 492 C370 536 450 550 510 534 C536 527 556 510 564 490 C520 522 460 534 405 526 C368 520 338 508 320 492 Z" fill="#ecd3ac" opacity="0.9"/>
<g fill="#cd9257" stroke="#2b2620" stroke-width="4.5"><path d="M296 512 L290 600 L296 702 L314 702 L314 600 L314 518 Z"/><path d="M506 520 L500 602 L506 702 L524 702 L520 602 L524 524 Z"/></g>
<g fill="#4a3220" stroke="#2b2620" stroke-width="3.5"><path d="M306 684 H338 L340 702 H304 Z"/><path d="M516 684 H550 L552 702 H514 Z"/><path d="M286 702 H322 L324 722 H284 Z"/><path d="M496 702 H532 L534 722 H494 Z"/></g>
<path d="M498 372 C548 338 590 314 622 298 C630 308 636 322 638 338 C615 368 585 405 552 448 C528 428 508 402 498 372 Z" fill="#cd9257" stroke="#2b2620" stroke-width="5"/>
<path d="M664 260 C656 230 644 210 628 202 C622 224 632 246 650 258 Z" fill="#cd9257" stroke="#2b2620" stroke-width="4.5"/>
<path d="M648 274 C626 244 596 230 572 238 C580 266 604 284 634 286 C644 286 650 282 648 274 Z" fill="#cd9257" stroke="#2b2620" stroke-width="4.5"/>
<path d="M640 270 C622 248 600 240 586 244 C592 262 610 274 632 276 Z" fill="#ecd3ac"/>
<path d="${HEAD}" fill="#cd9257" stroke="#2b2620" stroke-width="5"/>
<path d="M688 308 C700 296 726 292 738 300 C748 308 746 322 734 330 C718 340 696 338 690 326 C687 319 686 313 688 308 Z" fill="#ecd3ac" opacity="0.85"/>
<g fill="none" stroke="#7a5a38" stroke-width="5.5"><path d="${ANTLER_FAR}"/><path d="${ANTLER_NEAR}"/></g>
<path d="M724 290 C736 286 746 294 745 305 C744 316 733 322 724 317 C717 312 716 295 724 290 Z" fill="#2b2620"/>
<path d="M702 333 C714 336 726 334 734 328" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<ellipse cx="690" cy="298" rx="6.5" ry="8.5" fill="#2b2620"/>
<circle cx="692" cy="294" r="2.4" fill="#ffffff"/>
<g fill="#f6e7c6"><ellipse cx="350" cy="405" rx="11" ry="7" transform="rotate(-10 350 405)"/><ellipse cx="415" cy="392" rx="12" ry="7.5" transform="rotate(-5 415 392)"/><ellipse cx="480" cy="400" rx="11" ry="7" transform="rotate(6 480 400)"/><ellipse cx="382" cy="442" rx="10" ry="6.5" transform="rotate(-8 382 442)"/><ellipse cx="452" cy="436" rx="10" ry="6.5" transform="rotate(4 452 436)"/></g>
</g>`;

export default {
  slug: 'deer-drawing',
  subject: 'Deer Drawing',
  captions: [
    'Draw body and neck.',
    'Add the head.',
    'Sketch the legs.',
    'Draw the antlers.',
    'Add ears and face.',
    'Refine the contour.',
    'Add tail and spots.',
    'Clean the guide lines.',
    'Shade and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7],
  colorArt,
};

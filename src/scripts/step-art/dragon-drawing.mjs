// Dragon Drawing — 12 steps. Friendly baby dragon sitting, facing LEFT.
// Head sits ON the body with a real neck overlap (head bottom ~438 over body top ~380).
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="340" cy="345" r="95"/><ellipse cx="480" cy="548" rx="126" ry="120"/><path d="M512 372 L664 238 L640 388 Z"/><path d="M170 730 H740"/></g>`;

const HEAD = `M414 296 C386 256, 316 246, 276 276 C252 294, 241 316, 244 340 C216 350, 205 371, 213 392 C221 412, 248 419, 272 414 C308 438, 368 436, 400 406 C428 380, 436 336, 414 296 Z`;
const BODY = `M396 396 C438 366, 524 372, 564 422 C596 464, 600 540, 578 606 C560 660, 520 692, 462 692 C404 692, 366 656, 356 596 C348 540, 360 446, 396 396 Z`;
const WING = `M512 372 C540 300, 596 252, 664 238 C650 268, 650 292, 664 306 C640 318, 632 336, 640 360 C612 382, 560 388, 512 372 Z`;
const TAIL = `M578 620 C646 640, 690 690, 664 720 C560 746, 420 746, 322 728`;
const HORN1 = `M324 270 C308 244, 306 226, 318 208 C331 227, 333 250, 328 270 Z`;
const HORN2 = `M384 262 C378 236, 384 218, 400 204 C407 227, 403 250, 394 264 Z`;
const ARM = `M372 516 C344 534, 334 562, 346 584 C357 600, 380 598, 388 578 C392 560, 386 532, 372 516 Z`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${HORN1}"/><path d="${HORN2}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-linejoin="round" stroke-linecap="round">
<path d="${WING}" stroke-width="5.5"/>
<g stroke-width="3.5"><path d="M498 462 c10 -12, 28 -12, 36 0 M528 498 c10 -12, 28 -12, 36 0 M486 512 c10 -12, 28 -12, 36 0"/></g></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${HEAD}"/><path d="${BODY}"/><path d="${TAIL}"/>
<path d="M578 656 C620 672, 642 698, 630 716"/>
<path d="M322 728 C300 710, 281 714, 277 733 C274 750, 291 763, 309 758 C326 753, 330 739, 322 728 Z"/>
<path d="${ARM}"/>
<path d="M400 656 C378 682, 380 706, 404 712 L474 712 C490 696, 482 668, 454 656"/></g>`;

const L5 = (s) => `<g stroke="${s}" stroke-linecap="round">
<circle cx="312" cy="330" r="14" fill="none" stroke-width="4.5"/><circle cx="312" cy="332" r="6" fill="${s}" stroke="none"/><circle cx="232" cy="362" r="4" fill="${s}" stroke="none"/>
<g fill="none" stroke-width="3.5">
<path d="M218 392 C244 408, 276 410, 300 400"/>
<path d="M250 404 L258 420 L267 405"/>
<path d="M520 380 C566 356, 612 326, 650 302 M524 384 C572 368, 614 352, 640 354"/>
<path d="M420 560 C460 577, 510 577, 544 558 M414 606 C458 625, 514 625, 550 604 M426 650 C464 665, 512 665, 542 648"/>
<path d="M404 706 L396 690 M428 710 L424 692 M452 708 L450 690"/>
<path d="M440 440 c10 -12, 28 -12, 36 0 M420 486 c10 -12, 28 -12, 36 0 M528 420 c10 -12, 28 -12, 36 0"/></g></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linejoin="round"><path d="${HEAD}"/><path d="${BODY}"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M300 742 C420 729, 580 729, 680 742" stroke-width="4"/>
<path d="M270 414 C308 436, 360 440, 398 422"/>
<path d="M520 400 C548 420, 562 448, 564 478"/>
<path d="M470 668 C500 674, 530 672, 552 660 M440 630 C470 638, 504 638, 528 628" stroke-width="3"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linejoin="round">
<path d="M596 652 c10 -10, 26 -10, 34 0 M556 706 c12 -9, 28 -9, 38 0 M486 722 c12 -9, 28 -9, 38 0 M410 724 c12 -9, 28 -9, 38 0"/>
<path d="M410 390 L424 364 L440 392 M458 378 L474 354 L488 384 M512 386 L530 364 L540 394"/>
<path d="M592 630 L610 610 L620 638 M646 668 L666 654 L670 682"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="M364 410 C398 430, 436 434, 468 422"/>
<path d="M512 388 C540 396, 566 394, 590 380"/>
<path d="M420 566 C458 581, 508 581, 540 564 M416 612 C456 629, 510 629, 544 610" stroke-width="3"/>
<path d="M352 592 C366 606, 384 606, 394 590"/></g>`;

const L10 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${HEAD}"/><path d="${BODY}"/><path d="${WING}"/><path d="${TAIL}"/></g>`;

const L11 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M482 556 C480 596, 480 640, 484 686"/>
<path d="M246 342 c7 -8, 18 -8, 24 0 M270 322 c7 -8, 18 -8, 24 0"/>
<circle cx="246" cy="380" r="3" fill="${s}" stroke="none"/><circle cx="264" cy="388" r="3" fill="${s}" stroke="none"/><circle cx="234" cy="394" r="3" fill="${s}" stroke="none"/>
<path d="M470 452 c8 -10, 22 -10, 28 0 M448 540 c8 -10, 22 -10, 28 0 M520 560 c8 -10, 22 -10, 28 0" stroke-width="3"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M300 742 C420 729, 580 729, 680 742" fill="none" stroke="#2b2620" stroke-width="4" opacity="0.3"/>
<path d="${TAIL}" fill="none" stroke="#7bc96f" stroke-width="34" opacity="0.9"/>
<path d="${TAIL}" fill="none" stroke="#2b2620" stroke-width="4"/>
<path d="M578 656 C620 672, 642 698, 630 716" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M322 728 C300 710, 281 714, 277 733 C274 750, 291 763, 309 758 C326 753, 330 739, 322 728 Z" fill="#e94f37" stroke="#2b2620" stroke-width="4.5"/>
<path d="${WING}" fill="#f4a259" stroke="#2b2620" stroke-width="5.5"/>
<path d="M520 380 C566 356, 612 326, 650 302 M524 384 C572 368, 614 352, 640 354" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="${BODY}" fill="#7bc96f" stroke="#2b2620" stroke-width="6"/>
<path d="M428 520 C470 500, 520 506, 548 540 C556 590, 550 650, 530 682 C490 696, 440 690, 420 664 C406 616, 408 566, 428 520 Z" fill="#fff3b0" opacity="0.9"/>
<path d="M420 560 C460 577, 510 577, 544 558 M414 606 C458 625, 514 625, 550 604 M426 650 C464 665, 512 665, 542 648" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M482 556 C480 596, 480 640, 484 686" fill="none" stroke="#2b2620" stroke-width="3"/>
<path d="${ARM}" fill="#7bc96f" stroke="#2b2620" stroke-width="4.5"/>
<path d="M400 656 C378 682, 380 706, 404 712 L474 712 C490 696, 482 668, 454 656 Z" fill="#7bc96f" stroke="#2b2620" stroke-width="4.5"/>
<path d="M404 706 L396 690 M428 710 L424 692 M452 708 L450 690" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="${HEAD}" fill="#7bc96f" stroke="#2b2620" stroke-width="6"/>
<path d="${HORN1}" fill="#ffe8c9" stroke="#2b2620" stroke-width="4.5"/>
<path d="${HORN2}" fill="#ffe8c9" stroke="#2b2620" stroke-width="4.5"/>
<g fill="#e94f37" stroke="#2b2620" stroke-width="3.5"><path d="M410 390 L424 364 L440 392 Z"/><path d="M458 378 L474 354 L488 384 Z"/><path d="M512 386 L530 364 L540 394 Z"/><path d="M592 630 L610 610 L620 638 Z"/><path d="M646 668 L666 654 L670 682 Z"/></g>
<circle cx="312" cy="330" r="14" fill="#ffffff" stroke="#2b2620" stroke-width="4"/><circle cx="312" cy="332" r="6.5" fill="#2b2620"/><circle cx="316" cy="326" r="2.2" fill="#ffffff"/>
<circle cx="232" cy="362" r="4" fill="#2b2620"/>
<path d="M218 392 C244 408, 276 410, 300 400" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M250 404 L258 420 L267 405 Z" fill="#ffffff" stroke="#2b2620" stroke-width="3"/>
<g fill="none" stroke="#5da653" stroke-width="3.5"><path d="M498 462 c10 -12, 28 -12, 36 0 M528 498 c10 -12, 28 -12, 36 0 M440 440 c10 -12, 28 -12, 36 0"/></g>
</g>`;

export default {
  slug: 'dragon-drawing',
  subject: 'Dragon Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the curved horns.',
    'Add the wing and first scales.',
    'Refine the outside contour.',
    'Add eye, claws and belly plates.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
    'Build richer tail texture.',
    'Strengthen depth and overlap.',
    'Check proportions, redraw contour.',
    'Add advanced surface variation.',
    'Polish, colour and finish!',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, L11],
  colorArt,
};

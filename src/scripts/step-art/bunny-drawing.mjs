// Bunny Drawing — 7 steps, sitting front view with long ears, from the tutorial's own step list.
// Construction shapes live in `guides`; L4 re-draws them as the strong final contour (tree pattern).
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="440" r="76"/><ellipse cx="450" cy="572" rx="126" ry="100"/><ellipse cx="410" cy="282" rx="27" ry="100" transform="rotate(-7 410 282)"/><ellipse cx="490" cy="282" rx="27" ry="100" transform="rotate(7 490 282)"/><ellipse cx="396" cy="668" rx="32" ry="15"/><ellipse cx="504" cy="668" rx="32" ry="15"/><path d="M450 200 V690"/></g>`;

const EAR_L = `M384 388 C366 306 368 228 384 192 C391 176 410 174 418 190 C434 222 436 310 428 386 C415 398 397 398 384 388 Z`;
const EAR_R = `M516 388 C534 306 532 228 516 192 C509 176 490 174 482 190 C466 222 464 310 472 386 C485 398 503 398 516 388 Z`;
const EAR_IN_L = `M396 368 C389 300 391 240 400 210 C404 198 412 198 415 210 C422 238 423 302 417 366 C410 376 401 376 396 368 Z`;
const EAR_IN_R = `M504 368 C511 300 509 240 500 210 C496 198 488 198 485 210 C478 238 477 302 483 366 C490 376 499 376 504 368 Z`;
const PUFF = `M560 592 C556 566 574 548 596 552 C612 538 638 552 636 574 C652 588 644 616 624 618 C616 638 584 636 578 616 C562 612 558 604 560 592 Z`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${EAR_L}"/><path d="${EAR_R}"/>
<path d="${EAR_IN_L}" stroke-width="3.5"/><path d="${EAR_IN_R}" stroke-width="3.5"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<circle cx="418" cy="472" r="27"/><circle cx="482" cy="472" r="27"/>
<path d="M437 450 Q450 443 463 450 Q461 465 450 467 Q439 465 437 450 Z"/>
<path d="M450 467 V476 M450 476 Q441 485 432 480 M450 476 Q459 485 468 480" stroke-width="3.5"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round">
<circle cx="450" cy="440" r="76"/><ellipse cx="450" cy="572" rx="126" ry="100"/>
<ellipse cx="396" cy="664" rx="34" ry="16" stroke-width="5.5"/>
<ellipse cx="504" cy="664" rx="34" ry="16" stroke-width="5.5"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<circle cx="422" cy="428" r="8.5" fill="${s}" stroke="none"/>
<circle cx="478" cy="428" r="8.5" fill="${s}" stroke="none"/>
<circle cx="425" cy="425" r="2.6" fill="#fff9ee" stroke="none"/>
<circle cx="481" cy="425" r="2.6" fill="#fff9ee" stroke="none"/>
<path d="M398 466 Q356 456 324 442 M398 478 Q356 478 326 474 M398 490 Q358 498 330 508" stroke-width="3.5"/>
<path d="M502 466 Q544 456 576 442 M502 478 Q544 478 574 474 M502 490 Q542 498 570 508" stroke-width="3.5"/>
<path d="${PUFF}"/>
<path d="M436 372 q5 -12 12 -2 q6 -10 13 0" stroke-width="3.5"/>
<path d="M424 540 q9 12 18 3 q9 10 18 1" stroke-width="3.5"/>
<ellipse cx="330" cy="676" rx="40" ry="14" transform="rotate(-6 330 676)"/>
<ellipse cx="570" cy="676" rx="40" ry="14" transform="rotate(6 570 676)"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<ellipse cx="450" cy="572" rx="126" ry="100" fill="#efe9dd" stroke="#2b2620" stroke-width="6"/>
<path d="${PUFF}" fill="#ffffff" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="330" cy="676" rx="40" ry="14" transform="rotate(-6 330 676)" fill="#efe9dd" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="570" cy="676" rx="40" ry="14" transform="rotate(6 570 676)" fill="#efe9dd" stroke="#2b2620" stroke-width="4.5"/>
<ellipse cx="396" cy="664" rx="34" ry="16" fill="#efe9dd" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="504" cy="664" rx="34" ry="16" fill="#efe9dd" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR_L}" fill="#efe9dd" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR_R}" fill="#efe9dd" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR_IN_L}" fill="#f6a9bc" stroke="#2b2620" stroke-width="3.5"/>
<path d="${EAR_IN_R}" fill="#f6a9bc" stroke="#2b2620" stroke-width="3.5"/>
<circle cx="450" cy="440" r="76" fill="#f7f2e7" stroke="#2b2620" stroke-width="6"/>
<circle cx="418" cy="472" r="27" fill="#f7f2e7" stroke="#2b2620" stroke-width="4"/>
<circle cx="482" cy="472" r="27" fill="#f7f2e7" stroke="#2b2620" stroke-width="4"/>
<path d="M436 372 q5 -12 12 -2 q6 -10 13 0" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<circle cx="422" cy="428" r="8.5" fill="#2b2620"/>
<circle cx="478" cy="428" r="8.5" fill="#2b2620"/>
<circle cx="425" cy="425" r="2.6" fill="#ffffff"/>
<circle cx="481" cy="425" r="2.6" fill="#ffffff"/>
<path d="M437 450 Q450 443 463 450 Q461 465 450 467 Q439 465 437 450 Z" fill="#e86a8a" stroke="#2b2620" stroke-width="4"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M450 467 V476 M450 476 Q441 485 432 480 M450 476 Q459 485 468 480"/>
<path d="M398 466 Q356 456 324 442 M398 478 Q356 478 326 474 M398 490 Q358 498 330 508"/>
<path d="M502 466 Q544 456 576 442 M502 478 Q544 478 574 474 M502 490 Q542 498 570 508"/></g>
<g fill="none" stroke="#d8d2c4" stroke-width="5" opacity="0.8"><path d="M424 540 q9 12 18 3 q9 10 18 1 M380 620 q30 16 70 16 M470 636 q40 0 70 -16"/></g>
</g>`;

export default {
  slug: 'bunny-drawing',
  subject: 'Bunny Drawing',
  captions: [
    'Place the construction shapes.',
    'Block in the long ears.',
    'Set the round cheeks and nose.',
    'Refine the outside contour.',
    'Add subject details.',
    'Clean the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

// Skull Drawing — 8 steps, a friendly cartoon skull built as one progressive drawing.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="392" r="162"/><ellipse cx="450" cy="600" rx="104" ry="102"/><path d="M450 196 V724 M268 432 H632"/></g>`;

const cranium = `M450 232 C556 232, 618 306, 618 402 C618 462, 596 508, 566 536 L334 536 C304 508, 282 462, 282 402 C282 306, 344 232, 450 232 Z`;
const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round"><path d="${cranium}"/></g>`;

const jaw = `M360 524 C354 580, 362 628, 386 656 C404 678, 426 688, 450 688 C474 688, 496 678, 514 656 C538 628, 546 580, 540 524`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${jaw}"/>
<path d="M322 486 C310 512, 314 538, 334 552"/>
<path d="M578 486 C590 512, 586 538, 566 552"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5"><ellipse cx="385" cy="432" rx="47" ry="55"/><ellipse cx="515" cy="432" rx="47" ry="55"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="M450 490 L478 548 C480 556, 474 561, 466 559 L434 559 C426 561, 420 556, 422 548 Z"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="M384 614 H516 M396 652 H504"/>
<path d="M408 614 C408 630, 408 640, 408 652 M431 614 C431 632, 431 642, 431 654 M469 614 C469 632, 469 642, 469 654 M492 614 C492 630, 492 640, 492 652"/></g>`;

const L6 = (s) => `<g fill="none" stroke-linejoin="round">
<g stroke="${s}" stroke-width="6.5"><path d="${cranium}"/><path d="${jaw}" stroke-linecap="round"/></g>
<path d="M520 262 C514 282, 524 296, 516 314 C524 322, 527 333, 522 345" stroke="${s}" stroke-width="3.5" stroke-linecap="round"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="${cranium}" fill="#f4f1ea"/>
<path d="M360 524 C354 580, 362 628, 386 656 C404 678, 426 688, 450 688 C474 688, 496 678, 514 656 C538 628, 546 580, 540 524 L360 524 Z" fill="#f4f1ea"/>
<path d="M540 330 C578 356, 596 402, 592 452 C589 490, 576 518, 556 538 C574 512, 584 470, 578 424 C573 386, 560 354, 540 330 Z" fill="#d9d4c8" opacity="0.8"/>
<path d="M366 560 C380 570, 396 574, 412 572 C398 584, 378 586, 362 578 C356 570, 358 562, 366 560 Z" fill="#d9d4c8" opacity="0.8"/>
<path d="M534 560 C520 570, 504 574, 488 572 C502 584, 522 586, 538 578 C544 570, 542 562, 534 560 Z" fill="#d9d4c8" opacity="0.8"/>
<path d="M404 664 C428 676, 472 676, 496 664 C484 680, 466 686, 450 686 C434 686, 416 680, 404 664 Z" fill="#d9d4c8" opacity="0.85"/>
<g fill="#3a352e"><ellipse cx="385" cy="432" rx="47" ry="55"/><ellipse cx="515" cy="432" rx="47" ry="55"/><path d="M450 490 L478 548 C480 556, 474 561, 466 559 L434 559 C426 561, 420 556, 422 548 Z"/></g>
<g fill="#ffffff"><circle cx="368" cy="412" r="8"/><circle cx="498" cy="412" r="8"/></g>
<g fill="none" stroke="#2b2620" stroke-width="5.5"><path d="${cranium}"/><path d="${jaw}"/></g>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M322 486 C310 512, 314 538, 334 552"/><path d="M578 486 C590 512, 586 538, 566 552"/><path d="M520 262 C514 282, 524 296, 516 314 C524 322, 527 333, 522 345"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4"><path d="M384 614 H516 M396 652 H504"/><path d="M408 614 C408 630, 408 640, 408 652 M431 614 C431 632, 431 642, 431 654 M469 614 C469 632, 469 642, 469 654 M492 614 C492 630, 492 640, 492 652"/></g>
</g>`;

export default {
  slug: 'skull-drawing',
  subject: 'Skull Drawing',
  captions: [
    'Draw the cranium.',
    'Add cheeks and jaw.',
    'Sketch the eye sockets.',
    'Add the nose cavity.',
    'Draw the teeth.',
    'Refine the outline.',
    'Clean the guide lines.',
    'Shade and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

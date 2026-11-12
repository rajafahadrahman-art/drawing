// Fish Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="472" rx="292" ry="158"/><path d="M148 472 H752"/></g>`;

const bodyPath = `M185 475 C295 338, 500 326, 652 468 C500 614, 295 612, 185 475 Z`;
const dorsalPath = `M358 366 C396 300, 480 284, 534 326 C476 350, 414 360, 358 366 Z`;
const tailPath = `M648 468 C688 408, 716 372, 748 362 C736 420, 730 445, 724 470 C730 495, 736 520, 748 578 C716 568, 686 532, 648 468 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${bodyPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${tailPath}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="${dorsalPath}"/>
<path d="M302 384 C342 434, 342 512, 298 566"/>
<path d="M336 516 C368 540, 380 572, 368 602 C338 578, 326 546, 336 516 Z"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${bodyPath}"/><path d="${tailPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<circle cx="262" cy="448" r="17" stroke-width="4"/>
<circle cx="262" cy="448" r="7" fill="${s}" stroke="none"/>
<path d="M192 492 C206 500, 222 502, 236 496"/>
<path d="M330 478 C430 460, 540 460, 628 474"/>
<path d="M372 424 c10 -14, 30 -14, 40 0 M436 416 c10 -14, 30 -14, 40 0 M500 420 c10 -14, 30 -14, 40 0"/>
<path d="M398 478 c10 -14, 30 -14, 40 0 M462 472 c10 -14, 30 -14, 40 0 M526 474 c10 -14, 30 -14, 40 0"/>
<path d="M376 528 c10 -14, 30 -14, 40 0 M440 534 c10 -14, 30 -14, 40 0"/>
<path d="M660 470 L736 388 M664 472 L742 470 M660 474 L736 554"/>
<path d="M398 350 C426 326, 456 312, 490 310"/>
<path d="M346 528 C356 548, 362 568, 362 588"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#ff8c42" stroke="#2b2620" stroke-width="5"><path d="${tailPath}"/><path d="${dorsalPath}"/></g>
<g fill="#ffb347" stroke="#2b2620" stroke-width="5.5"><path d="${bodyPath}"/></g>
<path d="M185 475 C295 612, 500 614, 652 468 C566 566, 392 596, 288 550 C242 530, 206 506, 185 475 Z" fill="#ffe0ae"/>
<g fill="#ff8c42" stroke="#2b2620" stroke-width="5"><path d="M336 516 C368 540, 380 572, 368 602 C338 578, 326 546, 336 516 Z"/></g>
<g fill="none" stroke="#e07b2a" stroke-width="3.5">
<path d="M372 424 c10 -14, 30 -14, 40 0 M436 416 c10 -14, 30 -14, 40 0 M500 420 c10 -14, 30 -14, 40 0"/>
<path d="M398 478 c10 -14, 30 -14, 40 0 M462 472 c10 -14, 30 -14, 40 0 M526 474 c10 -14, 30 -14, 40 0"/>
<path d="M376 528 c10 -14, 30 -14, 40 0 M440 534 c10 -14, 30 -14, 40 0"/>
<path d="M330 478 C430 460, 540 460, 628 474"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4"><path d="M302 384 C342 434, 342 512, 298 566"/></g>
<g fill="none" stroke="#c25e10" stroke-width="3"><path d="M660 470 L736 388 M664 472 L742 470 M660 474 L736 554 M392 344 C420 322, 452 308, 486 306"/></g>
<circle cx="262" cy="448" r="17" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<circle cx="262" cy="448" r="8" fill="#2b2620"/>
<circle cx="258" cy="443" r="3" fill="#ffffff"/>
<path d="M192 492 C206 500, 222 502, 236 496" fill="none" stroke="#2b2620" stroke-width="3.5"/>
</g>`;

export default {
  slug: 'fish-drawing',
  subject: 'Fish Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the tail fin.',
    'Set the dorsal fin and gill cover.',
    'Refine the outside contour.',
    'Add scale rows and fin rays.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

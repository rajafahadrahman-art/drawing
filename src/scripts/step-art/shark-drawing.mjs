// Shark Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="455" cy="475" rx="298" ry="138"/><path d="M150 475 H760"/></g>`;

const bodyPath = `M172 482 C262 392, 425 356, 562 394 C645 416, 692 444, 708 474 C692 504, 642 536, 556 560 C425 592, 262 562, 172 482 Z`;
const tailPath = `M700 450 C720 398, 734 352, 736 306 C760 360, 770 416, 758 464 C748 472, 736 478, 724 480 C732 520, 734 552, 736 584 C720 548, 708 518, 700 488 Z`;
const dorsalPath = `M424 392 C450 320, 492 282, 530 272 C526 330, 514 370, 496 400 C472 394, 448 392, 424 392 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${bodyPath}"/></g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${dorsalPath}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="${tailPath}"/>
<path d="M306 424 C318 452, 318 492, 304 522" stroke-width="4"/>
<path d="M330 430 C340 454, 340 488, 328 516" stroke-width="4"/>
<path d="M352 438 C360 458, 360 484, 350 508" stroke-width="4"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${bodyPath}"/><path d="${tailPath}"/><path d="${dorsalPath}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<circle cx="248" cy="458" r="9" fill="${s}" stroke="none"/>
<path d="M182 512 C218 528, 262 530, 300 518"/>
<path d="M244 532 C380 568, 556 556, 678 496" stroke-width="3.5"/>
<path d="M356 534 C388 576, 424 598, 462 602 C432 564, 398 544, 356 534 Z"/>
<path d="M612 404 C626 376, 644 362, 660 360 C656 384, 646 400, 632 410 Z"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#7d9db5" stroke="#2b2620" stroke-width="5"><path d="${tailPath}"/><path d="${dorsalPath}"/></g>
<g fill="#e8eef2" stroke="#2b2620" stroke-width="5.5"><path d="${bodyPath}"/></g>
<path d="M172 482 C262 392, 425 356, 562 394 C645 416, 692 444, 708 474 C640 512, 480 534, 348 528 C262 524, 200 508, 172 482 Z" fill="#7d9db5"/>
<g fill="#7d9db5" stroke="#2b2620" stroke-width="5"><path d="M356 534 C388 576, 424 598, 462 602 C432 564, 398 544, 356 534 Z"/><path d="M612 404 C626 376, 644 362, 660 360 C656 384, 646 400, 632 410 Z"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4">
<path d="M306 424 C318 452, 318 492, 304 522"/>
<path d="M330 430 C340 454, 340 488, 328 516"/>
<path d="M352 438 C360 458, 360 484, 350 508"/>
<path d="M182 512 C218 528, 262 530, 300 518"/></g>
<path d="M244 532 C380 568, 556 556, 678 496" fill="none" stroke="#5b7d99" stroke-width="3.5"/>
<circle cx="248" cy="458" r="9" fill="#2b2620"/>
<circle cx="245" cy="455" r="3" fill="#ffffff"/>
</g>`;

export default {
  slug: 'shark-drawing',
  subject: 'Shark Drawing',
  captions: [
    'Sketch the basic shapes.',
    'Block in the dorsal fin.',
    'Set the tail fin and gill slits.',
    'Refine the outside contour.',
    'Add the eye, mouth, and belly line.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

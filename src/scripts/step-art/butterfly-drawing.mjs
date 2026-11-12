// Butterfly Drawing — 9 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M450 200 V752"/><ellipse cx="298" cy="352" rx="142" ry="100"/><ellipse cx="602" cy="352" rx="142" ry="100"/><ellipse cx="316" cy="548" rx="112" ry="86"/><ellipse cx="584" cy="548" rx="112" ry="86"/></g>`;

const mirror = (inner) => `<g transform="translate(900 0) scale(-1 1)">${inner}</g>`;

const upperWingL = `M436 316 C344 232, 228 236, 198 318 C176 380, 238 450, 332 454 C388 456, 428 420, 438 374 Z`;
const lowerWingL = `M434 436 C352 428, 272 472, 274 544 C276 614, 358 652, 414 614 C442 594, 446 504, 434 436 Z`;
const headPath = `M425 266 a25 25 0 1 0 50 0 a25 25 0 1 0 -50 0`;
const thoraxPath = `M421 342 a29 46 0 1 0 58 0 a29 46 0 1 0 -58 0`;
const abdomenPath = `M431 380 C427 448, 434 516, 450 562 C466 516, 473 448, 469 380 Z`;

const bodyGroup = (s, w) => `<g fill="none" stroke="${s}" stroke-width="${w}"><path d="${headPath}"/><path d="${thoraxPath}"/><path d="${abdomenPath}"/></g>`;
const wingsGroup = (s, w) => `<g fill="none" stroke="${s}" stroke-width="${w}" stroke-linejoin="round"><path d="${upperWingL}"/><path d="${lowerWingL}"/>${mirror(`<path d="${upperWingL}"/><path d="${lowerWingL}"/>`)}</g>`;

const L1 = (s) => ``;

const L2 = (s) => bodyGroup(s, 5);

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${upperWingL}"/>${mirror(`<path d="${upperWingL}"/>`)}</g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${lowerWingL}"/>${mirror(`<path d="${lowerWingL}"/>`)}</g>`;

const L5 = (s) => wingsGroup(s, 6.5) + bodyGroup(s, 5);

const veinsL = `<path d="M428 352 C380 322, 340 300, 296 284"/><path d="M426 366 C370 362, 300 362, 240 366"/><path d="M424 380 C392 402, 358 418, 322 428"/><path d="M428 478 C392 492, 356 502, 322 510"/><path d="M426 494 C402 528, 378 560, 354 590"/>`;
const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">${veinsL}${mirror(veinsL)}</g>`;

const bandL = `M424 330 C356 268, 262 264, 238 322 C222 366, 262 412, 330 418 C384 422, 416 388, 424 330 Z`;
const patternsL = `<path d="${bandL}"/><ellipse cx="302" cy="322" rx="36" ry="27"/><circle cx="252" cy="398" r="15"/><circle cx="338" cy="522" r="17"/><circle cx="366" cy="584" r="12"/>`;
const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linejoin="round">${patternsL}${mirror(patternsL)}</g>`;

const antennaL = `<path d="M440 246 C410 216, 378 206, 344 210"/><circle cx="334" cy="211" r="8" fill="ANTFILL" stroke="none"/>`;
const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">${antennaL.replace('ANTFILL', s)}${mirror(antennaL.replace('ANTFILL', s))}
<path d="M432 436 C441 444, 459 444, 468 436 M433 478 C442 486, 458 486, 467 478 M436 518 C444 525, 456 525, 464 518"/>
<path d="M424 322 l-10 -4 M424 348 l-11 0 M426 374 l-10 5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#ffd43b" stroke="#2b2620" stroke-width="5"><path d="${lowerWingL}"/>${mirror(`<path d="${lowerWingL}"/>`)}</g>
<g fill="#ff9f43" stroke="#2b2620" stroke-width="5"><path d="${upperWingL}"/>${mirror(`<path d="${upperWingL}"/>`)}</g>
<g fill="#ff6b9d"><path d="${bandL}"/>${mirror(`<path d="${bandL}"/>`)}</g>
<g fill="#ffffff" stroke="#2b2620" stroke-width="3.5"><ellipse cx="302" cy="322" rx="36" ry="27"/><circle cx="252" cy="398" r="15"/>${mirror(`<ellipse cx="302" cy="322" rx="36" ry="27"/><circle cx="252" cy="398" r="15"/>`)}</g>
<g fill="#ff6b9d" stroke="#2b2620" stroke-width="3.5"><circle cx="338" cy="522" r="17"/><circle cx="366" cy="584" r="12"/>${mirror(`<circle cx="338" cy="522" r="17"/><circle cx="366" cy="584" r="12"/>`)}</g>
<g fill="none" stroke="#2b2620" stroke-width="3" opacity="0.55">${veinsL}${mirror(veinsL)}</g>
<g fill="#6b4632" stroke="#2b2620" stroke-width="5"><path d="${thoraxPath}"/><path d="${abdomenPath}"/></g>
<g fill="#4a2f23" stroke="#2b2620" stroke-width="5"><path d="${headPath}"/></g>
<g fill="none" stroke="#3a2418" stroke-width="3"><path d="M432 436 C441 444, 459 444, 468 436 M433 478 C442 486, 458 486, 467 478 M436 518 C444 525, 456 525, 464 518"/></g>
<g fill="none" stroke="#2b2620" stroke-width="4">${antennaL.replace('ANTFILL', '#2b2620')}${mirror(antennaL.replace('ANTFILL', '#2b2620'))}</g>
<circle cx="441" cy="260" r="4" fill="#ffffff"/>
<circle cx="459" cy="260" r="4" fill="#ffffff"/>
</g>`;

export default {
  slug: 'butterfly-drawing',
  subject: 'Butterfly Drawing',
  captions: [
    'Draw the center guideline.',
    'Sketch the body.',
    'Add the upper wings.',
    'Add the lower wings.',
    'Refine the wing silhouette.',
    'Divide the wings into sections.',
    'Add wing patterns.',
    'Add antennae and body details.',
    'Add shading or color.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8],
  colorArt,
};

// Fire Drawing — 8 steps, campfire built as one progressive drawing.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="445" rx="175" ry="228"/><circle cx="450" cy="470" r="118"/><path d="M450 168 V762 M196 748 H704"/></g>`;

// Logs drawn as thick round-capped strokes so they read as logs in every phase.
const logLines = `<path d="M296 716 L566 640"/><path d="M604 716 L334 640"/>`;
const grainRings = `<circle cx="296" cy="716" r="17"/><circle cx="296" cy="716" r="8"/><circle cx="604" cy="716" r="17"/><circle cx="604" cy="716" r="8"/>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-linecap="round">
<path d="M214 750 H686" stroke-width="3.5"/>
<g stroke-width="34">${logLines}</g>
<g stroke-width="3.5">${grainRings}</g></g>`;

const flameOuter = `M450 668 C368 634, 320 568, 334 486 C344 426, 388 394, 402 338 C411 301, 426 263, 452 226 C459 271, 479 303, 501 334 C540 386, 568 440, 560 504 C550 582, 518 642, 450 668 Z`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round"><path d="${flameOuter}"/></g>`;

const flameInner = `M450 668 C398 644, 370 594, 380 532 C387 488, 415 463, 425 429 C431 407, 439 388, 449 365 C457 396, 473 419, 489 441 C513 475, 525 514, 517 558 C507 614, 487 650, 450 668 Z`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${flameInner}"/></g>`;

const tongueL = `M368 632 C340 606, 334 568, 352 536 C360 522, 366 511, 370 497 C376 520, 388 534, 396 554 C406 580, 398 614, 382 630 C377 635, 371 635, 368 632 Z`;
const tongueR = `M540 610 C521 586, 519 556, 533 531 C539 521, 545 512, 548 500 C553 519, 562 531, 568 546 C576 568, 570 594, 555 608 C550 612, 543 613, 540 610 Z`;
const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="${tongueL}"/>
<path d="${tongueR}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round"><path d="${flameOuter}"/><path d="${flameInner}"/></g>`;

const sparkDots = `<circle cx="255" cy="300" r="5"/><circle cx="648" cy="320" r="5"/><circle cx="615" cy="228" r="4.5"/><circle cx="288" cy="222" r="4.5"/><circle cx="668" cy="448" r="5"/><circle cx="236" cy="472" r="4.5"/><circle cx="352" cy="694" r="4.5"/><circle cx="548" cy="700" r="4.5"/>`;
const sparkPlus = `<path d="M252 344 v28 M238 358 h28"/><path d="M650 240 v26 M637 253 h26"/>`;
const L6 = (s) => `<g stroke="${s}" stroke-linecap="round">
<g fill="${s}" stroke="none">${sparkDots}</g>
<g fill="none" stroke-width="4">${sparkPlus}</g></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M214 750 H686" stroke="#2e7d32" stroke-width="4"/>
<g fill="#f26d21" stroke="#2b2620" stroke-width="5"><path d="${flameOuter}"/></g>
<g fill="#e8531a" stroke="#2b2620" stroke-width="4"><path d="${tongueL}"/><path d="${tongueR}"/></g>
<g fill="#f9a826" stroke="#2b2620" stroke-width="4.5"><path d="${flameInner}"/></g>
<path d="M450 664 C420 646, 404 612, 410 576 C415 544, 434 524, 442 496 C447 478, 449 464, 450 448 C456 472, 468 490, 480 508 C496 532, 502 560, 496 590 C488 628, 472 652, 450 664 Z" fill="#ffdf6b"/>
<g fill="none" stroke="#5d3f22" stroke-width="42"><path d="M296 716 L566 640"/><path d="M604 716 L334 640"/></g>
<g fill="none" stroke="#8a5a33" stroke-width="33"><path d="M296 716 L566 640"/><path d="M604 716 L334 640"/></g>
<g fill="#d9a066" stroke="#5d3f22" stroke-width="4"><circle cx="296" cy="716" r="16"/><circle cx="604" cy="716" r="16"/></g>
<g fill="none" stroke="#5d3f22" stroke-width="3"><circle cx="296" cy="716" r="7.5"/><circle cx="604" cy="716" r="7.5"/></g>
<g fill="#ffb703">${sparkDots}</g>
<g fill="none" stroke="#f26d21" stroke-width="4">${sparkPlus}</g>
</g>`;

export default {
  slug: 'fire-drawing',
  subject: 'Fire Drawing',
  captions: [
    'Draw the logs.',
    'Sketch the big flame.',
    'Add the inner flames.',
    'Add flame tongues.',
    'Refine the outline.',
    'Add sparks and embers.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

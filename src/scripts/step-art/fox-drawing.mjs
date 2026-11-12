// Fox Drawing — 7 steps, sitting side view facing left, from the tutorial's own step list.
// Construction shapes live in `guides`; L4 re-draws them as the strong final contour (tree pattern)
// and adds the neck curve that joins head to body.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="318" cy="368" r="88"/><ellipse cx="468" cy="538" rx="142" ry="112"/><ellipse cx="640" cy="580" rx="105" ry="68" transform="rotate(-18 640 580)"/><path d="M266 380 L196 400"/></g>`;

const EAR1 = `M252 326 L240 218 Q238 204 252 210 L324 284 Q294 320 252 326 Z`;
const EAR1_IN = `M264 300 L258 240 Q272 252 286 272 Q276 292 264 300 Z`;
const EAR2 = `M328 284 L348 202 Q351 188 364 198 L402 316 Q368 296 328 284 Z`;
const EAR2_IN = `M342 274 L352 226 Q362 240 370 258 Q356 270 342 274 Z`;
const MUZZLE = `M266 338 C228 352 198 370 180 392 C171 403 179 415 196 417 C230 422 260 420 276 412 C266 388 264 362 266 338 Z`;
const TAIL = `M530 552 C562 476 648 444 706 482 C748 510 752 580 714 634 C680 684 588 698 538 658 C508 634 508 594 530 552 Z`;
const TIP_LINE = `M682 678 C716 640 730 578 716 522`;
const PAW = `M384 740 Q384 724 410 724 Q436 724 436 740 Q436 754 410 754 Q384 754 384 740 Z`;
const NECK = `M382 428 C404 452 414 478 416 506`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${EAR1}"/><path d="${EAR2}"/>
<path d="${EAR1_IN}" stroke-width="3.5"/><path d="${EAR2_IN}" stroke-width="3.5"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${MUZZLE}"/>
<path d="M202 416 Q238 430 272 420" stroke-width="3.5"/>
<ellipse cx="186" cy="398" rx="12" ry="9" fill="${s}" stroke="none"/>
<path d="${TAIL}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round">
<circle cx="318" cy="368" r="88"/><ellipse cx="468" cy="538" rx="142" ry="112"/>
<path d="${NECK}" stroke-width="5.5"/>
<path d="M396 580 C392 630 391 690 392 738 M430 586 C427 636 426 690 426 738" stroke-width="5"/>
<path d="${PAW}" stroke-width="5"/>
<path d="M548 478 C596 522 608 592 588 652" stroke-width="5"/>
<path d="M180 762 H740" stroke-width="4"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<circle cx="302" cy="356" r="7.5" fill="${s}" stroke="none"/>
<circle cx="304.5" cy="353" r="2.4" fill="#fff9ee" stroke="none"/>
<path d="M392 384 l17 8 l-14 10 l16 8 l-13 10" stroke-width="3.5"/>
<path d="M404 462 C392 520 396 590 414 648" stroke-width="4.5"/>
<path d="M336 448 q9 13 22 11" stroke-width="3.5"/>
<path d="M580 540 q24 -14 46 -6 M596 632 q26 12 50 4" stroke-width="3.5"/>
<path d="${TIP_LINE}"/></g>`;

const L6 = (s) => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M180 762 H740" stroke="#b08968" stroke-width="4"/>
<path d="${TAIL}" fill="#e07b39" stroke="#2b2620" stroke-width="5.5"/>
<path d="M682 678 C716 640 730 578 716 522 C740 556 738 606 714 640 C702 658 692 670 682 678 Z" fill="#ffffff"/>
<path d="M340 420 C380 420 420 440 448 470 L420 520 C380 500 350 465 340 420 Z" fill="#e07b39"/>
<ellipse cx="468" cy="538" rx="142" ry="112" fill="#e07b39" stroke="#2b2620" stroke-width="6"/>
<path d="M372 438 C348 470 336 520 342 576 C348 622 372 652 402 662 C396 590 392 520 404 462 C396 450 384 442 372 438 Z" fill="#ffffff"/>
<g fill="none" stroke="#2b2620" stroke-width="5"><path d="M548 478 C596 522 608 592 588 652 M396 580 C392 630 391 690 392 738 M430 586 C427 636 426 690 426 738"/></g>
<path d="${PAW}" fill="#5d4037" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR1}" fill="#e07b39" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR2}" fill="#e07b39" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR1_IN}" fill="#8a4b21" stroke="#2b2620" stroke-width="3.5"/>
<path d="${EAR2_IN}" fill="#8a4b21" stroke="#2b2620" stroke-width="3.5"/>
<circle cx="318" cy="368" r="88" fill="#e07b39" stroke="#2b2620" stroke-width="6"/>
<clipPath id="fh"><circle cx="318" cy="368" r="84"/></clipPath>
<g clip-path="url(#fh)"><path d="M226 400 C280 434 356 434 410 400 L410 460 L226 460 Z" fill="#ffffff"/></g>
<path d="${MUZZLE}" fill="#f6e7c8" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M392 384 l17 8 l-14 10 l16 8 l-13 10 M336 448 q9 13 22 11"/></g>
<circle cx="302" cy="356" r="7.5" fill="#2b2620"/>
<circle cx="304.5" cy="353" r="2.4" fill="#ffffff"/>
<ellipse cx="186" cy="398" rx="12" ry="9" fill="#2b2620"/>
<g fill="none" stroke="#c05f1e" stroke-width="5" opacity="0.75"><path d="M566 548 q22 -12 42 -4 M480 636 q44 14 88 6"/></g>
</g>`;

export default {
  slug: 'fox-drawing',
  subject: 'Fox Drawing',
  captions: [
    'Place the construction shapes.',
    'Block in the pointed ears.',
    'Set the narrow muzzle and bushy tail.',
    'Refine the outside contour.',
    'Add subject details.',
    'Clean the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

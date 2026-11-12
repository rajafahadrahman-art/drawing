// Cat Drawing — 9 steps, sitting front view, from the tutorial's own step list.
// Face guides live in L2 as dashed lines: they stay faint (gray) until the final colour step.
const HEAD = `<ellipse cx="450" cy="325" rx="110" ry="102"/>`;
const EAR_L = `M370 256 Q356 205 353 162 Q352 152 362 156 Q410 180 450 230`;
const EAR_R = `M530 256 Q544 205 547 162 Q548 152 538 156 Q490 180 450 230`;
const EAR_IN_L = `M386 238 Q380 205 380 184 Q398 198 424 222`;
const EAR_IN_R = `M514 238 Q520 205 520 184 Q502 198 476 222`;
const CHEST = `<ellipse cx="450" cy="532" rx="92" ry="118"/>`;
const REAR = `<ellipse cx="450" cy="578" rx="152" ry="108"/>`;
const BODY_SIL = `M450 415 C505 415 542 468 544 536 C575 518 602 544 602 582 C602 648 540 690 450 690 C360 690 298 648 298 582 C298 544 325 518 356 536 C358 468 395 415 450 415 Z`;
const HIND = `M534 552 C580 562 604 610 596 656 C589 688 565 700 546 689 C563 642 562 596 534 552 Z`;
const HIND_PAW = `M522 700 Q522 683 561 683 Q600 683 600 700 Q600 715 561 715 Q522 715 522 700 Z`;
const TAIL = `M566 606 C622 556 664 486 660 416 C658 394 640 388 630 406 C602 462 584 534 572 584 C568 598 560 600 566 606 Z`;
const PAW_L = `M384 718 Q384 700 407 700 Q430 700 430 718 Q430 732 407 732 Q384 732 384 718 Z`;
const PAW_R = `M470 718 Q470 700 493 700 Q516 700 516 718 Q516 732 493 732 Q470 732 470 718 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${HEAD}</g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-dasharray="8 8">
<path d="M450 232 V428"/><path d="M338 348 H562"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5">${CHEST}${REAR}</g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="${EAR_L}"/><path d="${EAR_R}"/>
<path d="${EAR_IN_L}" stroke-width="3.5"/><path d="${EAR_IN_R}" stroke-width="3.5"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="M374 348 Q398 326 422 348 Q398 363 374 348 Z"/>
<path d="M478 348 Q502 326 526 348 Q502 363 478 348 Z"/>
<path d="M432 378 Q450 371 468 378 Q464 398 450 401 Q436 398 432 378 Z"/>
<path d="M450 401 V412 M450 412 Q436 424 421 417 M450 412 Q464 424 479 417" stroke-width="3.5"/>
<ellipse cx="398" cy="347" rx="7" ry="11" fill="${s}" stroke="none"/>
<ellipse cx="502" cy="347" rx="7" ry="11" fill="${s}" stroke="none"/>
<circle cx="400.5" cy="342" r="2.6" fill="#fff9ee" stroke="none"/>
<circle cx="504.5" cy="342" r="2.6" fill="#fff9ee" stroke="none"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="M396 620 C392 652 391 686 393 716 M428 628 C426 658 426 688 427 716"/>
<path d="M473 628 C474 658 474 688 473 716 M505 620 C509 652 510 686 508 716"/>
<path d="${PAW_L}"/><path d="${PAW_R}"/>
<path d="M407 714 v10 M493 714 v10" stroke-width="3.5"/>
<path d="M238 744 H662" stroke-width="4"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${HIND}"/><path d="${HIND_PAW}"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${TAIL}"/>
<path d="M416 392 Q362 380 324 362 M416 402 Q360 402 320 396 M416 412 Q364 424 328 436" stroke-width="3.5"/>
<path d="M484 392 Q538 380 576 362 M484 402 Q540 402 580 396 M484 412 Q536 424 572 436" stroke-width="3.5"/>
<path d="M356 362 l-15 7 l13 8 l-13 8 M544 362 l15 7 l-13 8 l13 8" stroke-width="3.5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M238 744 H662" stroke="#b08968" stroke-width="4"/>
<path d="${TAIL}" fill="#e8944a" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#c96f27" stroke-width="5"><path d="M604 526 q26 4 40 20 M620 460 q22 6 30 24"/></g>
<path d="${BODY_SIL}" fill="#f0a24a" stroke="#2b2620" stroke-width="5.5"/>
<path d="${HIND}" fill="#e8944a" stroke="#2b2620" stroke-width="5"/>
<path d="${HIND_PAW}" fill="#e8944a" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2b2620" stroke-width="5"><path d="M396 620 C392 652 391 686 393 716 M428 628 C426 658 426 688 427 716 M473 628 C474 658 474 688 473 716 M505 620 C509 652 510 686 508 716"/></g>
<path d="${PAW_L}" fill="#f0a24a" stroke="#2b2620" stroke-width="5"/>
<path d="${PAW_R}" fill="#f0a24a" stroke="#2b2620" stroke-width="5"/>
<path d="M407 714 v10 M493 714 v10" stroke="#2b2620" stroke-width="3.5" fill="none"/>
<ellipse cx="450" cy="325" rx="110" ry="102" fill="#f0a24a" stroke="#2b2620" stroke-width="5.5"/>
<g fill="#f0a24a" stroke="#2b2620" stroke-width="5"><path d="${EAR_L}"/><path d="${EAR_R}"/></g>
<g fill="#f6a9bc" stroke="#2b2620" stroke-width="3.5"><path d="${EAR_IN_L}"/><path d="${EAR_IN_R}"/></g>
<g fill="none" stroke="#c96f27" stroke-width="5"><path d="M428 268 v22 M450 262 v26 M472 268 v22"/></g>
<g fill="#7fb069" stroke="#2b2620" stroke-width="4.5"><path d="M374 348 Q398 326 422 348 Q398 363 374 348 Z"/><path d="M478 348 Q502 326 526 348 Q502 363 478 348 Z"/></g>
<ellipse cx="398" cy="347" rx="7" ry="11" fill="#2b2620"/>
<ellipse cx="502" cy="347" rx="7" ry="11" fill="#2b2620"/>
<circle cx="400.5" cy="342" r="2.6" fill="#ffffff"/>
<circle cx="504.5" cy="342" r="2.6" fill="#ffffff"/>
<path d="M432 378 Q450 371 468 378 Q464 398 450 401 Q436 398 432 378 Z" fill="#e86a8a" stroke="#2b2620" stroke-width="4"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M450 401 V412 M450 412 Q436 424 421 417 M450 412 Q464 424 479 417"/>
<path d="M416 392 Q362 380 324 362 M416 402 Q360 402 320 396 M416 412 Q364 424 328 436"/>
<path d="M484 392 Q538 380 576 362 M484 402 Q540 402 580 396 M484 412 Q536 424 572 436"/></g>
<g fill="none" stroke="#d98a35" stroke-width="5" opacity="0.7"><path d="M352 560 q14 18 36 24 M356 620 q14 14 32 18"/></g>
</g>`;

export default {
  slug: 'cat-drawing',
  subject: 'Cat Drawing',
  captions: [
    'Draw the head shape.',
    'Add the face guides.',
    'Sketch the chest and rear body.',
    'Draw the ears.',
    'Add the eyes, nose, and mouth.',
    'Draw the front paws.',
    'Add the hind leg.',
    'Draw the tail and whiskers.',
    'Clean the lines and add shading.',
  ],
  guides: null,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8],
  colorArt,
};

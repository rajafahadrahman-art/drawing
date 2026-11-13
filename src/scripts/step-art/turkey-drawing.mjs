// Turkey Drawing — 9 steps, side view facing right.
// Big fanned tail at the back (left), round body, curved neck with a small
// head, beak + snood + wattle at the front, thin legs underneath.
const BODY = `<ellipse cx="430" cy="480" rx="148" ry="128"/>`;
const HEAD = `<ellipse cx="602" cy="315" rx="42" ry="40"/>`;
const NECK_BACK = `M498 412 C520 375 545 352 572 340`;
const NECK_FRONT = `M562 438 C580 405 588 380 590 356`;
const FAN = `M292 548 C230 520 188 460 182 390 C176 318 214 252 282 226 C340 204 408 224 442 272 C456 294 450 330 428 352`;
const FAN_BAND = `M210 356 C268 292 352 256 434 292`;
const WING = `M478 415 C420 430 372 470 352 520 C338 556 348 580 372 584 C430 592 492 548 508 486 C516 454 502 420 478 415 Z`;
const BEAK = `M634 300 L692 320 L632 338 C642 326 642 312 634 300 Z`;
const WATTLE = `M626 342 C614 368 616 396 632 410 C646 398 652 370 644 346 C640 334 630 332 626 342 Z`;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="430" cy="480" rx="148" ry="128"/><circle cx="602" cy="315" r="44"/><circle cx="300" cy="490" r="185"/><path d="M180 738 H720"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${BODY}</g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${NECK_BACK}"/><path d="${NECK_FRONT}"/>${HEAD}</g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${FAN}"/>
<g stroke-width="3.5"><path d="M300 525 C258 478 224 434 196 384"/>
<path d="M300 525 C268 448 244 362 222 288"/>
<path d="M300 525 C296 440 292 330 288 234"/>
<path d="M300 525 C322 436 342 322 366 228"/>
<path d="M300 525 C352 448 396 360 430 282"/>
<path d="${FAN_BAND}"/></g></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${WING}"/>
<g stroke-width="3.5"><path d="M468 452 C424 468 392 498 378 534"/>
<path d="M480 494 C448 522 418 542 390 554"/></g></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="${BEAK}"/>
<path d="M638 302 C644 286 660 282 668 292 C662 304 648 308 638 302 Z" stroke-width="3.5"/>
<path d="${WATTLE}"/>
<path d="M594 290 C604 282 620 282 630 291" stroke-width="3.5"/>
<circle cx="612" cy="306" r="5.5" fill="${s}" stroke="none"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="M392 598 L388 704 M404 600 L402 704"/>
<path d="M472 602 L476 704 M484 602 L488 704"/>
<g stroke-width="4"><path d="M395 704 L368 722 M395 704 L396 724 M395 704 L422 722"/>
<path d="M482 704 L455 722 M482 704 L483 724 M482 704 L509 722"/>
<path d="M180 738 H720"/></g></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M296 440 c9 -12 25 -12 32 0 M300 486 c9 -12 25 -12 32 0 M312 532 c9 -12 25 -12 32 0"/>
<path d="M246 322 c9 -11 24 -11 31 0 M308 288 c9 -11 24 -11 31 0 M368 282 c9 -11 24 -11 31 0"/>
<path d="M520 470 C540 500 542 540 528 576"/>
<path d="M540 400 c8 6 12 14 13 24 M528 376 c8 5 13 12 15 20"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M180 738 H720" stroke="#b08968" stroke-width="4"/>
<path d="${FAN} C420 400 380 480 340 530 C325 545 305 552 292 548 Z" fill="#cd9050" stroke="#2b2620" stroke-width="5"/>
<path d="${FAN_BAND}" fill="none" stroke="#e9bd72" stroke-width="15" opacity="0.85"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M300 525 C258 478 224 434 196 384"/>
<path d="M300 525 C268 448 244 362 222 288"/>
<path d="M300 525 C296 440 292 330 288 234"/>
<path d="M300 525 C322 436 342 322 366 228"/>
<path d="M300 525 C352 448 396 360 430 282"/></g>
<g fill="none" stroke="#8a5a2b" stroke-width="3.5"><path d="M246 322 c9 -11 24 -11 31 0 M308 288 c9 -11 24 -11 31 0 M368 282 c9 -11 24 -11 31 0"/></g>
<g fill="none" stroke="#8a6844" stroke-width="5"><path d="M392 598 L388 704 M404 600 L402 704 M472 602 L476 704 M484 602 L488 704"/>
<path d="M395 704 L368 722 M395 704 L396 724 M395 704 L422 722 M482 704 L455 722 M482 704 L483 724 M482 704 L509 722" stroke-width="4"/></g>
<ellipse cx="430" cy="480" rx="148" ry="128" fill="#b57e46" stroke="#2b2620" stroke-width="5.5"/>
<g fill="none" stroke="#8a5a2b" stroke-width="3.5"><path d="M296 440 c9 -12 25 -12 32 0 M300 486 c9 -12 25 -12 32 0 M312 532 c9 -12 25 -12 32 0"/>
<path d="M520 470 C540 500 542 540 528 576"/></g>
<path d="${WING}" fill="#8a5a2b" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#5f3d1a" stroke-width="3.5"><path d="M468 452 C424 468 392 498 378 534"/><path d="M480 494 C448 522 418 542 390 554"/></g>
<path d="M498 412 C520 375 545 352 572 340 C580 344 586 349 590 356 C588 380 580 405 562 438 C540 450 512 438 498 412 Z" fill="#b7ccd9" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#7d9db3" stroke-width="3.5"><path d="M540 400 c8 6 12 14 13 24 M528 376 c8 5 13 12 15 20"/></g>
<ellipse cx="602" cy="315" rx="42" ry="40" fill="#b7ccd9" stroke="#2b2620" stroke-width="5.5"/>
<path d="M638 302 C644 286 660 282 668 292 C662 304 648 308 638 302 Z" fill="#d64541" stroke="#2b2620" stroke-width="3.5"/>
<path d="${BEAK}" fill="#f2b234" stroke="#2b2620" stroke-width="4.5"/>
<path d="${WATTLE}" fill="#d64541" stroke="#2b2620" stroke-width="4.5"/>
<circle cx="612" cy="306" r="5.5" fill="#2b2620"/>
<circle cx="610" cy="303" r="2" fill="#ffffff"/>
</g>`;

export default {
  slug: 'turkey-drawing',
  subject: 'Turkey Drawing',
  captions: [
    'Draw the body oval.',
    'Add head and neck.',
    'Sketch the tail fan.',
    'Add the wing.',
    'Draw beak and wattle.',
    'Add legs and feet.',
    'Refine the feathers.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7],
  colorArt,
};

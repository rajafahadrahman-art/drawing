// Dog Drawing — 10 steps, sitting front view, head slightly tilted, from the tutorial's own step list.
// Step 1 is the guide set (tilted head oval + centreline + eye line), shown via `guides`, L1 empty like the tree reference.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="315" rx="118" ry="102" transform="rotate(-6 450 315)"/><path d="M438 218 C446 300 452 380 458 430"/><path d="M345 322 C400 306 500 306 555 322"/></g>`;

const SKULL = `<ellipse cx="450" cy="318" rx="126" ry="108" transform="rotate(-4 450 318)"/>`;
const MUZZLE = `M398 372 Q452 356 506 372 Q516 402 508 428 Q500 452 452 454 Q404 452 396 428 Q388 402 398 372 Z`;
const EAR_L = `M352 262 C318 280 306 340 314 402 C318 436 336 452 352 442 C366 432 370 380 368 330 C366 296 362 272 352 262 Z`;
const EAR_R = `M548 262 C582 280 594 340 586 402 C582 436 564 452 548 442 C534 432 530 380 532 330 C534 296 538 272 548 262 Z`;
const CHEST = `<ellipse cx="450" cy="560" rx="140" ry="130"/>`;
const BODY = `<ellipse cx="450" cy="610" rx="175" ry="105"/>`;
const PAW_L = `M382 718 Q382 698 407 698 Q432 698 432 718 Q432 732 407 732 Q382 732 382 718 Z`;
const PAW_R = `M468 718 Q468 698 493 698 Q518 698 518 718 Q518 732 493 732 Q468 732 468 718 Z`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${SKULL}<path d="${MUZZLE}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-dasharray="5 5">
<path d="M384 318 h26 M486 311 h26 M438 426 h28 M440 450 h24"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="M376 318 Q400 296 424 318 Q400 333 376 318 Z"/>
<path d="M476 311 Q500 289 524 311 Q500 326 476 311 Z"/>
<path d="M422 414 Q452 403 482 414 Q480 440 452 445 Q424 440 422 414 Z"/>
<ellipse cx="400" cy="315" rx="6.5" ry="10.5" fill="${s}" stroke="none"/>
<ellipse cx="500" cy="308" rx="6.5" ry="10.5" fill="${s}" stroke="none"/>
<circle cx="402.5" cy="310" r="2.5" fill="#fff9ee" stroke="none"/>
<circle cx="502.5" cy="303" r="2.5" fill="#fff9ee" stroke="none"/>
<circle cx="440" cy="420" r="3" fill="#fff9ee" stroke="none"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${EAR_L}"/><path d="${EAR_R}"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="5">${CHEST}${BODY}</g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="M398 600 C394 640 393 680 394 716 M430 606 C428 644 428 682 429 716"/>
<path d="M470 606 C472 644 472 682 471 716 M502 600 C506 640 507 680 506 716"/>
<path d="${PAW_L}"/><path d="${PAW_R}"/>
<path d="M400 712 q4 8 2 14 M414 712 q4 8 2 14 M486 712 q4 8 2 14 M500 712 q4 8 2 14" stroke-width="3.5"/>
<ellipse cx="322" cy="712" rx="30" ry="13"/>
<ellipse cx="578" cy="712" rx="30" ry="13"/>
<path d="M230 738 H670" stroke-width="4"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M452 444 V452 M452 452 Q440 458 432 454 M452 452 Q464 458 472 454"/>
<path d="M380 290 Q400 280 422 288 M478 283 Q500 273 520 281"/>
<path d="M400 376 C392 406 398 434 414 448 M504 376 C512 406 506 434 490 448"/>
<circle cx="424" cy="418" r="2.3" fill="${s}" stroke="none"/>
<circle cx="440" cy="426" r="2.3" fill="${s}" stroke="none"/>
<circle cx="464" cy="426" r="2.3" fill="${s}" stroke="none"/>
<circle cx="480" cy="418" r="2.3" fill="${s}" stroke="none"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M326 296 C318 330 318 366 326 398 M574 296 C582 330 582 366 574 398"/>
<path d="M356 380 q-6 26 2 48 M544 380 q6 26 -2 48"/>
<path d="M380 470 q12 20 30 28 M520 470 q-12 20 -30 28"/>
<path d="M416 566 q-6 28 0 54 M450 552 q0 30 5 56 M484 566 q6 28 0 54"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M230 738 H670" stroke="#b08968" stroke-width="4"/>
<ellipse cx="450" cy="610" rx="175" ry="105" fill="#e3b06a" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="450" cy="560" rx="140" ry="130" fill="#e3b06a" stroke="#2b2620" stroke-width="5"/>
<path d="M398 470 C420 440 480 440 502 470 C496 540 496 620 486 690 C470 706 430 706 414 690 C404 620 404 540 398 470 Z" fill="#f6e7c8" opacity="0.85"/>
<ellipse cx="322" cy="712" rx="30" ry="13" fill="#e3b06a" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="578" cy="712" rx="30" ry="13" fill="#e3b06a" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2b2620" stroke-width="5"><path d="M398 600 C394 640 393 680 394 716 M430 606 C428 644 428 682 429 716 M470 606 C472 644 472 682 471 716 M502 600 C506 640 507 680 506 716"/></g>
<path d="${PAW_L}" fill="#f6e7c8" stroke="#2b2620" stroke-width="5"/>
<path d="${PAW_R}" fill="#f6e7c8" stroke="#2b2620" stroke-width="5"/>
<path d="M400 712 q4 8 2 14 M414 712 q4 8 2 14 M486 712 q4 8 2 14 M500 712 q4 8 2 14" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<ellipse cx="450" cy="318" rx="126" ry="108" transform="rotate(-4 450 318)" fill="#e3b06a" stroke="#2b2620" stroke-width="5.5"/>
<path d="${EAR_L}" fill="#b07f3f" stroke="#2b2620" stroke-width="5"/>
<path d="${EAR_R}" fill="#b07f3f" stroke="#2b2620" stroke-width="5"/>
<path d="${MUZZLE}" fill="#f6e7c8" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#b07f3f" stroke-width="3.5"><path d="M326 296 C318 330 318 366 326 398 M574 296 C582 330 582 366 574 398 M416 566 q-6 28 0 54 M450 552 q0 30 5 56 M484 566 q6 28 0 54"/></g>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M380 290 Q400 280 422 288 M478 283 Q500 273 520 281 M400 376 C392 406 398 434 414 448 M504 376 C512 406 506 434 490 448"/></g>
<g fill="#ffffff" stroke="#2b2620" stroke-width="4.5"><path d="M376 318 Q400 296 424 318 Q400 333 376 318 Z"/><path d="M476 311 Q500 289 524 311 Q500 326 476 311 Z"/></g>
<ellipse cx="400" cy="315" rx="6.5" ry="10.5" fill="#2b2620"/>
<ellipse cx="500" cy="308" rx="6.5" ry="10.5" fill="#2b2620"/>
<circle cx="402.5" cy="310" r="2.5" fill="#ffffff"/>
<circle cx="502.5" cy="303" r="2.5" fill="#ffffff"/>
<path d="M422 414 Q452 403 482 414 Q480 440 452 445 Q424 440 422 414 Z" fill="#3a2c22" stroke="#2b2620" stroke-width="4"/>
<circle cx="440" cy="420" r="3" fill="#ffffff"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M452 444 V452 M452 452 Q440 458 432 454 M452 452 Q464 458 472 454"/></g>
<circle cx="424" cy="418" r="2.3" fill="#2b2620"/>
<circle cx="440" cy="426" r="2.3" fill="#2b2620"/>
<circle cx="464" cy="426" r="2.3" fill="#2b2620"/>
<circle cx="480" cy="418" r="2.3" fill="#2b2620"/>
</g>`;

export default {
  slug: 'dog-drawing',
  subject: 'Dog Drawing',
  captions: [
    'Set the head angle.',
    'Build the skull and muzzle.',
    'Add facial guide lines.',
    'Draw the eyes and nose.',
    'Attach the floppy ears.',
    'Sketch the chest and body.',
    'Place the legs and paws.',
    'Refine the face.',
    'Add fur direction strokes.',
    'Shade and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

// Hello Kitty Drawing — 8 steps, front view, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="450" cy="362" rx="188" ry="152"/><ellipse cx="450" cy="592" rx="122" ry="132"/><path d="M450 176 V748 M252 470 H648"/></g>`;

const HEAD = `<ellipse cx="450" cy="362" rx="168" ry="132"/>`;
const EAR_L = `M338 266 C326 232 320 198 322 170 C323 157 334 154 346 162 C374 180 400 204 420 230 C392 244 364 254 338 266 Z`;
const EAR_R = `M562 266 C574 232 580 198 578 170 C577 157 566 154 554 162 C526 180 500 204 480 230 C508 244 536 254 562 266 Z`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${HEAD}</g>`;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${EAR_L}"/><path d="${EAR_R}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="M566 194 C544 168 512 172 512 196 C512 218 544 224 568 208"/>
<path d="M590 196 C616 168 652 174 652 198 C652 220 618 226 592 210"/>
<circle cx="580" cy="202" r="13"/>
<path d="M572 192 L556 184 M570 212 L554 218" stroke-width="3.5"/></g>`;

const L4 = (s) => `<g stroke="${s}" stroke-linejoin="round">
<ellipse cx="388" cy="378" rx="9" ry="13" fill="${s}" stroke="none"/>
<ellipse cx="512" cy="378" rx="9" ry="13" fill="${s}" stroke="none"/>
<ellipse cx="450" cy="408" rx="16" ry="11" fill="none" stroke-width="4.5"/>
<g fill="none" stroke-width="4" stroke-linecap="round">
<path d="M300 368 L356 378"/>
<path d="M296 400 L354 404"/>
<path d="M304 432 L356 422"/>
<path d="M600 368 L544 378"/>
<path d="M604 400 L546 404"/>
<path d="M596 432 L544 422"/>
</g></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="M374 478 C364 540 360 606 366 662 C367 674 376 678 388 678 L512 678 C524 678 533 674 534 662 C540 606 536 540 526 478"/>
<path d="M380 516 C420 532 480 532 520 516" stroke-width="4"/>
<path d="M367 636 C420 650 480 650 533 636" stroke-width="4"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="M368 506 C336 512 312 532 306 560 C302 578 314 590 330 584 C352 575 364 542 368 506 Z"/>
<path d="M532 506 C564 512 588 532 594 560 C598 578 586 590 570 584 C548 575 536 542 532 506 Z"/>
<ellipse cx="402" cy="694" rx="36" ry="19"/>
<ellipse cx="498" cy="694" rx="36" ry="19"/>
<path d="M296 726 H604" stroke-width="4"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M296 726 H604" stroke="#b08968" stroke-width="4"/>
<ellipse cx="402" cy="694" rx="36" ry="19" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="498" cy="694" rx="36" ry="19" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<path d="M374 478 C364 540 360 606 366 662 C367 674 376 678 388 678 L512 678 C524 678 533 674 534 662 C540 606 536 540 526 478 Z" fill="#f6a8c1" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#2b2620" stroke-width="4"><path d="M380 516 C420 532 480 532 520 516"/><path d="M367 636 C420 650 480 650 533 636"/></g>
<path d="M368 506 C336 512 312 532 306 560 C302 578 314 590 330 584 C352 575 364 542 368 506 Z" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<path d="M532 506 C564 512 588 532 594 560 C598 578 586 590 570 584 C548 575 536 542 532 506 Z" fill="#ffffff" stroke="#2b2620" stroke-width="5"/>
<g fill="#ffffff" stroke="#2b2620" stroke-width="5"><path d="${EAR_L}"/><path d="${EAR_R}"/></g>
<ellipse cx="450" cy="362" rx="168" ry="132" fill="#ffffff" stroke="#2b2620" stroke-width="5.5"/>
<g fill="#ef7fa8" stroke="#2b2620" stroke-width="4.5">
<path d="M566 194 C544 168 512 172 512 196 C512 218 544 224 568 208 Z"/>
<path d="M590 196 C616 168 652 174 652 198 C652 220 618 226 592 210 Z"/>
<circle cx="580" cy="202" r="13" fill="#e86a98"/></g>
<ellipse cx="388" cy="378" rx="9" ry="13" fill="#2b2620"/>
<ellipse cx="512" cy="378" rx="9" ry="13" fill="#2b2620"/>
<ellipse cx="450" cy="408" rx="16" ry="11" fill="#ffd23f" stroke="#2b2620" stroke-width="4"/>
<g fill="none" stroke="#2b2620" stroke-width="4" stroke-linecap="round">
<path d="M300 368 L356 378"/><path d="M296 400 L354 404"/><path d="M304 432 L356 422"/>
<path d="M600 368 L544 378"/><path d="M604 400 L546 404"/><path d="M596 432 L544 422"/>
</g></g>`;

export default {
  slug: 'hello-kitty-drawing',
  subject: 'Hello Kitty Drawing',
  captions: [
    'Draw the head oval.',
    'Add the ears.',
    'Place the bow.',
    'Add the face.',
    'Sketch body and dress.',
    'Add arms and legs.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

// Car Drawing — 10 steps, from the tutorial's own step list.
// Side-view car facing right. Wheels: rear (282,634), front (618,634), tire r=54.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M150 690 H750"/><rect x="180" y="430" width="540" height="182" rx="18"/><rect x="310" y="382" width="262" height="88" rx="14"/><circle cx="282" cy="634" r="64"/><circle cx="618" cy="634" r="64"/></g>`;

const BODY = `M178 600 L180 536 C181 514, 194 505, 220 500 L262 494 C296 448, 326 410, 366 398 L524 398 C562 410, 594 450, 620 496 L690 504 C715 508, 727 524, 726 552 C725 574, 723 588, 720 600 L684 608 A66 66 0 0 0 552 608 L348 608 A66 66 0 0 0 216 608 L182 608 Z`;
const GLASS = `M356 410 C322 430, 296 460, 278 492 L606 492 C588 452, 560 420, 528 408 C470 400, 412 402, 356 410 Z`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round">
<path d="M160 690 H740"/>
<circle cx="282" cy="634" r="54"/><circle cx="618" cy="634" r="54"/>
<path d="M282 634 H618" stroke-dasharray="4 10"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-linejoin="round">
<g stroke-width="6.5"><circle cx="282" cy="634" r="54"/><circle cx="618" cy="634" r="54"/></g>
<g stroke-width="4"><circle cx="282" cy="634" r="23"/><circle cx="618" cy="634" r="23"/></g>
<path d="${GLASS}" stroke-width="4.5"/>
<path d="M448 404 C444 434, 443 462, 444 490" stroke-width="4"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round"><path d="${BODY}"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M452 502 C448 538, 448 572, 450 604"/>
<rect x="472" y="518" width="30" height="10" rx="5"/>
<path d="M696 520 C712 522, 720 532, 718 546 C706 550, 696 542, 694 532 Z"/>
<path d="M184 520 C192 522, 196 530, 194 540 C188 542, 182 536, 182 528 Z"/>
<path d="M556 480 C570 460, 584 448, 598 442"/>
<path d="M330 486 C344 466, 360 452, 378 444"/>
<path d="M282 611 V657 M259 634 H305 M266 618 L298 650 M298 618 L266 650"/>
<path d="M618 611 V657 M595 634 H641 M602 618 L634 650 M634 618 L602 650"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linejoin="round"><path d="${BODY}"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M196 700 C340 690, 560 690, 704 700"/>
<path d="M356 584 C440 574, 540 574, 548 584"/>
<path d="M206 580 C260 572, 330 572, 342 580"/>
<path d="M560 470 C600 462, 650 466, 690 480" stroke-width="3"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M688 588 C704 592, 720 590, 730 582"/>
<path d="M686 570 C702 574, 716 572, 726 566"/>
<path d="M700 530 L700 540 M710 530 L710 540"/>
<path d="M172 588 C186 592, 200 590, 208 582"/>
<path d="M240 520 C300 512, 380 512, 430 518" stroke-width="3"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="M570 590 A58 58 0 0 1 666 590"/>
<path d="M234 590 A58 58 0 0 1 330 590"/>
<path d="M360 690 C420 682, 480 682, 540 690" stroke-width="5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M196 700 C340 690, 560 690, 704 700" fill="none" stroke="#2b2620" stroke-width="3.5" opacity="0.35"/>
<path d="M160 690 H740" fill="none" stroke="#2b2620" stroke-width="4.5"/>
<path d="${BODY}" fill="#ef6461" stroke="#2b2620" stroke-width="6"/>
<path d="${GLASS}" fill="#bfe6f5" stroke="#2b2620" stroke-width="4.5"/>
<path d="M448 404 C444 434, 443 462, 444 490" fill="none" stroke="#2b2620" stroke-width="4"/>
<path d="M556 480 C570 460, 584 448, 598 442 M330 486 C344 466, 360 452, 378 444" fill="none" stroke="#ffffff" stroke-width="3.5" opacity="0.8"/>
<path d="M452 502 C448 538, 448 572, 450 604" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<rect x="472" y="518" width="30" height="10" rx="5" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M696 520 C712 522, 720 532, 718 546 C706 550, 696 542, 694 532 Z" fill="#ffd94d" stroke="#2b2620" stroke-width="3.5"/>
<path d="M184 520 C192 522, 196 530, 194 540 C188 542, 182 536, 182 528 Z" fill="#ff8fa3" stroke="#2b2620" stroke-width="3.5"/>
<path d="M688 588 C704 592, 720 590, 730 582 M172 588 C186 592, 200 590, 208 582" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<g><circle cx="282" cy="634" r="54" fill="#3a3630" stroke="#2b2620" stroke-width="6"/><circle cx="618" cy="634" r="54" fill="#3a3630" stroke="#2b2620" stroke-width="6"/>
<circle cx="282" cy="634" r="23" fill="#cfd8dc" stroke="#2b2620" stroke-width="4"/><circle cx="618" cy="634" r="23" fill="#cfd8dc" stroke="#2b2620" stroke-width="4"/>
<path d="M282 611 V657 M259 634 H305 M618 611 V657 M595 634 H641" stroke="#2b2620" stroke-width="3.5"/></g>
</g>`;

export default {
  slug: 'car-drawing',
  subject: 'Car Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the wheelbase.',
    'Add the tires and windshield.',
    'Refine the outside contour.',
    'Add the rims and lights.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
    'Add bumper and headlight texture.',
    'Deepen shadows and overlap.',
    'Add colour and finish!',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

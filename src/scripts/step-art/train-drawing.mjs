// Train Drawing — 7 steps. Steam loco facing LEFT: cowcatcher front-left, cab right.
// Wheels: small (300,652) r36, (420,652) r36; big driver (600,640) r48. Rail y=690.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M150 690 H750"/><rect x="206" y="430" width="314" height="132" rx="16"/><rect x="540" y="350" width="168" height="250" rx="12"/><circle cx="300" cy="652" r="46"/><circle cx="420" cy="652" r="46"/><circle cx="600" cy="640" r="58"/><path d="M244 334 H300 V432 H244 Z"/></g>`;

const BOILER = `M520 562 L252 562 C224 562, 206 532, 206 496 C206 460, 224 430, 252 430 L520 430`;
const CAB = `M545 602 L545 378 C545 362, 555 352, 572 352 L678 352 C695 352, 705 362, 705 378 L705 602`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round">
<path d="${CAB}"/>
<path d="M528 366 C580 344, 656 344, 720 366 L720 380 L528 380 Z"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-linecap="round">
<g stroke-width="5.5"><circle cx="300" cy="652" r="36"/><circle cx="420" cy="652" r="36"/><circle cx="600" cy="640" r="48"/></g>
<path d="M252 432 C254 402, 255 382, 246 364 C239 349, 248 334, 270 334 C292 334, 301 349, 294 364 C285 382, 286 402, 288 432" stroke-width="5.5"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
<path d="${BOILER}"/>
<path d="M356 430 C360 404, 376 392, 392 392 C408 392, 424 404, 428 430"/>
<path d="M188 602 H714"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<rect x="576" y="386" width="92" height="86" rx="10"/>
<path d="M622 386 V472 M576 429 H668" stroke-width="3"/>
<path d="M332 434 C330 476, 330 518, 332 558 M466 434 C464 476, 464 518, 466 558"/>
<path d="M600 596 V684 M556 640 H644 M569 609 L631 671 M631 609 L569 671"/>
<path d="M300 620 V684 M268 652 H332 M420 620 V684 M388 652 H452"/>
<path d="M186 452 L214 452 L214 488 L186 488 Z M178 470 H186"/>
<path d="M216 566 L156 688 L238 688 M216 566 L196 688 M222 600 L176 688"/></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linejoin="round"><path d="${BOILER}"/><path d="${CAB}"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g stroke="#8d6e63" stroke-width="7"><path d="M196 706 L226 690 M286 706 L316 690 M376 706 L406 690 M466 706 L496 690 M556 706 L586 690 M646 706 L676 690"/></g>
<path d="M150 690 H750" stroke="#2b2620" stroke-width="5"/>
<path d="M216 566 L156 688 L238 688 Z" fill="#ff9f43" stroke="#2b2620" stroke-width="5"/>
<path d="M216 566 L196 688 M222 600 L176 688" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="${BOILER} Z" fill="#3d9be9" stroke="#2b2620" stroke-width="6"/>
<path d="M356 430 C360 404, 376 392, 392 392 C408 392, 424 404, 428 430 Z" fill="#ffd94d" stroke="#2b2620" stroke-width="5"/>
<path d="M252 432 C254 402, 255 382, 246 364 C239 349, 248 334, 270 334 C292 334, 301 349, 294 364 C285 382, 286 402, 288 432 Z" fill="#5b5b66" stroke="#2b2620" stroke-width="5"/>
<path d="M332 434 C330 476, 330 518, 332 558 M466 434 C464 476, 464 518, 466 558" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="${CAB} L545 602 Z" fill="#ef6461" stroke="#2b2620" stroke-width="6"/>
<path d="M528 366 C580 344, 656 344, 720 366 L720 380 L528 380 Z" fill="#5b5b66" stroke="#2b2620" stroke-width="5"/>
<rect x="576" y="386" width="92" height="86" rx="10" fill="#bfe6f5" stroke="#2b2620" stroke-width="4"/>
<path d="M622 386 V472 M576 429 H668" stroke="#2b2620" stroke-width="3" fill="none"/>
<path d="M186 452 L214 452 L214 488 L186 488 Z" fill="#ffd94d" stroke="#2b2620" stroke-width="4"/>
<g><circle cx="300" cy="652" r="36" fill="#e94f37" stroke="#2b2620" stroke-width="5"/><circle cx="420" cy="652" r="36" fill="#e94f37" stroke="#2b2620" stroke-width="5"/><circle cx="600" cy="640" r="48" fill="#e94f37" stroke="#2b2620" stroke-width="5"/>
<path d="M600 596 V684 M556 640 H644 M300 620 V684 M268 652 H332 M420 620 V684 M388 652 H452" stroke="#2b2620" stroke-width="3.5" fill="none"/>
<circle cx="300" cy="652" r="8" fill="#ffd94d"/><circle cx="420" cy="652" r="8" fill="#ffd94d"/><circle cx="600" cy="640" r="10" fill="#ffd94d"/></g>
<path d="M188 602 H714" stroke="#2b2620" stroke-width="5" fill="none"/>
</g>`;

export default {
  slug: 'train-drawing',
  subject: 'Train Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the engine cab.',
    'Add wheels and smokestack.',
    'Refine the outside contour.',
    'Add windows, spokes and cowcatcher.',
    'Clean up the guide lines.',
    'Add colour, shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

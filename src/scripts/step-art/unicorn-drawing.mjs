// Unicorn Drawing — 10 steps. Side view facing LEFT. Body centre (495,480).
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="495" cy="480" rx="165" ry="92"/><circle cx="272" cy="322" r="64"/><path d="M322 282 L432 428 M258 382 L384 472"/><path d="M170 738 H740"/></g>`;

const HEAD = `M318 272 C278 252, 236 268, 221 301 C209 328, 215 354, 235 367 C255 380, 284 377, 299 360 C315 342, 321 306, 318 272`;
const HORN = `M268 282 C252 252, 234 228, 216 210 C208 201, 198 206, 200 218 C204 244, 218 272, 234 292 Z`;
const MANE = `M322 262 C352 268, 368 292, 360 318 C384 330, 392 356, 380 380 C404 394, 412 420, 398 444 L432 460 C446 420, 438 388, 416 366 C426 336, 416 302, 390 282 C368 264, 344 256, 322 262 Z`;
const BACK = `M430 420 C490 392, 580 394, 636 424 C668 452, 670 506, 642 544 C580 562, 470 560, 420 528`;
const NECKFRONT = `M316 340 C340 392, 372 432, 416 462 C404 484, 402 506, 420 528`;
const LEGS = `M428 540 C423 596, 421 652, 423 706 M456 544 C454 600, 454 654, 456 706 M472 542 C470 598, 470 652, 472 706 M500 544 C498 600, 498 654, 500 706 M580 546 C576 602, 575 656, 577 706 M608 548 C606 602, 606 654, 608 706 M620 542 C618 598, 618 652, 620 706 M648 540 C646 596, 646 652, 648 706`;
const TAIL = `M648 430 C700 452, 724 512, 714 578 C706 632, 684 678, 646 706 M636 452 C676 478, 692 528, 684 584 C677 630, 660 668, 636 690`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${HORN}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-linejoin="round" stroke-linecap="round">
<path d="${MANE}" stroke-width="5"/>
<path d="${HEAD}" stroke-width="5"/>
<path d="M221 330 C238 340, 258 342, 276 336" stroke-width="3.5"/>
<path d="M300 258 C306 238, 326 230, 340 242 C330 254, 316 262, 300 258 Z" stroke-width="4"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${BACK}"/><path d="${NECKFRONT}"/><path d="${LEGS}" stroke-width="5"/><path d="${TAIL}" stroke-width="5"/></g>`;

const L5 = (s) => `<g stroke="${s}" stroke-linecap="round">
<circle cx="258" cy="318" r="7" fill="${s}" stroke="none"/><circle cx="230" cy="344" r="4" fill="${s}" stroke="none"/>
<g fill="none" stroke-width="3.5">
<path d="M302 276 C296 250, 302 228, 318 214 C330 232, 332 256, 324 276 Z"/>
<path d="M252 258 C240 250, 230 240, 224 228 M240 232 C230 224, 222 216, 217 206"/>
<path d="M418 706 H466 L470 728 H414 Z M466 706 H506 L510 728 H462 Z M572 706 H616 L620 728 H568 Z M614 706 H654 L658 728 H610 Z"/></g></g>`;

const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round" stroke-linecap="round"><path d="${BACK}"/><path d="${NECKFRONT}"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M432 542 C482 566, 568 568, 628 552"/>
<path d="M330 356 C344 366, 360 372, 378 374 M336 380 C352 392, 370 400, 388 404"/>
<path d="M382 742 C480 731, 620 731, 702 742" stroke-width="4"/>
<path d="M436 560 C434 600, 434 640, 436 676 M592 566 C590 606, 590 646, 592 680" stroke-width="3"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M660 470 C692 500, 704 548, 694 600 M652 520 C676 556, 682 606, 668 654"/>
<path d="M348 290 C366 306, 372 330, 364 352 M376 340 C394 354, 400 378, 392 400"/>
<path d="M330 300 C356 352, 388 398, 424 434" stroke-width="3"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="M420 540 C436 552, 458 554, 474 546 M572 546 C590 558, 612 560, 628 550"/>
<path d="M360 318 C384 330, 392 356, 380 380"/>
<path d="M408 734 H664" stroke-width="5"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M382 742 C480 731, 620 731, 702 742" fill="none" stroke="#2b2620" stroke-width="4" opacity="0.3"/>
<path d="M160 736 C220 724, 300 726, 350 736 M560 736 C640 724, 720 726, 752 736" fill="none" stroke="#2e7d32" stroke-width="4"/>
<g fill="#ffffff" stroke="#2b2620" stroke-width="5">
<path d="M428 540 C423 596, 421 652, 423 706 L456 706 C454 600, 454 600, 456 544 Z"/>
<path d="M472 542 C470 598, 470 652, 472 706 L500 706 C498 600, 498 600, 500 544 Z"/>
<path d="M580 546 C576 602, 575 656, 577 706 L608 706 C606 602, 606 602, 608 548 Z"/>
<path d="M620 542 C618 598, 618 652, 620 706 L648 706 C646 596, 646 596, 648 540 Z"/>
<path d="M316 340 C340 392, 372 432, 416 462 C404 484, 402 506, 420 528 C470 560, 580 562, 642 544 C670 506, 668 452, 636 424 C580 394, 490 392, 430 420 C388 398, 348 372, 316 340 Z"/>
<path d="${HEAD} Z"/></g>
<path d="${TAIL}" fill="none" stroke="#b388eb" stroke-width="16" opacity="0.55"/>
<path d="${TAIL}" fill="none" stroke="#2b2620" stroke-width="4"/>
<path d="M660 470 C692 500, 704 548, 694 600" fill="none" stroke="#b388eb" stroke-width="4"/>
<path d="${MANE}" fill="#f7a8c4" stroke="#2b2620" stroke-width="4.5"/>
<path d="M348 290 C366 306, 372 330, 364 352 M376 340 C394 354, 400 378, 392 400" fill="none" stroke="#e75480" stroke-width="3.5"/>
<path d="M300 258 C306 238, 326 230, 340 242 C330 254, 316 262, 300 258 Z" fill="#f7a8c4" stroke="#2b2620" stroke-width="4"/>
<path d="${HORN}" fill="#ffc53d" stroke="#2b2620" stroke-width="4.5"/>
<path d="M252 258 C240 250, 230 240, 224 228 M240 232 C230 224, 222 216, 217 206" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<path d="M302 276 C296 250, 302 228, 318 214 C330 232, 332 256, 324 276 Z" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<circle cx="258" cy="318" r="7.5" fill="#2b2620"/><circle cx="261" cy="315" r="2.5" fill="#ffffff"/>
<circle cx="230" cy="344" r="4" fill="#2b2620"/>
<circle cx="272" cy="346" r="10" fill="#f9a8d4" opacity="0.65"/>
<path d="M221 330 C238 340, 258 342, 276 336" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<g fill="#b08968" stroke="#2b2620" stroke-width="3.5"><path d="M418 706 H466 L470 728 H414 Z"/><path d="M466 706 H506 L510 728 H462 Z"/><path d="M572 706 H616 L620 728 H568 Z"/><path d="M614 706 H654 L658 728 H610 Z"/></g>
</g>`;

export default {
  slug: 'unicorn-drawing',
  subject: 'Unicorn Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the spiral horn.',
    'Add the mane and muzzle.',
    'Refine the outside contour.',
    'Add the eye, ear and hooves.',
    'Clean up the guide lines.',
    'Add light shading and finish.',
    'Add tail and mane texture.',
    'Deepen shadows and overlap.',
    'Add colour and finish!',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

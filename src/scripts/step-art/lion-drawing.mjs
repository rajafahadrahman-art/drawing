// Lion Drawing — 10 steps, calm front portrait with a big scalloped mane, from the tutorial's own step list.
// Construction circles live in `guides`. Captions from step 6 on keep the word "Clean" so the kit
// keeps guides off and all lines dark for the texture/depth steps that follow the clean-up.
function scallop(cx, cy, rO, rI, n, phase = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = phase + (i / n) * Math.PI * 2;
    pts.push([cx + rO * Math.cos(a), cy + rO * Math.sin(a)]);
  }
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const a = phase + ((i + 0.5) / n) * Math.PI * 2;
    const qx = cx + rI * Math.cos(a), qy = cy + rI * Math.sin(a);
    const p = pts[(i + 1) % n];
    d += ` Q ${qx.toFixed(1)} ${qy.toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  }
  return d + ' Z';
}

const MANE = scallop(450, 405, 188, 168, 14);
const MANE_IN = scallop(450, 405, 148, 136, 14);
const TUFT = scallop(676, 700, 32, 23, 8);
const FACE = `<circle cx="450" cy="405" r="103"/>`;
const MUZZLE = `M398 470 Q398 430 450 430 Q502 430 502 470 Q502 508 450 508 Q398 508 398 470 Z`;
const EAR_L = `M318 300 C308 272 326 250 350 254 C370 258 378 282 368 300 C352 288 334 288 318 300 Z`;
const EAR_R = `M582 300 C592 272 574 250 550 254 C530 258 522 282 532 300 C548 288 566 288 582 300 Z`;
const PAW_L = `M356 700 Q356 676 388 676 Q420 676 420 700 Q420 716 388 716 Q356 716 356 700 Z`;
const PAW_R = `M480 700 Q480 676 512 676 Q544 676 544 700 Q544 716 512 716 Q480 716 480 700 Z`;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="405" r="175"/><circle cx="450" cy="405" r="103"/><path d="M450 205 V640"/></g>`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${MANE}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="${MUZZLE}"/>
<path d="M424 440 Q450 430 476 440 Q472 462 450 466 Q428 462 424 440 Z"/>
<path d="M450 466 V480 M450 480 Q436 492 424 486 M450 480 Q464 492 476 486" stroke-width="3.5"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round"><path d="${MANE}"/></g>
<g fill="none" stroke="${s}" stroke-width="5.5">${FACE}</g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="${EAR_L}"/><path d="${EAR_R}"/>
<path d="M384 385 Q408 366 432 385 Q408 398 384 385 Z"/>
<path d="M468 385 Q492 366 516 385 Q492 398 468 385 Z"/>
<ellipse cx="408" cy="384" rx="6" ry="9.5" fill="${s}" stroke="none"/>
<ellipse cx="492" cy="384" rx="6" ry="9.5" fill="${s}" stroke="none"/>
<circle cx="410.5" cy="379" r="2.4" fill="#fff9ee" stroke="none"/>
<circle cx="494.5" cy="379" r="2.4" fill="#fff9ee" stroke="none"/>
<path d="M380 350 Q408 338 436 348 M464 348 Q492 338 520 350" stroke-width="3.5"/>
<path d="M404 462 Q366 452 338 436 M404 474 Q368 474 340 468 M496 462 Q534 452 562 436 M496 474 Q532 474 560 468" stroke-width="3.5"/>
<circle cx="424" cy="476" r="2.2" fill="${s}" stroke="none"/>
<circle cx="439" cy="484" r="2.2" fill="${s}" stroke="none"/>
<circle cx="461" cy="484" r="2.2" fill="${s}" stroke="none"/>
<circle cx="476" cy="476" r="2.2" fill="${s}" stroke="none"/>
<path d="M390 602 q10 17 22 6 q10 15 22 4 q10 15 22 4 q10 13 22 2" stroke-width="4"/>
<path d="M404 612 C400 634 398 654 398 676 M496 612 C500 634 502 654 502 676" stroke-width="5"/>
<path d="${PAW_L}" stroke-width="5"/><path d="${PAW_R}" stroke-width="5"/>
<path d="M388 690 v13 M512 690 v13" stroke-width="3.5"/></g>`;

const L6 = (s) => ``;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M330 470 q12 24 32 34 M570 470 q-12 24 -32 34 M352 520 q16 18 36 24 M548 520 q-16 18 -36 24"/>
<path d="M404 488 q46 18 92 0"/>
<path d="M368 706 q10 8 20 2 M492 706 q10 8 20 2" stroke-width="3"/>
<path d="M330 736 H570" stroke-width="4"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linecap="round">
<path d="M604 544 C656 574 686 630 680 688" stroke-width="8"/>
<path d="${TUFT}"/>
<path d="M662 684 q10 8 20 2 M668 706 q10 6 18 0" stroke-width="3"/>
<path d="M386 332 q10 -6 20 -2 M494 330 q10 -4 20 2" stroke-width="3"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linecap="round">
<path d="M402 448 Q450 428 498 448"/>
<path d="M362 692 Q388 676 414 692 M486 692 Q512 676 538 692"/>
<path d="M348 528 Q450 606 552 528"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M330 736 H570" stroke="#b08968" stroke-width="4"/>
<path d="M604 544 C656 574 686 630 680 688" fill="none" stroke="#b5713d" stroke-width="8"/>
<path d="${MANE}" fill="#d98e32" stroke="#2b2620" stroke-width="5.5"/>
<path d="${MANE_IN}" fill="#c67f27"/>
<g fill="none" stroke="#a8641a" stroke-width="3.5"><path d="M330 470 q12 24 32 34 M570 470 q-12 24 -32 34 M352 520 q16 18 36 24 M548 520 q-16 18 -36 24"/></g>
<path d="M372 556 C358 626 364 688 390 718 L510 718 C536 688 542 626 528 556 C484 584 416 584 372 556 Z" fill="#f2c063"/>
<path d="${EAR_L}" fill="#f2c063" stroke="#2b2620" stroke-width="4.5"/>
<path d="${EAR_R}" fill="#f2c063" stroke="#2b2620" stroke-width="4.5"/>
<circle cx="450" cy="405" r="103" fill="#f2c063" stroke="#2b2620" stroke-width="5.5"/>
<path d="M390 602 q10 17 22 6 q10 15 22 4 q10 15 22 4 q10 13 22 2" fill="none" stroke="#2b2620" stroke-width="4"/>
<g fill="none" stroke="#2b2620" stroke-width="5"><path d="M404 612 C400 634 398 654 398 676 M496 612 C500 634 502 654 502 676"/></g>
<path d="${PAW_L}" fill="#f2c063" stroke="#2b2620" stroke-width="5"/>
<path d="${PAW_R}" fill="#f2c063" stroke="#2b2620" stroke-width="5"/>
<path d="M388 690 v13 M512 690 v13" stroke="#2b2620" stroke-width="3.5" fill="none"/>
<path d="${MUZZLE}" fill="#f7e3b8" stroke="#2b2620" stroke-width="4.5"/>
<path d="M424 440 Q450 430 476 440 Q472 462 450 466 Q428 462 424 440 Z" fill="#b3543f" stroke="#2b2620" stroke-width="4"/>
<g fill="none" stroke="#2b2620" stroke-width="3.5"><path d="M450 466 V480 M450 466 V480 M450 480 Q436 492 424 486 M450 480 Q464 492 476 486"/>
<path d="M380 350 Q408 338 436 348 M464 348 Q492 338 520 350"/>
<path d="M404 462 Q366 452 338 436 M404 474 Q368 474 340 468 M496 462 Q534 452 562 436 M496 474 Q532 474 560 468"/></g>
<g fill="#ffffff" stroke="#2b2620" stroke-width="4.5"><path d="M384 385 Q408 366 432 385 Q408 398 384 385 Z"/><path d="M468 385 Q492 366 516 385 Q492 398 468 385 Z"/></g>
<ellipse cx="408" cy="384" rx="6" ry="9.5" fill="#2b2620"/>
<ellipse cx="492" cy="384" rx="6" ry="9.5" fill="#2b2620"/>
<circle cx="410.5" cy="379" r="2.4" fill="#ffffff"/>
<circle cx="494.5" cy="379" r="2.4" fill="#ffffff"/>
<circle cx="424" cy="476" r="2.2" fill="#2b2620"/>
<circle cx="439" cy="484" r="2.2" fill="#2b2620"/>
<circle cx="461" cy="484" r="2.2" fill="#2b2620"/>
<circle cx="476" cy="476" r="2.2" fill="#2b2620"/>
<path d="${TUFT}" fill="#8a5a24" stroke="#2b2620" stroke-width="4.5"/>
</g>`;

export default {
  slug: 'lion-drawing',
  subject: 'Lion Drawing',
  captions: [
    'Place the construction shapes.',
    'Block in the big mane.',
    'Set the muzzle and nose.',
    'Refine the outside contour.',
    'Add the ears, eyes, and paws.',
    'Clean the guide lines.',
    'Clean shading under the mane.',
    'Clean texture: tuft and brow.',
    'Clean, deeper overlap shadows.',
    'Final check, then final lines.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

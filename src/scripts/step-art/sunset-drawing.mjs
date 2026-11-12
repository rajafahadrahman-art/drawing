// Sunset Drawing — 10 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M180 520 H720 M180 252 H720 M180 252 V700 M720 252 V700"/><circle cx="450" cy="520" r="86"/><path d="M180 520 C240 458 320 452 380 520 M520 520 C585 452 665 458 720 520"/></g>`;

const HORIZON = `M180 520 H720`;
const SUN = `M370 520 A80 80 0 0 1 530 520 Z`;
function pill(cx, cy, w, h) {
  return `M${cx - w / 2} ${cy} C${cx - w / 2} ${cy - h / 2} ${cx - w / 4} ${cy - h / 2} ${cx} ${cy - h / 2} C${cx + w / 4} ${cy - h / 2} ${cx + w / 2} ${cy - h / 2} ${cx + w / 2} ${cy} C${cx + w / 2} ${cy + h / 2} ${cx + w / 4} ${cy + h / 2} ${cx} ${cy + h / 2} C${cx - w / 4} ${cy + h / 2} ${cx - w / 2} ${cy + h / 2} ${cx - w / 2} ${cy} Z`;
}
const CLOUD1 = pill(315, 322, 168, 52);
const CLOUD2 = pill(582, 398, 150, 44);
const CLOUD3 = pill(452, 284, 176, 40);
const HILL_L = `M180 520 C230 462 310 452 372 520`;
const HILL_R = `M528 520 C590 458 672 462 720 520`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">
<path d="${HORIZON}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="${SUN}"/><path d="${CLOUD1}"/><path d="${CLOUD2}"/><path d="${CLOUD3}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linecap="round">
<path d="${HILL_L}"/><path d="${HILL_R}"/><path d="${SUN}"/></g>`;

const SKY_LINES = `M196 356 H330 M540 348 H706 M204 428 H336 M566 452 H700`;
const RIPPLES = `M414 548 h72 M402 574 h96 M416 602 h68 M428 632 h44 M222 560 h104 M566 566 h118 M252 606 h150 M540 618 h140`;
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="${SKY_LINES}"/><path d="${RIPPLES}"/></g>`;

const L6 = (s) => ``;

let rays = '';
for (let a = 195; a <= 345; a += 25) {
  const r1 = 96, r2 = 120, rad = (a * Math.PI) / 180;
  rays += `M${(450 + r1 * Math.cos(rad)).toFixed(1)} ${(520 + r1 * Math.sin(rad)).toFixed(1)} L${(450 + r2 * Math.cos(rad)).toFixed(1)} ${(520 + r2 * Math.sin(rad)).toFixed(1)} `;
}
const HILL_SHADE = `M232 500 c22 -16 52 -24 78 -22 M596 496 c20 -14 46 -20 70 -18 M262 514 c14 -8 32 -12 48 -11`;
const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="${rays}"/><path d="${HILL_SHADE}"/></g>`;

const GRADIENT = `M196 282 H352 M552 282 H704 M196 380 H268 M640 380 H704 M196 470 H352 M548 478 H704 M196 640 H380 M520 652 H704 M232 668 h120 M560 676 h110`;
const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round">
<path d="${GRADIENT}"/></g>`;

const REEDS_L = `M206 700 C200 648 194 616 184 584 C204 612 214 652 218 700 Z M228 700 C226 660 228 632 238 606 C244 640 242 672 240 700 Z`;
const REEDS_R = `M694 700 C700 648 706 616 716 584 C696 612 686 652 682 700 Z`;
const L9 = (s) => `<g stroke="${s}" stroke-linecap="round">
<g fill="none" stroke-width="7"><path d="${HORIZON}"/><path d="${SUN}"/></g>
<g fill="none" stroke-width="4.5"><path d="M408 556 h84 M398 584 h104 M420 614 h60"/></g>
<g fill="${s}" stroke="none"><path d="${REEDS_L}"/><path d="${REEDS_R}"/></g></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<rect x="180" y="252" width="540" height="268" fill="#ffc65c"/>
<rect x="180" y="252" width="540" height="66" fill="#9a6bc0"/>
<rect x="180" y="318" width="540" height="66" fill="#e2607a"/>
<rect x="180" y="384" width="540" height="66" fill="#ff8c5a"/>
<rect x="180" y="520" width="540" height="180" fill="#6650a0"/>
<rect x="180" y="520" width="540" height="46" fill="#7a63b0"/>
<path d="M398 520 L502 520 L486 700 L414 700 Z" fill="#ffb25e" opacity="0.38"/>
<g fill="#5b4a8a"><path d="${HILL_L} L372 520 Z"/><path d="${HILL_R} L528 520 Z"/></g>
<g fill="#ffd93b" stroke="#e8873a" stroke-width="5"><path d="${SUN}"/></g>
<g fill="none" stroke="#e8873a" stroke-width="4"><path d="${rays}"/></g>
<g fill="#ffe8d6" stroke="#2b2620" stroke-width="4"><path d="${CLOUD1}"/><path d="${CLOUD2}"/><path d="${CLOUD3}"/></g>
<g fill="#f7b267"><path d="M238 330 C300 344 340 344 402 330 C402 342 372 350 315 350 C262 350 238 342 238 330 Z"/><path d="M508 408 C556 420 606 420 656 408 C656 419 622 426 582 426 C544 426 508 419 508 408 Z"/></g>
<g fill="none" stroke="#ffb25e" stroke-width="4"><path d="M408 556 h84 M398 584 h104 M420 614 h60 M432 646 h36 M222 566 h104 M566 572 h118 M252 612 h140 M540 624 h140"/></g>
<g fill="#2b2620"><path d="${REEDS_L}"/><path d="${REEDS_R}"/><path d="M196 420 c7 -7 15 -7 20 0 c5 -7 13 -7 20 0" fill="none" stroke="#2b2620" stroke-width="3.5"/><path d="M596 268 c7 -7 15 -7 20 0 c5 -7 13 -7 20 0" fill="none" stroke="#2b2620" stroke-width="3.5"/></g>
<rect x="180" y="252" width="540" height="448" fill="none" stroke="#2b2620" stroke-width="5"/>
</g>`;

export default {
  slug: 'sunset-drawing',
  subject: 'Sunset Drawing',
  captions: [
    'Sketch the construction shapes.',
    'Block in the horizon line.',
    'Set the sun disk and cloud bands.',
    'Refine the outside contour.',
    'Add sky and water details.',
    'Clean up the guide lines.',
    'Add light shading.',
    'Build richer gradient texture.',
    'Strengthen depth and overlap.',
    'Finish with warm sunset colour.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

// Christmas Tree Drawing — 7 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M450 262 L268 652 L632 652 Z"/><path d="M450 240 V716"/><rect x="424" y="636" width="52" height="68"/><circle cx="450" cy="238" r="40"/></g>`;

// Tier with a zigzag (needle) bottom edge. apex at (cx, apexY), base at baseY, half width halfW.
function tier(cx, apexY, halfW, baseY, teeth) {
  const step = (halfW * 2) / teeth;
  let d = `M${cx} ${apexY} L${cx + halfW} ${baseY}`;
  for (let i = 1; i <= teeth; i++) {
    const x = cx + halfW - step * i;
    const y = i === teeth ? baseY : baseY - (i % 2 === 1 ? 15 : 0);
    d += ` L${x.toFixed(1)} ${y}`;
  }
  d += ` Z`;
  return d;
}
const T1 = tier(450, 288, 88, 400, 6);
const T2 = tier(450, 372, 128, 512, 8);
const T3 = tier(450, 478, 168, 636, 10);
const TRUNK = `M424 636 h52 v66 h-52 Z`;
const GROUND = `M215 704 H685`;

function star(cx, cy, rO, rI) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? rO : rI;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
}
const STAR = star(450, 240, 36, 16);

const ORNAMENTS = [
  [450, 356, 11], [404, 448, 12], [496, 452, 12], [450, 470, 10],
  [362, 542, 13], [450, 528, 12], [538, 548, 13], [408, 600, 12], [498, 602, 12],
];
const ornamentCircles = ORNAMENTS.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('');

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${T3}"/><path d="${T2}"/><path d="${T1}"/>
<path d="${TRUNK}"/><path d="${GROUND}" stroke-linecap="round"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round">
<path d="${STAR}"/>${ornamentCircles}</g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round">
<path d="${T3}"/><path d="${T2}"/><path d="${T1}"/></g>`;

const GARLAND2 = `M374 460 Q450 502 526 460`;
const GARLAND3 = `M376 556 Q450 600 524 556`;
let ticks = '';
for (let x = 322; x <= 578; x += 36) ticks += `M${x} 630 l-7 -15 `;
for (let x = 352; x <= 548; x += 38) ticks += `M${x} 506 l-7 -14 `;
for (let x = 386; x <= 514; x += 36) ticks += `M${x} 394 l-6 -13 `;
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="${GARLAND2}"/><path d="${GARLAND3}"/><path d="${ticks}"/></g>
<g fill="${s}"><circle cx="412" cy="476" r="4"/><circle cx="450" cy="481" r="4"/><circle cx="488" cy="476" r="4"/><circle cx="413" cy="572" r="4"/><circle cx="450" cy="578" r="4"/><circle cx="487" cy="572" r="4"/></g>`;

const L6 = (s) => ``;

const ORN_COLORS = ['#ffb300', '#e53935', '#1e88e5', '#ec407a', '#e53935', '#ffb300', '#1e88e5', '#ec407a', '#ffb300'];
const colorOrnaments = ORNAMENTS.map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ORN_COLORS[i]}" stroke="#2b2620" stroke-width="3"/><circle cx="${x - 4}" cy="${y - 4}" r="3" fill="#ffffff" opacity="0.7"/>`).join('');

const colorArt = `<g stroke-linejoin="round">
<path d="${GROUND}" stroke="#2e7d32" stroke-width="5" stroke-linecap="round" fill="none"/>
<g fill="#8a5a33" stroke="#2b2620" stroke-width="5"><path d="${TRUNK}"/></g>
<g fill="#43a047" stroke="#2b2620" stroke-width="5"><path d="${T3}"/><path d="${T2}"/><path d="${T1}"/></g>
<g fill="#357a38" opacity="0.55"><path d="M282 636 L618 636 L590 590 L310 590 Z"/><path d="M322 512 L578 512 L552 472 L348 472 Z"/></g>
<g fill="none" stroke="#2e7d32" stroke-width="3.5" stroke-linecap="round"><path d="${ticks}"/></g>
<g fill="none" stroke="#ffb300" stroke-width="4.5" stroke-linecap="round"><path d="${GARLAND2}"/><path d="${GARLAND3}"/></g>
<g fill="#ffb300"><circle cx="412" cy="476" r="4.5"/><circle cx="450" cy="481" r="4.5"/><circle cx="488" cy="476" r="4.5"/><circle cx="413" cy="572" r="4.5"/><circle cx="450" cy="578" r="4.5"/><circle cx="487" cy="572" r="4.5"/></g>
${colorOrnaments}
<g fill="#ffc53d" stroke="#2b2620" stroke-width="4.5"><path d="${STAR}"/></g>
</g>`;

export default {
  slug: 'christmas-tree-drawing',
  subject: 'Christmas Tree',
  captions: [
    'Sketch the construction shapes.',
    'Block in the evergreen tiers.',
    'Add the star and ornaments.',
    'Refine the outside contour.',
    'Add needles and garland curves.',
    'Clean up the guide lines.',
    'Add shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

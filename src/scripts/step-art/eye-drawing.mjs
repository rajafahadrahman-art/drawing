// Eye Drawing — 10 steps, from the tutorial's own step list.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><path d="M192 516 L708 430"/></g>`;

const INNER = [228, 497], OUTER = [672, 453];
const UPPER = `M228 497 C315 362 548 332 672 453`;
const LOWER = `M228 497 C335 570 548 576 672 453`;
const WATERLINE = `M252 503 C350 552 530 556 648 464`;
const IRIS = [450, 470, 74];
const PUPIL_R = 32;

function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return [
    u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
    u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
  ];
}
const UP_P = [[228, 497], [315, 362], [548, 332], [672, 453]];
const LO_P = [[228, 497], [335, 570], [548, 576], [672, 453]];
const BROW_P = [[252, 336], [360, 262], [560, 252], [664, 314]];

// Lashes flick upward-and-outward from the lid edge, longer mid-lid, gently curved.
function lashes(pts, ts, len, width, up) {
  let d = '';
  for (const t of ts) {
    const [x, y] = cubic(...pts, t);
    let dx = x - 450, dy = y - 470;
    const m = Math.hypot(dx, dy) || 1; dx /= m; dy /= m;
    // Blend the radial direction with straight up (or down for lower lashes).
    let vx = dx * 0.42, vy = dy * 0.42 + (up ? -0.95 : 0.95);
    const vm = Math.hypot(vx, vy) || 1; vx /= vm; vy /= vm;
    const L = len * (0.78 + 0.4 * Math.sin(t * Math.PI));
    const tx = x + vx * L + dx * 3, ty = y + vy * L;
    const cxp = x + vx * L * 0.45 - vy * 6, cyp = y + vy * L * 0.45 + vx * 6;
    d += `M${x.toFixed(1)} ${y.toFixed(1)} Q${cxp.toFixed(1)} ${cyp.toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)} `;
  }
  return `<path d="${d}" fill="none" stroke-width="${width}" stroke-linecap="round"/>`;
}
const UPPER_LASHES = (w) => lashes(UP_P, [0.13, 0.23, 0.33, 0.43, 0.53, 0.63, 0.73, 0.83], 38, w, true);
const LOWER_LASHES = (w) => lashes(LO_P, [0.32, 0.44, 0.56, 0.68], 13, w, false);

// Brow: a soft band (two edges) filled with short hair strokes lying along it.
const BROW_TOP = `M258 302 C366 234 556 226 654 282`;
function browStrokes(width) {
  let d = '';
  for (let row = 0; row < 2; row++) {
    for (let i = 0; i < 15; i++) {
      const t = 0.05 + i * 0.064 + row * 0.03;
      const [x, y] = cubic(...BROW_P, t);
      d += `M${(x + 2).toFixed(1)} ${(y - row * 13).toFixed(1)} l11 -10 `;
    }
  }
  return `<path d="${d}" fill="none" stroke-width="${width}" stroke-linecap="round"/>`;
}
const BROW_CURVE = `M252 336 C360 262 560 252 664 314`;

// Iris radial texture.
function spokes(width, inner, outerFn) {
  let d = '';
  const angles = [8, 30, 55, 80, 105, 128, 152, 178, 205, 230, 255, 282, 308, 335];
  angles.forEach((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const outer = outerFn(i);
    d += `M${(450 + inner * Math.cos(rad)).toFixed(1)} ${(470 + inner * Math.sin(rad)).toFixed(1)} L${(450 + outer * Math.cos(rad)).toFixed(1)} ${(470 + outer * Math.sin(rad)).toFixed(1)} `;
  });
  return `<path d="${d}" fill="none" stroke-width="${width}" stroke-linecap="round"/>`;
}

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="M228 497 c-8 10 -4 22 6 28 M672 453 l16 -10 M672 453 l14 12"/>
<circle cx="228" cy="497" r="4" fill="${s}"/><circle cx="672" cy="453" r="4" fill="${s}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5" stroke-linecap="round">
<path d="${UPPER}"/><path d="${LOWER}"/></g>
<g fill="none" stroke="${s}" stroke-width="3"><path d="${WATERLINE}"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="5">
<circle cx="${IRIS[0]}" cy="${IRIS[1]}" r="${IRIS[2]}"/></g>`;

const L5 = (s) => `<g stroke="${s}">
<circle cx="450" cy="470" r="${PUPIL_R}" fill="${s}"/>
<circle cx="427" cy="443" r="12" fill="#fff9ee" stroke-width="3.5"/>
<circle cx="477" cy="498" r="6.5" fill="#fff9ee" stroke-width="3"/></g>`;

const CREASE = `M252 462 C330 322 548 292 648 414`;
const L6 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round">
<path d="${CREASE}"/></g>`;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round" opacity="0.85">
<path d="M262 494 C335 396 530 364 640 454 M288 496 C352 420 520 392 612 458 M252 502 c10 16 28 27 48 33 M650 460 c-12 14 -28 23 -46 27"/></g>`;

const L8 = (s) => `<g stroke="${s}">${spokes(3, 37, (i) => (i % 2 === 0 ? 66 : 58))}</g>`;

const L9 = (s) => `<g stroke="${s}">
${UPPER_LASHES(4.5)}${LOWER_LASHES(3)}
<g>${browStrokes(3)}</g>
<path d="${BROW_CURVE}" fill="none" stroke-width="3" stroke-linecap="round"/><path d="${BROW_TOP}" fill="none" stroke-width="3" stroke-linecap="round"/></g>`;

const colorArt = `<defs>
<clipPath id="eyeClip"><path d="${UPPER} L672 453 C548 576 335 570 228 497 Z"/></clipPath>
<radialGradient id="irisGrad" cx="0.42" cy="0.4" r="0.75">
<stop offset="0%" stop-color="#caa06a"/><stop offset="55%" stop-color="#a06a35"/><stop offset="100%" stop-color="#7a4d20"/>
</radialGradient>
</defs>
<g stroke-linecap="round">
<g clip-path="url(#eyeClip)">
<path d="${UPPER} L672 453 C548 576 335 570 228 497 Z" fill="#ffffff"/>
<path d="M228 497 C315 362 548 332 672 453 L672 470 C548 372 330 396 240 500 Z" fill="#ddd5c6" opacity="0.85"/>
<circle cx="450" cy="470" r="74" fill="url(#irisGrad)"/>
<g stroke="#6e4520">${spokes(2.5, 37, (i) => (i % 2 === 0 ? 68 : 59))}</g>
<g stroke="#e8c88f" opacity="0.8">${spokes(1.8, 40, (i) => (i % 2 === 0 ? 55 : 63))}</g>
<circle cx="450" cy="470" r="74" fill="none" stroke="#4a2e10" stroke-width="5"/>
<circle cx="450" cy="470" r="32" fill="#14100c"/>
<circle cx="427" cy="443" r="12" fill="#ffffff"/>
<circle cx="477" cy="498" r="6.5" fill="#ffffff"/>
</g>
<g fill="none" stroke="#2b2620" stroke-width="5.5"><path d="${UPPER}"/><path d="${LOWER}"/></g>
<g fill="none" stroke="#2b2620" stroke-width="3.5" opacity="0.65"><path d="${CREASE}"/></g>
<path d="M252 336 C360 262 560 252 664 314 C556 226 366 234 258 302 C290 322 300 330 252 336 Z" fill="#6b4a2a"/>
<g stroke="#2b2620">${UPPER_LASHES(5.5)}${LOWER_LASHES(3.5)}</g>
<g stroke="#54381e">${browStrokes(3.5)}</g>
</g>`;

export default {
  slug: 'eye-drawing',
  subject: 'Eye Drawing',
  captions: [
    'Draw the slanted eye axis.',
    'Mark the inner and outer corners.',
    'Shape the upper and lower lids.',
    'Add the round iris.',
    'Place the pupil and highlights.',
    'Draw the eyelid crease.',
    'Shade the eyeball softly.',
    'Build the iris texture.',
    'Add lashes and brow texture.',
    'Refine the values and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

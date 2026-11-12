// Sunflower Drawing — 7 steps, from the tutorial's own step list.
// Big seed disk (450,375) ringed by two rows of ray petals, sturdy stalk, broad leaves.
const CX = 450, CY = 375;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="${CX}" cy="${CY}" r="75"/><circle cx="${CX}" cy="${CY}" r="168"/><path d="M${CX} ${CY} V752 M282 ${CY} H618"/></g>`;

const rot = (inner, angles) => angles.map((a) => `<g transform="rotate(${a} ${CX} ${CY})">${inner}</g>`).join('');
const ANG_A = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
const ANG_B = [15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345];

// Step 1 is construction only — the guides carry it.
const L1 = () => ``;

// Step 2 — seed disk: outer circle and inner ring.
const DISK = `<circle cx="${CX}" cy="${CY}" r="75"/><circle cx="${CX}" cy="${CY}" r="58" stroke-width="3"/>`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5">${DISK}</g>`;

// Step 3 — ray petals (two offset rows), stalk, and two broad leaves.
const PETAL_A = `<path d="M450 208 C462 242 464 276 450 308 C436 276 438 242 450 208 Z"/>`;
const PETAL_B = `<path d="M450 232 C460 258 461 284 450 308 C439 284 440 258 450 232 Z"/>`;
const STALK = `<path d="M440 500 C436 590 437 675 439 750"/><path d="M462 500 C466 590 465 675 461 750"/>`;
const LEAF_L = `M442 640 C378 602 312 604 272 642 C310 686 380 694 442 670 Z`;
const LEAF_R = `M460 696 C502 668 556 670 588 696 C556 728 498 730 460 716 Z`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">${STALK}<path d="${LEAF_L}"/><path d="${LEAF_R}"/>${rot(PETAL_A, ANG_A)}${rot(PETAL_B, ANG_B)}</g>`;

// Step 4 — refine the outside contour: re-trace the long petals and disk.
const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round">${rot(PETAL_A, ANG_A)}<circle cx="${CX}" cy="${CY}" r="75"/></g>`;

// Step 5 — details: seed dots in rings inside the disk, plus leaf veins.
const dots = [];
for (const [r, n, off] of [[16, 6, 0], [32, 10, 18], [48, 14, 8]]) {
  for (let i = 0; i < n; i++) {
    const a = ((i * 360) / n + off) * Math.PI / 180;
    dots.push(`<circle cx="${(CX + r * Math.cos(a)).toFixed(1)}" cy="${(CY + r * Math.sin(a)).toFixed(1)}" r="3.4"/>`);
  }
}
const L5 = (s) => `<g fill="${s}" stroke="none">${dots.join('')}</g><g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round"><path d="M438 656 C382 632 326 632 282 644"/><path d="M464 708 C498 690 542 690 578 698"/></g>`;

// Step 6 is the clean step — nothing new.
const L6 = () => ``;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M440 500 C436 590 437 675 439 750 L461 750 C465 675 466 590 462 500 Z" fill="#7fb069" stroke="#2b2620" stroke-width="4.5"/>
<g fill="#8fce6e" stroke="#2b2620" stroke-width="5"><path d="${LEAF_L}"/><path d="${LEAF_R}"/></g>
<g fill="none" stroke="#2e7d32" stroke-width="3.5"><path d="M438 656 C382 632 326 632 282 644"/><path d="M464 708 C498 690 542 690 578 698"/></g>
<g fill="#ffc53d" stroke="#2b2620" stroke-width="5">${rot(PETAL_B, ANG_B)}${rot(PETAL_A, ANG_A)}</g>
<circle cx="${CX}" cy="${CY}" r="75" fill="#8a5a2b" stroke="#2b2620" stroke-width="5.5"/>
<circle cx="${CX}" cy="${CY}" r="58" fill="none" stroke="#5d3a17" stroke-width="3"/>
<g fill="#4e2c0e" stroke="none">${dots.join('')}</g>
</g>`;

export default {
  slug: 'sunflower-drawing',
  subject: 'Sunflower Drawing',
  captions: [
    'Sketch the main shapes.',
    'Block in the seed disk.',
    'Set the ray petals and stalk.',
    'Refine the outside contour.',
    'Add seed dots and leaf veins.',
    'Clean the guide lines.',
    'Add light shading and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6],
  colorArt,
};

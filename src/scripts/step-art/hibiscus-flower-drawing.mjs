// Hibiscus Flower Drawing — 10 steps, from the tutorial's own step list.
// Five large ruffled petals around centre (450,400), long stamen column with anthers, calyx.
const CX = 450, CY = 400;

const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="${CX}" cy="${CY}" r="85"/><circle cx="${CX}" cy="${CY}" r="172"/><path d="M278 ${CY} H622 M${CX} 228 V572"/></g>`;

const rot = (inner, angles) => angles.map((a) => `<g transform="rotate(${a} ${CX} ${CY})">${inner}</g>`).join('');
const PET_ANGLES = [0, 72, 144, 216, 288];

// Step 1 is construction only — the guides carry it.
const L1 = () => ``;

// Step 2 — five broad petals with a notched, ruffled rim.
const PETAL = `<path d="M404 406 C372 336 384 258 422 228 C434 212 448 222 450 232 C452 222 466 212 478 228 C516 258 528 336 496 406 C464 394 436 394 404 406 Z"/>`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">${rot(PETAL, PET_ANGLES)}</g>`;

// Step 3 — stamen column curving out of the centre, dotted with anthers.
const COLUMN = `<path d="M444 392 C476 434 502 482 514 530"/><path d="M464 402 C492 442 512 486 522 522"/>`;
const ANTHERS = [[500, 470], [512, 492], [522, 512], [514, 532], [530, 528], [524, 544]]
  .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5"/>`).join('');
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linecap="round">${COLUMN}</g><g fill="${s}" stroke="none">${ANTHERS}</g>`;

// Step 4 — refine the outside contour: re-trace the petals with weight.
const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6.5" stroke-linejoin="round">${rot(PETAL, PET_ANGLES)}</g>`;

// Step 5 — details: petal veins fanning from the throat, plus the calyx star.
const VEIN_C = `<path d="M450 398 C449 340 449 288 450 248"/>`;
const VEIN_S = `<path d="M450 320 C436 300 426 282 424 262"/><path d="M450 320 C464 300 474 282 476 262"/>`;
const CALYX = `M420 520 L450 548 L480 520 L474 556 L450 542 L426 556 Z`;
const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">${rot(VEIN_C, PET_ANGLES)}${rot(VEIN_S, PET_ANGLES)}</g><g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${CALYX}"/></g>`;

// Step 6 is the clean step — nothing new.
const L6 = () => ``;

// Step 7 — light shading: small hatch clusters along one side of each petal.
const SHADE = `<path d="M404 300 C402 330 404 358 410 382"/><path d="M418 296 C416 326 418 352 424 374"/>`;
const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">${rot(SHADE, PET_ANGLES)}</g>`;

// Step 8 — richer fold texture: two extra fold curves inside each petal.
const FOLD_T = `<path d="M430 306 C427 328 428 350 433 368"/><path d="M470 306 C473 328 472 350 467 368"/>`;
const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3" stroke-linecap="round">${rot(FOLD_T, PET_ANGLES)}</g>`;

// Step 9 — strengthen depth: shadow line under the stamen column and shade
// arcs tucked under the two lower petals where they overlap the calyx.
const SHADE_LOW = `<path d="M418 384 C436 368 464 368 482 384"/>`;
const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="4" stroke-linecap="round"><path d="M472 428 C492 458 508 490 516 520"/>${rot(SHADE_LOW, [144, 216])}</g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<g fill="#ef476f" stroke="#2b2620" stroke-width="5">${rot(PETAL, PET_ANGLES)}</g>
<circle cx="${CX}" cy="${CY}" r="62" fill="#d6336c" opacity="0.45"/>
<g fill="none" stroke="#b02a52" stroke-width="3.5">${rot(VEIN_C, PET_ANGLES)}${rot(VEIN_S, PET_ANGLES)}</g>
<path d="${CALYX}" fill="#8fce6e" stroke="#2b2620" stroke-width="5"/>
<path d="M444 392 C476 434 502 482 514 530 C518 538 528 536 526 526 C518 484 494 440 464 402 C456 392 440 384 444 392 Z" fill="#ffd166" stroke="#2b2620" stroke-width="4.5"/>
<g fill="#ffb703" stroke="#2b2620" stroke-width="2.5">${ANTHERS}</g>
</g>`;

export default {
  slug: 'hibiscus-flower-drawing',
  subject: 'Hibiscus Drawing',
  captions: [
    'Sketch the main shapes.',
    'Block in the ruffled petals.',
    'Set the stamen and anthers.',
    'Refine the outside contour.',
    'Add veins and the calyx.',
    'Clean the guide lines.',
    'Add light shading and finish.',
    'Build richer fold texture.',
    'Strengthen depth and overlaps.',
    'Review and add final color.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

// Horse Drawing — 10 steps, standing side view facing left, from the tutorial's own step list.
// Construction shapes live in `guides`. Captions from step 6 on keep the word "Clean" so the kit
// keeps guides off and all lines dark for the shading/texture/depth steps after the clean-up.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><ellipse cx="480" cy="432" rx="168" ry="90"/><circle cx="352" cy="432" r="86"/><circle cx="602" cy="430" r="88"/><circle cx="228" cy="276" r="46"/><path d="M362 362 L252 246 M300 330 L196 322"/><path d="M334 510 V724 M374 510 V724 M593 510 V724 M634 510 V724"/></g>`;

const MANE = `M244 214 C300 240 352 288 384 340 C388 352 378 360 366 356 C330 306 288 264 240 240 C230 232 234 216 244 214 Z`;
const HEAD = `M244 218 C216 236 192 268 176 300 C168 316 172 330 188 332 L236 338 C262 340 280 326 288 300 C296 272 288 240 268 224 C260 216 252 214 244 218 Z`;
const BODY = `<ellipse cx="480" cy="432" rx="168" ry="90"/>`;
const TAIL = `M632 356 C676 380 700 440 702 512 C703 570 692 626 668 664 C660 676 646 672 646 656 C650 600 648 540 636 486 C628 446 624 396 632 356 Z`;
const LEG_FL = `M322 494 C318 560 317 650 319 728 L347 728 C348 650 349 560 350 500`;
const LEG_FL2 = `M362 500 C359 566 359 652 360 728 L384 728 C385 652 386 566 388 506`;
const LEG_HL = `M580 500 C576 566 577 652 579 728 L607 728 C608 652 608 566 606 494`;
const LEG_HL2 = `M622 494 C620 560 621 650 622 728 L646 728 C647 650 646 560 644 500`;

const L1 = (s) => ``;

const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round"><path d="${MANE}"/></g>`;

const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="5" stroke-linejoin="round">
<path d="${HEAD}"/>
<path d="M186 312 q8 4 6 12" stroke-width="3.5"/>
<path d="M348 358 Q372 342 398 348 M342 384 C332 424 332 472 340 514" stroke-width="4"/></g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-width="6" stroke-linejoin="round">${BODY}
<path d="M240 240 C288 264 336 308 368 356 M288 300 C316 340 330 390 334 440" stroke-width="5.5"/>
<path d="${LEG_FL}" stroke-width="5"/><path d="${LEG_FL2}" stroke-width="5"/>
<path d="${LEG_HL}" stroke-width="5"/><path d="${LEG_HL2}" stroke-width="5"/>
<path d="M180 744 H740" stroke-width="4"/></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round">
<path d="M240 222 L234 182 Q233 169 244 175 L264 200 Q254 218 240 222 Z"/>
<path d="M244 210 L242 190" stroke-width="3"/>
<path d="M217 262 Q232 249 247 262 Q232 271 217 262 Z"/>
<circle cx="232" cy="260" r="3.5" fill="${s}" stroke="none"/>
<path d="M262 246 C296 272 330 312 354 350 M282 232 C314 258 344 294 364 330" stroke-width="3.5"/>
<path d="${TAIL}"/>
<path d="M317 706 H349 M358 706 H387 M577 706 H609 M620 706 H648" stroke-width="4"/>
<path d="M196 330 Q240 344 282 330" stroke-width="3.5"/></g>`;

const L6 = (s) => ``;

const L7 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M300 330 q30 60 34 130"/>
<path d="M380 500 q100 26 200 4"/>
<path d="M600 420 q26 60 12 130"/>
<path d="M262 258 q-16 30 -24 62" stroke-width="3"/></g>`;

const L8 = (s) => `<g fill="none" stroke="${s}" stroke-width="3.5" stroke-linecap="round">
<path d="M320 688 q6 10 12 2 q6 8 12 0 M362 688 q5 10 11 2 q5 8 11 0"/>
<path d="M582 688 q6 10 12 2 q6 8 12 0 M624 688 q5 10 11 2 q5 8 11 0"/>
<path d="M344 466 q14 22 34 30 M356 436 q12 18 28 24"/></g>`;

const L9 = (s) => `<g fill="none" stroke="${s}" stroke-width="7" stroke-linecap="round">
<path d="M334 420 C330 460 332 496 340 522"/>
<path d="M636 420 C648 480 650 540 644 600"/>
<path d="M322 500 C318 540 317 580 318 620 M584 500 C580 540 580 580 581 620" stroke-width="6"/></g>`;

const colorArt = `<g stroke-linejoin="round" stroke-linecap="round">
<path d="M180 744 H740" stroke="#2e7d32" stroke-width="4"/>
<path d="${TAIL}" fill="#54371c" stroke="#2b2620" stroke-width="5"/>
<path d="${LEG_FL2}" fill="#a8642f" stroke="#2b2620" stroke-width="5"/>
<path d="${LEG_HL2}" fill="#a8642f" stroke="#2b2620" stroke-width="5"/>
<ellipse cx="480" cy="432" rx="168" ry="90" fill="#b5713d" stroke="#2b2620" stroke-width="6"/>
<path d="M380 500 q100 26 200 4 q-100 22 -200 -4 Z" fill="#9a5c2e" opacity="0.55"/>
<path d="${LEG_FL}" fill="#b5713d" stroke="#2b2620" stroke-width="5"/>
<path d="${LEG_HL}" fill="#b5713d" stroke="#2b2620" stroke-width="5"/>
<g fill="#4c443c" stroke="#2b2620" stroke-width="4"><path d="M318 706 H348 L347 728 L319 728 Z"/><path d="M359 706 H385 L384 728 L360 728 Z"/><path d="M578 706 H608 L607 728 L579 728 Z"/><path d="M621 706 H647 L646 728 L622 728 Z"/></g>
<path d="M288 300 C316 340 330 390 334 440 C320 400 300 350 288 300 Z" fill="#b5713d"/>
<path d="M240 240 C288 264 336 308 368 356 L334 440 C330 390 316 340 288 300 C262 268 248 252 240 240 Z" fill="#b5713d"/>
<path d="${HEAD}" fill="#b5713d" stroke="#2b2620" stroke-width="5"/>
<path d="M176 300 C168 316 172 330 188 332 L236 338 C220 330 196 322 176 300 Z" fill="#caa27e"/>
<path d="${MANE}" fill="#54371c" stroke="#2b2620" stroke-width="5"/>
<g fill="none" stroke="#3d2712" stroke-width="3.5"><path d="M262 246 C296 272 330 312 354 350 M282 232 C314 258 344 294 364 330"/></g>
<path d="M240 222 L234 182 Q233 169 244 175 L264 200 Q254 218 240 222 Z" fill="#b5713d" stroke="#2b2620" stroke-width="4.5"/>
<path d="M217 262 Q232 249 247 262 Q232 271 217 262 Z" fill="#ffffff" stroke="#2b2620" stroke-width="4"/>
<circle cx="232" cy="260" r="3.5" fill="#2b2620"/>
<path d="M186 312 q8 4 6 12" fill="none" stroke="#2b2620" stroke-width="3.5"/>
<g fill="none" stroke="#8a4f24" stroke-width="3.5"><path d="M300 330 q30 60 34 130 M600 420 q26 60 12 130"/></g>
</g>`;

export default {
  slug: 'horse-drawing',
  subject: 'Horse Drawing',
  captions: [
    'Place the construction shapes.',
    'Block in the mane.',
    'Set the muzzle and withers.',
    'Refine the outside contour.',
    'Add subject details.',
    'Clean the guide lines.',
    'Clean lines, light shading.',
    'Clean texture: fetlocks, chest.',
    'Clean, deeper overlap shadows.',
    'Final check, then final lines.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5, L6, L7, L8, L9],
  colorArt,
};

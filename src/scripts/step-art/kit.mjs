// Shared kit for Drawinging step-by-step cards (approved pilot style, 2026).
// Convention: each tutorial module exports { slug, subject, captions, layers, colorArt, guides? }
// - layers[i] is a function (strokeColor) => svgInnerString. Layer i is the NEW art added at step i+1.
// - For step k (1-based, k < total): art = guides (unless k is the clean/final step) + layers[0..k-2] in GRAY + layers[k-1] in DARK.
// - Final step: if colorArt is provided, art = colorArt (full colour, no guides). Otherwise all layers in DARK, no guides.
// Canvas 900x900. Drawing area roughly x 150..750, y 210..760 (chrome occupies top ~190 and bottom pill ~770..865).

export const C = {
  dark: '#2b2620',
  gray: '#c8bfa9',
  guide: '#ddd2bd',
  ink: '#22302a',
  green: '#0e6b45',
  cta: '#c94a0e',
  paper: '#fff9ee',
  border: '#e9dcc0',
  captionInk: '#333333',
};

export function card({ step, total, subject, caption, art }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
<rect x="6" y="6" width="888" height="888" rx="46" fill="${C.paper}" stroke="${C.border}" stroke-width="3"/>
<rect x="72" y="66" width="112" height="112" rx="30" fill="${C.cta}"/>
<text x="128" y="146" font-family="Arial, Helvetica, sans-serif" font-size="62" font-weight="bold" fill="#ffffff" text-anchor="middle">${step}</text>
<text x="216" y="108" font-family="Arial, Helvetica, sans-serif" font-size="33" font-weight="bold" letter-spacing="5" fill="${C.green}">${subject.toUpperCase()}</text>
<text x="214" y="168" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="bold" fill="${C.ink}">Step ${step} of ${total}</text>
${art}
<rect x="72" y="782" width="756" height="76" rx="38" fill="#ffffff" stroke="${C.border}" stroke-width="2.5"/>
<text x="450" y="831" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="${C.captionInk}" text-anchor="middle">${caption}</text>
</svg>`;
}

export function guides(cx = 450, cy = 470, r1 = 120, r2 = 215) {
  return `<g stroke="${C.guide}" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="${cx}" cy="${cy}" r="${r1}"/><circle cx="${cx}" cy="${cy}" r="${r2}"/><path d="M ${cx - r2 - 30} ${cy} H ${cx + r2 + 30} M ${cx} ${cy - r2 - 30} V ${cy + r2 + 30}"/></g>`;
}

// Build all card SVGs for a tutorial module.
export function buildCards(mod) {
  const total = mod.captions.length;
  const cards = [];
  let cleaned = false; // once a Clean step happens, guides never come back and earlier layers stay dark
  for (let k = 1; k <= total; k++) {
    let art;
    const isClean = /clean/i.test(mod.captions[k - 1]);
    if (k === total && mod.colorArt) {
      art = mod.colorArt;
    } else if (k === total) {
      art = mod.layers.map((l) => l(C.dark)).join('');
    } else if (isClean || cleaned) {
      art = mod.layers.slice(0, k).map((l) => l(C.dark)).join('');
    } else {
      const prev = mod.layers.slice(0, k - 1).map((l) => l(C.gray)).join('');
      const cur = mod.layers[k - 1] ? mod.layers[k - 1](C.dark) : '';
      const g = mod.guides === null ? '' : (mod.guides || guides());
      art = g + prev + cur;
    }
    if (isClean) cleaned = true;
    cards.push(card({ step: k, total, subject: mod.subject, caption: mod.captions[k - 1], art }));
  }
  return cards;
}

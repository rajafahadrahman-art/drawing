// Sun Drawing — 7 steps, a smiling sun built as one progressive drawing.
const guides = `<g stroke="#ddd2bd" stroke-width="2.5" stroke-dasharray="9 11" fill="none"><circle cx="450" cy="470" r="150"/><circle cx="450" cy="470" r="238"/><path d="M450 202 V738 M182 470 H718"/></g>`;

const L1 = (s) => `<g fill="none" stroke="${s}" stroke-width="5.5"><circle cx="450" cy="470" r="150"/></g>`;

const longRays = `<path d="M450 310 V232"/><path d="M563 357 L618 302"/><path d="M610 470 H688"/><path d="M563 583 L618 638"/><path d="M450 630 V708"/><path d="M337 583 L282 638"/><path d="M290 470 H212"/><path d="M337 357 L282 302"/>`;
const L2 = (s) => `<g fill="none" stroke="${s}" stroke-width="15" stroke-linecap="round">${longRays}</g>`;

const shortRays = `<path d="M598 409 L634 393"/><path d="M511 322 L527 286"/><path d="M389 322 L373 286"/><path d="M302 409 L266 393"/><path d="M302 531 L266 547"/><path d="M389 618 L373 654"/><path d="M511 618 L527 654"/><path d="M598 531 L634 547"/>`;
const L3 = (s) => `<g fill="none" stroke="${s}" stroke-width="13" stroke-linecap="round">${shortRays}</g>`;

const L4 = (s) => `<g fill="none" stroke="${s}" stroke-linecap="round">
<g stroke-width="6"><path d="M352 464 C364 441, 396 441, 408 464"/><path d="M492 464 C504 441, 536 441, 548 464"/><path d="M394 516 C419 550, 481 550, 506 516"/></g>
<g stroke-width="3.5"><circle cx="343" cy="514" r="15"/><circle cx="557" cy="514" r="15"/></g></g>`;

const L5 = (s) => `<g fill="none" stroke="${s}" stroke-linecap="round">
<g stroke-width="21">${longRays}</g>
<circle cx="450" cy="470" r="150" stroke-width="7"/></g>`;

const colorArt = `<g stroke-linecap="round">
<g fill="none" stroke="#2b2620" stroke-width="26"><path d="M450 310 V232"/><path d="M563 357 L618 302"/><path d="M610 470 H688"/><path d="M563 583 L618 638"/><path d="M450 630 V708"/><path d="M337 583 L282 638"/><path d="M290 470 H212"/><path d="M337 357 L282 302"/><path d="M598 409 L634 393"/><path d="M511 322 L527 286"/><path d="M389 322 L373 286"/><path d="M302 409 L266 393"/><path d="M302 531 L266 547"/><path d="M389 618 L373 654"/><path d="M511 618 L527 654"/><path d="M598 531 L634 547"/></g>
<g fill="none" stroke="#ff9f1c" stroke-width="17"><path d="M450 310 V232"/><path d="M563 357 L618 302"/><path d="M610 470 H688"/><path d="M563 583 L618 638"/><path d="M450 630 V708"/><path d="M337 583 L282 638"/><path d="M290 470 H212"/><path d="M337 357 L282 302"/><path d="M598 409 L634 393"/><path d="M511 322 L527 286"/><path d="M389 322 L373 286"/><path d="M302 409 L266 393"/><path d="M302 531 L266 547"/><path d="M389 618 L373 654"/><path d="M511 618 L527 654"/><path d="M598 531 L634 547"/></g>
<circle cx="450" cy="470" r="150" fill="#ffd23f" stroke="#2b2620" stroke-width="5.5"/>
<circle cx="450" cy="452" r="112" fill="#ffe066" opacity="0.65"/>
<g fill="#ff8fa3" opacity="0.85"><ellipse cx="343" cy="514" rx="17" ry="13"/><ellipse cx="557" cy="514" rx="17" ry="13"/></g>
<g fill="none" stroke="#2b2620" stroke-width="6.5"><path d="M352 464 C364 441, 396 441, 408 464"/><path d="M492 464 C504 441, 536 441, 548 464"/><path d="M394 516 C419 550, 481 550, 506 516"/></g>
</g>`;

export default {
  slug: 'sun-drawing',
  subject: 'Sun Drawing',
  captions: [
    'Draw the circle.',
    'Add the long rays.',
    'Add the short rays.',
    'Draw a happy face.',
    'Refine the outline.',
    'Clean the guide lines.',
    'Colour and finish.',
  ],
  guides,
  layers: [L1, L2, L3, L4, L5],
  colorArt,
};

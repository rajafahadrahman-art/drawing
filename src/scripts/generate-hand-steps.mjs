// Materialises the realistic hand-drawing step photos for 4 tutorials.
//
// The photos are stored as base64 text in src/scripts/hand-steps-data/<slug>.mjs
// (the GitHub connector used for this repo can only push UTF-8 text, so the
// WebP binaries cannot be committed directly). This script decodes them into
// public/images/hand-steps/<slug>/<slug>-step-N.webp during prebuild — a path
// no other generator writes, so the photos survive the build untouched and
// never feed the worksheet generators (those keep using the original artwork
// under public/images/tutorials/).
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src/scripts/hand-steps-data');
const outRoot = path.join(root, 'public/images/hand-steps');

let written = 0;
for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith('.mjs'))) {
  const slug = file.replace(/\.mjs$/, '');
  const { default: steps } = await import(path.join(dataDir, file));
  const outDir = path.join(outRoot, slug);
  fs.mkdirSync(outDir, { recursive: true });
  for (const [step, b64] of Object.entries(steps)) {
    const out = path.join(outDir, `${slug}-step-${step}.webp`);
    fs.writeFileSync(out, Buffer.from(b64, 'base64'));
    written += 1;
  }
}
console.log(`generate-hand-steps: wrote ${written} hand step images`);

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const publicDir = path.join(projectRoot, 'public');
const source = path.join(publicDir, 'brand', 'logo-mark.svg');

const targets = [
  ['apple-touch-icon.png', 180],
  ['site-icon-192.png', 192],
  ['site-icon-512.png', 512],
];

await fs.access(source);

for (const [fileName, size] of targets) {
  const output = path.join(publicDir, fileName);

  await sharp(source, { density: 384 })
    .resize(size, size, {
      fit: 'contain',
      background: { r: 247, g: 243, b: 236, alpha: 1 },
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(output);

  const stats = await fs.stat(output);
  console.log(`created ${path.relative(projectRoot, output)} ${size}x${size} (${stats.size} bytes)`);
}

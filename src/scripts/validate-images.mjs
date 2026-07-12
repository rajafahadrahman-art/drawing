import fs from 'node:fs';
import path from 'node:path';
import { loadTutorials, fail } from './_utils.mjs';

const root = process.cwd();
const tutorials = loadTutorials();
const issues = [];

function existsNonEmpty(rel) {
  const full = path.join(root, 'public', rel.replace(/^\//, ''));
  if (!fs.existsSync(full)) return { ok: false, reason: 'missing' };
  const size = fs.statSync(full).size;
  if (size <= 0) return { ok: false, reason: 'empty' };
  return { ok: true, size };
}

for (const t of tutorials) {
  const checks = [
    t.featuredImage,
    t.featuredImage.replace('.webp', '-og.webp'),
    ...(t.stepImages || []).map((i) => i.src),
    t.worksheet?.preview,
    t.worksheet?.pdf,
    t.worksheet?.svg,
  ].filter(Boolean);

  for (const rel of checks) {
    const result = existsNonEmpty(rel);
    if (!result.ok) issues.push(`${t.slug}: ${rel} ${result.reason}`);
  }

  if (!t.featuredImageAlt) issues.push(`${t.slug}: missing featured alt`);
  if (t.featuredImageAlt !== t.focusKeyword) {
    issues.push(`${t.slug}: featured alt should equal focus keyword`);
  }
  if (!t.featuredImageWidth || !t.featuredImageHeight) {
    issues.push(`${t.slug}: missing featured dimensions`);
  }
  for (const img of t.stepImages || []) {
    if (!img.alt || !img.width || !img.height) issues.push(`${t.slug}: incomplete step image metadata`);
  }
}

fail(issues);

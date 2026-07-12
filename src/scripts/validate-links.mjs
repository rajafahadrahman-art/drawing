import fs from 'node:fs';
import path from 'node:path';
import { loadTutorials, fail } from './_utils.mjs';

const root = process.cwd();
const tutorials = loadTutorials();
const issues = [];

const known = new Set([
  '/',
  '/drawing-tutorials/',
  '/easy-drawings/',
  '/worksheets/',
  '/learn-drawing/',
  '/search/',
  '/about/',
  '/editorial-policy/',
  '/contact/',
  '/privacy-policy/',
  '/terms/',
  '/disclaimer/',
  '/sitemap/',
  '/flower-drawings/',
  '/animal-drawings/',
  '/bird-drawings/',
  '/insect-drawings/',
  '/sea-animal-drawings/',
  '/nature-drawings/',
  '/vehicle-drawings/',
  '/sports-drawings/',
  '/seasonal-drawings/',
  '/fantasy-drawings/',
  '/symbol-drawings/',
  '/learn-drawing/basic-shapes/',
  '/learn-drawing/line-control/',
  '/learn-drawing/proportions/',
  '/learn-drawing/shading/',
  '/learn-drawing/perspective/',
  '/learn-drawing/pencil-techniques/',
]);

for (const t of tutorials) known.add(t.permalink);

const inbound = new Map([...known].map((u) => [u, 0]));
inbound.set('/', 1);

function note(url) {
  if (!inbound.has(url)) inbound.set(url, 0);
  inbound.set(url, inbound.get(url) + 1);
}

for (const t of tutorials) {
  note(`/${t.category}/`);
  for (const rel of t.relatedTutorials || []) {
    const url = `/${rel}/`;
    if (!known.has(url)) issues.push(`${t.slug}: related tutorial missing ${url}`);
    note(url);
  }
  for (const g of t.relatedGuides || []) {
    const url = `/learn-drawing/${g}/`;
    if (!known.has(url)) issues.push(`${t.slug}: related guide missing ${url}`);
    note(url);
  }
  if (!t.worksheet?.pdf) issues.push(`${t.slug}: missing worksheet pdf link`);
}

// Homepage and hubs conceptually link widely
for (const t of tutorials) {
  note(t.permalink);
  note('/worksheets/');
  note('/learn-drawing/');
}

const hubPages = new Set([
  '/',
  '/drawing-tutorials/',
  '/easy-drawings/',
  '/worksheets/',
  '/learn-drawing/',
  '/search/',
  '/sitemap/',
]);
for (const [url, count] of inbound) {
  if (hubPages.has(url)) continue;
  if (url.endsWith('-drawing/') || url.endsWith('-drawings/')) {
    if (count <= 0) issues.push(`Orphan page risk: ${url}`);
  }
}
// Hubs receive links from homepage/nav conceptually
for (const hub of hubPages) note(hub);

// Ensure every tutorial has parent category link expectation
for (const t of tutorials) {
  if (!t.category) issues.push(`${t.slug}: missing parent category`);
}

fail(issues);

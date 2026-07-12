import { loadTutorials, fail } from './_utils.mjs';
import fs from 'node:fs';
import path from 'node:path';

const tutorials = loadTutorials();
const issues = [];

const focus = new Map();
const permalinks = new Map();
const titles = new Map();
const h1s = new Map();
const descriptions = new Map();

for (const t of tutorials) {
  const add = (map, key, label) => {
    if (!key) {
      issues.push(`${t.slug}: missing ${label}`);
      return;
    }
    if (map.has(key)) issues.push(`Duplicate ${label}: "${key}" (${map.get(key)} & ${t.slug})`);
    else map.set(key, t.slug);
  };
  add(focus, t.focusKeyword, 'focusKeyword');
  add(permalinks, t.permalink, 'permalink');
  add(titles, t.title, 'title');
  add(h1s, t.h1, 'h1');
  add(descriptions, t.description, 'description');

  if (t.permalink !== `/${t.slug}/`) {
    issues.push(`${t.slug}: permalink mismatch ${t.permalink}`);
  }
  if (!t.h1?.toLowerCase().includes(t.focusKeyword?.toLowerCase())) {
    issues.push(`${t.slug}: H1 missing focus keyword`);
  }
}

// Category vs tutorial separation
const categoryFocus = [
  'flower drawing tutorials',
  'animal drawing tutorials',
  'bird drawing tutorials',
  'insect drawing tutorials',
  'sea animal drawing tutorials',
  'nature drawing tutorials',
  'vehicle drawing tutorials',
  'sports drawing tutorials',
  'seasonal drawing tutorials',
  'fantasy drawing tutorials',
  'symbol drawing tutorials',
];
for (const t of tutorials) {
  if (categoryFocus.includes(t.focusKeyword)) {
    issues.push(`${t.slug}: tutorial owns category focus keyword`);
  }
}

// Intro similarity (simple Jaccard on first 40 words)
function tokens(text) {
  return new Set(
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 40)
  );
}
function jaccard(a, b) {
  const inter = [...a].filter((x) => b.has(x)).length;
  const uni = new Set([...a, ...b]).size;
  return uni ? inter / uni : 0;
}
for (let i = 0; i < tutorials.length; i++) {
  for (let j = i + 1; j < tutorials.length; j++) {
    const score = jaccard(tokens(tutorials[i].intro), tokens(tutorials[j].intro));
    if (score >= 0.72) {
      issues.push(
        `Closely duplicated introductions: ${tutorials[i].slug} & ${tutorials[j].slug} (similarity ${score.toFixed(2)})`
      );
    }
    const faqA = (tutorials[i].faqs || []).map((f) => f.question).join('|');
    const faqB = (tutorials[j].faqs || []).map((f) => f.question).join('|');
    if (faqA && faqA === faqB) {
      issues.push(`Identical FAQ sets: ${tutorials[i].slug} & ${tutorials[j].slug}`);
    }
  }
}

const report = {
  checked: tutorials.length,
  issues,
  suggestions: issues.map((i) => {
    if (i.includes('Duplicate focusKeyword')) {
      return { issue: i, action: 'Keep one canonical tutorial; merge variants; redirect secondary permalink' };
    }
    if (i.includes('Category')) {
      return { issue: i, action: 'Reassign category focus; keep tutorial ownership of subject keyword' };
    }
    if (i.includes('introductions')) {
      return { issue: i, action: 'Rewrite intro with unique angle; noindex only if thin variant remains' };
    }
    return { issue: i, action: 'Review canonical page, merge target, or secondary keyword reassignment' };
  }),
};

fs.mkdirSync(path.join(process.cwd(), 'planning'), { recursive: true });
fs.writeFileSync(
  path.join(process.cwd(), 'planning/cannibalization-validation.json'),
  JSON.stringify(report, null, 2)
);

console.log(`Cannibalization check: ${tutorials.length} tutorials`);
fail(issues);

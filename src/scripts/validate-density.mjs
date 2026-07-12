import { loadTutorials, fail } from './_utils.mjs';

const tutorials = loadTutorials();
const issues = [];

for (const t of tutorials) {
  const body = [
    t.intro,
    t.beforeYouStart,
    ...(t.steps || []).map((s) => `${s.title} ${s.body} ${s.tip}`),
    t.refine,
    t.shading || '',
    t.beginnerVariation,
    t.detailedVariation || '',
    ...(t.commonMistakes || []),
    ...(t.tips || []),
    t.conclusion,
    ...(t.faqs || []).map((f) => `${f.question} ${f.answer}`),
  ].join(' ');

  const words = body.toLowerCase().match(/[a-z0-9']+/g) || [];
  const focus = String(t.focusKeyword || '').toLowerCase().trim();
  if (!focus || !words.length) {
    issues.push(`${t.slug}: unable to compute density`);
    continue;
  }

  const focusParts = focus.split(/\s+/);
  let hits = 0;
  for (let i = 0; i <= words.length - focusParts.length; i++) {
    if (focusParts.every((p, idx) => words[i + idx] === p)) hits += 1;
  }
  const density = (hits / words.length) * 100;
  if (density >= 1) {
    issues.push(`${t.slug}: focus keyword density ${density.toFixed(2)}% (>= 1%) with ${hits} hits / ${words.length} words`);
  } else {
    console.log(`${t.slug}: ${density.toFixed(2)}% (${hits}/${words.length})`);
  }

  if (!t.title || !t.metaTitle || !t.description || !t.canonicalURL) {
    issues.push(`${t.slug}: missing core SEO fields`);
  }
  if (!t.canonicalURL?.startsWith('https://drawinging.com/')) {
    issues.push(`${t.slug}: canonical must use production domain`);
  }
  if (/lorem ipsum/i.test(body)) issues.push(`${t.slug}: contains lorem ipsum`);
  if (/localhost/i.test(JSON.stringify(t))) issues.push(`${t.slug}: contains localhost`);
}

fail(issues);

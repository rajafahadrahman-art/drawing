import fs from 'node:fs';
import path from 'node:path';
import { loadTutorials, fail } from './_utils.mjs';

const tutorials = loadTutorials();
const issues = [];
const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const t of tutorials) {
  if (!t.metaTitle) issues.push(`${t.slug}: missing metaTitle`);
  if (!t.description || t.description.length < 50) issues.push(`${t.slug}: weak description`);
  if (!t.canonicalURL) issues.push(`${t.slug}: missing canonical`);
  if (t.canonicalURL && !t.canonicalURL.startsWith('https://drawinging.com/')) {
    issues.push(`${t.slug}: bad canonical domain`);
  }
  if (titles.has(t.metaTitle)) issues.push(`Duplicate metaTitle: ${t.metaTitle}`);
  titles.add(t.metaTitle);
  if (descriptions.has(t.description)) issues.push(`Duplicate description: ${t.slug}`);
  descriptions.add(t.description);
  if (canonicals.has(t.canonicalURL)) issues.push(`Duplicate canonical: ${t.canonicalURL}`);
  canonicals.add(t.canonicalURL);
  if (!t.faqs?.length) issues.push(`${t.slug}: missing FAQs`);
  if (!t.steps?.length) issues.push(`${t.slug}: missing steps`);
  if (t.steps?.length !== t.stepCount) issues.push(`${t.slug}: stepCount mismatch`);
  if (t.stepImages?.length !== t.stepCount) issues.push(`${t.slug}: stepImages mismatch`);
  if (/placeholder\.com|example\.com|localhost/i.test(JSON.stringify(t))) {
    issues.push(`${t.slug}: placeholder domain detected`);
  }
}

fail(issues);

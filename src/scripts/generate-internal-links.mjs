import fs from 'node:fs';
import path from 'node:path';
import { loadTutorials } from './_utils.mjs';

const tutorials = loadTutorials();
const links = {};
for (const t of tutorials) {
  links[t.permalink] = {
    parentCategory: `/${t.category}/`,
    relatedTutorials: (t.relatedTutorials || []).map((s) => `/${s}/`),
    relatedGuides: (t.relatedGuides || []).map((s) => `/learn-drawing/${s}/`),
    worksheet: `/worksheets/#${t.slug}-worksheet`,
  };
}
fs.writeFileSync(path.join(process.cwd(), 'src/data/internal-links.json'), JSON.stringify(links, null, 2));
console.log('Internal links map written.');

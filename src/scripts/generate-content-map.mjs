import fs from 'node:fs';
import path from 'node:path';
import { loadTutorials } from './_utils.mjs';

const tutorials = loadTutorials();
const map = tutorials.map((t) => ({
  slug: t.slug,
  focusKeyword: t.focusKeyword,
  permalink: t.permalink,
  category: t.category,
  difficulty: t.difficulty,
  relatedTutorials: t.relatedTutorials,
  worksheet: t.worksheet,
}));

fs.mkdirSync(path.join(process.cwd(), 'src/data'), { recursive: true });
fs.writeFileSync(path.join(process.cwd(), 'src/data/keyword-map.json'), JSON.stringify(map, null, 2));
fs.writeFileSync(
  path.join(process.cwd(), 'src/data/worksheets.json'),
  JSON.stringify(
    tutorials.map((t) => ({ slug: t.slug, ...t.worksheet, tutorial: t.permalink, difficulty: t.difficulty, category: t.category })),
    null,
    2
  )
);
console.log('Content map written.');

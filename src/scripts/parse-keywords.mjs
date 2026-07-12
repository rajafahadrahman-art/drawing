import fs from 'node:fs';
import path from 'node:path';

// Lightweight re-export note: full planning outputs already live in /planning
const src = path.join(process.cwd(), 'planning/keyword-master-map.csv');
if (!fs.existsSync(src)) {
  console.error('Missing planning/keyword-master-map.csv — run clustering workflow first.');
  process.exit(1);
}
console.log(`Keyword master map present (${fs.statSync(src).size} bytes).`);

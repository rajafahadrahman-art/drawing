import fs from 'node:fs';
import path from 'node:path';

const src = path.join(process.cwd(), 'planning/keyword-clusters.json');
if (!fs.existsSync(src)) {
  console.error('Missing planning/keyword-clusters.json');
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(src, 'utf8'));
console.log(`Clusters loaded: ${Object.keys(data).length}`);

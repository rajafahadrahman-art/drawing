import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const dir = path.join(root, 'src/content/tutorials');

export function loadTutorials() {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const parsed = matter(raw);
      return { file, ...parsed.data, content: parsed.content };
    })
    .filter((t) => !t.draft);
}

export function fail(messages) {
  if (!messages.length) {
    console.log('OK');
    process.exit(0);
  }
  console.error('VALIDATION FAILED\n');
  for (const m of messages) console.error(`- ${m}`);
  process.exit(1);
}

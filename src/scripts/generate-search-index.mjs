import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const root = process.cwd();
const tutorialsDir = path.join(root, 'src/content/tutorials');
const outFile = path.join(root, 'public/search-index.json');

const files = fs.readdirSync(tutorialsDir).filter((f) => f.endsWith('.md'));
const index = files.map((file) => {
  const raw = fs.readFileSync(path.join(tutorialsDir, file), 'utf8');
  const { data } = matter(raw);
  if (data.draft) return null;
  return {
    title: data.title,
    focusKeyword: data.focusKeyword,
    secondaryKeywords: data.secondaryKeywords || [],
    description: data.description,
    category: data.category,
    difficulty: data.difficulty,
    tags: data.tags || [],
    permalink: data.permalink,
    slug: data.slug,
  };
}).filter(Boolean);

fs.writeFileSync(outFile, JSON.stringify(index));
console.log(`Wrote ${index.length} search entries to public/search-index.json`);

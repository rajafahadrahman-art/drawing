import { spawnSync } from 'node:child_process';

const scripts = [
  'validate:seo',
  'validate:links',
  'validate:images',
  'validate:density',
  'validate:cannibalization',
];

let failed = false;
for (const name of scripts) {
  console.log(`\n=== npm run ${name} ===`);
  const result = spawnSync('npm', ['run', name], { stdio: 'inherit', shell: true });
  if (result.status !== 0) failed = true;
}

if (failed) {
  console.error('\nValidation suite failed.');
  process.exit(1);
}
console.log('\nAll validation checks passed.');

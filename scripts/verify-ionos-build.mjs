import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const buildDirectory = path.join(projectRoot, 'dist');
const forbiddenNames = new Set(['.git', '.ssh', '.ionos.local', 'wp-admin', 'wp-content', 'wp-includes', 'authorized_keys']);

function checkFiles(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    assert(!lstatSync(filename).isSymbolicLink(), `Build must not contain a symbolic link: ${entry.name}`);
    assert(!forbiddenNames.has(entry.name), `Protected file or directory in build: ${entry.name}`);
    assert(!entry.name.startsWith('.env'), 'Build must not contain environment files');
    assert(!/\.(?:php|pem|key|sql|tar|gz)$/i.test(entry.name), `Private or executable file in build: ${entry.name}`);
    assert(entry.name !== '.htaccess', 'Publishing preserves the existing server configuration');
    if (entry.isDirectory()) checkFiles(filename);
  }
}

assert(existsSync(buildDirectory), 'Run npm run build before checking the IONOS build');
checkFiles(buildDirectory);

for (const filename of ['index.html', 'development-partners/index.html', 'mango-project/index.html', 'crisis-response/index.html', 'water-system/index.html']) {
  assert(existsSync(path.join(buildDirectory, filename)), `Missing published page: ${filename}`);
}

const homepage = readFileSync(path.join(buildDirectory, 'index.html'), 'utf8');
assert(homepage.includes('id="root"'), 'The homepage must include the React mount point');
assert(/<script[^>]+src="\/assets\//.test(homepage), 'The homepage must reference built JavaScript');
assert(!homepage.includes('/src/'), 'Do not publish development source paths');

for (const match of homepage.matchAll(/(?:src|href)="(\/(?!\/)[^"#?]+)(?:[?#][^"]*)?"/g)) {
  assert(existsSync(path.join(buildDirectory, match[1])), `Homepage references a missing resource: ${match[1]}`);
}

const revision = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: projectRoot, encoding: 'utf8' }).trim();
assert(/^[a-f0-9]{40}$/.test(revision), 'A full Git commit is required for publishing');
const versionedHomepage = homepage.replace(/(<link\b[^>]*\bhref=")(\/(?!\/)[^"?#]+\.css)(?:\?[^"#]*)?(")/g, (match, prefix, pathname, suffix) => {
  if (pathname.startsWith('/assets/')) return match;
  const stylesheet = readFileSync(path.join(buildDirectory, pathname));
  const version = createHash('sha256').update(stylesheet).digest('hex').slice(0, 12);
  return `${prefix}${pathname}?v=${version}${suffix}`;
});
assert(/href="\/homepage-theme\.css\?v=[a-f0-9]{12}"/.test(versionedHomepage), 'The homepage theme must have a content-specific version');
writeFileSync(path.join(buildDirectory, 'index.html'), versionedHomepage);
writeFileSync(path.join(buildDirectory, 'deployment.json'), `${JSON.stringify({ revision, builtAt: new Date().toISOString() })}\n`);
console.log(`IONOS build checks passed for ${revision}. No private files or WordPress files will be uploaded.`);

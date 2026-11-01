import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { extractText, pageFilename, renderHomepage, sitePages } from './language-content.mjs';

const projectRoot = path.resolve(import.meta.dirname, '..');
const directory = path.join(projectRoot, 'dist');
const homepageMarkup = renderHomepage(projectRoot);
const version = filename => createHash('sha256').update(readFileSync(path.join(directory, filename))).digest('hex').slice(0, 12);
const languageMenu = '<label class="language-switcher" translate="no"><span>Language</span><select aria-label="Choose language"><option value="en" lang="en">English</option><option value="fr" lang="fr">Français</option><option value="de" lang="de">Deutsch</option></select></label>';
const shared = {
  'Language': ['Langue', 'Sprache'],
  'Choose language': ['Choisir la langue', 'Sprache wählen'],
  'English': ['English', 'English'],
  'Français': ['Français', 'Français'],
  'Deutsch': ['Deutsch', 'Deutsch'],
};
let total = 0;
for (const page of sitePages) {
  const filename = path.join(directory, pageFilename(page));
  let html = readFileSync(filename, 'utf8');
  const dictionary = JSON.parse(readFileSync(path.join(projectRoot, 'public/translations', `${page}.json`), 'utf8'));
  const messages = { ...dictionary, ...shared };
  for (const [original, translations] of Object.entries(messages)) {
    assert.equal(original, original.replace(/\s+/g, ' ').trim(), `${page}: translation key must be normalized`);
    assert(Array.isArray(translations) && translations.length === 2, `${page}: invalid translation for ${original}`);
    assert(translations.every(value => typeof value === 'string' && value.trim()), `${page}: empty translation for ${original}`);
  }
  const originals = extractText(`${html}${page === 'home' ? homepageMarkup : ''}`);
  const missing = originals.filter(original => !Object.hasOwn(messages, original));
  assert.equal(missing.length, 0, `${page}: untranslated content:\n${missing.join('\n')}`);
  if (page !== 'home') {
    const headerNavigation = /(<header\b[\s\S]*?)(<nav\b)/;
    assert(headerNavigation.test(html), `${page}: missing header navigation`);
    html = html.replace(headerNavigation, `$1${languageMenu}$2`);
  }
  const payload = JSON.stringify(messages).replace(/</g, '\\u003c');
  html = html.replace('</head>', `<link rel="stylesheet" href="/language-menu.css?v=${version('language-menu.css')}" />\n<script id="site-translations" type="application/json">${payload}</script>\n<script type="module" src="/languages.js?v=${version('languages.js')}"></script>\n</head>`);
  writeFileSync(filename, html);
  total += originals.length;
  console.log(`${page}: ${originals.length} English phrases covered in French and German.`);
}
console.log(`Three-language build ready: ${total} phrases across ${sitePages.length} pages.`);

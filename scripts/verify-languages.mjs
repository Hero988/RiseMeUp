import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { chooseLanguage, localizedHref, normalizeText, translateText } from '../public/languages.js';
import { extractText, pageFilename, renderHomepage, sitePages } from './language-content.mjs';
import { checkLanguageRuntime } from './check-language-runtime.mjs';
import './verify-investor-enquiry.mjs';

const projectRoot = path.resolve(import.meta.dirname, '..');
checkLanguageRuntime();
const base = 'https://www.risemeup.org/water-system/?view=plan#storage';
assert.equal(chooseLanguage(base), 'en');
assert.equal(chooseLanguage(base, 'fr'), 'fr');
assert.equal(chooseLanguage(`${base.split('#')[0]}&lang=de#storage`, 'fr'), 'de');
assert.equal(chooseLanguage('https://www.risemeup.org/?lang=en', 'fr'), 'en');
assert.equal(chooseLanguage('https://www.risemeup.org/?lang=invalid', 'fr'), 'en');
assert.equal(chooseLanguage(base, '__proto__'), 'en');
assert.equal(normalizeText('  A\n shared   future. '), 'A shared future.');
const sample = { 'A shared future.': ['Un avenir commun.', 'Eine gemeinsame Zukunft.'] };
assert.equal(translateText('  A\n shared future.\n', 'fr', sample), '  Un avenir commun.\n');
assert.equal(translateText('A shared future.', 'de', sample), 'Eine gemeinsame Zukunft.');
assert.equal(translateText('A shared future.', 'en', sample), 'A shared future.');
assert.equal(translateText('A shared future.', 'invalid', sample), 'A shared future.');
assert.equal(translateText('Unknown text', 'fr', sample), 'Unknown text');
assert.equal(translateText('constructor', 'fr', sample), 'constructor');
assert.equal(localizedHref('/development-partners/?ref=farm#equipment', base, 'fr'), '/development-partners/?ref=farm&lang=fr#equipment');
assert.equal(localizedHref('/?lang=fr#contact', base, 'de'), '/?lang=de#contact');
assert.equal(localizedHref('/?lang=fr#contact', base, 'en'), '/?lang=en#contact');
for (const untouched of ['#storage', 'mailto:i.tadros@risemeup.org', 'tel:+447867977844', '/proposal.pdf', '/farm-plan/biogas-process.jpg', 'https://example.org/']) {
  assert.equal(localizedHref(untouched, base, 'fr'), untouched);
}
const homepageMarkup = renderHomepage(projectRoot);
assert(homepageMarkup.includes('class="language-switcher"'));
for (const code of ['en', 'fr', 'de']) assert(homepageMarkup.includes(`value="${code}"`));
assert.equal((homepageMarkup.match(/class="project-details"/g) || []).length, 4);
assert.equal((homepageMarkup.match(/<form\b/g) || []).length, 2);
assert(homepageMarkup.includes('id="investor-enquiry"'));

for (const page of sitePages) {
  const html = readFileSync(path.join(projectRoot, 'dist', pageFilename(page)), 'utf8');
  const match = html.match(/<script id="site-translations" type="application\/json">([\s\S]*?)<\/script>/);
  assert(match, `${page}: missing embedded translations`);
  const messages = JSON.parse(match[1]);
  const dynamicText = [];
  if (page === 'home') {
    const investorSource = readFileSync(path.join(projectRoot, 'src/lib/investorEnquiry.ts'), 'utf8');
    dynamicText.push(...[...investorSource.matchAll(/summary: "([^"]+)"/g)].map(match => match[1]));
    dynamicText.push('Close',
      'Your email app should open with your enquiry. Please press Send there to deliver it. If nothing opens, use the email address above; your details remain in this form.',
      'Your email could not be prepared. Check the fields and try again, or email');
  }
  if (page === 'water-system') {
    const source = readFileSync(path.join(projectRoot, 'public/water-system/index.html'), 'utf8');
    const diagramText = source.match(/const texts=(\{.*?\});/);
    assert(diagramText, 'Water diagram messages must be checked');
    dynamicText.push(...Object.values(vm.runInNewContext(`(${diagramText[1]})`, {}, { timeout: 1000 })));
    const volumes = [...source.matchAll(/data-volume="(\d+)"/g)].map(match => Number(match[1]));
    const demands = [...source.matchAll(/data-demand="(\d+)"/g)].map(match => Number(match[1]));
    assert.equal(volumes.length, 3);
    assert.equal(demands.length, 3);
    for (const volume of volumes) {
      dynamicText.push(`${(volume * 1000).toLocaleString('en-GB')} litres`);
      for (const demand of demands) dynamicText.push(`${Number((volume / demand).toFixed(1))} days`);
    }
  }
  for (const original of [...extractText(`${html}${page === 'home' ? homepageMarkup : ''}`), ...dynamicText]) {
    assert(Object.hasOwn(messages, original), `${page}: missing translation for ${original}`);
    for (const language of ['fr', 'de']) assert(translateText(original, language, messages).trim());
  }
  for (const filename of ['languages.js', 'language-menu.css']) {
    const hash = createHash('sha256').update(readFileSync(path.join(projectRoot, 'dist', filename))).digest('hex').slice(0, 12);
    assert(html.includes(`/${filename}?v=${hash}`), `${page}: stale language resource ${filename}`);
  }
  assert(!html.includes('http://localhost') && !html.includes('previews.local'), `${page}: local preview reference leaked`);
}
console.log('Language checks passed: preference, explicit English reset, query/hash preservation, external/file links, complete dictionaries, forms, expandable plans and fresh resources.');

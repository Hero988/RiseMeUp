import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import postcss from 'postcss';
import { buildEnquiryMailto } from '../src/lib/enquiry.ts';

const root = path.resolve(import.meta.dirname, '..');
const read = file => readFileSync(path.join(root, file), 'utf8');
const filesIn = dir => readdirSync(path.join(root, dir), { withFileTypes: true }).flatMap(entry =>
  entry.isDirectory() ? filesIn(`${dir}/${entry.name}`) : [`${dir}/${entry.name}`]);
let assertions = 0;
const check = (condition, message) => { assert.ok(condition, message); assertions++; };

const enquiry = {firstName:'Amélie', lastName:'O’Connor', email:'partner+farm@example.org', organisation:'Water & Food Foundation', interest:'equipment', message:'Pumps, training & spares?\nPlease send the brief. #Sudan'};
const email = new URL(buildEnquiryMailto(enquiry));
check(email.protocol === 'mailto:', 'Enquiry must use the visitor’s email app');
check(email.pathname === 'i.tradros@risemeup.org', 'Enquiry must use the confirmed address');
check(email.searchParams.get('subject') === 'Risemeup enquiry: Equipment or technical support', 'Readable subject');
for (const value of [enquiry.firstName, enquiry.lastName, enquiry.email, enquiry.organisation, enquiry.message]) {
  check(email.searchParams.get('body').includes(value), `Email preserves ${value}`);
}
const general = new URL(buildEnquiryMailto({...enquiry, organisation:'', interest:'unknown\r\nBcc: example@example.org'}));
check(general.searchParams.get('subject') === 'Risemeup enquiry: General enquiry', 'Unknown interests cannot introduce email headers');
check(!general.searchParams.has('bcc'), 'No unintended recipients');
check(!general.searchParams.get('body').includes('Organisation:'), 'Optional organisation is omitted when empty');
check(!read('src/components/ContactForm.tsx').includes('submitContactMessage'), 'Public form must not silently store messages');
check(!read('src/components/ContactForm.tsx').includes('has been received'), 'Do not claim delivery from a mailto composer');

const sourceFiles = filesIn('src').filter(f => /\.(tsx|ts)$/.test(f));
const source = sourceFiles.map(read).join('\n');
const homeIds = new Set([...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
const htmlFiles = ['index.html', ...filesIn('public').filter(f=>f.endsWith('.html'))];
let links = 0;
for (const file of htmlFiles) {
  const html = read(file);
  check(/<html\s+lang="en"/.test(html), `${file}: document language`);
  check(html.includes('name="viewport"'), `${file}: responsive viewport`);
  check(/<title>[^<]+<\/title>/.test(html), `${file}: page title`);
  const ownPath = file === 'index.html' ? '/' : `/${file.replace(/^public\//, '').replace(/index\.html$/, '')}`;
  for (const match of html.matchAll(/(?:href|src)="([^"{}]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&');
    if (/^(?:data:|mailto:|tel:|https?:|\/\/)/.test(value)) continue;
    const url = new URL(value, `https://www.risemeup.org${ownPath}`);
    if (url.pathname.startsWith('/src/')) continue;
    const target = url.pathname === '/' ? 'index.html' : `public${url.pathname}${url.pathname.endsWith('/') ? 'index.html' : ''}`;
    check(existsSync(path.join(root, target)), `${file}: missing local resource ${value}`);
    if (url.hash && target.endsWith('.html')) {
      const ids = target === 'index.html' ? homeIds : new Set([...read(target).matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
      check(ids.has(decodeURIComponent(url.hash.slice(1))), `${file}: missing anchor ${value}`);
    }
    links++;
  }
}

const cssFiles = filesIn('public').filter(f=>f.endsWith('.css'));
for (const file of cssFiles) postcss.parse(read(file), {from:file});
const theme = postcss.parse(read('public/classic-theme.css'));
function active(node, width) {
  for (let parent=node.parent; parent; parent=parent.parent) {
    if (parent.type !== 'atrule') continue;
    if (parent.name !== 'media') continue;
    const max = parent.params.match(/max-width:\s*(\d+)px/);
    const min = parent.params.match(/min-width:\s*(\d+)px/);
    if ((max && width > +max[1]) || (min && width < +min[1])) return false;
    if (!max && !min) return false;
  }
  return true;
}
function valueAt(selector, property, width) {
  let value;
  theme.walkRules(rule => {
    if (!rule.selector.split(',').map(s=>s.trim()).includes(selector) || !active(rule,width)) return;
    rule.walkDecls(property, declaration => value=declaration.value);
  });
  return value;
}
for (const width of [320,390,768,1024,1280]) {
  check(valueAt('.classic-about-grid','grid-template-columns',width) === (width <= 760 ? 'minmax(0, 1fr)' : 'repeat(2, minmax(0, 1fr))'), `About grid responsive rule at ${width}px`);
  if (width <= 430) check(valueAt('.classic-values','grid-template-columns',width) === 'minmax(0, 1fr)', `Value text stacks at ${width}px`);
}
check(read('public/site.css').includes('0,700'), 'Heading font must load its real bold weight');
for (const [name,foreground,background] of [['primary button','171923','c2703a'],['women’s text','383b32','f4e8d1'],['women’s link','29482f','f4e8d1']]) {
  const luminance = hex => {
    const rgb = hex.match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
    return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
  };
  const [a,b] = [luminance(foreground),luminance(background)].sort((x,y)=>y-x);
  check((a+.05)/(b+.05) >= 4.5, `${name}: normal-text contrast`);
}
check(read('public/robots.txt').includes('https://www.risemeup.org/sitemap.xml'), 'Sitemap is discoverable');
check(statSync(path.join(root,'public/downloads/risemeup-partner-brief-2026-10-21.pdf')).size > 1000, 'Partner brief is present');
console.log(`PASS: ${assertions} assertions; ${links} local resource/anchor references; ${cssFiles.length} stylesheets parsed; enquiry encoding and responsive CSS rules checked.`);
console.log('Scope: static/build verification only. This is not a mobile-browser rendering or delivered-email test.');

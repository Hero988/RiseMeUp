import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export const sitePages = ['home', 'development-partners', 'mango-project', 'crisis-response', 'water-system'];
export const pageFilename = page => page === 'home' ? 'index.html' : `${page}/index.html`;
export const normalizeText = value => value.replace(/\s+/g, ' ').trim();

function decodeEntities(value) {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (original, entity) => {
    if (entity.startsWith('#')) {
      const hexadecimal = entity[1].toLowerCase() === 'x';
      return String.fromCodePoint(parseInt(entity.slice(hexadecimal ? 2 : 1), hexadecimal ? 16 : 10));
    }
    return { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: '\u00a0' }[entity.toLowerCase()] || original;
  });
}

export function extractText(html) {
  const values = new Set();
  const add = value => {
    const text = normalizeText(decodeEntities(value));
    if (/[a-z]/i.test(text)) values.add(text);
  };
  const tokens = html.match(/<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<!--[\s\S]*?-->|<![^>]*>|<[^>]+>|[^<]+/gi) || [];
  for (const token of tokens) {
    if (/^<(script|style)\b|^<!--|^<!/i.test(token)) continue;
    if (!token.startsWith('<')) {
      add(token);
      continue;
    }
    if (/\btranslate="no"/.test(token)) continue;
    for (const match of token.matchAll(/\b(?:alt|title|aria-label|placeholder)="([^"]*)"/g)) add(match[1]);
    if (/^<meta\b/.test(token) && /(?:name="description"|property="og:(?:title|description)")/.test(token)) {
      const content = token.match(/\bcontent="([^"]*)"/);
      if (content) add(content[1]);
    }
  }
  return [...values];
}

export function renderHomepage(projectRoot) {
  const require = createRequire(import.meta.url);
  const cache = new Map();
  function load(filename) {
    const absolute = path.resolve(filename);
    if (cache.has(absolute)) return cache.get(absolute);
    const exports = {};
    cache.set(absolute, exports);
    const source = readFileSync(absolute, 'utf8');
    const compiled = ts.transpileModule(source, { compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    } }).outputText;
    vm.runInNewContext(compiled, {
      exports,
      require: name => {
        if (name.endsWith('.css')) return {};
        if (!name.startsWith('.')) return require(name);
        const target = path.resolve(path.dirname(absolute), name);
        const resolved = ['', '.tsx', '.ts'].map(extension => target + extension).find(existsSync);
        if (!resolved) throw new Error(`Cannot inspect homepage module: ${name}`);
        return load(resolved);
      },
      URLSearchParams,
      console,
    }, { filename: absolute });
    return exports;
  }
  return renderToStaticMarkup(React.createElement(load(path.join(projectRoot, 'src/App.tsx')).default));
}

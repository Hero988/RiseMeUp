import assert from 'node:assert/strict';
import { startLanguages } from '../public/languages.js';

export function checkLanguageRuntime() {
  for (const language of ['en', 'fr', 'de']) {
    const dictionary = { Hello: ['Bonjour', 'Hallo'], Description: ['Description française', 'Deutsche Beschreibung'] };
    const expected = language === 'fr' ? 'Bonjour' : language === 'de' ? 'Hallo' : 'Hello';
    const expectedDescription = language === 'fr' ? 'Description française' : language === 'de' ? 'Deutsche Beschreibung' : 'Description';
    const textNodes = [];
    const elements = [];
    const events = {};
    let observerCallback;
    let assigned;
    const stored = new Map();
    const createElement = (tag, attributes = {}, excluded = false) => {
      const element = {
        tag,
        nodeType: 1,
        textContent: '',
        attributes: new Map(Object.entries(attributes)),
        closest: () => excluded ? element : null,
        hasAttribute: name => element.attributes.has(name),
        getAttribute: name => element.attributes.get(name) ?? null,
        setAttribute: (name, value) => element.attributes.set(name, value),
        matches: selector => tag === 'meta' ? selector.includes('meta[') : tag === 'a' && selector === 'a[href]',
        querySelectorAll: () => [],
      };
      elements.push(element);
      return element;
    };
    const createText = (value, excluded = false) => {
      const text = { nodeType: 3, nodeValue: value, parentElement: createElement('span', {}, excluded) };
      textNodes.push(text);
      return text;
    };
    const text = createText('  Hello\n');
    const textarea = createText('Hello', true);
    const labelText = { textContent: 'Language' };
    const choice = createElement('select', { 'aria-label': 'Choose language' }, true);
    choice.closest = () => ({ querySelector: () => labelText });
    choice.addEventListener = (name, callback) => { events[name] = callback; };
    const image = createElement('img', { alt: 'Description' });
    const input = createElement('input', { placeholder: 'Description', value: 'Hello' });
    const meta = createElement('meta', { content: 'Description' });
    const link = createElement('a', { href: '/development-partners/#equipment' });
    const mail = createElement('a', { href: 'mailto:i.tadros@risemeup.org' });
    const notes = [];
    const document = {
      nodeType: 9,
      documentElement: { lang: 'en' },
      body: { append: note => notes.push(note) },
      getElementById: () => ({ textContent: JSON.stringify(dictionary) }),
      createElement,
      createTreeWalker: () => {
        let index = 0;
        const walker = { currentNode: null, nextNode: () => {
          if (index >= textNodes.length) return false;
          walker.currentNode = textNodes[index++];
          return true;
        } };
        return walker;
      },
      querySelectorAll: selector => selector === '.language-switcher select' ? [choice] : elements,
    };
    const browser = {
      location: { href: `https://www.risemeup.org/?lang=${language}&ref=farm#contact`, assign: value => { assigned = value; } },
      localStorage: { getItem: key => stored.get(key), setItem: (key, value) => stored.set(key, value) },
      MutationObserver: class {
        constructor(callback) { observerCallback = callback; }
        observe() {}
      },
    };
    startLanguages(document, browser);
    assert.equal(document.documentElement.lang, language);
    assert.equal(choice.value, language);
    assert.equal(text.nodeValue, `  ${expected}\n`);
    assert.equal(textarea.nodeValue, 'Hello');
    assert.equal(input.getAttribute('value'), 'Hello');
    assert.equal(input.getAttribute('placeholder'), expectedDescription);
    assert.equal(image.getAttribute('alt'), expectedDescription);
    assert.equal(meta.getAttribute('content'), expectedDescription);
    assert.equal(mail.getAttribute('href'), 'mailto:i.tadros@risemeup.org');
    assert.equal(link.getAttribute('href'), `/development-partners/?lang=${language}#equipment`);
    assert.equal(notes.length, language === 'en' ? 0 : 1);
    const lateText = createText('Hello');
    observerCallback([{ type: 'childList', addedNodes: [lateText] }]);
    assert.equal(lateText.nodeValue, expected);
    text.nodeValue = 'Description';
    observerCallback([{ type: 'characterData', target: text }]);
    assert.equal(text.nodeValue, expectedDescription);
    observerCallback([{ type: 'characterData', target: text }]);
    assert.equal(text.nodeValue, expectedDescription);
    image.setAttribute('alt', 'Hello');
    observerCallback([{ type: 'attributes', target: image }]);
    assert.equal(image.getAttribute('alt'), expected);
    observerCallback([{ type: 'attributes', target: image }]);
    assert.equal(image.getAttribute('alt'), expected);
    choice.value = 'de';
    events.change();
    assert.equal(assigned, 'https://www.risemeup.org/?lang=de&ref=farm#contact');
    assert.equal(stored.get('risemeup-language'), 'de');
    browser.localStorage = { getItem: () => { throw new Error('Storage disabled'); }, setItem: () => { throw new Error('Storage disabled'); } };
    startLanguages(document, browser);
  }
  console.log('Language runtime checks passed for all three languages, late-rendered text, accessibility attributes, unchanged user input and blocked storage.');
}

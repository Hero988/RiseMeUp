const languageNames = { en: 'English', fr: 'Français', de: 'Deutsch' };
const languageLabels = { en: 'Language', fr: 'Langue', de: 'Sprache' };
const pagePaths = new Set(['/', '/development-partners/', '/mango-project/', '/crisis-response/', '/water-system/']);

export function normalizeText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

export function chooseLanguage(href, storedLanguage) {
  const requested = new URL(href).searchParams.get('lang');
  if (requested !== null) return Object.hasOwn(languageNames, requested) ? requested : 'en';
  return Object.hasOwn(languageNames, storedLanguage) ? storedLanguage : 'en';
}

export function translateText(value, language, messages) {
  if (language !== 'fr' && language !== 'de') return value;
  const key = normalizeText(value);
  const translation = Object.hasOwn(messages, key) ? messages[key][language === 'fr' ? 0 : 1] : undefined;
  if (translation === undefined || translation === key) return value;
  return `${value.match(/^\s*/)[0]}${translation}${value.match(/\s*$/)[0]}`;
}

export function localizedHref(href, base, language) {
  if (!href || href.startsWith('#')) return href;
  const target = new URL(href, base);
  const current = new URL(base);
  if (target.origin !== current.origin || !pagePaths.has(target.pathname)) return href;
  target.searchParams.set('lang', language);
  return `${target.pathname}${target.search}${target.hash}`;
}

export function startLanguages(document, browser) {
  const configuration = document.getElementById('site-translations');
  if (!configuration) return;
  const messages = JSON.parse(configuration.textContent);
  let storedLanguage;
  try {
    storedLanguage = browser.localStorage.getItem('risemeup-language');
  } catch {}
  const language = chooseLanguage(browser.location.href, storedLanguage);
  try {
    browser.localStorage.setItem('risemeup-language', language);
  } catch {}
  document.documentElement.lang = language;
  if (!new URL(browser.location.href).searchParams.has('lang') && language !== 'en') {
    const target = new URL(browser.location.href);
    target.searchParams.set('lang', language);
    browser.history.replaceState(null, '', target);
  }
  const textChanges = new WeakMap();
  const attributeChanges = new WeakMap();
  const boundChoices = new WeakSet();
  const ignored = 'script, style, noscript, textarea, input, [translate="no"], .language-switcher';
  const translatedAttributes = ['alt', 'title', 'aria-label', 'placeholder'];

  function translateNode(node) {
    if (!node.parentElement || node.parentElement.closest(ignored)) return;
    if (node.nodeValue === textChanges.get(node)) return;
    const result = translateText(node.nodeValue, language, messages);
    if (result !== node.nodeValue) {
      textChanges.set(node, result);
      node.nodeValue = result;
    }
  }

  function translateElement(element) {
    if (element.closest('script, style, [translate="no"], .language-switcher')) return;
    const changes = attributeChanges.get(element) || new Map();
    for (const attribute of translatedAttributes) {
      if (!element.hasAttribute(attribute)) continue;
      const original = element.getAttribute(attribute);
      if (original === changes.get(attribute)) continue;
      const result = translateText(original, language, messages);
      if (result !== original) {
        changes.set(attribute, result);
        element.setAttribute(attribute, result);
      }
    }
    attributeChanges.set(element, changes);
    if (element.matches('meta[name="description"], meta[property="og:title"], meta[property="og:description"]')) {
      const original = element.getAttribute('content');
      if (original !== changes.get('content')) {
        const result = translateText(original || '', language, messages);
        if (original !== result) {
          changes.set('content', result);
          element.setAttribute('content', result);
        }
      }
    }
    if (element.matches('a[href]')) {
      const original = element.getAttribute('href');
      const result = localizedHref(original, browser.location.href, language);
      if (original !== result) element.setAttribute('href', result);
    }
  }

  function configureChoice(choice) {
    choice.value = language;
    if (choice.getAttribute('aria-label') !== languageLabels[language]) choice.setAttribute('aria-label', languageLabels[language]);
    const label = choice.closest('.language-switcher').querySelector('span');
    if (label.textContent !== languageLabels[language]) label.textContent = languageLabels[language];
    if (boundChoices.has(choice)) return;
    boundChoices.add(choice);
    choice.addEventListener('change', () => {
      const selected = choice.value;
      if (!Object.hasOwn(languageNames, selected)) return;
      try {
        browser.localStorage.setItem('risemeup-language', selected);
      } catch {}
      const target = new URL(browser.location.href);
      target.searchParams.set('lang', selected);
      browser.location.assign(target.href);
    });
  }

  function translateSubtree(root) {
    if (root.nodeType === 3) {
      translateNode(root);
      return;
    }
    if (root.nodeType !== 1 && root.nodeType !== 9) return;
    if (root.nodeType === 1) translateElement(root);
    const walker = document.createTreeWalker(root, 4);
    while (walker.nextNode()) translateNode(walker.currentNode);
    root.querySelectorAll('[alt], [title], [aria-label], [placeholder], meta[content], a[href]').forEach(translateElement);
    root.querySelectorAll('.language-switcher select').forEach(configureChoice);
  }

  translateSubtree(document);
  if (language !== 'en') {
    const note = document.createElement('p');
    note.className = 'translation-note';
    note.setAttribute('translate', 'no');
    note.textContent = language === 'fr'
      ? 'Les textes intégrés aux images, les documents téléchargeables et les sites externes restent dans leur langue d’origine.'
      : 'Texte in Bildern, herunterladbare Dokumente und externe Websites bleiben in ihrer Originalsprache.';
    document.body.append(note);
  }
  const observer = new browser.MutationObserver(records => {
    const roots = new Set();
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach(node => roots.add(node));
      else roots.add(record.target);
    }
    roots.forEach(translateSubtree);
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [...translatedAttributes, 'href', 'content'],
  });
  return observer;
}

if (typeof document !== 'undefined') startLanguages(document, window);

# RiseMeUp website languages

The website offers English, French and German through the language menu.
English content in the existing React components and static pages remains the
source of truth. Translations are maintained locally in
`public/translations/{home,development-partners,mango-project,crisis-response,water-system}.json`.
Each normalized English phrase maps to `[French, German]`. Keep proper names,
facts, numbers, proposal dates and qualifications intact. In particular, do not
translate a proposed facility as though it is already operational.

## How it works

- `npm run build` runs `scripts/build-languages.mjs` after Vite. It checks text
  and accessibility attributes across all five pages against both translations,
  then embeds only that page's dictionary. A missing translation fails the build.
- The homepage menu is `src/components/LanguageMenu.tsx`. The build adds the same
  menu to each static page. `public/language-menu.css` provides responsive styling.
- `public/languages.js` chooses `?lang=en`, `?lang=fr` or `?lang=de`, with the
  visitor's saved preference as a fallback. The preference is a language code
  only; no contact-form details are saved. Storage-disabled browsers still work.
- Switching language reloads the current page, retaining its other query
  parameters and section anchor. Internal page links carry the chosen language;
  same-page anchors, external websites, downloads and contact links stay intact.
- Translations change existing text-node values and accessibility attributes,
  not element structure or event handlers. A single observer covers React's
  later render and interactive text such as form status, profile controls and
  the water diagram. User-entered text, form values, scripts and styles are not
  translated. The language selector has its own localized label.
- There is no external translation service, API credential or new dependency.
  Script and stylesheet URLs are content-versioned to avoid stale copies.
- French and German visitors see a note that text inside images, downloadable
  documents and external sites remains in its original language. Translating
  those original materials is separate from translating the website's HTML.

## Future edits and checks

Update the relevant dictionary when changing English copy. Translate fragments
around emphasis, links and line breaks in context, preserving natural word order.
Also inspect conditional messages and strings in inline interaction scripts;
they may not appear in the initial render used for the coverage check. Do not
translate technical IDs, URLs, form option values, email addresses or people's
names. The coverage check includes labels, alternative text and page metadata.

Run `npm run build`, `npm run check:languages` and `npm run check:ionos` before
publishing. The normal GitHub workflow runs these checks before uploading to
the existing RiseMeUp IONOS destination. After publication verify the revision,
the per-page embedded dictionaries, the language script and stylesheet, and
the URLs with `?lang=fr` and `?lang=de`. HTTP checks confirm published assets;
they are not a substitute for a browser review of layout or interactions.

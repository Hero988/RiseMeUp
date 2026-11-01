export default function LanguageMenu() {
  return (
    <label className="language-switcher" translate="no">
      <span>Language</span>
      <select aria-label="Choose language" defaultValue="en">
        <option value="en" lang="en">English</option>
        <option value="fr" lang="fr">Français</option>
        <option value="de" lang="de">Deutsch</option>
      </select>
    </label>
  );
}

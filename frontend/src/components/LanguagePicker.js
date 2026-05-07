import { useLanguage } from '../lib/LanguageContext';

export default function LanguagePicker({ className = '' }) {
  const { lang, setLang, LANGUAGES } = useLanguage();

  return (
    <select
      value={lang}
      onChange={(e) => setLang(e.target.value)}
      className={`lang-picker ${className}`}
      aria-label="Select language"
    >
      {LANGUAGES.map((l) => (
        <option key={l.code} value={l.code}>
          {l.label}
        </option>
      ))}
    </select>
  );
}

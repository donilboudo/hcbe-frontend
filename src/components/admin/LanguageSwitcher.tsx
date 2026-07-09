import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
] as const;

interface LanguageSwitcherProps {
  variant?: 'default' | 'onDark';
}

export const LanguageSwitcher = ({ variant = 'default' }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const current = i18n.language.startsWith('fr') ? 'fr' : 'en';
  const isOnDark = variant === 'onDark';

  return (
    <div className="flex items-center gap-2">
      <span
        className={`hidden text-xs sm:inline ${
          isOnDark ? 'text-emerald-100/80' : 'text-gray-500'
        }`}
      >
        {t('admin.common.language')}
      </span>
      <div
        className={`inline-flex rounded-full p-0.5 ${
          isOnDark ? 'border border-white/15 bg-white/10' : 'border border-gray-200 bg-gray-50'
        }`}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => i18n.changeLanguage(lang.code)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              current === lang.code
                ? isOnDark
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'bg-white text-gray-900 shadow-sm'
                : isOnDark
                  ? 'text-emerald-50/80 hover:text-white'
                  : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
};

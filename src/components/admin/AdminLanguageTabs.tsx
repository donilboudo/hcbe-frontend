import { useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type AdminContentLanguage = 'fr' | 'en';

interface AdminLanguageTabsProps {
  frPanel: ReactNode;
  enPanel: ReactNode;
  /** Show a reminder badge on the EN tab when French content exists but EN is empty. */
  enIncomplete?: boolean;
  className?: string;
  defaultLanguage?: AdminContentLanguage;
}

/**
 * Tabs for bilingual CMS fields. Both panels stay mounted (hidden via CSS)
 * so HTML5 `required` on French fields still validates on submit.
 */
export const AdminLanguageTabs = ({
  frPanel,
  enPanel,
  enIncomplete = false,
  className = '',
  defaultLanguage = 'fr',
}: AdminLanguageTabsProps) => {
  const { t } = useTranslation();
  const [active, setActive] = useState<AdminContentLanguage>(defaultLanguage);

  const tabClass = (lang: AdminContentLanguage) =>
    [
      'relative flex min-h-12 min-w-0 flex-1 flex-col items-center justify-center gap-1 border-b-2 px-2 py-2.5 text-center text-sm font-semibold transition sm:min-h-11 sm:flex-row sm:gap-2 sm:px-4 sm:text-left',
      active === lang
        ? 'border-emerald-700 text-emerald-800'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800',
    ].join(' ');

  const badgeBase =
    'max-w-full truncate rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide sm:px-2';

  return (
    <div className={`min-w-0 ${className}`}>
      <div
        role="tablist"
        aria-label={t('admin.content.lang.tabsLabel')}
        className="-mx-1 mb-4 flex gap-0 overflow-x-auto border-b border-gray-200 px-1 sm:mx-0 sm:mb-5 sm:overflow-visible sm:px-0"
      >
        <button
          type="button"
          role="tab"
          id="admin-lang-tab-fr"
          aria-controls="admin-lang-panel-fr"
          aria-selected={active === 'fr'}
          className={tabClass('fr')}
          onClick={() => setActive('fr')}
        >
          <span className="truncate">{t('admin.content.lang.tabFr')}</span>
          <span className={`${badgeBase} bg-emerald-100 text-emerald-800`}>
            <span className="sm:hidden">{t('admin.content.lang.requiredBadgeShort')}</span>
            <span className="hidden sm:inline">{t('admin.content.lang.requiredBadge')}</span>
          </span>
        </button>
        <button
          type="button"
          role="tab"
          id="admin-lang-tab-en"
          aria-controls="admin-lang-panel-en"
          aria-selected={active === 'en'}
          className={tabClass('en')}
          onClick={() => setActive('en')}
        >
          <span className="flex min-w-0 flex-wrap items-center justify-center gap-1 sm:justify-start sm:gap-2">
            <span className="truncate">{t('admin.content.lang.tabEn')}</span>
            <span className={`${badgeBase} bg-sky-100 text-sky-800`}>
              <span className="sm:hidden">{t('admin.content.lang.optionalBadgeShort')}</span>
              <span className="hidden sm:inline">{t('admin.content.lang.optionalBadge')}</span>
            </span>
            {enIncomplete && (
              <span className={`${badgeBase} bg-amber-100 text-amber-800`}>
                <span className="sm:hidden">{t('admin.content.lang.incompleteBadgeShort')}</span>
                <span className="hidden sm:inline">{t('admin.content.lang.incompleteBadge')}</span>
              </span>
            )}
          </span>
        </button>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-gray-500">
        {active === 'fr' ? t('admin.content.lang.frHint') : t('admin.content.lang.enHint')}
      </p>

      <div
        role="tabpanel"
        id="admin-lang-panel-fr"
        aria-labelledby="admin-lang-tab-fr"
        hidden={active !== 'fr'}
        className={`min-w-0 ${active === 'fr' ? '' : 'hidden'}`}
      >
        {frPanel}
      </div>
      <div
        role="tabpanel"
        id="admin-lang-panel-en"
        aria-labelledby="admin-lang-tab-en"
        hidden={active !== 'en'}
        className={`min-w-0 ${active === 'en' ? '' : 'hidden'}`}
      >
        {enPanel}
      </div>
    </div>
  );
};

/** True when at least one French value is filled and the matching English value is empty. */
export const isEnglishContentIncomplete = (
  pairs: Array<[french?: string | null, english?: string | null]>,
): boolean =>
  pairs.some(([french, english]) => {
    const fr = french?.trim() ?? '';
    const en = english?.trim() ?? '';
    return fr.length > 0 && en.length === 0;
  });

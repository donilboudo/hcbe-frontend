import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { grantsApi } from '../../../lib/api/grants';
import type { GrantProgram } from '../../../lib/api/types';
import { localized } from '../../../lib/i18n/localized';

const pickCriteria = (grant: GrantProgram, language: string): string[] => {
  const isEnglish = language.toLowerCase().startsWith('en');
  if (isEnglish && grant.eligibilityCriteriaEn && grant.eligibilityCriteriaEn.length > 0) {
    return grant.eligibilityCriteriaEn;
  }
  return grant.eligibilityCriteria;
};

const BoursesSection = () => {
  const { t, i18n } = useTranslation();
  const [grants, setGrants] = useState<GrantProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadGrants = async () => {
      try {
        const response = await grantsApi.getActiveGrants();
        if (response.success && response.data) {
          setGrants(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading grants:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadGrants();
  }, []);

  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">{t('public.grants.sectionTitle')}</h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">{t('public.grants.sectionSubtitle')}</p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {t('public.grants.errorLoad')}
          </div>
        )}

        {!loading && !error && grants.length === 0 && (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-600">
            {t('public.grants.empty')}
          </div>
        )}

        {!loading && !error && grants.length > 0 && (
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {grants.map((grant) => {
              const title = localized(grant.title, grant.titleEn, i18n.language);
              const description = localized(grant.description, grant.descriptionEn, i18n.language);
              const amount = localized(grant.amount, grant.amountEn, i18n.language);
              const duration = localized(grant.duration, grant.durationEn, i18n.language);
              const criteria = pickCriteria(grant, i18n.language);

              return (
                <div
                  key={grant.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="p-8">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gray-100">
                      <i className={`${grant.icon} text-3xl text-emerald-600`} aria-hidden="true"></i>
                    </div>

                    <h3 className="mb-3 text-xl font-bold text-gray-900">{title}</h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-600">{description}</p>

                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <span className="text-sm font-medium text-gray-700">{t('public.grants.amount')}</span>
                        <span className="text-sm font-bold text-emerald-600">{amount}</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3">
                        <span className="text-sm font-medium text-gray-700">{t('public.grants.duration')}</span>
                        <span className="text-sm font-bold text-gray-900">{duration}</span>
                      </div>
                    </div>

                    {criteria.length > 0 && (
                      <div className="mb-6">
                        <h4 className="mb-3 flex items-center text-sm font-bold text-gray-900">
                          <i className="ri-checkbox-line mr-2 text-emerald-600" aria-hidden="true"></i>
                          {t('public.grants.criteriaTitle')}
                        </h4>
                        <ul className="space-y-2">
                          {criteria.map((critere) => (
                            <li key={critere} className="flex items-start space-x-2">
                              <i className="ri-arrow-right-s-line mt-0.5 flex-shrink-0 text-gray-400" aria-hidden="true"></i>
                              <span className="text-xs text-gray-600">{critere}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {grant.applicationUrl ? (
                      <a
                        href={grant.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-700"
                      >
                        <i className="ri-file-text-line mr-2" aria-hidden="true"></i>
                        {t('public.grants.apply')}
                      </a>
                    ) : (
                      <Link
                        to="/contact"
                        className="inline-flex w-full cursor-pointer items-center justify-center whitespace-nowrap rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-all hover:bg-emerald-700"
                      >
                        <i className="ri-file-text-line mr-2" aria-hidden="true"></i>
                        {t('public.grants.apply')}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="rounded-2xl bg-gray-900 p-8 text-center text-white md:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <i className="ri-question-line text-4xl text-white" aria-hidden="true"></i>
            </div>
            <h3 className="mb-4 text-3xl font-bold">{t('public.grants.helpTitle')}</h3>
            <p className="mb-8 text-lg leading-relaxed text-gray-300">{t('public.grants.helpText')}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="cursor-pointer whitespace-nowrap rounded-lg bg-emerald-600 px-8 py-4 font-semibold text-white transition-colors hover:bg-emerald-700"
              >
                <i className="ri-mail-line mr-2" aria-hidden="true"></i>
                {t('public.grants.contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoursesSection;

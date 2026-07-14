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
  return grant.eligibilityCriteria ?? [];
};

const BoursesSection = () => {
  const { t, i18n } = useTranslation();
  const [grants, setGrants] = useState<GrantProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGrants = async () => {
      try {
        setError(null);
        const response = await grantsApi.getActiveGrants();
        if (response.success && response.data) {
          setGrants(response.data);
        } else {
          setError(t('public.grants.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading grants:', err);
        setError(t('public.grants.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    loadGrants();
  }, [t]);

  if (loading) {
    return (
      <section id="grants" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="rounded-[2rem] border border-gray-200 bg-gray-50 p-7">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />
                <div className="mt-6 h-5 w-2/3 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-gray-200" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-7 h-11 w-full animate-pulse rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="grants" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            <i className="ri-hand-coin-line" aria-hidden="true" />
            {t('public.grants.sectionBadge')}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
            {t('public.grants.sectionTitle')}
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600">{t('public.grants.sectionSubtitle')}</p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <div className="flex gap-3">
              <i className="ri-error-warning-line mt-0.5 text-xl" aria-hidden="true" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {grants.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grants.map((grant) => {
              const title = localized(grant.title, grant.titleEn, i18n.language);
              const description = localized(grant.description, grant.descriptionEn, i18n.language);
              const amount = localized(grant.amount, grant.amountEn, i18n.language);
              const duration = localized(grant.duration, grant.durationEn, i18n.language);
              const criteria = pickCriteria(grant, i18n.language);

              return (
                <article
                  key={grant.id}
                  className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                >
                  <div className="h-2 bg-gradient-to-r from-emerald-700 via-amber-400 to-red-500" />
                  <div className="p-7">
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-700 ring-1 ring-emerald-100">
                      <i className={grant.icon || 'ri-graduation-cap-line'} aria-hidden="true" />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>

                    <div className="mt-7 grid grid-cols-2 gap-3 border-y border-gray-100 py-5">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {t('public.grants.amount')}
                        </p>
                        <p className="mt-1 font-semibold text-emerald-700">{amount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {t('public.grants.duration')}
                        </p>
                        <p className="mt-1 font-semibold text-gray-800">{duration}</p>
                      </div>
                    </div>

                    {criteria.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-3 flex items-center text-sm font-bold text-gray-900">
                          <i className="ri-checkbox-line mr-2 text-emerald-600" aria-hidden="true" />
                          {t('public.grants.criteriaTitle')}
                        </h4>
                        <ul className="space-y-2">
                          {criteria.map((critere) => (
                            <li key={critere} className="flex items-start space-x-2">
                              <i
                                className="ri-arrow-right-s-line mt-0.5 flex-shrink-0 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="text-xs text-gray-600">{critere}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-6">
                      {grant.applicationUrl ? (
                        <a
                          href={grant.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
                        >
                          {t('public.grants.apply')}
                          <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
                        </a>
                      ) : (
                        <Link
                          to="/contact"
                          className="inline-flex w-full items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
                        >
                          {t('public.grants.apply')}
                          <i className="ri-arrow-right-line ml-2" aria-hidden="true" />
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl text-emerald-700 shadow-sm">
              <i className="ri-hand-coin-line" aria-hidden="true" />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-950">{t('public.grants.emptyTitle')}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">{t('public.grants.emptyText')}</p>
          </div>
        )}

        <div className="mt-14 overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                <i className="ri-question-line" aria-hidden="true" />
              </div>
              <h3 className="mt-6 text-3xl font-bold">{t('public.grants.helpTitle')}</h3>
            </div>
            <div className="p-8 md:p-10">
              <p className="max-w-3xl text-lg leading-8 text-gray-300">{t('public.grants.helpText')}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-50"
                >
                  {t('public.grants.helpContact')}
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  {t('public.grants.helpBack')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoursesSection;

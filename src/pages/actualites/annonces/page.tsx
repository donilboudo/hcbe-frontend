import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import AnnoncesExemples from '../components/AnnoncesExemples';

const categoryKeys = [
  { id: 'all', labelKey: 'public.news.categories.all.label', fullLabelKey: 'public.news.categories.all.fullLabel' },
  { id: 'Communiqué Officiel', labelKey: 'public.news.categories.official.label', fullLabelKey: 'public.news.categories.official.fullLabel' },
  { id: 'Éducation', labelKey: 'public.news.categories.education.label', fullLabelKey: 'public.news.categories.education.fullLabel' },
  { id: 'Événement', labelKey: 'public.news.categories.event.label', fullLabelKey: 'public.news.categories.event.fullLabel' },
  { id: 'Service', labelKey: 'public.news.categories.service.label', fullLabelKey: 'public.news.categories.service.fullLabel' },
  { id: 'Solidarité', labelKey: 'public.news.categories.solidarity.label', fullLabelKey: 'public.news.categories.solidarity.fullLabel' },
  { id: 'Formation', labelKey: 'public.news.categories.training.label', fullLabelKey: 'public.news.categories.training.fullLabel' },
  { id: 'Annonce', labelKey: 'public.news.categories.announcement.label', fullLabelKey: 'public.news.categories.announcement.fullLabel' },
  { id: 'Partenariat', labelKey: 'public.news.categories.partnership.label', fullLabelKey: 'public.news.categories.partnership.fullLabel' },
] as const;

const AnnoncesPage = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-24 text-white lg:pt-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.22),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(16,185,129,0.24),transparent_32%),linear-gradient(135deg,#0f172a_0%,#064e3b_55%,#022c22_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-20 bg-gradient-to-t from-gray-50 to-transparent lg:h-28" />
        <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-end lg:gap-12">
            <div>
              <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                <i className="ri-newspaper-line shrink-0" aria-hidden="true"></i>
                <span className="truncate">{t('public.news.annonces.badge')}</span>
              </div>
              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t('public.news.annonces.title')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8">
                {t('public.news.annonces.subtitle')}
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:rounded-[2rem] sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 sm:text-sm">
                {t('public.news.annonces.remember.label')}
              </p>
              <p className="mt-4 text-lg font-bold sm:text-xl">
                {t('public.news.annonces.remember.title')}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                {t('public.news.annonces.remember.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="bg-gray-50 py-10 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 lg:mb-10">
            <p className="mb-3 text-sm font-semibold text-gray-500">{t('public.news.annonces.filter.label')}</p>
            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {categoryKeys.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  title={t(category.fullLabelKey)}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-5 sm:py-3 ${
                    selectedCategory === category.id
                      ? 'bg-emerald-700 text-white shadow-md'
                      : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-emerald-50'
                  }`}
                >
                  {t(category.labelKey)}
                </button>
              ))}
            </div>
          </div>

          <AnnoncesExemples selectedCategory={selectedCategory} />
        </div>
      </main>

      <section className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-7 sm:p-8 lg:p-10">
              <h2 className="text-2xl font-bold sm:text-3xl">{t('public.news.annonces.cta.title')}</h2>
            </div>
            <div className="p-7 sm:p-8 lg:p-10">
              <p className="text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
                {t('public.news.annonces.cta.description')}
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-50"
              >
                {t('public.common.writeToUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AnnoncesPage;

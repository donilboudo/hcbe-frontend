import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CTASection = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-gray-950 px-6 py-16 text-white shadow-2xl shadow-gray-900/20 md:px-12 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(16,185,129,0.32),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(245,158,11,0.24),transparent_26%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-200">
              {t('public.home.cta.label')}
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              {t('public.home.cta.title')}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">{t('public.home.cta.subtitle')}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Link
              to="/espace-membre"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-gray-950 transition hover:bg-emerald-50"
            >
              {t('public.home.cta.member')}
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white transition hover:bg-white/15"
            >
              {t('public.home.cta.contact')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

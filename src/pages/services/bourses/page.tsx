import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import BoursesSection from '../components/BoursesSection';

const rememberItems = [
  {
    titleKey: 'public.grants.remember.eligibility.title',
    descriptionKey: 'public.grants.remember.eligibility.description',
  },
  {
    titleKey: 'public.grants.remember.support.title',
    descriptionKey: 'public.grants.remember.support.description',
  },
  {
    titleKey: 'public.grants.remember.process.title',
    descriptionKey: 'public.grants.remember.process.description',
  },
] as const;

const BoursesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white to-transparent" />

        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-end">
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
                <i className="ri-hand-coin-line" aria-hidden="true" />
                {t('public.grants.badge')}
              </div>
              <h1 className="max-w-4xl text-balance break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t('public.grants.heroTitle')}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8">
                {t('public.grants.heroSubtitle')}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#grants"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-emerald-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                >
                  {t('public.grants.cta.view')}
                  <i className="ri-arrow-down-line ml-2" aria-hidden="true" />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
                >
                  {t('public.grants.cta.ask')}
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="rounded-[1.5rem] bg-white p-6 text-gray-950">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  {t('public.grants.remember.label')}
                </p>
                <div className="mt-6 space-y-4">
                  {rememberItems.map((item) => (
                    <div key={item.titleKey} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <h2 className="font-semibold text-gray-950">{t(item.titleKey)}</h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{t(item.descriptionKey)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BoursesSection />

      <Footer />
    </div>
  );
};

export default BoursesPage;

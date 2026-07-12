import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InstitutionalFlags } from '../../../components/brand/InstitutionalFlags';

const HeroSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      step: '1',
      titleKey: 'public.home.hero.steps.1.title',
      textKey: 'public.home.hero.steps.1.text',
    },
    {
      step: '2',
      titleKey: 'public.home.hero.steps.2.title',
      textKey: 'public.home.hero.steps.2.text',
    },
    {
      step: '3',
      titleKey: 'public.home.hero.steps.3.title',
      textKey: 'public.home.hero.steps.3.text',
    },
  ];

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-emerald-950 pt-28 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.18),transparent_28%),radial-gradient(circle_at_88%_20%,rgba(239,43,45,0.12),transparent_28%),linear-gradient(135deg,#022c22_0%,#064e3b_46%,#0f172a_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-white to-transparent" />

      <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <InstitutionalFlags variant="hero" />
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-50 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              {t('public.home.hero.badge')}
            </div>

            <h1 className="max-w-4xl text-balance break-words text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {t('public.home.hero.title')}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8 md:text-xl">
              {t('public.home.hero.subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 font-semibold text-emerald-950 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                {t('public.home.hero.cta.services')}
                <i className="ri-arrow-right-line ml-2 text-lg" aria-hidden="true"></i>
              </Link>
              <Link
                to="/espace-membre"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-4 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/15"
              >
                {t('public.home.hero.cta.member')}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="rounded-[1.5rem] bg-white p-6 text-gray-950">
              <div className="flex items-center justify-between border-b border-gray-100 pb-5">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    {t('public.home.hero.card.label')}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{t('public.home.hero.card.title')}</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-700">
                  <i className="ri-compass-3-line" aria-hidden="true"></i>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {steps.map((item) => (
                  <div key={item.step} className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                      {item.step}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-950">{t(item.titleKey)}</h3>
                      <p className="mt-1 text-sm leading-6 text-gray-600">{t(item.textKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import GalerieSection from '../components/GalerieSection';

const MEDIA_EMAIL = 'media@hcbecanada.org';

export const SouvenirsPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(245,158,11,0.24),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(239,68,68,0.18),transparent_32%),linear-gradient(135deg,#0f172a_0%,#064e3b_55%,#022c22_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
              <i className="ri-gallery-line" aria-hidden="true"></i>
              {t('public.news.souvenirs.badge')}
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">{t('public.news.souvenirs.title')}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/90">
              {t('public.news.souvenirs.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <GalerieSection />

      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-gradient-to-br from-amber-500 to-orange-700 p-8 md:p-10">
              <i className="ri-camera-line text-5xl" aria-hidden="true"></i>
              <h3 className="mt-6 text-3xl font-bold">{t('public.news.souvenirs.share.title')}</h3>
            </div>
            <div className="p-8 md:p-10">
              <p className="text-lg leading-8 text-gray-300">
                {t('public.news.souvenirs.share.description')}{' '}
                <a href={`mailto:${MEDIA_EMAIL}`} className="font-semibold text-white underline">
                  {MEDIA_EMAIL}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SouvenirsPage;

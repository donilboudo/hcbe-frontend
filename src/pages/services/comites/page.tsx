import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import ComitesSection from '../components/ComitesSection';

const ComitesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
              <i className="ri-service-line" aria-hidden="true"></i>
              {t('public.services.comites.badge')}
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl">
              {t('public.services.comites.title')}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/90">
              {t('public.services.comites.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <ComitesSection />

      <Footer />
    </div>
  );
};

export default ComitesPage;

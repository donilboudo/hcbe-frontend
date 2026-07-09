import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import ConsultationsSection from '../components/ConsultationsSection';

const ConsultationsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(168,85,247,0.22),transparent_30%),radial-gradient(circle_at_86%_14%,rgba(16,185,129,0.24),transparent_32%),linear-gradient(135deg,#0f172a_0%,#064e3b_55%,#022c22_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
              <i className="ri-chat-poll-line" aria-hidden="true"></i>
              {t('public.engagement.consultations.badge')}
            </div>
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
              {t('public.engagement.consultations.title')}
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/90">
              {t('public.engagement.consultations.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <ConsultationsSection />

      <Footer />
    </div>
  );
};

export default ConsultationsPage;

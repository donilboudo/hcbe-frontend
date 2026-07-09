import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import BoursesSection from '../components/BoursesSection';
import { useTranslation } from 'react-i18next';

const BoursesPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <i className="ri-hand-coin-line" aria-hidden="true"></i>
              <span className="text-sm font-semibold">{t('public.grants.badge')}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              {t('public.grants.heroTitle')}
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-100">
              {t('public.grants.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      <BoursesSection />

      <Footer />
    </div>
  );
};

export default BoursesPage;

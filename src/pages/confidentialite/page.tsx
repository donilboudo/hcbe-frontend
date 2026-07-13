import { useTranslation } from 'react-i18next';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-28 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          HCBE Canada
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{t('public.privacy.title')}</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600">{t('public.privacy.subtitle')}</p>

        <section className="mt-12 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-950">{t('public.privacy.newsletterTitle')}</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">{t('public.privacy.newsletterBody')}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-950">{t('public.privacy.retentionTitle')}</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">{t('public.privacy.retentionBody')}</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-950">{t('public.privacy.rightsTitle')}</h2>
            <p className="mt-3 text-base leading-7 text-gray-600">{t('public.privacy.rightsBody')}</p>
          </div>
          <p className="rounded-2xl bg-gray-50 px-5 py-4 text-sm text-gray-700">{t('public.privacy.contact')}</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPage;

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-950 text-white">
      <p className="text-6xl font-semibold text-emerald-400">404</p>
      <h1 className="text-2xl md:text-3xl font-semibold mt-6">{t('public.notFound.title')}</h1>
      <p className="mt-4 text-lg text-gray-400 max-w-md">{t('public.notFound.subtitle')}</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800"
      >
        {t('public.notFound.cta')}
      </Link>
    </div>
  );
}

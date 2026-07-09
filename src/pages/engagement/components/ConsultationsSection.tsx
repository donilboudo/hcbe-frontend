import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { consultationsApi } from '../../../lib/api/consultations';
import type { Consultation } from '../../../lib/api/types';
import { getConsultationAccentClasses } from '../../../lib/consultations/accent-styles';

const isExternalUrl = (url: string) => /^https?:\/\//i.test(url);

const ActionLink = ({
  url,
  label,
  className,
}: {
  url: string;
  label: string;
  className: string;
}) =>
  isExternalUrl(url) ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  ) : (
    <Link to={url} className={className}>
      {label}
    </Link>
  );

const ConsultationsSection = () => {
  const { t } = useTranslation();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadConsultations = async () => {
      try {
        const response = await consultationsApi.getActiveConsultations();
        if (response.success && response.data) {
          setConsultations(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading consultations:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadConsultations();
  }, []);

  const featured = consultations.find((item) => item.layoutType === 'featured');
  const cards = consultations.filter((item) => item.layoutType === 'card');

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-chat-poll-line" aria-hidden="true"></i>
              {t('public.engagement.consultations.sectionBadge')}
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              {t('public.engagement.consultations.sectionTitle')}
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            {t('public.engagement.consultations.sectionSubtitle')}
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
          </div>
        )}

        {error && !loading && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-center text-red-700">
            {t('public.engagement.consultations.errorLoad')}
          </div>
        )}

        {!loading && !error && featured && (
          <div className="mb-8 overflow-hidden rounded-[2rem] border border-gray-200 bg-gray-50">
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-8 text-white md:p-10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
                  <i className={featured.icon} aria-hidden="true"></i>
                </div>
                <h3 className="mt-6 text-3xl font-bold">{featured.title}</h3>
              </div>
              <div className="p-8 md:p-10">
                <p className="text-lg leading-8 text-gray-700">{featured.description}</p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  {featured.actionUrl && featured.actionLabel && (
                    <ActionLink
                      url={featured.actionUrl}
                      label={featured.actionLabel}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-7 py-4 font-semibold text-white transition hover:bg-emerald-800"
                    />
                  )}
                  {featured.secondaryActionUrl && featured.secondaryActionLabel && (
                    <ActionLink
                      url={featured.secondaryActionUrl}
                      label={featured.secondaryActionLabel}
                      className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-7 py-4 font-semibold text-gray-800 transition hover:bg-gray-50"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && cards.length > 0 && (
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {cards.map((item) => {
              const accent = getConsultationAccentClasses(item.accentColor);
              return (
                <div key={item.id} className="rounded-[2rem] border border-gray-200 bg-white p-7 shadow-sm">
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${accent.iconBg}`}>
                    <i className={item.icon} aria-hidden="true"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{item.description}</p>
                  {item.actionUrl && item.actionLabel && (
                    <ActionLink
                      url={item.actionUrl}
                      label={item.actionLabel}
                      className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-6 py-3 font-semibold text-white transition ${accent.button}`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && consultations.length === 0 && (
          <div className="mb-12 rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center text-gray-600">
            {t('public.engagement.consultations.empty')}
          </div>
        )}

        <div className="rounded-[2rem] bg-gray-950 p-8 text-center text-white md:p-12">
          <div className="mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <i className="ri-megaphone-line text-3xl text-white" aria-hidden="true"></i>
            </div>
            <h3 className="mb-4 text-3xl font-bold">{t('public.engagement.consultations.ctaTitle')}</h3>
            <p className="mb-8 text-lg leading-relaxed text-white/90">
              {t('public.engagement.consultations.ctaSubtitle')}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition hover:bg-gray-100"
              >
                {t('public.engagement.consultations.ctaContact')}
              </Link>
              <Link
                to="/actualites/evenements"
                className="rounded-full border border-white/20 bg-white/10 px-8 py-4 font-semibold text-white transition hover:bg-white/20"
              >
                {t('public.engagement.consultations.ctaEvents')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationsSection;

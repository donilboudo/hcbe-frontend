import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../../components/feature/Navbar';
import Footer from '../../../../components/feature/Footer';
import { buildApiUrl } from '../../../../lib/api/base-url';
import { getEventLifecycle } from '../../../../lib/events/lifecycle';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  type?: string;
  meetingLink?: string;
  status: string;
  capacity?: number;
}

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadEvent(id);
    }
  }, [id]);

  const loadEvent = async (eventId: string) => {
    try {
      const response = await fetch(buildApiUrl(`/api/events/${eventId}`));
      const result = await response.json();
      if (result.success) {
        setEvent(result.data);
      } else {
        setTimeout(() => navigate('/actualites/evenements'), 2000);
      }
    } catch (error) {
      console.error('Error loading event:', error);
      setTimeout(() => navigate('/actualites/evenements'), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-calendar-line mb-4 text-6xl text-gray-400" aria-hidden="true"></i>
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {t('public.news.evenements.empty.title')}
          </h3>
        </div>
      </div>
    );
  }

  const lifecycle = getEventLifecycle(event);
  const isPast = lifecycle === 'past';
  const isVirtual =
    Boolean(event.meetingLink) ||
    (event.type || '').toLowerCase().includes('virtuel') ||
    (event.type || '').toLowerCase().includes('virtual');

  const lifecycleBadge =
    lifecycle === 'ongoing' ? (
      <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
        <i className="ri-live-line mr-2" aria-hidden="true"></i>
        {t('public.news.evenements.status.ongoing')}
      </span>
    ) : lifecycle === 'upcoming' ? (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-800">
        <i className="ri-calendar-line mr-2" aria-hidden="true"></i>
        {t('public.news.evenements.status.upcoming')}
      </span>
    ) : lifecycle === 'past' ? (
      <span className="inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700">
        <i className="ri-check-line mr-2" aria-hidden="true"></i>
        {t('public.news.evenements.status.past')}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="relative h-96 bg-gradient-to-r from-emerald-600 to-emerald-800 pt-20">
        {event.imageUrl && (
          <>
            <img
              src={event.imageUrl}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover ${isPast ? 'grayscale-[30%]' : ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/80" />
          </>
        )}

        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-12 sm:px-6 lg:px-8">
          <div className="text-white">
            <nav className="mb-4 text-sm opacity-90">
              <Link to="/" className="hover:underline">
                {t('public.nav.home')}
              </Link>
              <span className="mx-2">/</span>
              <Link to="/actualites" className="hover:underline">
                {t('public.nav.news')}
              </Link>
              <span className="mx-2">/</span>
              <Link to="/actualites/evenements" className="hover:underline">
                {t('public.nav.events')}
              </Link>
            </nav>

            <div className="mb-4 flex flex-wrap items-center gap-3">
              {lifecycleBadge}
              {isVirtual && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                  <i className="ri-video-line mr-2" aria-hidden="true"></i>
                  {t('public.news.evenements.status.virtual')}
                </span>
              )}
            </div>

            <h1 className="mb-4 text-balance break-words text-3xl font-bold sm:text-4xl md:text-5xl">
              {event.title}
            </h1>
            {isPast && (
              <p className="max-w-2xl rounded-xl bg-black/25 px-4 py-2 text-sm text-white/90 backdrop-blur">
                {t('public.news.evenements.pastNotice')}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 rounded-lg bg-white p-8 shadow-md">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                {t('admin.common.description')}
              </h2>
              <p className="whitespace-pre-line leading-relaxed text-gray-700">{event.description}</p>
            </div>
          </div>

          <div>
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                {t('public.news.evenements.cta.details')}
              </h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <i className="ri-calendar-line mt-0.5 text-emerald-600" aria-hidden="true"></i>
                  <span>{formatDate(event.date)}</span>
                </div>
                {event.location && (
                  <div className="flex items-start gap-3">
                    <i className="ri-map-pin-line mt-0.5 text-emerald-600" aria-hidden="true"></i>
                    <span>{event.location}</span>
                  </div>
                )}
                {event.capacity && (
                  <div className="flex items-start gap-3">
                    <i className="ri-group-line mt-0.5 text-emerald-600" aria-hidden="true"></i>
                    <span>{t('admin.events.attendees', { count: event.capacity })}</span>
                  </div>
                )}
              </div>

              <Link
                to="/actualites/evenements"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {t('public.news.evenements.filter.current')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailPage;

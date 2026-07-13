import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import { isCurrentOrUpcomingEvent } from '../../../lib/events/lifecycle';
import { localized, localizedOptional } from '../../../lib/i18n/localized';

const MAX_EVENTS = 3;

const UpcomingEventsSection = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadEvents = async () => {
      try {
        const response = await eventsApi.getEvents();
        if (cancelled) return;

        if (response.success && response.data) {
          const upcoming = response.data
            .filter(isCurrentOrUpcomingEvent)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(0, MAX_EVENTS);
          setEvents(upcoming);
        }
      } catch (error) {
        console.error('Error loading home upcoming events:', error);
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    };

    loadEvents();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isReady || events.length === 0) {
    return null;
  }

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));

  const formatTime = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-calendar-event-line" aria-hidden="true"></i>
              {t('public.home.events.badge')}
            </div>
            <h2 className="text-balance break-words text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              {t('public.home.events.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {t('public.home.events.subtitle')}
            </p>
          </div>
          <Link
            to="/actualites/evenements"
            className="inline-flex items-center self-start rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:self-auto"
          >
            {t('public.home.events.viewAll')}
            <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-gray-50/60 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-md sm:rounded-[2rem]"
            >
              <div className="relative h-44 overflow-hidden bg-gradient-to-br from-emerald-800 to-slate-900">
                {event.imageUrl ? (
                  <img
                    src={event.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/70">
                    <i className="ri-calendar-event-line text-5xl" aria-hidden="true"></i>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {formatDate(event.date)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-xl font-bold text-gray-950">
                  {localized(event.title, event.titleEn, i18n.language)}
                </h3>
                {localizedOptional(event.description, event.descriptionEn, i18n.language) && (
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {localized(event.description, event.descriptionEn, i18n.language)}
                  </p>
                )}

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <i className="ri-time-line text-emerald-600" aria-hidden="true"></i>
                    <span>{formatTime(event.date)}</span>
                  </div>
                  {localizedOptional(event.location, event.locationEn, i18n.language) && (
                    <div className="flex items-start gap-2">
                      <i className="ri-map-pin-line mt-0.5 text-emerald-600" aria-hidden="true"></i>
                      <span className="line-clamp-1">
                        {localized(event.location, event.locationEn, i18n.language)}
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/actualites/evenements/${event.id}`}
                  className="mt-6 inline-flex items-center font-semibold text-emerald-700 transition hover:text-emerald-800"
                >
                  {t('public.home.events.details')}
                  <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;

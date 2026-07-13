import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import { buildApiUrl } from '../../../lib/api/base-url';
import {
  getEventLifecycle,
  isPublicAgendaEvent,
  sortEventsForPublic,
  type EventLifecycle,
} from '../../../lib/events/lifecycle';
import type { Event } from '../../../lib/api/types';
import { localized, localizedOptional } from '../../../lib/i18n/localized';

type PublicFilter = 'current' | 'past' | 'all';

const lifecycleBadge = (lifecycle: EventLifecycle, label: string) => {
  if (lifecycle === 'ongoing') {
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
        <i className="ri-live-line mr-1" aria-hidden="true"></i>
        {label}
      </span>
    );
  }
  if (lifecycle === 'upcoming') {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
        <i className="ri-calendar-line mr-1" aria-hidden="true"></i>
        {label}
      </span>
    );
  }
  if (lifecycle === 'past') {
    return (
      <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700">
        <i className="ri-check-line mr-1" aria-hidden="true"></i>
        {label}
      </span>
    );
  }
  return null;
};

export const EvenementsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<PublicFilter>('current');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setError(null);
      const response = await fetch(buildApiUrl('/api/events'));
      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        const published = result.data.filter((event: Event) => isPublicAgendaEvent(event));
        setEvents(sortEventsForPublic(published));
      } else {
        setError(t('public.news.evenements.error.unavailable'));
      }
    } catch (err) {
      console.error('Error loading events:', err);
      setError(t('public.news.evenements.error.load'));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = useMemo(() => {
    if (filter === 'all') return events;
    if (filter === 'past') {
      return events.filter((event) => getEventLifecycle(event) === 'past');
    }
    return events.filter((event) => {
      const life = getEventLifecycle(event);
      return life === 'upcoming' || life === 'ongoing';
    });
  }, [events, filter]);

  const formatDate = (dateString: string) => {
    const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const lifecycleLabel = (lifecycle: EventLifecycle) => {
    if (lifecycle === 'ongoing') return t('public.news.evenements.status.ongoing');
    if (lifecycle === 'upcoming') return t('public.news.evenements.status.upcoming');
    if (lifecycle === 'past') return t('public.news.evenements.status.past');
    return '';
  };

  const emptyMessageKey =
    filter === 'current'
      ? 'public.news.evenements.empty.current'
      : filter === 'past'
        ? 'public.news.evenements.empty.past'
        : 'public.news.evenements.empty.all';

  const isVirtual = (event: Event) => {
    const type = (event.type || '').toLowerCase();
    return type.includes('virtuel') || type.includes('virtual') || Boolean(event.meetingLink);
  };

  return (
    <div className="min-h-screen bg-white text-gray-950">
      <Navbar />

      <section className="relative isolate overflow-hidden bg-emerald-950 pt-32 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(252,209,22,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(16,185,129,0.22),transparent_32%),linear-gradient(135deg,#022c22_0%,#064e3b_48%,#0f172a_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-28 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50 backdrop-blur">
              <i className="ri-calendar-event-line" aria-hidden="true"></i>
              {t('public.news.evenements.badge')}
            </div>
            <h1 className="text-balance break-words text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              {t('public.news.evenements.title')}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-emerald-50/90 sm:mt-7 sm:text-lg sm:leading-8">
              {t('public.news.evenements.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <main className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setFilter('current')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'current'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <i className="ri-flashlight-line mr-2" aria-hidden="true"></i>
              {t('public.news.evenements.filter.current')}
            </button>
            <button
              type="button"
              onClick={() => setFilter('past')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'past'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <i className="ri-history-line mr-2" aria-hidden="true"></i>
              {t('public.news.evenements.filter.past')}
            </button>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              {t('public.news.evenements.filter.all')}
            </button>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-medium text-amber-900">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div key={item} className="rounded-[2rem] border border-gray-200 bg-white p-7">
                  <div className="h-5 w-2/3 animate-pulse rounded-full bg-gray-200" />
                  <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-gray-200" />
                  <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
                  <div className="mt-7 h-11 w-40 animate-pulse rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="rounded-[2rem] border border-gray-200 bg-white p-10 text-center shadow-sm">
              <i className="ri-calendar-line mb-4 text-6xl text-gray-300" aria-hidden="true"></i>
              <h3 className="mb-2 text-xl font-semibold text-gray-950">
                {t('public.news.evenements.empty.title')}
              </h3>
              <p className="text-gray-600">{t(emptyMessageKey)}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event) => {
                const lifecycle = getEventLifecycle(event);
                const past = lifecycle === 'past';

                return (
                  <article
                    key={event.id}
                    className={`overflow-hidden rounded-[2rem] border bg-white shadow-sm transition ${
                      past
                        ? 'border-gray-200 opacity-90'
                        : 'border-gray-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl'
                    }`}
                  >
                    <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-800 to-slate-900">
                      {event.imageUrl ? (
                        <img
                          src={event.imageUrl}
                          alt=""
                          className={`h-full w-full object-cover ${past ? 'grayscale-[35%]' : ''}`}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white">
                          <i
                            className="ri-calendar-event-line text-6xl text-white/70"
                            aria-hidden="true"
                          ></i>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                        {lifecycleBadge(lifecycle, lifecycleLabel(lifecycle))}
                        {isVirtual(event) && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                            <i className="ri-video-line mr-1" aria-hidden="true"></i>
                            {t('public.news.evenements.status.virtual')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-7">
                      <h3 className="mb-2 text-2xl font-bold text-gray-950">
                        {localized(event.title, event.titleEn, i18n.language)}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-gray-600">
                        {localized(event.description, event.descriptionEn, i18n.language)}
                      </p>

                      <div className="mb-4 space-y-2">
                        <div className="flex items-center text-gray-700">
                          <i className="ri-calendar-line mr-2 text-emerald-600" aria-hidden="true"></i>
                          <span className="text-sm">{formatDate(event.date)}</span>
                        </div>
                        {localizedOptional(event.location, event.locationEn, i18n.language) && (
                          <div className="flex items-center text-gray-700">
                            <i className="ri-map-pin-line mr-2 text-emerald-600" aria-hidden="true"></i>
                            <span className="text-sm">
                              {localized(event.location, event.locationEn, i18n.language)}
                            </span>
                          </div>
                        )}
                      </div>

                      {past && (
                        <p className="mb-4 rounded-xl bg-gray-100 px-3 py-2 text-sm text-gray-600">
                          {t('public.news.evenements.pastNotice')}
                        </p>
                      )}

                      <div className="flex gap-3">
                        <Link
                          to={`/actualites/evenements/${event.id}`}
                          className={`flex-1 rounded-full px-4 py-3 text-center font-semibold transition ${
                            past
                              ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                              : 'bg-emerald-700 text-white hover:bg-emerald-800'
                          }`}
                        >
                          {past
                            ? t('public.news.evenements.cta.recap')
                            : t('public.news.evenements.cta.details')}
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EvenementsPage;

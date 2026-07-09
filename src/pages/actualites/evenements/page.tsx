import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../components/feature/Navbar';
import Footer from '../../../components/feature/Footer';
import { buildApiUrl } from '../../../lib/api/base-url';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  isVirtual: boolean;
  registrationUrl?: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export const EvenementsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'ongoing'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setError(null);
      const response = await fetch(buildApiUrl('/api/events'));
      const result = await response.json();
      if (result.success) {
        const futureEvents = result.data
          .filter((event: Event) => event.status !== 'past')
          .sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setEvents(futureEvents);
      } else {
        setError(t('public.news.evenements.error.unavailable'));
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setError(t('public.news.evenements.error.load'));
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = filter === 'all' ? events : events.filter((event) => event.status === filter);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = i18n.language === 'fr' ? 'fr-FR' : 'en-CA';
    return new Intl.DateTimeFormat(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const emptyMessageKey =
    filter === 'upcoming'
      ? 'public.news.evenements.empty.upcoming'
      : filter === 'ongoing'
        ? 'public.news.evenements.empty.ongoing'
        : 'public.news.evenements.empty.all';

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
            <h1 className="text-5xl font-bold tracking-tight md:text-6xl">{t('public.news.evenements.title')}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-emerald-50/90">
              {t('public.news.evenements.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <main className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'all' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              {t('public.news.evenements.filter.all')}
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'upcoming' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <i className="ri-calendar-line mr-2"></i>
              {t('public.news.evenements.filter.upcoming')}
            </button>
            <button
              onClick={() => setFilter('ongoing')}
              className={`rounded-full px-6 py-3 font-semibold transition-colors ${
                filter === 'ongoing' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-700 hover:bg-emerald-50'
              }`}
            >
              <i className="ri-live-line mr-2"></i>
              {t('public.news.evenements.filter.ongoing')}
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
              <i className="ri-calendar-line mb-4 text-6xl text-gray-300"></i>
              <h3 className="mb-2 text-xl font-semibold text-gray-950">
                {t('public.news.evenements.empty.title')}
              </h3>
              <p className="text-gray-600">{t(emptyMessageKey)}</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event) => (
                <article
                  key={event.id}
                  className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
                >
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-emerald-800 to-slate-900">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white">
                        <i className="ri-calendar-event-line text-6xl text-white/70" aria-hidden="true"></i>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-3">
                      {event.status === 'ongoing' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          <i className="ri-live-line mr-1"></i>
                          {t('public.news.evenements.status.ongoing')}
                        </span>
                      )}
                      {event.isVirtual && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <i className="ri-video-line mr-1"></i>
                          {t('public.news.evenements.status.virtual')}
                        </span>
                      )}
                    </div>

                    <h3 className="mb-2 text-2xl font-bold text-gray-950">{event.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <i className="ri-calendar-line text-emerald-600 mr-2"></i>
                        <span className="text-sm">{formatDate(event.date)}</span>
                      </div>
                      {!event.isVirtual && event.location && (
                        <div className="flex items-center text-gray-700">
                          <i className="ri-map-pin-line text-emerald-600 mr-2"></i>
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/actualites/evenements/${event.id}`}
                        className="flex-1 rounded-full bg-emerald-700 px-4 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
                      >
                        {t('public.news.evenements.cta.details')}
                      </Link>
                      {event.registrationUrl && (
                        <a
                          href={event.registrationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-full border border-emerald-700 px-4 py-3 text-center font-semibold text-emerald-700 transition hover:bg-emerald-50"
                        >
                          {t('public.news.evenements.cta.register')}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EvenementsPage;

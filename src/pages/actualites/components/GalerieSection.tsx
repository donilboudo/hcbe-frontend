import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { eventsApi } from '../../../lib/api/events';
import type { Event } from '../../../lib/api/types';
import { getEventLifecycle } from '../../../lib/events/lifecycle';
import { resolveMediaUrl } from '../../../lib/api/media-url';
import { localized } from '../../../lib/i18n/localized';

const GalerieSection = () => {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const response = await eventsApi.getEvents();
        if (response.success && response.data) {
          const withMemories = response.data
            .filter((event) => getEventLifecycle(event) === 'past')
            .filter((event) => (event.media?.length ?? 0) > 0)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setEvents(withMemories);
        } else {
          setError(t('public.news.souvenirs.empty.error'));
        }
      } catch (err) {
        console.error('Error loading souvenirs:', err);
        setError(t('public.news.souvenirs.empty.error'));
      } finally {
        setIsLoading(false);
      }
    };

    void load();
  }, [t]);

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const coverFor = (event: Event) => {
    const firstImage = event.media?.find((m) => m.mediaType === 'image');
    if (firstImage) return resolveMediaUrl(firstImage.url);
    if (event.imageUrl) return resolveMediaUrl(event.imageUrl);
    return null;
  };

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              <i className="ri-camera-line" aria-hidden="true"></i>
              {t('public.news.souvenirs.archivesBadge')}
            </div>
          </div>
          <p className="text-lg leading-8 text-gray-600">{t('public.news.souvenirs.archivesIntro')}</p>
        </div>

        {isLoading && (
          <div className="flex justify-center py-16">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
          </div>
        )}

        {!isLoading && error && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</p>
        )}

        {!isLoading && !error && events.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 px-8 py-16 text-center">
            <i className="ri-image-line text-5xl text-gray-400" aria-hidden="true" />
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              {t('public.news.souvenirs.empty.title')}
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-gray-600">
              {t('public.news.souvenirs.empty.description')}
            </p>
          </div>
        )}

        {!isLoading && events.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const cover = coverFor(event);
              const photoCount = event.media?.filter((m) => m.mediaType === 'image').length ?? 0;
              const videoCount = event.media?.filter((m) => m.mediaType === 'video').length ?? 0;

              return (
                <Link
                  key={event.id}
                  to={`/actualites/evenements/${event.id}`}
                  className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-800 to-slate-900">
                    {cover ? (
                      <img
                        src={cover}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/80">
                        <i className="ri-play-circle-line text-5xl" aria-hidden="true" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold">
                        {localized(event.title, event.titleEn, i18n.language)}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-3 p-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <i className="ri-calendar-line mr-2" aria-hidden="true" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-semibold text-gray-600">
                      {photoCount > 0 && (
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-800">
                          {t('public.news.souvenirs.photoCount', { count: photoCount })}
                        </span>
                      )}
                      {videoCount > 0 && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-800">
                          {t('public.news.souvenirs.videoCount', { count: videoCount })}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default GalerieSection;

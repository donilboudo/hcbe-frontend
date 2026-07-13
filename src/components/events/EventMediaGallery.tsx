import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { EventMedia } from '../../lib/api/types';
import { resolveMediaUrl } from '../../lib/api/media-url';
import { getVideoEmbedInfo } from '../../lib/media/video-embed';
import { localizedOptional } from '../../lib/i18n/localized';

interface EventMediaGalleryProps {
  media: EventMedia[];
  title?: string;
}

export const EventMediaGallery: React.FC<EventMediaGalleryProps> = ({ media, title }) => {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<EventMedia | null>(null);

  const sorted = [...media].sort((a, b) => a.displayOrder - b.displayOrder);
  if (sorted.length === 0) return null;

  const activeVideo = active?.mediaType === 'video' ? getVideoEmbedInfo(active.url) : null;
  const activeCaption = active
    ? localizedOptional(active.caption, active.captionEn, i18n.language)
    : undefined;

  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">
        {title || t('public.news.souvenirs.gallery.title')}
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item) => {
          const video = item.mediaType === 'video' ? getVideoEmbedInfo(item.url) : null;
          const caption = localizedOptional(item.caption, item.captionEn, i18n.language);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {item.mediaType === 'image' ? (
                <img
                  src={resolveMediaUrl(item.url)}
                  alt={caption || ''}
                  className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-slate-800 to-emerald-950 text-white">
                  <div className="text-center">
                    <i className="ri-play-circle-line text-5xl" aria-hidden="true" />
                    <p className="mt-2 text-sm font-semibold">
                      {video?.provider === 'vimeo' ? 'Vimeo' : 'YouTube'}
                    </p>
                  </div>
                </div>
              )}
              {caption && (
                <p className="truncate px-4 py-3 text-sm text-gray-600">{caption}</p>
              )}
            </button>
          );
        })}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-100"
            aria-label={t('public.news.souvenirs.gallery.close')}
          >
            <i className="ri-close-line text-xl" aria-hidden="true" />
          </button>

          <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {active.mediaType === 'image' ? (
              <img
                src={resolveMediaUrl(active.url)}
                alt={activeCaption || ''}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
            ) : activeVideo ? (
              <div className="aspect-video overflow-hidden rounded-xl bg-black">
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeCaption || t('public.news.souvenirs.gallery.video')}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <a
                href={active.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-white p-8 text-center font-semibold text-emerald-700"
              >
                {t('public.news.souvenirs.gallery.openExternal')}
              </a>
            )}
            {activeCaption && (
              <p className="mt-4 text-center text-white/90">{activeCaption}</p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

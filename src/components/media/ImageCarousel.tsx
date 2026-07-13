import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveMediaUrl } from '../../lib/api/media-url';

export interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  className?: string;
}

const ImageCarousel = ({ images, className = '' }: ImageCarouselProps) => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const count = images.length;
  const hasMultiple = count > 1;
  const current = images[index];

  const goPrev = useCallback(() => {
    setIndex((currentIndex) => (currentIndex - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((currentIndex) => (currentIndex + 1) % count);
  }, [count]);

  useEffect(() => {
    setIndex(0);
    setLightboxOpen(false);
  }, [images]);

  useEffect(() => {
    if (!lightboxOpen || !hasMultiple) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goNext();
      } else if (event.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxOpen, hasMultiple, goPrev, goNext]);

  if (!current) return null;

  const src = resolveMediaUrl(current.url);

  return (
    <>
      <div className={`overflow-hidden rounded-2xl border border-gray-200 bg-gray-950 ${className}`}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="block w-full cursor-zoom-in"
            aria-label={t('public.news.annonces.photos.openLightbox')}
          >
            <img
              src={src}
              alt={current.alt}
              className="max-h-[28rem] w-full object-contain"
            />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label={t('public.news.annonces.photos.previous')}
              >
                <i className="ri-arrow-left-s-line text-2xl" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-black/75"
                aria-label={t('public.news.annonces.photos.next')}
              >
                <i className="ri-arrow-right-s-line text-2xl" aria-hidden="true" />
              </button>
              <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {t('public.news.annonces.photos.counter', { current: index + 1, total: count })}
              </p>
            </>
          )}
        </div>

        {hasMultiple && (
          <div className="flex gap-2 overflow-x-auto bg-gray-100 p-3">
            {images.map((image, thumbIndex) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setIndex(thumbIndex)}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  thumbIndex === index ? 'border-emerald-600' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
                aria-label={t('public.news.annonces.photos.goTo', { index: thumbIndex + 1 })}
                aria-current={thumbIndex === index}
              >
                <img
                  src={resolveMediaUrl(image.url)}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={t('public.news.annonces.photos.lightbox')}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 hover:bg-gray-100"
            aria-label={t('public.common.close')}
          >
            <i className="ri-close-line text-xl" aria-hidden="true" />
          </button>

          {hasMultiple && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrev();
                }}
                className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label={t('public.news.annonces.photos.previous')}
              >
                <i className="ri-arrow-left-s-line text-3xl" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label={t('public.news.annonces.photos.next')}
              >
                <i className="ri-arrow-right-s-line text-3xl" aria-hidden="true" />
              </button>
            </>
          )}

          <img
            src={src}
            alt={current.alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ImageCarousel;

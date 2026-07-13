import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsApi } from '../../../lib/api/news';
import type { NewsArticle } from '../../../lib/api/types';
import { resolveMediaUrl } from '../../../lib/api/media-url';
import { getNewsCategoryStyle, getNewsCategoryLabelKey } from '../../../lib/news/category-styles';
import { newsImageObjectPositionClass } from '../../../lib/news/image-position';
import { localized, localizedOptional } from '../../../lib/i18n/localized';

const MAX_ANNOUNCEMENTS = 6;

const sortByRecency = (a: NewsArticle, b: NewsArticle) => {
  if (a.isPinned !== b.isPinned) {
    return a.isPinned ? -1 : 1;
  }
  const dateA = new Date(a.publishedDate || a.createdAt).getTime();
  const dateB = new Date(b.publishedDate || b.createdAt).getTime();
  return dateB - dateA;
};

const RecentAnnouncementsSection = () => {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState<NewsArticle[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadAnnouncements = async () => {
      try {
        const response = await newsApi.getPublishedNews();
        if (cancelled) return;

        if (response.success && response.data) {
          setAnnouncements([...response.data].sort(sortByRecency).slice(0, MAX_ANNOUNCEMENTS));
        }
      } catch (error) {
        console.error('Error loading home announcements:', error);
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    };

    loadAnnouncements();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!isReady || announcements.length === 0) {
    return null;
  }

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const formatDate = (dateString: string) =>
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateString));

  return (
    <section className="bg-gray-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-megaphone-line" aria-hidden="true"></i>
              {t('public.home.announcements.badge')}
            </div>
            <h2 className="text-balance break-words text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl md:text-5xl">
              {t('public.home.announcements.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              {t('public.home.announcements.subtitle')}
            </p>
          </div>
          <Link
            to="/actualites/annonces"
            className="inline-flex items-center self-start rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800 sm:self-auto"
          >
            {t('public.home.announcements.viewAll')}
            <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {announcements.map((item) => {
            const style = getNewsCategoryStyle(item.category);
            const publishedAt = item.publishedDate || item.createdAt;
            const excerpt = localizedOptional(item.excerpt, item.excerptEn, i18n.language);
            const content = localized(item.content, item.contentEn, i18n.language);
            const preview = excerpt || content;
            const categoryLabelKey = getNewsCategoryLabelKey(item.category);

            return (
              <article
                key={item.id}
                className="flex flex-col overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md sm:rounded-[2rem]"
              >
                <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${style.accent}`}>
                  {item.imageUrl ? (
                    <img
                      src={resolveMediaUrl(item.imageUrl)}
                      alt=""
                      className={`h-full w-full object-cover ${newsImageObjectPositionClass(item.imagePosition)}`}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/80">
                      <i className={`${style.icon} text-5xl`} aria-hidden="true"></i>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                    {item.category && (
                      <span className="inline-flex rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-800">
                        {categoryLabelKey ? t(categoryLabelKey) : item.category}
                      </span>
                    )}
                    {item.isPinned && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                        <i className="ri-pushpin-line mr-1" aria-hidden="true"></i>
                        {t('public.news.annonces.pinned')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <time className="text-sm text-gray-500" dateTime={publishedAt}>
                    {formatDate(publishedAt)}
                  </time>
                  <h3 className="mt-2 text-xl font-bold text-gray-950">
                    {localized(item.title, item.titleEn, i18n.language)}
                  </h3>
                  {preview && (
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{preview}</p>
                  )}

                  <Link
                    to={`/actualites/annonces/${item.id}`}
                    className="mt-6 inline-flex items-center font-semibold text-emerald-700 transition hover:text-emerald-800"
                  >
                    {t('public.home.announcements.readMore')}
                    <i className="ri-arrow-right-line ml-1" aria-hidden="true"></i>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecentAnnouncementsSection;

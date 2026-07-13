import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsApi } from '../../../lib/api/news';
import type { NewsArticle } from '../../../lib/api/types';
import { getNewsCategoryStyle, getNewsCategoryLabelKey } from '../../../lib/news/category-styles';
import { newsImageObjectPositionClass } from '../../../lib/news/image-position';
import { localized, localizedOptional } from '../../../lib/i18n/localized';
import { resolveMediaUrl } from '../../../lib/api/media-url';

interface AnnoncesExemplesProps {
  selectedCategory: string;
}

const formatDate = (dateString: string, locale: string) =>
  new Intl.DateTimeFormat(locale === 'en' ? 'en-CA' : 'fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));

const AnnoncesExemples = ({ selectedCategory }: AnnoncesExemplesProps) => {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await newsApi.getPublishedNews();
        if (response.success && response.data) {
          setArticles(response.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Error loading news:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const filteredNews =
    selectedCategory === 'all'
      ? articles
      : articles.filter((item) => item.category === selectedCategory);

  const sortedNews = [...filteredNews].sort((a, b) => {
    if (a.isPinned !== b.isPinned) {
      return a.isPinned ? -1 : 1;
    }
    const dateA = new Date(a.publishedDate || a.createdAt).getTime();
    const dateB = new Date(b.publishedDate || b.createdAt).getTime();
    return dateB - dateA;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[2rem] border border-red-200 bg-red-50 p-10 text-center text-red-700">
        {t('public.news.annonces.errorLoad')}
      </div>
    );
  }

  if (sortedNews.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white p-10 text-center">
        <i className="ri-newspaper-line mb-4 text-5xl text-gray-300" aria-hidden="true"></i>
        <h3 className="text-xl font-bold text-gray-950">{t('public.news.annonces.emptyCategory')}</h3>
        <p className="mx-auto mt-3 max-w-md text-gray-600">{t('public.news.annonces.emptyCategoryHint')}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:gap-6">
      {sortedNews.map((item) => {
        const style = getNewsCategoryStyle(item.category);
        const publishedAt = item.publishedDate || item.createdAt;
        const excerpt = localizedOptional(item.excerpt, item.excerptEn, i18n.language);
        const content = localized(item.content, item.contentEn, i18n.language);
        const preview = excerpt || content;
        const categoryLabelKey = getNewsCategoryLabelKey(item.category);

        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg sm:rounded-[2rem]"
          >
            <div className="grid gap-0 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
              <div className={`relative min-h-[140px] overflow-hidden bg-gradient-to-br ${style.accent} text-white sm:min-h-[160px] md:min-h-full`}>
                {item.imageUrl ? (
                  <img
                    src={resolveMediaUrl(item.imageUrl)}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover ${newsImageObjectPositionClass(item.imagePosition)}`}
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%)]" />
                )}
                <div className={`relative flex h-full min-h-[140px] flex-col justify-between p-5 sm:min-h-[160px] ${item.imageUrl ? 'bg-gradient-to-t from-black/55 via-black/20 to-transparent' : ''}`}>
                  {!item.imageUrl && (
                    <i className={`${style.icon} text-3xl text-white/85`} aria-hidden="true"></i>
                  )}
                  <span className={`inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur ${item.imageUrl ? 'mt-auto' : 'mt-4'}`}>
                    {categoryLabelKey ? t(categoryLabelKey) : item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 sm:p-6 lg:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  {item.isPinned && (
                    <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                      <i className="ri-pushpin-line mr-1" aria-hidden="true"></i>
                      {t('public.news.annonces.pinned')}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">{formatDate(publishedAt, i18n.language)}</span>
                </div>

                <h2 className="text-xl font-bold leading-snug text-gray-950 sm:text-2xl">
                  {localized(item.title, item.titleEn, i18n.language)}
                </h2>

                {item.author && <p className="mt-2 text-sm text-gray-600 sm:text-base">{item.author}</p>}

                <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                  {preview}
                </p>

                <Link
                  to={`/actualites/annonces/${item.id}`}
                  className="mt-5 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                >
                  {t('public.news.annonces.readMore')}
                  <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default AnnoncesExemples;

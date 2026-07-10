import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsApi } from '../../../lib/api/news';
import type { NewsArticle } from '../../../lib/api/types';
import { formatFileSize, resolveMediaUrl } from '../../../lib/api/media-url';
import { getNewsCategoryStyle } from '../../../lib/news/category-styles';

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
  const [selectedNews, setSelectedNews] = useState<NewsArticle | null>(null);

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
    <>
      <div className="grid gap-5 sm:gap-6">
        {sortedNews.map((item) => {
          const style = getNewsCategoryStyle(item.category);
          const publishedAt = item.publishedDate || item.createdAt;
          const preview = item.excerpt || item.content;

          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-[1.75rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg sm:rounded-[2rem]"
            >
              <div className="grid gap-0 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
                <div className={`relative min-h-[140px] bg-gradient-to-br ${style.accent} p-5 text-white sm:min-h-[160px] md:min-h-full`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_35%)]" />
                  <div className="relative flex h-full flex-col justify-between">
                    <i className={`${style.icon} text-3xl text-white/85`} aria-hidden="true"></i>
                    <span className="mt-4 inline-flex w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                      {item.category}
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

                  <h2 className="text-xl font-bold leading-snug text-gray-950 sm:text-2xl">{item.title}</h2>

                  {item.author && <p className="mt-2 text-sm text-gray-600 sm:text-base">{item.author}</p>}

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-700 sm:text-base sm:leading-7">
                    {preview}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedNews(item)}
                    className="mt-5 inline-flex items-center rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  >
                    {t('public.news.annonces.readMore')}
                    <i className="ri-arrow-right-line ml-2" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setSelectedNews(null)}
          role="presentation"
        >
          <div
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-[2rem] bg-white sm:max-w-3xl sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="annonce-modal-title"
          >
            <div className={`bg-gradient-to-br ${getNewsCategoryStyle(selectedNews.category).accent} p-6 text-white sm:p-8`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                    {selectedNews.category}
                  </span>
                  <h2 id="annonce-modal-title" className="mt-4 text-2xl font-bold leading-snug sm:text-3xl">
                    {selectedNews.title}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNews(null)}
                  aria-label={t('public.common.close')}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
                >
                  <i className="ri-close-line text-xl" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {selectedNews.imageUrl && (
                <img
                  src={resolveMediaUrl(selectedNews.imageUrl)}
                  alt={selectedNews.title}
                  className="mb-6 h-48 w-full rounded-2xl object-cover"
                />
              )}

              <div className="flex flex-col gap-1 text-sm text-gray-600 sm:flex-row sm:gap-4">
                <span>{formatDate(selectedNews.publishedDate || selectedNews.createdAt, i18n.language)}</span>
                {selectedNews.author && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span>{selectedNews.author}</span>
                  </>
                )}
              </div>

              <p className="mt-6 whitespace-pre-wrap text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
                {selectedNews.content}
              </p>

              {(selectedNews.attachments?.length ?? 0) > 0 && (
                <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {t('public.news.annonces.attachments')}
                  </h3>
                  <ul className="mt-3 space-y-2">
                    {selectedNews.attachments?.map((attachment) => (
                      <li key={attachment.id}>
                        <a
                          href={resolveMediaUrl(attachment.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
                        >
                          <i className="ri-download-2-line" aria-hidden="true"></i>
                          {attachment.fileName}
                          <span className="font-normal text-gray-500">
                            ({formatFileSize(attachment.sizeBytes)})
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  onClick={() => setSelectedNews(null)}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
                >
                  {t('public.news.annonces.askQuestion')}
                </Link>
                <Link
                  to="/actualites/evenements"
                  onClick={() => setSelectedNews(null)}
                  className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
                >
                  {t('public.news.annonces.viewEvents')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AnnoncesExemples;

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from '../../../../components/feature/Navbar';
import Footer from '../../../../components/feature/Footer';
import ImageCarousel from '../../../../components/media/ImageCarousel';
import { newsApi } from '../../../../lib/api/news';
import type { NewsArticle } from '../../../../lib/api/types';
import { formatFileSize, resolveMediaUrl } from '../../../../lib/api/media-url';
import { isImageFile } from '../../../../lib/media/is-image-file';
import { getNewsCategoryStyle } from '../../../../lib/news/category-styles';

const formatDate = (dateString: string, locale: string) =>
  new Intl.DateTimeFormat(locale.startsWith('en') ? 'en-CA' : 'fr-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(dateString));

const AnnonceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [coverBroken, setCoverBroken] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const loadArticle = async () => {
      setLoading(true);
      setCoverBroken(false);
      try {
        const response = await newsApi.getNewsById(id);
        if (cancelled) return;

        if (response.success && response.data) {
          setArticle(response.data);
        } else {
          setArticle(null);
          setTimeout(() => navigate('/actualites/annonces'), 2000);
        }
      } catch (error) {
        console.error('Error loading announcement:', error);
        if (!cancelled) {
          setArticle(null);
          setTimeout(() => navigate('/actualites/annonces'), 2000);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadArticle();
    return () => {
      cancelled = true;
    };
  }, [id, navigate]);

  const { imageAttachments, fileAttachments } = useMemo(() => {
    const attachments = article?.attachments ?? [];
    return {
      imageAttachments: attachments.filter((attachment) =>
        isImageFile(attachment.contentType, attachment.fileName),
      ),
      fileAttachments: attachments.filter(
        (attachment) => !isImageFile(attachment.contentType, attachment.fileName),
      ),
    };
  }, [article]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="ri-newspaper-line mb-4 text-6xl text-gray-400" aria-hidden="true" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900">
            {t('public.news.annonces.notFound')}
          </h3>
          <Link to="/actualites/annonces" className="font-semibold text-emerald-700 hover:text-emerald-800">
            {t('public.news.annonces.backToList')}
          </Link>
        </div>
      </div>
    );
  }

  const style = getNewsCategoryStyle(article.category);
  const publishedAt = article.publishedDate || article.createdAt;
  const showCover = Boolean(article.imageUrl) && !coverBroken;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className={`relative bg-gradient-to-br ${style.accent} pt-20`}>
        {showCover && (
          <>
            <img
              src={resolveMediaUrl(article.imageUrl)}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              onError={() => setCoverBroken(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 to-emerald-900/70" />
          </>
        )}

        <div className="relative mx-auto max-w-4xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
          <nav className="mb-6 text-sm text-white/85">
            <Link to="/" className="hover:underline">
              {t('public.nav.home')}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/actualites" className="hover:underline">
              {t('public.nav.news')}
            </Link>
            <span className="mx-2">/</span>
            <Link to="/actualites/annonces" className="hover:underline">
              {t('public.nav.announcements')}
            </Link>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-2">
            {article.category && (
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {article.category}
              </span>
            )}
            {article.isPinned && (
              <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                <i className="ri-pushpin-line mr-1" aria-hidden="true" />
                {t('public.news.annonces.pinned')}
              </span>
            )}
          </div>

          <h1 className="text-balance break-words text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/85">
            <time dateTime={publishedAt}>{formatDate(publishedAt, i18n.language)}</time>
            {article.author && (
              <>
                <span aria-hidden="true">•</span>
                <span>{article.author}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <article className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="whitespace-pre-wrap text-base leading-7 text-gray-700 sm:text-lg sm:leading-8">
            {article.content}
          </p>

          {(imageAttachments.length > 0 || fileAttachments.length > 0) && (
            <div className="mt-10 space-y-8">
              {imageAttachments.length > 0 && (
                <section>
                  <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {t('public.news.annonces.photos')}
                  </h2>
                  <ImageCarousel
                    images={imageAttachments.map((attachment) => ({
                      id: attachment.id,
                      url: attachment.url,
                      alt: attachment.fileName,
                    }))}
                  />
                </section>
              )}

              {fileAttachments.length > 0 && (
                <section className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                  <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {t('public.news.annonces.attachments')}
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {fileAttachments.map((attachment) => (
                      <li key={attachment.id}>
                        <a
                          href={resolveMediaUrl(attachment.url)}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
                        >
                          <i className="ri-download-2-line" aria-hidden="true" />
                          {attachment.fileName}
                          <span className="font-normal text-gray-500">
                            ({formatFileSize(attachment.sizeBytes)})
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              {t('public.news.annonces.askQuestion')}
            </Link>
            <Link
              to="/actualites/annonces"
              className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
            >
              {t('public.news.annonces.backToList')}
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AnnonceDetailPage;

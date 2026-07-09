import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { newsApi } from '../../../../lib/api/news';
import type { NewsArticle } from '../../../../lib/api/types';
import { getNewsCategoryStyle } from '../../../../lib/news/category-styles';

const NewsViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await newsApi.getNewsByIdForAdmin(id);
        if (response.success && response.data) {
          setArticle(response.data);
        } else {
          setError(t('admin.news.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading news:', err);
        setError(t('admin.news.errorLoad'));
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [id, t]);

  const handleDelete = async () => {
    if (!id || !article) return;
    if (!window.confirm(t('admin.common.confirmDelete', { name: article.title }))) return;
    try {
      const response = await newsApi.deleteNews(id);
      if (response.success) navigate('/admin/news');
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error || t('admin.news.errorLoad')}</p>
        <Link to="/admin/news" className="text-emerald-700 hover:text-emerald-900">{t('admin.common.backToList')}</Link>
      </div>
    );
  }

  const style = getNewsCategoryStyle(article.category);

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/news" />

      <div className={`mb-6 overflow-hidden rounded-2xl bg-gradient-to-br ${style.accent} p-6 text-white sm:p-8`}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              {article.isPinned && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{t('admin.news.pinned')}</span>
              )}
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {article.status === 'published' ? t('admin.news.statusPublished') : t('admin.news.statusDraft')}
              </span>
              {article.category && (
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{article.category}</span>
              )}
            </div>
            <h1 className="text-2xl font-bold sm:text-3xl">{article.title}</h1>
            <p className="mt-3 text-sm text-white/80">
              {[article.author, article.publishedDate ? new Date(article.publishedDate).toLocaleString() : null]
                .filter(Boolean)
                .join(' · ')}
            </p>
          </div>
          <div className="flex gap-2">
            <Link to={`/admin/news/${article.id}/edit`} className="rounded-lg bg-white px-4 py-2 font-semibold text-gray-900 transition hover:bg-emerald-50">
              {t('admin.common.edit')}
            </Link>
            <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700">
              {t('admin.common.delete')}
            </button>
          </div>
        </div>
      </div>

      {article.imageUrl && (
        <img src={article.imageUrl} alt={article.title} className="mb-6 h-64 w-full rounded-2xl object-cover" />
      )}

      {article.excerpt && (
        <p className="mb-4 text-lg font-medium text-gray-700">{article.excerpt}</p>
      )}

      <div className="rounded-lg bg-white p-6 shadow">
        <p className="whitespace-pre-wrap text-base leading-7 text-gray-700">{article.content}</p>
      </div>
    </div>
  );
};

export default NewsViewPage;

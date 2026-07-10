import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { newsApi } from '../../../lib/api/news';
import type { NewsArticle } from '../../../lib/api/types';
import { getNewsCategoryStyle } from '../../../lib/news/category-styles';

const NewsAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await newsApi.getNewsForAdmin();
      if (response.success && response.data) {
        setArticles(response.data);
        setError(null);
      } else {
        setError(response.message || t('admin.news.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading news:', err);
      setError(err instanceof Error ? err.message : t('admin.news.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(t('admin.common.confirmDelete', { name: title }))) return;

    try {
      const response = await newsApi.deleteNews(id);
      if (response.success) {
        loadArticles();
      }
    } catch (err) {
      console.error('Error deleting news:', err);
    }
  };

  const filteredArticles = articles.filter((article) => {
    if (statusFilter === 'all') return true;
    return article.status === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button type="button" onClick={loadArticles} className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800">
          {t('admin.common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">{t('admin.news.subtitle')}</p>
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
          >
            <option value="all">{t('admin.news.filterAll')}</option>
            <option value="published">{t('admin.news.statusPublished')}</option>
            <option value="draft">{t('admin.news.statusDraft')}</option>
          </select>
          <Link
            to="/admin/news/create"
            className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            <i className="ri-add-line mr-2" aria-hidden="true"></i>
            {t('admin.news.create')}
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => {
          const style = getNewsCategoryStyle(article.category);
          return (
            <article key={article.id} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${style.accent} text-white`}>
                    <i className={`${style.icon} text-xl`} aria-hidden="true"></i>
                  </div>
                  <div>
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      {article.isPinned && (
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
                          {t('admin.news.pinned')}
                        </span>
                      )}
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          article.status === 'published'
                            ? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200'
                            : 'bg-gray-100 text-gray-700 ring-1 ring-gray-200'
                        }`}
                      >
                        {article.status === 'published' ? t('admin.news.statusPublished') : t('admin.news.statusDraft')}
                      </span>
                      {article.category && (
                        <span className="text-xs text-gray-500">{article.category}</span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{article.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-gray-600">
                      {article.excerpt || article.content}
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                      {[article.author, article.publishedDate ? new Date(article.publishedDate).toLocaleDateString() : null]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:shrink-0">
                  <Link to={`/admin/news/${article.id}`} className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50" title={t('admin.common.view')}>
                    <i className="ri-eye-line" aria-hidden="true"></i>
                  </Link>
                  <Link to={`/admin/news/${article.id}/edit`} className="rounded-lg p-2 text-emerald-700 hover:bg-emerald-50" title={t('admin.common.edit')}>
                    <i className="ri-edit-line" aria-hidden="true"></i>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(article.id, article.title)}
                    className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                    title={t('admin.common.delete')}
                  >
                    <i className="ri-delete-bin-line" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredArticles.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">{t('admin.news.emptyTitle')}</p>
          <Link to="/admin/news/create" className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800">
            <i className="ri-add-line mr-2" aria-hidden="true"></i>
            {t('admin.news.createFirst')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewsAdminPage;

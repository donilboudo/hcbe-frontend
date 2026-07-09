import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../../components/admin/AdminBackButton';
import { newsApi } from '../../../../../lib/api/news';
import type { CreateNewsRequest } from '../../../../../lib/api/types';
import { NewsForm } from '../../NewsForm';

const NewsEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateNewsRequest>({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    author: '',
    category: '',
    publishedDate: '',
    isPinned: false,
    status: 'published',
  });

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await newsApi.getNewsByIdForAdmin(id);
        if (response.success && response.data) {
          const article = response.data;
          setFormData({
            title: article.title,
            content: article.content,
            excerpt: article.excerpt || '',
            imageUrl: article.imageUrl || '',
            author: article.author || '',
            category: article.category || '',
            publishedDate: article.publishedDate || '',
            isPinned: article.isPinned,
            status: article.status,
          });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);
    setError(null);
    try {
      const response = await newsApi.updateNews(id, formData);
      if (response.success) {
        navigate(`/admin/news/${id}`);
      } else {
        setError(response.message || t('admin.news.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating news:', err);
      setError(t('admin.news.errorUpdate'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to={`/admin/news/${id}`} label={t('admin.common.back')} />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.news.editTitle')}</h1>
      </div>
      {error && <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}
      <NewsForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel={t('admin.common.save')}
        onCancel={() => navigate(`/admin/news/${id}`)}
      />
    </div>
  );
};

export default NewsEditPage;

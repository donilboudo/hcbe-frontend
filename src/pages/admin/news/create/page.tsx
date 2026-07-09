import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { newsApi } from '../../../../lib/api/news';
import type { CreateNewsRequest } from '../../../../lib/api/types';
import { NewsForm } from '../NewsForm';

const NewsCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateNewsRequest>({
    title: '',
    content: '',
    excerpt: '',
    imageUrl: '',
    author: '',
    category: '',
    publishedDate: new Date().toISOString(),
    isPinned: false,
    status: 'published',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await newsApi.createNews(formData);
      if (response.success && response.data) {
        navigate(`/admin/news/${response.data.id}`);
      } else {
        setError(response.message || t('admin.news.errorCreate'));
      }
    } catch (err) {
      console.error('Error creating news:', err);
      setError(t('admin.news.errorCreate'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/news" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.news.createTitle')}</h1>
      </div>
      {error && <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>}
      <NewsForm
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel={t('admin.common.create')}
        onCancel={() => navigate('/admin/news')}
      />
    </div>
  );
};

export default NewsCreatePage;

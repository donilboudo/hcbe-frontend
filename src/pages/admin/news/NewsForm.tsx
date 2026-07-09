import React from 'react';
import { useTranslation } from 'react-i18next';
import { NEWS_CATEGORIES } from '../../../lib/news/category-styles';
import type { CreateNewsRequest } from '../../../lib/api/types';

interface NewsFormProps {
  formData: CreateNewsRequest;
  onChange: (data: CreateNewsRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitLabel: string;
  onCancel: () => void;
}

export const NewsForm: React.FC<NewsFormProps> = ({
  formData,
  onChange,
  onSubmit,
  submitting,
  submitLabel,
  onCancel,
}) => {
  const { t } = useTranslation();

  const updateField = (field: keyof CreateNewsRequest, value: string | boolean) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-lg bg-white shadow">
      <div className="space-y-6 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.title')} *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => updateField('title', e.target.value)}
              required
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.category')}</label>
            <select
              value={formData.category || ''}
              onChange={(e) => updateField('category', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="">{t('admin.news.selectCategory')}</option>
              {NEWS_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.author')}</label>
            <input
              type="text"
              value={formData.author || ''}
              onChange={(e) => updateField('author', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.publishedDate')}</label>
            <input
              type="datetime-local"
              value={formData.publishedDate ? formData.publishedDate.slice(0, 16) : ''}
              onChange={(e) => updateField('publishedDate', e.target.value ? new Date(e.target.value).toISOString() : '')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.status')}</label>
            <select
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            >
              <option value="published">{t('admin.news.statusPublished')}</option>
              <option value="draft">{t('admin.news.statusDraft')}</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.excerpt')}</label>
            <textarea
              value={formData.excerpt || ''}
              onChange={(e) => updateField('excerpt', e.target.value)}
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.content')} *</label>
            <textarea
              value={formData.content}
              onChange={(e) => updateField('content', e.target.value)}
              required
              rows={10}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.imageUrl')}</label>
            <input
              type="url"
              value={formData.imageUrl || ''}
              onChange={(e) => updateField('imageUrl', e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div className="flex items-center md:col-span-2">
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={formData.isPinned ?? false}
                onChange={(e) => updateField('isPinned', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700">{t('admin.news.isPinned')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50"
          disabled={submitting}
        >
          {t('admin.common.cancel')}
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800 disabled:opacity-50"
        >
          {submitting ? t('admin.common.loading') : submitLabel}
        </button>
      </div>
    </form>
  );
};

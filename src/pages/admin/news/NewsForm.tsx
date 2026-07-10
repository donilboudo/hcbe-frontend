import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NEWS_CATEGORIES } from '../../../lib/news/category-styles';
import { formatFileSize, resolveMediaUrl } from '../../../lib/api/media-url';
import type { CreateNewsRequest, NewsAttachment } from '../../../lib/api/types';

interface NewsFormProps {
  formData: CreateNewsRequest;
  onChange: (data: CreateNewsRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitting: boolean;
  submitLabel: string;
  onCancel: () => void;
  coverFile: File | null;
  onCoverFileChange: (file: File | null) => void;
  pendingAttachments: File[];
  onPendingAttachmentsChange: (files: File[]) => void;
  existingAttachments?: NewsAttachment[];
  onDeleteAttachment?: (attachmentId: string) => Promise<void> | void;
}

export const NewsForm: React.FC<NewsFormProps> = ({
  formData,
  onChange,
  onSubmit,
  submitting,
  submitLabel,
  onCancel,
  coverFile,
  onCoverFileChange,
  pendingAttachments,
  onPendingAttachmentsChange,
  existingAttachments = [],
  onDeleteAttachment,
}) => {
  const { t } = useTranslation();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [deletingAttachmentId, setDeletingAttachmentId] = useState<string | null>(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');

  useEffect(() => {
    if (!coverFile) {
      setCoverPreviewUrl(resolveMediaUrl(formData.imageUrl));
      return;
    }

    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile, formData.imageUrl]);

  const updateField = (field: keyof CreateNewsRequest, value: string | boolean) => {
    onChange({ ...formData, [field]: value });
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    onCoverFileChange(file);
    // File upload takes precedence over a pasted URL.
    if (file) {
      updateField('imageUrl', '');
    }
  };

  const handleImageUrlChange = (value: string) => {
    // Only discard a selected file when the user actually types a URL.
    // Clearing the field must not wipe a pending upload.
    if (value.trim()) {
      onCoverFileChange(null);
      if (coverInputRef.current) coverInputRef.current.value = '';
    }
    updateField('imageUrl', value);
  };

  const handleAttachmentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    onPendingAttachmentsChange([...pendingAttachments, ...files]);
    e.target.value = '';
  };

  const removePendingAttachment = (index: number) => {
    onPendingAttachmentsChange(pendingAttachments.filter((_, i) => i !== index));
  };

  const handleDeleteExisting = async (attachmentId: string) => {
    if (!onDeleteAttachment) return;
    setDeletingAttachmentId(attachmentId);
    try {
      await onDeleteAttachment(attachmentId);
    } finally {
      setDeletingAttachmentId(null);
    }
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
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.coverImage')}</label>
            <p className="mb-3 text-sm text-gray-500">{t('admin.news.coverImageHint')}</p>
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
              {coverPreviewUrl ? (
                <img
                  src={coverPreviewUrl}
                  alt=""
                  className="mb-4 h-48 w-full rounded-lg object-cover"
                />
              ) : (
                <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-white text-gray-400">
                  <i className="ri-image-add-line text-4xl" aria-hidden="true"></i>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                  disabled={submitting}
                >
                  {t('admin.news.uploadCover')}
                </button>
                {(coverFile || formData.imageUrl) && (
                  <button
                    type="button"
                    onClick={() => {
                      onCoverFileChange(null);
                      updateField('imageUrl', '');
                      if (coverInputRef.current) coverInputRef.current.value = '';
                    }}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white"
                    disabled={submitting}
                  >
                    {t('admin.news.removeCover')}
                  </button>
                )}
                {coverFile && (
                  <span className="text-sm text-emerald-800">
                    <i className="ri-checkbox-circle-line mr-1" aria-hidden="true"></i>
                    {coverFile.name}
                  </span>
                )}
              </div>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleCoverChange}
              />
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-gray-500">{t('admin.news.imageUrl')}</label>
                <input
                  type="text"
                  inputMode="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleImageUrlChange(e.target.value)}
                  placeholder="https://"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.news.attachments')}</label>
            <p className="mb-3 text-sm text-gray-500">{t('admin.news.attachmentsHint')}</p>

            {existingAttachments.length > 0 && (
              <ul className="mb-3 space-y-2">
                {existingAttachments.map((attachment) => (
                  <li
                    key={attachment.id}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2"
                  >
                    <a
                      href={resolveMediaUrl(attachment.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="min-w-0 flex-1 truncate text-sm font-medium text-emerald-700 hover:underline"
                    >
                      <i className="ri-attachment-2 mr-2" aria-hidden="true"></i>
                      {attachment.fileName}
                      <span className="ml-2 text-gray-500">({formatFileSize(attachment.sizeBytes)})</span>
                    </a>
                    {onDeleteAttachment && (
                      <button
                        type="button"
                        onClick={() => handleDeleteExisting(attachment.id)}
                        disabled={submitting || deletingAttachmentId === attachment.id}
                        className="rounded-lg px-2 py-1 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        {t('admin.common.delete')}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {pendingAttachments.length > 0 && (
              <ul className="mb-3 space-y-2">
                {pendingAttachments.map((file, index) => (
                  <li
                    key={`${file.name}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
                      <i className="ri-upload-2-line mr-2 text-emerald-700" aria-hidden="true"></i>
                      {file.name}
                      <span className="ml-2 text-gray-500">({formatFileSize(file.size)})</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removePendingAttachment(index)}
                      disabled={submitting}
                      className="rounded-lg px-2 py-1 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      {t('admin.common.delete')}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <button
              type="button"
              onClick={() => attachmentInputRef.current?.click()}
              className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              disabled={submitting}
            >
              <i className="ri-attachment-line mr-2" aria-hidden="true"></i>
              {t('admin.news.addAttachments')}
            </button>
            <input
              ref={attachmentInputRef}
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.webp,.gif,application/pdf,image/*"
              className="hidden"
              onChange={handleAttachmentsChange}
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

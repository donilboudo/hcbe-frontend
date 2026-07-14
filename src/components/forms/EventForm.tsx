import React, { useEffect, useRef, useState } from 'react';
import type { CreateEventRequest, UpdateEventRequest, Event } from '../../lib/api/types';
import { useTranslation } from 'react-i18next';
import {
  AdminLanguageTabs,
  isEnglishContentIncomplete,
} from '../admin/AdminLanguageTabs';
import { formatFileSize, resolveMediaUrl } from '../../lib/api/media-url';

interface EventFormProps {
  initialValues?: Event;
  onSubmit: (data: CreateEventRequest | UpdateEventRequest) => Promise<void>;
  isLoading: boolean;
  submitButtonText?: string;
  pendingAttachments?: File[];
  onPendingAttachmentsChange?: (files: File[]) => void;
  coverFile?: File | null;
  onCoverFileChange?: (file: File | null) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  submitButtonText,
  pendingAttachments = [],
  onPendingAttachmentsChange,
  coverFile = null,
  onCoverFileChange,
}) => {
  const { t } = useTranslation();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: initialValues?.title || '',
    titleEn: initialValues?.titleEn || '',
    description: initialValues?.description || '',
    descriptionEn: initialValues?.descriptionEn || '',
    date: initialValues?.date ? new Date(initialValues.date).toISOString().slice(0, 16) : '',
    location: initialValues?.location || '',
    locationEn: initialValues?.locationEn || '',
    type: initialValues?.type || '',
    zone: initialValues?.zone || '',
    capacity: initialValues?.capacity?.toString() || '',
    registrationDeadline: initialValues?.registrationDeadline
      ? new Date(initialValues.registrationDeadline).toISOString().slice(0, 16)
      : '',
    meetingLink: initialValues?.meetingLink || '',
    imageUrl: initialValues?.imageUrl || '',
    status: initialValues?.status || 'Draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');

  const hasCover = Boolean(coverFile || formData.imageUrl);

  useEffect(() => {
    if (!coverFile) {
      setCoverPreviewUrl(resolveMediaUrl(formData.imageUrl));
      return;
    }
    const objectUrl = URL.createObjectURL(coverFile);
    setCoverPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [coverFile, formData.imageUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = t('admin.events.form.validation.titleRequired');
    }

    if (!formData.date) {
      newErrors.date = t('admin.events.form.validation.dateRequired');
    }

    if (!formData.status) {
      newErrors.status = t('admin.events.form.validation.statusRequired');
    }

    if (
      formData.registrationDeadline &&
      new Date(formData.registrationDeadline) >= new Date(formData.date)
    ) {
      newErrors.registrationDeadline = t('admin.events.form.validation.deadlineBeforeDate');
    }

    if (
      formData.capacity &&
      (isNaN(parseInt(formData.capacity, 10)) || parseInt(formData.capacity, 10) < 1)
    ) {
      newErrors.capacity = t('admin.events.form.validation.capacityPositive');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData: CreateEventRequest | UpdateEventRequest = {
      title: formData.title,
      titleEn: formData.titleEn,
      description: formData.description || undefined,
      descriptionEn: formData.descriptionEn,
      date: formData.date,
      location: formData.location || undefined,
      locationEn: formData.locationEn,
      type: formData.type || undefined,
      zone: formData.zone || undefined,
      capacity: formData.capacity ? parseInt(formData.capacity, 10) : undefined,
      registrationDeadline: formData.registrationDeadline || undefined,
      meetingLink: formData.meetingLink || undefined,
      imageUrl: formData.imageUrl || undefined,
      status: formData.status,
    };

    await onSubmit(submitData);
  };

  const statusOptions = [
    { value: 'Draft', label: t('admin.eventPublication.draft') },
    { value: 'Active', label: t('admin.events.form.statusPublished') },
    { value: 'Cancelled', label: t('admin.eventPublication.cancelled') },
    { value: 'Completed', label: t('admin.eventPublication.completed') },
  ];

  const typeOptions = [
    { value: '', label: t('admin.events.form.selectType') },
    { value: 'Workshop', label: t('admin.events.type.workshop') },
    { value: 'Conference', label: t('admin.events.type.conference') },
    { value: 'Networking', label: t('admin.events.type.networking') },
    { value: 'Training', label: t('admin.events.type.training') },
    { value: 'Social', label: t('admin.events.type.social') },
    { value: 'Other', label: t('admin.events.type.other') },
  ];

  const zoneOptions = [
    { value: '', label: t('admin.events.form.selectZone') },
    { value: 'Montreal', label: t('admin.events.zone.montreal') },
    { value: 'Quebec', label: t('admin.events.zone.quebec') },
    { value: 'Ottawa', label: t('admin.events.zone.ottawa') },
    { value: 'Toronto', label: t('admin.events.zone.toronto') },
    { value: 'Virtual', label: t('admin.events.zone.virtual') },
    { value: 'Other', label: t('admin.events.zone.other') },
  ];

  return (
    <form onSubmit={handleSubmit} className="min-w-0 space-y-8">
      <AdminLanguageTabs
        enIncomplete={isEnglishContentIncomplete([
          [formData.title, formData.titleEn],
          [formData.description, formData.descriptionEn],
          [formData.location, formData.locationEn],
        ])}
        frPanel={
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.events.form.title')} *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={t('admin.events.form.titlePlaceholder')}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.common.description')}
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                placeholder={t('admin.events.form.descriptionPlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.common.location')}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                placeholder={t('admin.events.form.locationPlaceholder')}
              />
            </div>
          </div>
        }
        enPanel={
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label htmlFor="titleEn" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.events.form.title')}
              </label>
              <input
                type="text"
                id="titleEn"
                name="titleEn"
                value={formData.titleEn}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                placeholder={t('admin.events.form.titleEnPlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="descriptionEn" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.common.description')}
              </label>
              <textarea
                id="descriptionEn"
                name="descriptionEn"
                rows={4}
                value={formData.descriptionEn}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                placeholder={t('admin.events.form.descriptionEnPlaceholder')}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="locationEn" className="mb-1 block text-sm font-medium text-gray-700">
                {t('admin.common.location')}
              </label>
              <input
                type="text"
                id="locationEn"
                name="locationEn"
                value={formData.locationEn}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
                placeholder={t('admin.events.form.locationEnPlaceholder')}
              />
            </div>
          </div>
        }
      />

      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          {t('admin.content.lang.settings')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.eventDate')} *
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label
            htmlFor="registrationDeadline"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            {t('admin.events.registrationDeadline')}
          </label>
          <input
            type="datetime-local"
            id="registrationDeadline"
            name="registrationDeadline"
            value={formData.registrationDeadline}
            onChange={handleChange}
            className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 ${
              errors.registrationDeadline ? 'border-red-300' : 'border-gray-300'
            }`}
          />
          {errors.registrationDeadline && (
            <p className="mt-1 text-sm text-red-600">{errors.registrationDeadline}</p>
          )}
        </div>

        <div>
          <label htmlFor="meetingLink" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.meetingLink')}
          </label>
          <input
            type="url"
            id="meetingLink"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
            placeholder="https://zoom.us/j/..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.coverImage')}
          </label>
          <p className="mb-3 text-sm text-gray-500">{t('admin.events.form.coverImageHint')}</p>
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
            {coverPreviewUrl ? (
              <img
                src={coverPreviewUrl}
                alt=""
                className="mb-4 h-48 w-full rounded-lg object-cover"
              />
            ) : (
              <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-white text-gray-400">
                <i className="ri-image-add-line text-4xl" aria-hidden="true" />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => coverInputRef.current?.click()}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
                disabled={isLoading || !onCoverFileChange}
              >
                {t('admin.events.form.uploadCover')}
              </button>
              {hasCover && onCoverFileChange && (
                <button
                  type="button"
                  onClick={() => {
                    onCoverFileChange(null);
                    setFormData((prev) => ({ ...prev, imageUrl: '' }));
                    if (coverInputRef.current) coverInputRef.current.value = '';
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-white"
                  disabled={isLoading}
                >
                  {t('admin.events.form.removeCover')}
                </button>
              )}
              {coverFile && (
                <span className="text-sm text-emerald-800">
                  <i className="ri-checkbox-circle-line mr-1" aria-hidden="true" />
                  {coverFile.name}
                </span>
              )}
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                onCoverFileChange?.(file);
                if (file) {
                  setFormData((prev) => ({ ...prev, imageUrl: '' }));
                }
              }}
            />
            <div className="mt-4">
              <label htmlFor="imageUrl" className="mb-1 block text-xs font-medium text-gray-500">
                {t('admin.events.form.imageUrl')}
              </label>
              <input
                type="text"
                inputMode="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData((prev) => ({ ...prev, imageUrl: value }));
                  if (value && onCoverFileChange) {
                    onCoverFileChange(null);
                    if (coverInputRef.current) coverInputRef.current.value = '';
                  }
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="https://"
              />
              <p className="mt-1 text-xs text-gray-500">{t('admin.events.form.imageUrlHint')}</p>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="type" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.eventType')}
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
          >
            {typeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="zone" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.common.zone')}
          </label>
          <select
            id="zone"
            name="zone"
            value={formData.zone}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
          >
            {zoneOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="capacity" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.common.capacity')}
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 ${
              errors.capacity ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={t('admin.events.form.capacityPlaceholder')}
          />
          {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.common.status')} *
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className={`block w-full rounded-md border px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 ${
              errors.status ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-gray-500">{t('admin.events.form.statusHint')}</p>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
        </div>
        </div>
      </div>

      {onPendingAttachmentsChange && (
        <div>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {t('admin.events.attachments.title')}
          </h2>
          <p className="mb-4 text-sm text-gray-500">{t('admin.events.attachments.createHint')}</p>

          {pendingAttachments.length > 0 && (
            <ul className="mb-3 space-y-2">
              {pendingAttachments.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2"
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-800">
                    <i className="ri-upload-2-line mr-2 text-emerald-700" aria-hidden="true" />
                    {file.name}
                    <span className="ml-2 text-gray-500">({formatFileSize(file.size)})</span>
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onPendingAttachmentsChange(pendingAttachments.filter((_, i) => i !== index))
                    }
                    disabled={isLoading}
                    className="rounded-lg px-2 py-1 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    {t('admin.common.delete')}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <input
            ref={attachmentInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,image/jpeg,image/png,image/webp,image/gif"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              if (files.length > 0) {
                onPendingAttachmentsChange([...pendingAttachments, ...files]);
              }
              e.target.value = '';
            }}
          />
          <button
            type="button"
            disabled={isLoading}
            onClick={() => attachmentInputRef.current?.click()}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <i className="ri-attachment-2 mr-2" aria-hidden="true" />
            {t('admin.events.attachments.add')}
          </button>
          <p className="mt-3 text-xs text-gray-500">{t('admin.events.attachments.afterCreateNote')}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
              {t('admin.events.form.saving')}
            </div>
          ) : (
            submitButtonText ?? t('admin.common.save')
          )}
        </button>
      </div>
    </form>
  );
};

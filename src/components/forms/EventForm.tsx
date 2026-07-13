import React, { useState } from 'react';
import type { CreateEventRequest, UpdateEventRequest, Event } from '../../lib/api/types';
import { useTranslation } from 'react-i18next';

interface EventFormProps {
  initialValues?: Event;
  onSubmit: (data: CreateEventRequest | UpdateEventRequest) => Promise<void>;
  isLoading: boolean;
  submitButtonText?: string;
}

export const EventForm: React.FC<EventFormProps> = ({
  initialValues,
  onSubmit,
  isLoading,
  submitButtonText,
}) => {
  const { t } = useTranslation();
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="md:col-span-2 rounded-lg border border-emerald-100 bg-emerald-50/40 px-4 py-3">
          <p className="text-sm font-semibold text-emerald-900">{t('admin.content.lang.fr')}</p>
          <p className="mt-1 text-xs text-emerald-800/80">{t('admin.content.lang.frHint')}</p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.title')} (FR) *
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
            {t('admin.common.description')} (FR)
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

        <div>
          <label htmlFor="location" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.common.location')} (FR)
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

        <div className="md:col-span-2 rounded-lg border border-sky-100 bg-sky-50/50 px-4 py-3">
          <p className="text-sm font-semibold text-sky-900">{t('admin.content.lang.en')}</p>
          <p className="mt-1 text-xs text-sky-800/80">{t('admin.content.lang.enHint')}</p>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="titleEn" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.title')} (EN)
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
            {t('admin.common.description')} (EN)
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

        <div>
          <label htmlFor="locationEn" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.common.location')} (EN)
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

        <div>
          <label htmlFor="imageUrl" className="mb-1 block text-sm font-medium text-gray-700">
            {t('admin.events.form.imageUrl')}
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500"
            placeholder="https://example.com/event-image.jpg"
          />
          <p className="mt-1 text-sm text-gray-500">{t('admin.events.form.imageUrlHint')}</p>
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

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center rounded-md border border-transparent bg-emerald-700 px-6 py-2 text-sm font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

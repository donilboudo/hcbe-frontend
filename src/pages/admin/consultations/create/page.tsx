import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../components/admin/AdminBackButton';
import { consultationsApi } from '../../../lib/api/consultations';
import type { CreateConsultationRequest } from '../../../lib/api/types';
import {
  CONSULTATION_ACCENT_OPTIONS,
  CONSULTATION_ICON_OPTIONS,
  CONSULTATION_LAYOUT_OPTIONS,
} from '../consultation-form-utils';

const ConsultationCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateConsultationRequest>({
    title: '',
    description: '',
    icon: 'ri-chat-poll-line',
    layoutType: 'card',
    actionUrl: '',
    actionLabel: '',
    secondaryActionUrl: '',
    secondaryActionLabel: '',
    accentColor: 'emerald',
    displayOrder: 0,
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'number'
          ? parseInt(value, 10) || 0
          : type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await consultationsApi.createConsultation(formData);
      if (response.success && response.data) {
        navigate(`/admin/consultations/${response.data.id}`);
      } else {
        setError(response.message || t('admin.consultations.errorCreate'));
      }
    } catch (err) {
      console.error('Error creating consultation:', err);
      setError(t('admin.consultations.errorCreate'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/consultations" />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.consultations.createTitle')}</h1>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.title')} *</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.description')} *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.icon')}</label>
              <select name="icon" value={formData.icon} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500">
                {CONSULTATION_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.colLayout')}</label>
              <select name="layoutType" value={formData.layoutType} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500">
                {CONSULTATION_LAYOUT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.accentColor')}</label>
              <select name="accentColor" value={formData.accentColor} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500">
                {CONSULTATION_ACCENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{t(option.labelKey)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.colOrder')}</label>
              <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} min={0} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.actionUrl')}</label>
              <input type="text" name="actionUrl" value={formData.actionUrl} onChange={handleChange} placeholder="/contact" className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.actionLabel')}</label>
              <input type="text" name="actionLabel" value={formData.actionLabel} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            {formData.layoutType === 'featured' && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.secondaryActionUrl')}</label>
                  <input type="text" name="secondaryActionUrl" value={formData.secondaryActionUrl} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.consultations.secondaryActionLabel')}</label>
                  <input type="text" name="secondaryActionLabel" value={formData.secondaryActionLabel} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
                </div>
              </>
            )}
            <div className="flex items-center md:col-span-2">
              <label className="flex cursor-pointer items-center">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="ml-2 text-sm font-medium text-gray-700">{t('admin.common.active')}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button type="button" onClick={() => navigate('/admin/consultations')} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50" disabled={submitting}>
            {t('admin.common.cancel')}
          </button>
          <button type="submit" disabled={submitting} className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800 disabled:opacity-50">
            {submitting ? t('admin.common.loading') : t('admin.common.create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationCreatePage;

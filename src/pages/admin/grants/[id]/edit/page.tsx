import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../../components/admin/AdminBackButton';
import { grantsApi } from '../../../../../lib/api/grants';
import type { UpdateGrantProgramRequest } from '../../../../../lib/api/types';
import { GRANT_ICON_OPTIONS, formatCriteriaText, parseCriteriaText } from '../../grant-form-utils';

const GrantEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [criteriaText, setCriteriaText] = useState('');
  const [formData, setFormData] = useState<UpdateGrantProgramRequest & { title: string; description: string; icon: string; amount: string; duration: string }>({
    title: '',
    description: '',
    icon: 'ri-graduation-cap-line',
    amount: '',
    duration: '',
    applicationUrl: '',
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    const loadGrant = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await grantsApi.getGrantForAdmin(id);
        if (response.success && response.data) {
          const grant = response.data;
          setFormData({
            title: grant.title,
            description: grant.description,
            icon: grant.icon,
            amount: grant.amount,
            duration: grant.duration,
            applicationUrl: grant.applicationUrl || '',
            displayOrder: grant.displayOrder,
            isActive: grant.isActive,
          });
          setCriteriaText(formatCriteriaText(grant.eligibilityCriteria));
        } else {
          setError(t('admin.grants.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading grant:', err);
        setError(t('admin.grants.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    loadGrant();
  }, [id, t]);

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
    if (!id) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await grantsApi.updateGrant(id, {
        ...formData,
        eligibilityCriteria: parseCriteriaText(criteriaText),
      });
      if (response.success) {
        navigate(`/admin/grants/${id}`);
      } else {
        setError(response.message || t('admin.grants.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating grant:', err);
      setError(t('admin.grants.errorUpdate'));
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
      <AdminBackButton to={`/admin/grants/${id}`} label={t('admin.common.back')} />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.grants.editTitle')}</h1>
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
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.icon')} *</label>
              <select name="icon" value={formData.icon} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500">
                {GRANT_ICON_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colOrder')}</label>
              <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} min={0} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colAmount')} *</label>
              <input type="text" name="amount" value={formData.amount} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colDuration')} *</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.applicationUrl')}</label>
              <input type="url" name="applicationUrl" value={formData.applicationUrl} onChange={handleChange} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.criteria')} *</label>
              <textarea value={criteriaText} onChange={(e) => setCriteriaText(e.target.value)} required rows={6} className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500" />
              <p className="mt-1 text-xs text-gray-500">{t('admin.grants.criteriaHint')}</p>
            </div>
            <div className="flex items-center md:col-span-2">
              <label className="flex cursor-pointer items-center">
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="ml-2 text-sm font-medium text-gray-700">{t('admin.common.active')}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button type="button" onClick={() => navigate(`/admin/grants/${id}`)} className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition hover:bg-gray-50" disabled={submitting}>
            {t('admin.common.cancel')}
          </button>
          <button type="submit" disabled={submitting} className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800 disabled:opacity-50">
            {submitting ? t('admin.common.loading') : t('admin.common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrantEditPage;

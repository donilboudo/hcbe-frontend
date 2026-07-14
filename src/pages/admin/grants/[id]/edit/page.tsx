import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../../components/admin/AdminBackButton';
import {
  AdminLanguageTabs,
  isEnglishContentIncomplete,
} from '../../../../../components/admin/AdminLanguageTabs';
import { grantsApi } from '../../../../../lib/api/grants';
import type { UpdateGrantProgramRequest } from '../../../../../lib/api/types';
import { GRANT_ICON_OPTIONS, formatCriteriaText, parseCriteriaText } from '../../grant-form-utils';

const fieldClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500';

const GrantEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [criteriaText, setCriteriaText] = useState('');
  const [criteriaTextEn, setCriteriaTextEn] = useState('');
  const [formData, setFormData] = useState<
    UpdateGrantProgramRequest & {
      title: string;
      description: string;
      icon: string;
      amount: string;
      duration: string;
    }
  >({
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    icon: 'ri-graduation-cap-line',
    amount: '',
    amountEn: '',
    duration: '',
    durationEn: '',
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
            titleEn: grant.titleEn || '',
            description: grant.description,
            descriptionEn: grant.descriptionEn || '',
            icon: grant.icon,
            amount: grant.amount,
            amountEn: grant.amountEn || '',
            duration: grant.duration,
            durationEn: grant.durationEn || '',
            applicationUrl: grant.applicationUrl || '',
            displayOrder: grant.displayOrder,
            isActive: grant.isActive,
          });
          setCriteriaText(formatCriteriaText(grant.eligibilityCriteria));
          setCriteriaTextEn(formatCriteriaText(grant.eligibilityCriteriaEn || []));
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
        eligibilityCriteriaEn: parseCriteriaText(criteriaTextEn),
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

  const enIncomplete = isEnglishContentIncomplete([
    [formData.title, formData.titleEn],
    [formData.description, formData.descriptionEn],
    [formData.amount, formData.amountEn],
    [formData.duration, formData.durationEn],
    [criteriaText, criteriaTextEn],
  ]);

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <AdminBackButton to={`/admin/grants/${id}`} label={t('admin.common.back')} />
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{t('admin.grants.editTitle')}</h1>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-8 p-4 sm:p-6">
          <AdminLanguageTabs
            enIncomplete={enIncomplete}
            frPanel={
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.title')} *</label>
                  <input type="text" name="title" value={formData.title} onChange={handleChange} required className={fieldClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.description')} *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} required rows={4} className={fieldClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colAmount')} *</label>
                  <input type="text" name="amount" value={formData.amount} onChange={handleChange} required className={fieldClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colDuration')} *</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className={fieldClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.criteria')} *</label>
                  <textarea value={criteriaText} onChange={(e) => setCriteriaText(e.target.value)} required rows={6} className={fieldClass} />
                  <p className="mt-1 text-xs text-gray-500">{t('admin.grants.criteriaHint')}</p>
                </div>
              </div>
            }
            enPanel={
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.title')}</label>
                  <input type="text" name="titleEn" value={formData.titleEn || ''} onChange={handleChange} className={fieldClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.description')}</label>
                  <textarea name="descriptionEn" value={formData.descriptionEn || ''} onChange={handleChange} rows={4} className={fieldClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colAmount')}</label>
                  <input type="text" name="amountEn" value={formData.amountEn || ''} onChange={handleChange} className={fieldClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colDuration')}</label>
                  <input type="text" name="durationEn" value={formData.durationEn || ''} onChange={handleChange} className={fieldClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.criteria')}</label>
                  <textarea value={criteriaTextEn} onChange={(e) => setCriteriaTextEn(e.target.value)} rows={6} className={fieldClass} />
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
                <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.icon')} *</label>
                <select name="icon" value={formData.icon} onChange={handleChange} className={fieldClass}>
                  {GRANT_ICON_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.colOrder')}</label>
                <input type="number" name="displayOrder" value={formData.displayOrder} onChange={handleChange} min={0} className={fieldClass} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.grants.applicationUrl')}</label>
                <input type="url" name="applicationUrl" value={formData.applicationUrl} onChange={handleChange} className={fieldClass} />
              </div>
              <div className="flex items-center md:col-span-2">
                <label className="flex cursor-pointer items-center">
                  <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700">{t('admin.common.active')}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-200 bg-gray-50 px-4 py-4 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-3 sm:px-6">
          <button type="button" onClick={() => navigate(`/admin/grants/${id}`)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 transition hover:bg-gray-50 sm:w-auto" disabled={submitting}>
            {t('admin.common.cancel')}
          </button>
          <button type="submit" disabled={submitting} className="w-full rounded-lg bg-emerald-700 px-4 py-2.5 text-white transition hover:bg-emerald-800 disabled:opacity-50 sm:w-auto">
            {submitting ? t('admin.common.loading') : t('admin.common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GrantEditPage;

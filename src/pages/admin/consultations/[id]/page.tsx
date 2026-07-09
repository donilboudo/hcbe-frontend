import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { consultationsApi } from '../../../../lib/api/consultations';
import type { Consultation } from '../../../../lib/api/types';

const ConsultationViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [item, setItem] = useState<Consultation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItem = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await consultationsApi.getConsultationForAdmin(id);
        if (response.success && response.data) {
          setItem(response.data);
        } else {
          setError(response.message || t('admin.consultations.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading consultation:', err);
        setError(err instanceof Error ? err.message : t('admin.consultations.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id, t]);

  const handleDelete = async () => {
    if (!id || !item) return;
    if (!window.confirm(t('admin.common.confirmDelete', { name: item.title }))) return;

    try {
      const response = await consultationsApi.deleteConsultation(id);
      if (response.success) {
        navigate('/admin/consultations');
      }
    } catch (err) {
      console.error('Error deleting consultation:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error || t('admin.consultations.errorLoad')}</p>
        <Link to="/admin/consultations" className="text-emerald-700 hover:text-emerald-900">
          {t('admin.common.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/consultations" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
            <i className={`${item.icon} text-2xl text-emerald-600`} aria-hidden="true"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{item.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {item.isActive ? t('admin.common.active') : t('admin.common.inactive')} ·{' '}
              {item.layoutType === 'featured' ? t('admin.consultations.layoutFeatured') : t('admin.consultations.layoutCard')} ·{' '}
              {t('admin.consultations.colOrder')}: {item.displayOrder}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link to={`/admin/consultations/${item.id}/edit`} className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800">
            {t('admin.common.edit')}
          </Link>
          <button type="button" onClick={handleDelete} className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700">
            {t('admin.common.delete')}
          </button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-sm leading-6 text-gray-700">{item.description}</p>
        <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {item.actionUrl && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t('admin.consultations.actionUrl')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.actionUrl}</dd>
            </div>
          )}
          {item.actionLabel && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t('admin.consultations.actionLabel')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.actionLabel}</dd>
            </div>
          )}
          {item.secondaryActionUrl && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t('admin.consultations.secondaryActionUrl')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.secondaryActionUrl}</dd>
            </div>
          )}
          {item.secondaryActionLabel && (
            <div>
              <dt className="text-sm font-medium text-gray-500">{t('admin.consultations.secondaryActionLabel')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{item.secondaryActionLabel}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default ConsultationViewPage;

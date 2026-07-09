import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { grantsApi } from '../../../../lib/api/grants';
import type { GrantProgram } from '../../../../lib/api/types';

const GrantViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [grant, setGrant] = useState<GrantProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGrant = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await grantsApi.getGrantForAdmin(id);
        if (response.success && response.data) {
          setGrant(response.data);
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

  const handleDelete = async () => {
    if (!id || !grant) return;
    if (!window.confirm(t('admin.common.confirmDelete', { name: grant.title }))) return;

    try {
      const response = await grantsApi.deleteGrant(id);
      if (response.success) {
        navigate('/admin/grants');
      }
    } catch (err) {
      console.error('Error deleting grant:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !grant) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error || t('admin.grants.errorLoad')}</p>
        <Link to="/admin/grants" className="text-emerald-700 hover:text-emerald-900">
          {t('admin.common.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/grants" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50">
            <i className={`${grant.icon} text-2xl text-emerald-600`} aria-hidden="true"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{grant.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {grant.isActive ? t('admin.common.active') : t('admin.common.inactive')} · {t('admin.grants.colOrder')}: {grant.displayOrder}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/admin/grants/${grant.id}/edit`}
            className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            {t('admin.common.edit')}
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            {t('admin.common.delete')}
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <p className="text-sm leading-6 text-gray-700">{grant.description}</p>
        <dl className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('admin.grants.colAmount')}</dt>
            <dd className="mt-1 text-sm font-semibold text-emerald-700">{grant.amount}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">{t('admin.grants.colDuration')}</dt>
            <dd className="mt-1 text-sm text-gray-900">{grant.duration}</dd>
          </div>
          {grant.applicationUrl && (
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-500">{t('admin.grants.applicationUrl')}</dt>
              <dd className="mt-1 text-sm">
                <a href={grant.applicationUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                  {grant.applicationUrl}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </div>

      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-gray-900">{t('admin.grants.criteria')}</h2>
        <ul className="mt-4 space-y-2">
          {grant.eligibilityCriteria.map((criterion) => (
            <li key={criterion} className="flex items-start gap-2 text-sm text-gray-700">
              <i className="ri-checkbox-circle-line mt-0.5 text-emerald-600" aria-hidden="true"></i>
              {criterion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GrantViewPage;

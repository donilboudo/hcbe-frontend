import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { grantsApi } from '../../../lib/api/grants';
import type { GrantProgram } from '../../../lib/api/types';

const GrantsAdminPage: React.FC = () => {
  const { t } = useTranslation();
  const [grants, setGrants] = useState<GrantProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadGrants = async () => {
    try {
      setLoading(true);
      const response = await grantsApi.getGrantsForAdmin();
      if (response.success && response.data) {
        setGrants(response.data);
      } else {
        setError(t('admin.grants.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading grants:', err);
      setError(t('admin.grants.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGrants();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await grantsApi.toggleGrantStatus(id);
      if (response.success) {
        loadGrants();
      }
    } catch (err) {
      console.error('Error toggling grant status:', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(t('admin.common.confirmDelete', { name: title }))) return;

    try {
      const response = await grantsApi.deleteGrant(id);
      if (response.success) {
        loadGrants();
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

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          type="button"
          onClick={loadGrants}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
        >
          {t('admin.common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.grants.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('admin.grants.subtitle')}</p>
        </div>
        <Link
          to="/admin/grants/create"
          className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
        >
          <i className="ri-add-line mr-2" aria-hidden="true"></i>
          {t('admin.grants.create')}
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.grants.colProgram')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.grants.colAmount')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.grants.colDuration')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.grants.colOrder')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {grants.map((grant) => (
                <tr key={grant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                        <i className={`${grant.icon} text-lg text-emerald-600`} aria-hidden="true"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{grant.title}</div>
                        <div className="line-clamp-1 max-w-xs text-sm text-gray-500">{grant.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{grant.amount}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{grant.duration}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        grant.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {grant.isActive ? t('admin.common.active') : t('admin.common.inactive')}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{grant.displayOrder}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/grants/${grant.id}`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.view')}
                      >
                        <i className="ri-eye-line" aria-hidden="true"></i>
                      </Link>
                      <Link
                        to={`/admin/grants/${grant.id}/edit`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.edit')}
                      >
                        <i className="ri-edit-line" aria-hidden="true"></i>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(grant.id)}
                        className={grant.isActive ? 'text-amber-600 hover:text-amber-900' : 'text-emerald-600 hover:text-emerald-900'}
                        title={grant.isActive ? t('admin.grants.deactivate') : t('admin.grants.activate')}
                      >
                        <i className={grant.isActive ? 'ri-pause-circle-line' : 'ri-play-circle-line'} aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(grant.id, grant.title)}
                        className="text-red-600 hover:text-red-900"
                        title={t('admin.common.delete')}
                      >
                        <i className="ri-delete-bin-line" aria-hidden="true"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {grants.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">{t('admin.grants.emptyTitle')}</p>
          <Link
            to="/admin/grants/create"
            className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            <i className="ri-add-line mr-2" aria-hidden="true"></i>
            {t('admin.grants.createFirst')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default GrantsAdminPage;

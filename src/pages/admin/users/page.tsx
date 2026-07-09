import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usersApi } from '../../../lib/api/users';
import type { AdminUser } from '../../../lib/api/types';
import { useAuth } from '../../../contexts/AuthContext';

const AdminUsersPage: React.FC = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getAdminUsers();
      if (response.success && response.data) {
        setUsers(response.data);
        setError(null);
      } else {
        setError(response.message || t('admin.users.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading admin users:', err);
      setError(err instanceof Error ? err.message : t('admin.users.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(t('admin.common.confirmDelete', { name: email }))) return;

    try {
      const response = await usersApi.deleteAdminUser(id);
      if (response.success) {
        loadUsers();
      } else {
        window.alert(response.message || t('admin.common.errorDelete'));
      }
    } catch (err) {
      console.error('Error deleting admin user:', err);
    }
  };

  const displayName = (user: AdminUser) =>
    [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email;

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
        <button type="button" onClick={loadUsers} className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800">
          {t('admin.common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.users.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('admin.users.subtitle')}</p>
        </div>
        <Link
          to="/admin/users/create"
          className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
        >
          <i className="ri-add-line mr-2" aria-hidden="true"></i>
          {t('admin.users.create')}
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.users.colUser')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.email')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.date')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                        <i className="ri-shield-user-line text-lg" aria-hidden="true"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {displayName(user)}
                          {currentUser?.id === user.id && (
                            <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                              {t('admin.users.you')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{user.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/users/${user.id}/edit`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.edit')}
                      >
                        <i className="ri-edit-line" aria-hidden="true"></i>
                      </Link>
                      {currentUser?.id !== user.id && (
                        <button
                          type="button"
                          onClick={() => handleDelete(user.id, user.email)}
                          className="text-red-600 hover:text-red-900"
                          title={t('admin.common.delete')}
                        >
                          <i className="ri-delete-bin-line" aria-hidden="true"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {users.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">{t('admin.users.emptyTitle')}</p>
          <Link
            to="/admin/users/create"
            className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            <i className="ri-add-line mr-2" aria-hidden="true"></i>
            {t('admin.users.createFirst')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;

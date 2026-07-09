import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { usersApi } from '../../../../lib/api/users';
import type { CreateAdminUserRequest } from '../../../../lib/api/types';

const AdminUserCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateAdminUserRequest>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await usersApi.createAdminUser(formData);
      if (response.success) {
        navigate('/admin/users');
      } else {
        setError(response.message || t('admin.users.errorCreate'));
      }
    } catch (err) {
      console.error('Error creating admin user:', err);
      setError(t('admin.users.errorCreate'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <AdminBackButton to="/admin/users" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.users.createTitle')}</h1>
        <p className="mt-1 text-sm text-gray-600">{t('admin.users.createHint')}</p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.email')} *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.common.password')} *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
            <p className="mt-1 text-xs text-gray-500">{t('admin.users.passwordHint')}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.users.firstName')}</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.users.lastName')}</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={() => navigate('/admin/users')}
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
            {submitting ? t('admin.common.loading') : t('admin.users.create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserCreatePage;

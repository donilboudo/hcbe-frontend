import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../../components/admin/AdminBackButton';
import { usersApi } from '../../../../../lib/api/users';
import type { UpdateAdminUserRequest } from '../../../../../lib/api/types';

const AdminUserEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState<UpdateAdminUserRequest>({
    firstName: '',
    lastName: '',
    password: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await usersApi.getAdminUser(id);
        if (response.success && response.data) {
          setEmail(response.data.email);
          setFormData({
            firstName: response.data.firstName || '',
            lastName: response.data.lastName || '',
            password: '',
          });
        } else {
          setError(response.message || t('admin.users.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading admin user:', err);
        setError(err instanceof Error ? err.message : t('admin.users.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);
    setError(null);

    const payload: UpdateAdminUserRequest = {
      firstName: formData.firstName,
      lastName: formData.lastName,
    };
    if (formData.password?.trim()) {
      payload.password = formData.password;
    }

    try {
      const response = await usersApi.updateAdminUser(id, payload);
      if (response.success) {
        navigate('/admin/users');
      } else {
        setError(response.message || t('admin.users.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating admin user:', err);
      setError(t('admin.users.errorUpdate'));
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
    <div className="mx-auto max-w-2xl">
      <AdminBackButton to="/admin/users" />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.users.editTitle')}</h1>
        <p className="mt-1 text-sm text-gray-600">{email}</p>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
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
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">{t('admin.users.newPassword')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              autoComplete="new-password"
              placeholder={t('admin.users.newPasswordHint')}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
            />
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
            {submitting ? t('admin.common.loading') : t('admin.common.save')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserEditPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../../components/admin/AdminBackButton';
import { membersApi } from '../../../../../lib/api/members';
import type { UpdateMemberRequest } from '../../../../../lib/api/types';

const provinces = [
  'Alberta',
  'Colombie-Britannique',
  'Manitoba',
  'Nouveau-Brunswick',
  'Terre-Neuve-et-Labrador',
  'Nouvelle-Écosse',
  'Ontario',
  'Île-du-Prince-Édouard',
  'Québec',
  'Saskatchewan',
];

const MemberEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateMemberRequest>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    province: '',
    profession: '',
    expertise: '',
    interests: '',
    availability: '',
    zone: '',
  });

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await membersApi.getMemberById(id);
        if (response.success && response.data) {
          const member = response.data;
          setFormData({
            firstName: member.firstName,
            lastName: member.lastName,
            email: member.email,
            phone: member.phone || '',
            city: member.city || '',
            province: member.province || '',
            profession: member.profession || '',
            expertise: member.expertise || '',
            interests: member.interests || '',
            availability: member.availability || '',
            zone: member.zone || '',
          });
        } else {
          setError(t('admin.members.errorLoad'));
        }
      } catch (err) {
        console.error('Error loading member:', err);
        setError(t('admin.members.errorLoad'));
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [id, t]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await membersApi.updateMember(id, formData);
      if (response.success) {
        navigate(`/admin/members/${id}`);
      } else {
        setError(response.message || t('admin.members.errorUpdate'));
      }
    } catch (err) {
      console.error('Error updating member:', err);
      setError(t('admin.members.errorUpdate'));
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
      <AdminBackButton to={`/admin/members/${id}`} label={t('admin.common.back')} />

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.members.editTitle')}</h1>
      </div>

      {error && (
        <div className="mb-6 rounded border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="overflow-hidden rounded-lg bg-white shadow">
        <div className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.firstName')} *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.lastName')} *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.common.email')} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.phone')}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.city')}
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.province')}
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">{t('admin.members.selectProvince')}</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.profession')}
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.expertise')}
              </label>
              <input
                type="text"
                name="expertise"
                value={formData.expertise}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.common.zone')}
              </label>
              <select
                name="zone"
                value={formData.zone}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              >
                <option value="">{t('admin.members.selectZone')}</option>
                <option value="Zone 1">Zone 1</option>
                <option value="Zone 2">Zone 2</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.members.interests')}
              </label>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            type="button"
            onClick={() => navigate(`/admin/members/${id}`)}
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

export default MemberEditPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { membersApi } from '../../../../lib/api/members';
import type { MemberDto } from '../../../../lib/api/types';

const MemberViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [member, setMember] = useState<MemberDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMember = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await membersApi.getMemberById(id);
        if (response.success && response.data) {
          setMember(response.data);
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

  const handleDelete = async () => {
    if (!id || !member) return;
    if (!window.confirm(t('admin.common.confirmDelete', { name: `${member.firstName} ${member.lastName}` }))) {
      return;
    }

    try {
      const response = await membersApi.deleteMember(id);
      if (response.success) {
        navigate('/admin/members');
      }
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error || t('admin.members.errorLoad')}</p>
        <Link to="/admin/members" className="text-emerald-700 hover:text-emerald-900">
          {t('admin.common.back')}
        </Link>
      </div>
    );
  }

  const fields = [
    { label: t('admin.common.email'), value: member.email },
    { label: t('admin.members.phone'), value: member.phone },
    { label: t('admin.members.city'), value: member.city },
    { label: t('admin.members.province'), value: member.province },
    { label: t('admin.members.profession'), value: member.profession },
    { label: t('admin.members.expertise'), value: member.expertise },
    { label: t('admin.common.zone'), value: member.zone },
    { label: t('admin.members.interests'), value: member.interests },
    { label: t('admin.members.availability'), value: member.availability },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/members" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {member.firstName} {member.lastName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('admin.members.memberSince', { date: new Date(member.createdAt).toLocaleDateString() })}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/admin/members/${member.id}/edit`}
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

      <div className="rounded-lg bg-white p-6 shadow">
        <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
              <dd className="mt-1 text-sm text-gray-900">{field.value || t('admin.common.na')}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default MemberViewPage;

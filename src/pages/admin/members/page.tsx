import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { membersApi } from '../../../lib/api/members';
import type { MemberDto } from '../../../lib/api/types';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<MemberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const loadMembers = async () => {
    try {
      setLoading(true);
      const response = await membersApi.getAllMembers();
      if (response.success && response.data) {
        setMembers(response.data);
      } else {
        setError(t('admin.members.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading members:', err);
      setError(t('admin.members.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(t('admin.common.confirmDelete', { name }))) {
      return;
    }

    try {
      const response = await membersApi.deleteMember(id);
      if (response.success) {
        loadMembers();
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

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error}</p>
        <button
          type="button"
          onClick={loadMembers}
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
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.members.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('admin.members.subtitle')}</p>
        </div>
        <Link
          to="/admin/members/create"
          className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
        >
          <i className="ri-add-line mr-2" aria-hidden="true"></i>
          {t('admin.members.create')}
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.members.colMember')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.members.colProfession')}
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
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {member.firstName} {member.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {[member.city, member.province].filter(Boolean).join(', ') || t('admin.common.na')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {member.profession || t('admin.common.na')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(member.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/members/${member.id}`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.view')}
                      >
                        <i className="ri-eye-line" aria-hidden="true"></i>
                      </Link>
                      <Link
                        to={`/admin/members/${member.id}/edit`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.edit')}
                      >
                        <i className="ri-edit-line" aria-hidden="true"></i>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(member.id, `${member.firstName} ${member.lastName}`)}
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

      {members.length === 0 && (
        <div className="py-12 text-center">
          <p className="mb-4 text-gray-500">{t('admin.members.emptyTitle')}</p>
          <Link
            to="/admin/members/create"
            className="inline-flex items-center rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            <i className="ri-add-line mr-2" aria-hidden="true"></i>
            {t('admin.members.createFirst')}
          </Link>
        </div>
      )}
    </div>
  );
};

export default MembersPage;

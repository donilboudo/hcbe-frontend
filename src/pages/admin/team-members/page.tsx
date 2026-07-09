import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { teamMembersApi } from '../../../lib/api/team-members';
import type { TeamMemberDto } from '../../../lib/api/types';
import { buildApiUrl } from '../../../lib/api/base-url';

const TeamMembersPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMemberDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const loadTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamMembersApi.getAllTeamMembers();
      if (response.success && response.data) {
        setTeamMembers(response.data);
      } else {
        setError(t('admin.team.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading team members:', err);
      setError(t('admin.team.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const handleToggleStatus = async (id: string) => {
    try {
      const response = await teamMembersApi.toggleTeamMemberStatus(id);
      if (response.success) {
        loadTeamMembers(); // Reload list
      }
    } catch (err) {
      console.error('Error toggling team member status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('admin.common.confirmDeleteGeneric'))) {
      try {
        const response = await teamMembersApi.deleteTeamMember(id);
        if (response.success) {
          loadTeamMembers(); // Reload list
        }
      } catch (err) {
        console.error('Error deleting team member:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={loadTeamMembers}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {t('admin.common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('admin.team.title')}</h1>
        <a
          href="/admin/team-members/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <i className="ri-add-line mr-2"></i>
          {t('admin.team.create')}
        </a>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.team.colMember')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.team.colPosition')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.common.zone')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.common.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.team.colOrder')}
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('admin.common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={member.photo || buildApiUrl('/api/placeholder/40/40')}
                          alt={member.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.zone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      member.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.isActive ? t('admin.common.active') : t('admin.common.inactive')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.order}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <a
                        href={`/admin/team-members/${member.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title={t('admin.common.view')}
                      >
                        <i className="ri-eye-line"></i>
                      </a>
                      <a
                        href={`/admin/team-members/${member.id}/edit`}
                        className="text-indigo-600 hover:text-indigo-900"
                        title={t('admin.common.edit')}
                      >
                        <i className="ri-edit-line"></i>
                      </a>
                      <button
                        onClick={() => handleToggleStatus(member.id)}
                        className={`${
                          member.isActive 
                            ? 'text-yellow-600 hover:text-yellow-900' 
                            : 'text-green-600 hover:text-green-900'
                        }`}
                        title={member.isActive ? t('admin.team.deactivate') : t('admin.team.activate')}
                      >
                        {member.isActive ? (
                          <i className="ri-pause-circle-line"></i>
                        ) : (
                          <i className="ri-play-circle-line"></i>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-600 hover:text-red-900"
                        title={t('admin.common.delete')}
                      >
                        <i className="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">{t('admin.team.emptyTitle')}</p>
          <a
            href="/admin/team-members/create"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="ri-add-line mr-2"></i>
            {t('admin.team.createFirst')}
          </a>
        </div>
      )}
    </div>
  );
};

export default TeamMembersPage;
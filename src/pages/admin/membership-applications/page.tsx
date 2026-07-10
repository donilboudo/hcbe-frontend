import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { membershipApplicationsApi } from '../../../lib/api/membership-applications';
import type { MembershipApplicationDto, MembershipApplicationStatus } from '../../../lib/api/types';

const statusBadgeClass = (status: MembershipApplicationStatus) => {
  switch (status) {
    case 'Pending':
      return 'bg-amber-100 text-amber-800';
    case 'Approved':
      return 'bg-emerald-100 text-emerald-800';
    case 'Rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const MembershipApplicationsPage: React.FC = () => {
  const { t } = useTranslation();
  const [applications, setApplications] = useState<MembershipApplicationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<MembershipApplicationStatus | 'all'>('Pending');
  const [actionId, setActionId] = useState<string | null>(null);

  const loadApplications = async () => {
    try {
      setLoading(true);
      const response = await membershipApplicationsApi.getAll(
        statusFilter === 'all' ? undefined : statusFilter,
      );
      if (response.success && response.data) {
        setApplications(response.data);
      } else {
        setError(t('admin.applications.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading applications:', err);
      setError(t('admin.applications.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [statusFilter]);

  const handleApprove = async (id: string) => {
    if (!window.confirm(t('admin.applications.confirmApprove'))) return;

    try {
      setActionId(id);
      const response = await membershipApplicationsApi.approve(id);
      if (response.success) {
        loadApplications();
      }
    } catch (err) {
      console.error('Error approving application:', err);
    } finally {
      setActionId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm(t('admin.applications.confirmReject'))) return;

    try {
      setActionId(id);
      const response = await membershipApplicationsApi.reject(id);
      if (response.success) {
        loadApplications();
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('admin.common.confirmDeleteGeneric'))) return;

    try {
      const response = await membershipApplicationsApi.delete(id);
      if (response.success) {
        loadApplications();
      }
    } catch (err) {
      console.error('Error deleting application:', err);
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
          onClick={loadApplications}
          className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800"
        >
          {t('admin.common.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-600">{t('admin.applications.subtitle')}</p>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as MembershipApplicationStatus | 'all')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 sm:w-auto"
        >
          <option value="Pending">{t('admin.applications.filterPending')}</option>
          <option value="Approved">{t('admin.applications.filterApproved')}</option>
          <option value="Rejected">{t('admin.applications.filterRejected')}</option>
          <option value="all">{t('admin.applications.filterAll')}</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.applications.colApplicant')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.location')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  {t('admin.common.status')}
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
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {application.firstName} {application.lastName}
                    </div>
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {[application.city, application.province].filter(Boolean).join(', ') || t('admin.common.na')}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusBadgeClass(application.status)}`}
                    >
                      {t(`admin.applications.status.${application.status.toLowerCase()}`)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(application.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/membership-applications/${application.id}`}
                        className="text-emerald-700 hover:text-emerald-900"
                        title={t('admin.common.view')}
                      >
                        <i className="ri-eye-line" aria-hidden="true"></i>
                      </Link>
                      {application.status === 'Pending' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleApprove(application.id)}
                            disabled={actionId === application.id}
                            className="text-emerald-600 hover:text-emerald-900 disabled:opacity-50"
                            title={t('admin.applications.approve')}
                          >
                            <i className="ri-check-line" aria-hidden="true"></i>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(application.id)}
                            disabled={actionId === application.id}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            title={t('admin.applications.reject')}
                          >
                            <i className="ri-close-line" aria-hidden="true"></i>
                          </button>
                        </>
                      )}
                      {application.status === 'Approved' && application.memberId && (
                        <Link
                          to={`/admin/members/${application.memberId}`}
                          className="text-indigo-600 hover:text-indigo-900"
                          title={t('admin.applications.viewMember')}
                        >
                          <i className="ri-user-line" aria-hidden="true"></i>
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(application.id)}
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

      {applications.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-gray-500">{t('admin.applications.emptyTitle')}</p>
        </div>
      )}
    </div>
  );
};

export default MembershipApplicationsPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AdminBackButton } from '../../../../components/admin/AdminBackButton';
import { membershipApplicationsApi } from '../../../../lib/api/membership-applications';
import type { MembershipApplicationDto } from '../../../../lib/api/types';

const MembershipApplicationViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [application, setApplication] = useState<MembershipApplicationDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadApplication = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await membershipApplicationsApi.getById(id);
      if (response.success && response.data) {
        setApplication(response.data);
      } else {
        setError(t('admin.applications.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading application:', err);
      setError(t('admin.applications.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  const handleApprove = async () => {
    if (!id || !window.confirm(t('admin.applications.confirmApprove'))) return;

    try {
      setActionLoading(true);
      const response = await membershipApplicationsApi.approve(id);
      if (response.success && response.data) {
        navigate(`/admin/members/${response.data.id}`);
      } else {
        await loadApplication();
      }
    } catch (err) {
      console.error('Error approving application:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!id || !window.confirm(t('admin.applications.confirmReject'))) return;

    try {
      setActionLoading(true);
      const response = await membershipApplicationsApi.reject(id);
      if (response.success) {
        await loadApplication();
      }
    } catch (err) {
      console.error('Error rejecting application:', err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-red-600">{error || t('admin.applications.errorLoad')}</p>
        <Link to="/admin/membership-applications" className="text-emerald-700 hover:text-emerald-900">
          {t('admin.common.back')}
        </Link>
      </div>
    );
  }

  const fields = [
    { label: t('admin.common.email'), value: application.email },
    { label: t('admin.members.phone'), value: application.phone },
    { label: t('admin.members.city'), value: application.city },
    { label: t('admin.members.province'), value: application.province },
    { label: t('admin.members.profession'), value: application.profession },
    { label: t('admin.members.expertise'), value: application.expertise },
    { label: t('admin.common.status'), value: t(`admin.applications.status.${application.status.toLowerCase()}`) },
    { label: t('admin.common.date'), value: new Date(application.createdAt).toLocaleString() },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <AdminBackButton to="/admin/membership-applications" />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {application.firstName} {application.lastName}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t('admin.applications.detailSubtitle')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {application.status === 'Pending' && (
            <>
              <button
                type="button"
                onClick={handleApprove}
                disabled={actionLoading}
                className="rounded-lg bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800 disabled:opacity-50"
              >
                {t('admin.applications.approve')}
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={actionLoading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {t('admin.applications.reject')}
              </button>
            </>
          )}
          {application.status === 'Approved' && application.memberId && (
            <Link
              to={`/admin/members/${application.memberId}`}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
            >
              {t('admin.applications.viewMember')}
            </Link>
          )}
        </div>
      </div>

      <div className="mb-6 rounded-lg bg-white p-6 shadow">
        <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.label}>
              <dt className="text-sm font-medium text-gray-500">{field.label}</dt>
              <dd className="mt-1 text-sm text-gray-900">{field.value || t('admin.common.na')}</dd>
            </div>
          ))}
        </dl>
      </div>

      {application.motivation && (
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-900">{t('admin.applications.motivation')}</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {application.motivation}
          </p>
        </div>
      )}
    </div>
  );
};

export default MembershipApplicationViewPage;

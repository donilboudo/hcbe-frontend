import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { associationsApi } from '../../../../lib/api/associations';
import type { Association } from '../../../../lib/api/types';

export const ViewAssociationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [association, setAssociation] = useState<Association | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const loadAssociation = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await associationsApi.getAssociationForAdmin(id);
        if (response.success && response.data) {
          setAssociation(response.data);
        } else {
          setError(t('admin.associations.errorNotFound'));
        }
      } catch (err) {
        console.error('Error loading association:', err);
        setError(t('admin.associations.errorLoad'));
      } finally {
        setIsLoading(false);
      }
    };

    loadAssociation();
  }, [id, t]);

  const handleDelete = async () => {
    if (!association || !window.confirm(t('admin.common.confirmDelete', { name: association.name }))) {
      return;
    }

    try {
      const response = await associationsApi.deleteAssociation(association.id);
      if (response.success) {
        navigate('/admin/associations');
      } else {
        setError(t('admin.associations.errorDelete'));
      }
    } catch (err) {
      console.error('Error deleting association:', err);
      setError(t('admin.associations.errorDelete'));
    }
  };

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';
  const formatDateTime = (value: string) =>
    new Date(value).toLocaleString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (error || !association) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="py-12 text-center">
          <div className="inline-block rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {error || t('admin.associations.errorNotFound')}
          </div>
          <div className="mt-4">
            <Link to="/admin/associations" className="text-emerald-600 hover:text-emerald-800">
              {t('admin.common.backToList')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin/associations" className="text-gray-500 hover:text-gray-700">
              <i className="ri-arrow-left-line text-xl" aria-hidden="true"></i>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{association.name}</h1>
              <p className="text-gray-500">
                {association.city}, {association.province}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link
              to={`/admin/associations/${association.id}/edit`}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              <i className="ri-edit-line mr-2" aria-hidden="true"></i>
              {t('admin.common.edit')}
            </Link>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
            >
              <i className="ri-delete-bin-line mr-2" aria-hidden="true"></i>
              {t('admin.common.delete')}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</div>
      )}

      <div className="space-y-6">
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="p-6">
            <div className="flex items-start space-x-6">
              {association.imageUrl && (
                <div className="shrink-0">
                  <img
                    src={association.imageUrl}
                    alt={association.name}
                    className="h-32 w-32 rounded-lg border border-gray-300 object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <div className="flex-1">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {t('admin.associations.sectionBasic')}
                    </h3>
                    <dl className="space-y-1">
                      <div className="flex">
                        <dt className="w-28 text-sm font-medium text-gray-500">{t('admin.common.status')}</dt>
                        <dd className="text-sm text-gray-900">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              association.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {association.isActive ? t('admin.common.active') : t('admin.common.inactive')}
                          </span>
                        </dd>
                      </div>
                      {association.foundedYear && (
                        <div className="flex">
                          <dt className="w-28 text-sm font-medium text-gray-500">
                            {t('admin.associations.foundedLabel')}
                          </dt>
                          <dd className="text-sm text-gray-900">{association.foundedYear}</dd>
                        </div>
                      )}
                      {association.memberCount && (
                        <div className="flex">
                          <dt className="w-28 text-sm font-medium text-gray-500">
                            {t('admin.associations.colMembers')}
                          </dt>
                          <dd className="text-sm text-gray-900">{association.memberCount}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-gray-900">
                      {t('admin.associations.sectionLeadership')}
                    </h3>
                    <dl className="space-y-1">
                      {association.president && (
                        <div className="flex">
                          <dt className="w-28 text-sm font-medium text-gray-500">
                            {t('admin.associations.president')}
                          </dt>
                          <dd className="text-sm text-gray-900">{association.president}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {association.description && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {t('admin.associations.description')}
                </h3>
                <p className="text-gray-700">{association.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t('admin.associations.sectionDomains')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {association.domains.map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
              >
                {domain}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t('admin.associations.sectionContact')}
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                {t('admin.associations.locationLabel')}
              </h4>
              <p className="text-gray-900">
                {association.city}, {association.province}
              </p>
            </div>
            {association.contact && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  {t('admin.associations.emailLabel')}
                </h4>
                <a href={`mailto:${association.contact}`} className="text-emerald-600 hover:text-emerald-800">
                  {association.contact}
                </a>
              </div>
            )}
            {association.phone && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  {t('admin.associations.phone')}
                </h4>
                <a href={`tel:${association.phone}`} className="text-emerald-600 hover:text-emerald-800">
                  {association.phone}
                </a>
              </div>
            )}
            {association.website && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  {t('admin.associations.website')}
                </h4>
                <a
                  href={association.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:text-emerald-800"
                >
                  {association.website}
                  <i className="ri-external-link-line ml-1" aria-hidden="true"></i>
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            {t('admin.associations.sectionSystem')}
          </h3>
          <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-2">
            <div>
              <h4 className="mb-1 text-sm font-medium text-gray-700">{t('admin.associations.idLabel')}</h4>
              <p className="font-mono text-xs text-gray-600">{association.id}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium text-gray-700">
                {t('admin.associations.createdLabel')}
              </h4>
              <p className="text-gray-600">{formatDateTime(association.createdAt)}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium text-gray-700">
                {t('admin.associations.updatedLabel')}
              </h4>
              <p className="text-gray-600">{formatDateTime(association.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

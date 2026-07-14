import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { associationsApi } from '../../../lib/api/associations';
import type { Association } from '../../../lib/api/types';
import { resolveMediaUrl } from '../../../lib/api/media-url';

export const AdminAssociationsList: React.FC = () => {
  const [associations, setAssociations] = useState<Association[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    loadAssociations();
  }, []);

  const loadAssociations = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await associationsApi.getAssociationsForAdmin();
      if (response.success && response.data) {
        setAssociations(response.data);
      } else {
        setError(t('admin.associations.errorLoad'));
      }
    } catch (error) {
      console.error('Error loading associations:', error);
      setError(t('admin.associations.errorLoad'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(t('admin.common.confirmDelete', { name }))) {
      return;
    }

    try {
      const response = await associationsApi.deleteAssociation(id);
      if (response.success) {
        await loadAssociations(); // Reload the list
      } else {
        setError(t('admin.associations.errorDelete'));
      }
    } catch (error) {
      console.error('Error deleting association:', error);
      setError(t('admin.associations.errorDelete'));
    }
  };

  // Generate provinces dynamically
  const getUniqueProvinces = () => {
    const provinces = new Set<string>();
    associations.forEach(association => provinces.add(association.province));
    return ['all', ...Array.from(provinces).sort()];
  };

  const provinces = getUniqueProvinces();

  const filteredAssociations = associations.filter((association) => {
    const matchesSearch =
      association.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      association.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      association.domains.some((d) => d.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesProvince =
      selectedProvince === 'all' || association.province === selectedProvince;
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'active' && association.isActive) ||
      (selectedStatus === 'inactive' && !association.isActive);
    return matchesSearch && matchesProvince && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-end">
        <Link
          to="/admin/associations/create"
          className="inline-flex w-full items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700 sm:w-auto"
        >
          <i className="ri-add-line mr-2"></i>
          {t('admin.associations.create')}
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder={t('admin.associations.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="md:w-48">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province === 'all' ? t('admin.associations.filterAllProvinces') : province}
                </option>
              ))}
            </select>
          </div>
          <div className="md:w-48">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">{t('admin.associations.filterAllStatuses')}</option>
              <option value="active">{t('admin.common.active')}</option>
              <option value="inactive">{t('admin.common.inactive')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          {error}
          <button 
            onClick={loadAssociations}
            className="ml-4 text-red-600 hover:text-red-800 font-medium"
          >
            {t('admin.common.tryAgain')}
          </button>
        </div>
      )}

      {!isLoading && !error && filteredAssociations.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <i className="ri-building-line text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('admin.associations.emptyTitle')}</h3>
          <p className="text-gray-500 mb-4">
            {associations.length === 0
              ? t('admin.associations.emptyAll')
              : t('admin.associations.emptySearch')}
          </p>
          {associations.length === 0 && (
            <Link
              to="/admin/associations/create"
              className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              <i className="ri-add-line mr-2"></i>
              {t('admin.associations.createFirst')}
            </Link>
          )}
        </div>
      )}

      {!isLoading && !error && filteredAssociations.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.associations.colAssociation')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.associations.colLocation')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.associations.colDomains')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.associations.colMembers')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.common.status')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('admin.common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssociations.map((association) => (
                  <tr key={association.id} className={`hover:bg-gray-50 ${
                    !association.isActive ? 'opacity-75 bg-gray-50' : ''
                  }`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={
                              association.imageUrl
                                ? resolveMediaUrl(association.imageUrl)
                                : 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><rect width=\'40\' height=\'40\' fill=\'#e5e7eb\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'18\' fill=\'#6b7280\'>?</text></svg>'
                            }
                            alt={association.name}
                            onError={(e) => { e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'><rect width=\'40\' height=\'40\' fill=\'#e5e7eb\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' font-size=\'18\' fill=\'#6b7280\'>?</text></svg>'; }}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {association.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {association.president || t('admin.associations.presidentTba')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{association.city}</div>
                      <div className="text-sm text-gray-500">{association.province}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {association.domains.slice(0, 2).map((domain) => (
                          <span
                            key={domain}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
                          >
                            {domain}
                          </span>
                        ))}
                        {association.domains.length > 2 && (
                          <span className="text-xs text-gray-500">
                            {t('admin.associations.more', {
                              count: association.domains.length - 2,
                            })}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {association.memberCount || t('admin.associations.tba')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        association.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {association.isActive ? t('admin.common.active') : t('admin.common.inactive')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/admin/associations/${association.id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          {t('admin.common.view')}
                        </Link>
                        <Link
                          to={`/admin/associations/${association.id}/edit`}
                          className="text-emerald-600 hover:text-emerald-900"
                        >
                          {t('admin.common.edit')}
                        </Link>
                        <button
                          onClick={() => handleDelete(association.id, association.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          {t('admin.common.delete')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats */}
      {!isLoading && !error && associations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{associations.length}</div>
            <div className="text-sm text-gray-500">{t('admin.associations.statsTotal')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{associations.filter(a => a.isActive).length}</div>
            <div className="text-sm text-gray-500">{t('admin.associations.statsActive')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-600">{provinces.length - 1}</div>
            <div className="text-sm text-gray-500">{t('admin.associations.statsProvinces')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-emerald-600">{filteredAssociations.length}</div>
            <div className="text-sm text-gray-500">{t('admin.associations.statsShowing')}</div>
          </div>
        </div>
      )}
    </div>
  );
};
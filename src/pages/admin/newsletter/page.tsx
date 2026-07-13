import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { newsletterApi } from '../../../lib/api/newsletter';
import type { NewsletterSubscriptionDto } from '../../../lib/api/types';

type ActiveFilter = 'all' | 'active' | 'inactive';
type LanguageFilter = 'all' | 'fr' | 'en';

const NewsletterAdminPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscriptionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>('all');
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>('active');
  const [actionId, setActionId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);

  const locale = i18n.language.startsWith('fr') ? 'fr-CA' : 'en-CA';

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsletterApi.getAll({
        language: languageFilter === 'all' ? undefined : languageFilter,
        isActive: activeFilter === 'all' ? undefined : activeFilter === 'active',
      });
      if (response.success && response.data) {
        setSubscriptions(response.data);
      } else {
        setError(t('admin.newsletter.errorLoad'));
      }
    } catch (err) {
      console.error('Error loading newsletter subscriptions:', err);
      setError(t('admin.newsletter.errorLoad'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
  }, [languageFilter, activeFilter]);

  const handleDeactivate = async (id: string) => {
    if (!window.confirm(t('admin.newsletter.confirmDeactivate'))) return;

    try {
      setActionId(id);
      const response = await newsletterApi.updateActive(id, { isActive: false });
      if (response.success) {
        await loadSubscriptions();
      }
    } catch (err) {
      console.error('Error deactivating subscription:', err);
    } finally {
      setActionId(null);
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      setActionId(id);
      const response = await newsletterApi.updateActive(id, { isActive: true });
      if (response.success) {
        await loadSubscriptions();
      }
    } catch (err) {
      console.error('Error reactivating subscription:', err);
    } finally {
      setActionId(null);
    }
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const blob = await newsletterApi.exportCsv();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'newsletter-subscribers.csv';
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting newsletter CSV:', err);
      setError(t('admin.newsletter.errorExport'));
    } finally {
      setExporting(false);
    }
  };

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat(locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value));

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('admin.newsletter.title')}</h1>
          <p className="mt-1 text-sm text-gray-600">{t('admin.newsletter.subtitle')}</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          disabled={exporting}
          className="inline-flex items-center justify-center rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
        >
          <i className="ri-download-line mr-2" aria-hidden="true"></i>
          {exporting ? t('admin.newsletter.exporting') : t('admin.newsletter.export')}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value as LanguageFilter)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">{t('admin.newsletter.filterLanguageAll')}</option>
          <option value="fr">{t('admin.newsletter.filterLanguageFr')}</option>
          <option value="en">{t('admin.newsletter.filterLanguageEn')}</option>
        </select>
        <select
          value={activeFilter}
          onChange={(e) => setActiveFilter(e.target.value as ActiveFilter)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
        >
          <option value="all">{t('admin.newsletter.filterStatusAll')}</option>
          <option value="active">{t('admin.newsletter.filterStatusActive')}</option>
          <option value="inactive">{t('admin.newsletter.filterStatusInactive')}</option>
        </select>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colName')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colEmail')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colLanguage')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colSource')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colDate')}
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  {t('admin.newsletter.colStatus')}
                </th>
                <th className="px-4 py-3 text-right font-semibold text-gray-700">
                  {t('admin.newsletter.colActions')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-500">
                    {t('admin.newsletter.empty')}
                  </td>
                </tr>
              ) : (
                subscriptions.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 font-medium text-gray-900">{item.fullName}</td>
                    <td className="px-4 py-3 text-gray-700">{item.email}</td>
                    <td className="px-4 py-3 uppercase text-gray-700">{item.preferredLanguage}</td>
                    <td className="px-4 py-3 text-gray-700">{item.source}</td>
                    <td className="px-4 py-3 text-gray-700">{formatDate(item.createdAt)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          item.isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.isActive
                          ? t('admin.newsletter.statusActive')
                          : t('admin.newsletter.statusInactive')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      {item.isActive ? (
                        <button
                          type="button"
                          disabled={actionId === item.id}
                          onClick={() => handleDeactivate(item.id)}
                          className="text-sm font-semibold text-amber-700 hover:text-amber-900 disabled:opacity-50"
                        >
                          {t('admin.newsletter.deactivate')}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={actionId === item.id}
                          onClick={() => handleReactivate(item.id)}
                          className="text-sm font-semibold text-emerald-700 hover:text-emerald-900 disabled:opacity-50"
                        >
                          {t('admin.newsletter.reactivate')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdminPage;

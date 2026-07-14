import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AdminLanguageTabs,
  isEnglishContentIncomplete,
} from '../../../../components/admin/AdminLanguageTabs';
import { projectsApi } from '../../../../lib/api/projects';
import type { CreateProjectRequest } from '../../../../lib/api/types';

const fieldClass =
  'w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500';

const CreateProjectPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<CreateProjectRequest>({
    title: '',
    titleEn: '',
    location: '',
    locationEn: '',
    type: 'Développement au Burkina',
    status: 'Planification',
    progress: 0,
    description: '',
    descriptionEn: '',
    imageUrl: '',
    budget: '',
    fundsRaised: '',
    beneficiaries: '',
    beneficiariesEn: '',
    startDate: '',
    endDate: '',
    partners: [],
  });
  const [partners, setPartners] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const requestData = {
        ...formData,
        partners: partners
          .split(',')
          .map((p) => p.trim())
          .filter((p) => p.length > 0),
      };

      await projectsApi.createProject(requestData);
      navigate('/admin/projects');
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? parseInt(value) || 0 : value,
    }));
  };

  const enIncomplete = isEnglishContentIncomplete([
    [formData.title, formData.titleEn],
    [formData.location, formData.locationEn],
    [formData.description, formData.descriptionEn],
    [formData.beneficiaries, formData.beneficiariesEn],
  ]);

  return (
    <div className="min-w-0 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">{t('admin.projects.create')}</h1>
          <p className="text-gray-600">{t('admin.projects.subtitle')}</p>
        </div>
        <button
          onClick={() => navigate('/admin/projects')}
          className="shrink-0 self-start text-gray-600 hover:text-gray-800 sm:self-auto"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          {t('admin.common.backToList')}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <div className="text-red-600">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="min-w-0 space-y-8 rounded-lg bg-white p-4 shadow sm:p-6">
        <AdminLanguageTabs
          enIncomplete={enIncomplete}
          frPanel={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.title')} *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="location" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.location')} *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>
              <div>
                <label
                  htmlFor="beneficiaries"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Beneficiaries *
                </label>
                <input
                  type="text"
                  id="beneficiaries"
                  name="beneficiaries"
                  value={formData.beneficiaries}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 500+ familles"
                  className={fieldClass}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.description')} *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={fieldClass}
                />
              </div>
            </div>
          }
          enPanel={
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="titleEn" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.title')}
                </label>
                <input
                  type="text"
                  id="titleEn"
                  name="titleEn"
                  value={formData.titleEn || ''}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="locationEn" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.location')}
                </label>
                <input
                  type="text"
                  id="locationEn"
                  name="locationEn"
                  value={formData.locationEn || ''}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div>
                <label
                  htmlFor="beneficiariesEn"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Beneficiaries
                </label>
                <input
                  type="text"
                  id="beneficiariesEn"
                  name="beneficiariesEn"
                  value={formData.beneficiariesEn || ''}
                  onChange={handleChange}
                  className={fieldClass}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="descriptionEn"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {t('admin.common.description')}
                </label>
                <textarea
                  id="descriptionEn"
                  name="descriptionEn"
                  value={formData.descriptionEn || ''}
                  onChange={handleChange}
                  rows={4}
                  className={fieldClass}
                />
              </div>
            </div>
          }
        />

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {t('admin.content.lang.settings')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="type" className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.common.type')} *
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className={fieldClass}
              >
                <option value="Développement au Burkina">Développement au Burkina</option>
                <option value="Initiative Locale">Initiative Locale</option>
              </select>
            </div>
            <div>
              <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.common.status')} *
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className={fieldClass}
              >
                <option value="Planification">Planification</option>
                <option value="En cours">En cours</option>
                <option value="Actif">Actif</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>
            <div>
              <label htmlFor="progress" className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.projects.colProgress')} (0-100) *
              </label>
              <input
                type="number"
                id="progress"
                name="progress"
                value={formData.progress}
                onChange={handleChange}
                min="0"
                max="100"
                required
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="budget" className="mb-2 block text-sm font-medium text-gray-700">
                {t('admin.projects.colBudget')} *
              </label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                placeholder="e.g., 50,000 CAD"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="fundsRaised" className="mb-2 block text-sm font-medium text-gray-700">
                Funds Raised *
              </label>
              <input
                type="text"
                id="fundsRaised"
                name="fundsRaised"
                value={formData.fundsRaised}
                onChange={handleChange}
                required
                placeholder="e.g., 25,000 CAD"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="startDate" className="mb-2 block text-sm font-medium text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="endDate" className="mb-2 block text-sm font-medium text-gray-700">
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={fieldClass}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="partners" className="mb-2 block text-sm font-medium text-gray-700">
                Partners (comma-separated)
              </label>
              <input
                type="text"
                id="partners"
                value={partners}
                onChange={(e) => setPartners(e.target.value)}
                placeholder="e.g., UNICEF, Croix-Rouge, Government of Canada"
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/projects')}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-700 hover:bg-gray-50 sm:w-auto sm:py-2"
          >
            {t('admin.common.cancel')}
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 disabled:opacity-50 sm:w-auto sm:py-2"
          >
            {loading ? t('admin.common.loading') : t('admin.projects.create')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectPage;

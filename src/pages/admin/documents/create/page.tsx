import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AdminLanguageTabs,
  isEnglishContentIncomplete,
} from '../../../../components/admin/AdminLanguageTabs';
import { buildApiUrl } from '../../../../lib/api/base-url';

const fieldClass =
  'w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500';

export const CreateDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    description: '',
    descriptionEn: '',
    icon: 'ri-file-line',
    pages: '',
    pagesEn: '',
    category: 'officiel',
    categoryEn: '',
    displayOrder: 0,
  });
  const [file, setFile] = useState<File | null>(null);

  const iconOptions = [
    { value: 'ri-file-text-line', label: 'Texte' },
    { value: 'ri-book-line', label: 'Livre' },
    { value: 'ri-shield-check-line', label: 'Bouclier' },
    { value: 'ri-roadmap-line', label: 'Roadmap' },
    { value: 'ri-file-pdf-line', label: 'PDF' },
    { value: 'ri-article-line', label: 'Article' },
    { value: 'ri-folder-line', label: 'Dossier' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Veuillez sélectionner un fichier');
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('file', file);
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('icon', formData.icon);
      data.append('pages', formData.pages);
      data.append('category', formData.category);
      data.append('displayOrder', formData.displayOrder.toString());
      data.append('nameEn', formData.nameEn);
      data.append('descriptionEn', formData.descriptionEn);
      data.append('pagesEn', formData.pagesEn);
      data.append('categoryEn', formData.categoryEn);

      const response = await fetch(buildApiUrl('/api/documents'), {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        navigate('/admin/documents');
      } else {
        alert('Erreur lors de la création du document: ' + (result.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Erreur lors de la création du document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const enIncomplete = isEnglishContentIncomplete([
    [formData.name, formData.nameEn],
    [formData.description, formData.descriptionEn],
    [formData.pages, formData.pagesEn],
    [formData.category, formData.categoryEn],
  ]);

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{t('admin.documents.create')}</h1>
        <p className="mt-2 text-gray-600">{t('admin.documents.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="min-w-0 space-y-8 rounded-lg bg-white p-4 shadow sm:p-6">
        <AdminLanguageTabs
          enIncomplete={enIncomplete}
          frPanel={
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={fieldClass}
                  placeholder="ex: Statuts du HCBE Canada"
                />
              </div>
              <div>
                <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.description')}
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={fieldClass}
                  placeholder="Description du document..."
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="pages" className="mb-2 block text-sm font-medium text-gray-700">
                    {t('admin.documents.colPages')}
                  </label>
                  <input
                    type="text"
                    id="pages"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    className={fieldClass}
                    placeholder="ex: 24 pages"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="mb-2 block text-sm font-medium text-gray-700">
                    {t('admin.news.category')}
                  </label>
                  <input
                    type="text"
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={fieldClass}
                    placeholder="ex: officiel"
                  />
                </div>
              </div>
            </div>
          }
          enPanel={
            <div className="space-y-6">
              <div>
                <label htmlFor="nameEn" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.name')}
                </label>
                <input
                  type="text"
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                  className={fieldClass}
                  placeholder="e.g. HCBE Canada Bylaws"
                />
              </div>
              <div>
                <label htmlFor="descriptionEn" className="mb-2 block text-sm font-medium text-gray-700">
                  {t('admin.common.description')}
                </label>
                <textarea
                  id="descriptionEn"
                  rows={3}
                  value={formData.descriptionEn}
                  onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                  className={fieldClass}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="pagesEn" className="mb-2 block text-sm font-medium text-gray-700">
                    {t('admin.documents.colPages')}
                  </label>
                  <input
                    type="text"
                    id="pagesEn"
                    value={formData.pagesEn}
                    onChange={(e) => setFormData({ ...formData, pagesEn: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. 24 pages"
                  />
                </div>
                <div>
                  <label htmlFor="categoryEn" className="mb-2 block text-sm font-medium text-gray-700">
                    {t('admin.news.category')}
                  </label>
                  <input
                    type="text"
                    id="categoryEn"
                    value={formData.categoryEn}
                    onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                    className={fieldClass}
                    placeholder="e.g. official"
                  />
                </div>
              </div>
            </div>
          }
        />

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {t('admin.content.lang.settings')}
          </h2>
          <div className="space-y-6">
            <div>
              <label htmlFor="file" className="mb-2 block text-sm font-medium text-gray-700">
                Fichier *
              </label>
              <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-4 pb-6 pt-5 transition-colors hover:border-emerald-500 sm:px-6">
                <div className="space-y-1 text-center">
                  <i className="ri-upload-cloud-line text-4xl text-gray-400"></i>
                  <div className="flex flex-col items-center gap-1 text-sm text-gray-600 sm:flex-row sm:justify-center">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none hover:text-emerald-500"
                    >
                      <span>Télécharger un fichier</span>
                      <input
                        id="file"
                        name="file"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                    <p className="sm:pl-1">ou glisser-déposer</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX jusqu&apos;à 50MB</p>
                  {file && (
                    <p className="mt-2 break-all text-sm font-medium text-emerald-600">
                      <i className="ri-file-line mr-1"></i>
                      {file.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="icon" className="mb-2 block text-sm font-medium text-gray-700">
                Icône
              </label>
              <select
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className={fieldClass}
              >
                {iconOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="displayOrder" className="mb-2 block text-sm font-medium text-gray-700">
                Ordre d&apos;affichage
              </label>
              <input
                type="number"
                id="displayOrder"
                value={formData.displayOrder}
                onChange={(e) =>
                  setFormData({ ...formData, displayOrder: parseInt(e.target.value) })
                }
                className={fieldClass}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/documents')}
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:py-2"
          >
            {t('admin.common.cancel')}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md border border-transparent bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line mr-2 animate-spin"></i>
                {t('admin.common.loading')}
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                {t('admin.documents.create')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDocumentPage;

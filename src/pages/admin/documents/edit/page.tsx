import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AdminLanguageTabs,
  isEnglishContentIncomplete,
} from '../../../../components/admin/AdminLanguageTabs';
import { buildApiUrl } from '../../../../lib/api/base-url';

const fieldClass =
  'w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-emerald-500';

interface Document {
  id: string;
  name: string;
  nameEn?: string;
  description?: string;
  descriptionEn?: string;
  icon?: string;
  type?: string;
  size?: string;
  pages?: string;
  pagesEn?: string;
  category?: string;
  categoryEn?: string;
  url?: string;
  downloads: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [document, setDocument] = useState<Document | null>(null);
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
    isActive: true,
    file: null as File | null,
  });

  const iconOptions = [
    { value: 'ri-file-text-line', label: 'Texte' },
    { value: 'ri-book-line', label: 'Livre' },
    { value: 'ri-shield-check-line', label: 'Bouclier' },
    { value: 'ri-roadmap-line', label: 'Roadmap' },
    { value: 'ri-file-pdf-line', label: 'PDF' },
    { value: 'ri-article-line', label: 'Article' },
    { value: 'ri-folder-line', label: 'Dossier' },
  ];

  useEffect(() => {
    if (id) {
      loadDocument(id);
    }
  }, [id]);

  const loadDocument = async (docId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(buildApiUrl(`/api/documents/${docId}`));
      const data = await response.json();
      if (data.success && data.data) {
        setDocument(data.data);
        setFormData({
          name: data.data.name,
          nameEn: data.data.nameEn || '',
          description: data.data.description || '',
          descriptionEn: data.data.descriptionEn || '',
          icon: data.data.icon || 'ri-file-line',
          pages: data.data.pages || '',
          pagesEn: data.data.pagesEn || '',
          category: data.data.category || 'officiel',
          categoryEn: data.data.categoryEn || '',
          displayOrder: data.data.displayOrder,
          isActive: data.data.isActive,
          file: null,
        });
      }
    } catch (error) {
      console.error('Error loading document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('description', formData.description);
      data.append('icon', formData.icon);
      data.append('pages', formData.pages);
      data.append('category', formData.category);
      data.append('displayOrder', formData.displayOrder.toString());
      data.append('isActive', formData.isActive.toString());
      data.append('nameEn', formData.nameEn);
      data.append('descriptionEn', formData.descriptionEn);
      data.append('pagesEn', formData.pagesEn);
      data.append('categoryEn', formData.categoryEn);

      if (formData.file) {
        data.append('file', formData.file);
      }

      const response = await fetch(buildApiUrl(`/api/documents/${id}`), {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        navigate(`/admin/documents/${id}`);
      } else {
        alert(
          'Erreur lors de la modification du document: ' + (result.message || 'Erreur inconnue'),
        );
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Erreur lors de la modification du document');
    } finally {
      setIsSubmitting(false);
    }
  };

  const enIncomplete = isEnglishContentIncomplete([
    [formData.name, formData.nameEn],
    [formData.description, formData.descriptionEn],
    [formData.pages, formData.pagesEn],
    [formData.category, formData.categoryEn],
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900">Document non trouvé</h3>
        <Link to="/admin/documents" className="mt-4 text-emerald-600 hover:text-emerald-700">
          {t('admin.common.backToList')}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full min-w-0 max-w-4xl">
      <div className="mb-6 sm:mb-8">
        <Link
          to={`/admin/documents/${id}`}
          className="mb-2 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <i className="ri-arrow-left-line mr-1"></i>
          Retour au document
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">Modifier le Document</h1>
        <p className="mt-2 text-gray-600">Mettre à jour les informations du document</p>
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
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
                <i className={`${formData.icon} text-2xl text-emerald-600`}></i>
                <span>Aperçu de l&apos;icône</span>
              </div>
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

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">{t('admin.common.active')}</span>
              </label>
            </div>

            <div className="rounded-lg bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-upload-line text-xl text-blue-400"></i>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Remplacer le fichier (optionnel)
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Vous pouvez uploader un nouveau fichier pour remplacer l&apos;actuel.</p>
                    {document.url && <p className="mt-1">Fichier actuel : {document.url}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nouveau fichier (optionnel)
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setFormData({ ...formData, file: files[0] });
                  }
                }}
                className="block w-full max-w-full cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.file && (
                <p className="mt-2 text-sm text-gray-600">
                  <i className="ri-file-line mr-1"></i>
                  Nouveau fichier sélectionné : {formData.file.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end sm:gap-0 sm:space-x-3">
          <Link
            to={`/admin/documents/${id}`}
            className="w-full rounded-md border border-gray-300 px-4 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto sm:py-2"
          >
            {t('admin.common.cancel')}
          </Link>
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
                {t('admin.common.save')}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocumentPage;

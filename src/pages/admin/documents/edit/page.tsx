import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { buildApiUrl } from '../../../../lib/api/base-url';

interface Document {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  type?: string;
  size?: string;
  pages?: string;
  category?: string;
  url?: string;
  downloads: number;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
}

export const EditDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [document, setDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'ri-file-line',
    pages: '',
    category: 'officiel',
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
          description: data.data.description || '',
          icon: data.data.icon || 'ri-file-line',
          pages: data.data.pages || '',
          category: data.data.category || 'officiel',
          displayOrder: data.data.displayOrder,
          isActive: data.data.isActive,
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
      
      // Ajouter le fichier s'il a été sélectionné
      if (formData.file) {
        data.append('file', formData.file);
      }

      const response = await fetch(buildApiUrl(`/api/documents/${id}`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });

      const result = await response.json();

      if (result.success) {
        navigate(`/admin/documents/${id}`);
      } else {
        alert('Erreur lors de la modification du document: ' + (result.message || 'Erreur inconnue'));
      }
    } catch (error) {
      console.error('Error updating document:', error);
      alert('Erreur lors de la modification du document');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">Document non trouvé</h3>
        <Link to="/admin/documents" className="mt-4 text-emerald-600 hover:text-emerald-700">
          Retour à la liste
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          to={`/admin/documents/${id}`}
          className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-flex items-center"
        >
          <i className="ri-arrow-left-line mr-1"></i>
          Retour au document
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">Modifier le Document</h1>
        <p className="mt-2 text-gray-600">Mettre à jour les informations du document</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-6">
        {/* Nom */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nom du Document *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Icône */}
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
            Icône
          </label>
          <select
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          >
            {iconOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-500">
            <i className={`${formData.icon} text-2xl text-emerald-600`}></i>
            <span>Aperçu de l'icône</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pages */}
          <div>
            <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
              Nombre de Pages
            </label>
            <input
              type="text"
              id="pages"
              value={formData.pages}
              onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="ex: 24 pages"
            />
          </div>

          {/* Catégorie */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Catégorie
            </label>
            <input
              type="text"
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Ordre d'affichage */}
          <div>
            <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-2">
              Ordre d'affichage
            </label>
            <input
              type="number"
              id="displayOrder"
              value={formData.displayOrder}
              onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Statut */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded border-gray-300 text-emerald-600 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
            />
            <span className="ml-2 text-sm text-gray-700">Document actif</span>
          </label>
        </div>

        {/* Info fichier */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="ri-upload-line text-blue-400 text-xl"></i>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Remplacer le fichier (optionnel)</h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>Vous pouvez uploader un nouveau fichier pour remplacer l'actuel.</p>
                {document.url && (
                  <p className="mt-1">Fichier actuel : {document.url}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Champ upload de fichier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
          />
          {formData.file && (
            <p className="mt-2 text-sm text-gray-600">
              <i className="ri-file-line mr-1"></i>
              Nouveau fichier sélectionné : {formData.file.name}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Link
            to={`/admin/documents/${id}`}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Enregistrement...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                Enregistrer les modifications
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDocumentPage;

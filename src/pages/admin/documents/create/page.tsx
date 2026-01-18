import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { buildApiUrl } from '../../../../lib/api/base-url';

export const CreateDocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'ri-file-line',
    pages: '',
    category: 'officiel',
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

      const response = await fetch(buildApiUrl('/api/documents'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Créer un Document</h1>
        <p className="mt-2 text-gray-600">Ajouter un nouveau document officiel</p>
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
            placeholder="ex: Statuts du HCBE Canada"
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
            placeholder="Description du document..."
          />
        </div>

        {/* Fichier */}
        <div>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
            Fichier *
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-emerald-500 transition-colors">
            <div className="space-y-1 text-center">
              <i className="ri-upload-cloud-line text-4xl text-gray-400"></i>
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none"
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
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX jusqu'à 50MB</p>
              {file && (
                <p className="text-sm text-emerald-600 font-medium mt-2">
                  <i className="ri-file-line mr-1"></i>
                  {file.name}
                </p>
              )}
            </div>
          </div>
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
              placeholder="ex: officiel"
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

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/admin/documents')}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Création en cours...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                Créer le Document
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDocumentPage;

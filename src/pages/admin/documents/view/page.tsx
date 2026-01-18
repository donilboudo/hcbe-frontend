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

export const ViewDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
      }
    } catch (error) {
      console.error('Error loading document:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!document || !window.confirm(`Êtes-vous sûr de vouloir supprimer "${document.name}" ?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(buildApiUrl(`/api/documents/${document.id}`), {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        navigate('/admin/documents');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Erreur lors de la suppression du document');
    }
  };

  const handleDownload = async () => {
    if (!document) return;

    try {
      const response = await fetch(buildApiUrl(`/api/documents/${document.id}/download`));
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = window.document.createElement('a');
        a.href = url;
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'document.pdf';
        a.download = filename;
        window.document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        window.document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <Link
              to="/admin/documents"
              className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-flex items-center"
            >
              <i className="ri-arrow-left-line mr-1"></i>
              Retour à la liste
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Détails du Document</h1>
          </div>
          <div className="flex space-x-3">
            <Link
              to={`/admin/documents/${document.id}/edit`}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <i className="ri-edit-line mr-2"></i>
              Modifier
            </Link>
            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
            >
              <i className="ri-delete-bin-line mr-2"></i>
              Supprimer
            </button>
          </div>
        </div>
      </div>

      {/* Document Info */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Header with icon */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <i className={`${document.icon || 'ri-file-line'} text-4xl text-emerald-600`}></i>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{document.name}</h2>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  document.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {document.isActive ? 'Actif' : 'Inactif'}
                </span>
                {document.category && (
                  <span className="text-emerald-100 text-sm">
                    <i className="ri-price-tag-3-line mr-1"></i>
                    {document.category}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="px-6 py-6 space-y-6">
          {/* Description */}
          {document.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-gray-900">{document.description}</p>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Taille</div>
              <div className="text-lg font-semibold text-gray-900">{document.size || 'N/A'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Pages</div>
              <div className="text-lg font-semibold text-gray-900">{document.pages || 'N/A'}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Téléchargements</div>
              <div className="text-lg font-semibold text-gray-900">{document.downloads}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-1">Ordre</div>
              <div className="text-lg font-semibold text-gray-900">{document.displayOrder}</div>
            </div>
          </div>

          {/* Technical Info */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Informations techniques</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">ID</dt>
                <dd className="mt-1 text-sm text-gray-900 font-mono">{document.id}</dd>
              </div>
              {document.type && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type de fichier</dt>
                  <dd className="mt-1 text-sm text-gray-900">{document.type}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-gray-500">Date de création</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(document.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </dd>
              </div>
              {document.url && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">URL</dt>
                  <dd className="mt-1 text-sm text-gray-900">{document.url}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Actions */}
          {document.url && (
            <div className="border-t pt-6">
              <button
                onClick={handleDownload}
                className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <i className="ri-download-line mr-2"></i>
                Télécharger le document
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDocumentPage;

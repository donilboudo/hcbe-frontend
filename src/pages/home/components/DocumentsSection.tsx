import { useState, useEffect } from 'react';
import { buildApiUrl } from '../../../lib/api/base-url';

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

const DocumentsSection = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(buildApiUrl('/api/documents'));
      const data = await response.json();
      if (data.success && data.data) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (docId: string) => {
    try {
      const response = await fetch(buildApiUrl(`/api/documents/${docId}/download`));
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const contentDisposition = response.headers.get('content-disposition');
        const filename = contentDisposition
          ? contentDisposition.split('filename=')[1].replace(/"/g, '')
          : 'document.pdf';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full mb-4">
            <i className="ri-folder-line text-emerald-600"></i>
            <span className="text-emerald-600 font-semibold text-sm">Documents Officiels</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Statuts et Règlements
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Consultez et téléchargez les documents officiels régissant le fonctionnement du HCBE Canada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md border border-gray-200">
                  <i className={`${doc.icon || 'ri-file-line'} text-3xl text-emerald-600`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{doc.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <i className="ri-file-line mr-1"></i>
                      {doc.size || 'N/A'}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-pages-line mr-1"></i>
                      {doc.pages || 'N/A'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors shadow-md whitespace-nowrap"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Télécharger le PDF
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center">
                <i className="ri-information-line text-4xl text-white"></i>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Besoin d'informations supplémentaires ?
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Si vous avez des questions concernant nos statuts, règlements ou tout autre document officiel, notre équipe est à votre disposition pour vous fournir les éclaircissements nécessaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  Nous Contacter
                </button>
                <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap">
                  <i className="ri-question-line mr-2"></i>
                  FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;

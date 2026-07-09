import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(buildApiUrl('/api/documents'));
      const data = await response.json();
      if (data.success && data.data) {
        setDocuments(data.data);
      } else {
        setError('Les documents ne sont pas disponibles pour le moment.');
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      setError('Impossible de charger les documents officiels.');
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
      } else {
        throw new Error(`Download failed with status ${response.status}`);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      setError('Le téléchargement a échoué. Veuillez réessayer ou nous contacter.');
    }
  };

  if (isLoading) {
    return (
      <section id="documents" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2].map((item) => (
              <div key={item} className="rounded-[2rem] border border-gray-200 bg-gray-50 p-7">
                <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />
                <div className="mt-6 h-5 w-2/3 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-4 h-4 w-full animate-pulse rounded-full bg-gray-200" />
                <div className="mt-2 h-4 w-4/5 animate-pulse rounded-full bg-gray-200" />
                <div className="mt-7 h-11 w-40 animate-pulse rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="documents" className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <i className="ri-file-list-3-line" aria-hidden="true"></i>
              Bibliothèque officielle
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">
              Statuts, règlements et ressources à jour.
            </h2>
          </div>
          <p className="text-lg leading-8 text-gray-600">
            Les documents sont regroupés ici pour faciliter la consultation. Chaque fichier peut
            être téléchargé directement lorsque sa version est disponible.
          </p>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <div className="flex gap-3">
              <i className="ri-error-warning-line mt-0.5 text-xl" aria-hidden="true"></i>
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {documents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {documents.map((doc) => (
              <article
                key={doc.id}
                className="group overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="h-2 bg-gradient-to-r from-emerald-700 via-amber-400 to-red-500" />
                <div className="p-7">
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-3xl text-emerald-700 ring-1 ring-emerald-100">
                      <i className={doc.icon || 'ri-file-pdf-2-line'} aria-hidden="true"></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-600">
                          {doc.category || 'Document officiel'}
                        </span>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          Actif
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-950">{doc.name}</h3>
                      {doc.description && (
                        <p className="mt-3 text-sm leading-6 text-gray-600">{doc.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-3 border-y border-gray-100 py-5 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Format</p>
                      <p className="mt-1 font-semibold text-gray-800">{doc.type || 'PDF'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Taille</p>
                      <p className="mt-1 font-semibold text-gray-800">{doc.size || 'Non précisée'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Pages</p>
                      <p className="mt-1 font-semibold text-gray-800">{doc.pages || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500">
                      {doc.downloads.toLocaleString('fr-CA')} téléchargement{doc.downloads > 1 ? 's' : ''}
                    </p>
                    <button
                      onClick={() => handleDownload(doc.id)}
                      className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg shadow-emerald-900/10 transition hover:bg-emerald-800"
                    >
                      Télécharger
                      <i className="ri-download-line ml-2" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl text-emerald-700 shadow-sm">
              <i className="ri-folder-open-line" aria-hidden="true"></i>
            </div>
            <h3 className="mt-6 text-2xl font-bold text-gray-950">Aucun document publié pour le moment.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Les documents officiels seront ajoutés ici dès qu'ils seront disponibles.
            </p>
          </div>
        )}

        <div className="mt-14 overflow-hidden rounded-[2rem] bg-gray-950 text-white">
          <div className="grid gap-0 lg:grid-cols-[0.75fr_1.25fr]">
            <div className="bg-gradient-to-br from-emerald-700 to-emerald-950 p-8 md:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-3xl">
                <i className="ri-information-line" aria-hidden="true"></i>
              </div>
              <h3 className="mt-6 text-3xl font-bold">Besoin d'une précision ?</h3>
            </div>
            <div className="p-8 md:p-10">
              <p className="max-w-3xl text-lg leading-8 text-gray-300">
                Si un document manque, si une version semble ancienne ou si vous avez besoin d'une
                explication, envoyez un message à l'équipe du HCBE Canada.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-50"
                >
                  Contacter l'équipe
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold text-white transition hover:bg-white/15"
                >
                  Retour aux services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;

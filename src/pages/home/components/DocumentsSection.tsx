const DocumentsSection = () => {
  const documents = [
    {
      id: 1,
      titre: 'Statuts du HCBE Canada',
      description: 'Document officiel définissant la structure, les objectifs et le fonctionnement du Haut Conseil des Burkinabè de l\'Extérieur au Canada.',
      icon: 'ri-file-text-line',
      taille: '2.4 MB',
      pages: '24 pages',
    },
    {
      id: 2,
      titre: 'Règlements Intérieurs',
      description: 'Ensemble des règles et procédures régissant les activités quotidiennes et la gouvernance du comité de base.',
      icon: 'ri-book-line',
      taille: '1.8 MB',
      pages: '18 pages',
    },
    {
      id: 3,
      titre: 'Code de Conduite',
      description: 'Principes éthiques et normes de comportement attendus de tous les membres et représentants du HCBE Canada.',
      icon: 'ri-shield-check-line',
      taille: '1.2 MB',
      pages: '12 pages',
    },
    {
      id: 4,
      titre: 'Plan Stratégique 2024-2027',
      description: 'Vision stratégique et feuille de route pour le développement du HCBE Canada et l\'accompagnement de la diaspora.',
      icon: 'ri-roadmap-line',
      taille: '3.6 MB',
      pages: '36 pages',
    },
  ];

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
                  <i className={`${doc.icon} text-3xl text-emerald-600`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doc.titre}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{doc.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <i className="ri-file-line mr-1"></i>
                      {doc.taille}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-pages-line mr-1"></i>
                      {doc.pages}
                    </span>
                  </div>
                  <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors shadow-md whitespace-nowrap">
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

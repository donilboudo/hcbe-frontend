const BoursesSection = () => {
  const opportunites = [
    {
      id: 1,
      titre: 'Bourses d\'Études Supérieures',
      description: 'Programmes de bourses pour les étudiants burkinabè souhaitant poursuivre des études universitaires au Canada.',
      icon: 'ri-graduation-cap-line',
      montant: 'Jusqu\'à 15 000 $ CAD',
      duree: 'Annuel',
      criteres: [
        'Être de nationalité burkinabè',
        'Avoir une admission dans une université canadienne',
        'Démontrer l\'excellence académique',
        'Présenter un projet d\'études pertinent',
      ],
    },
    {
      id: 2,
      titre: 'Formations Professionnelles',
      description: 'Accès à des formations certifiantes pour améliorer vos compétences et faciliter votre intégration professionnelle.',
      icon: 'ri-briefcase-line',
      montant: 'Jusqu\'à 5 000 $ CAD',
      duree: 'Selon le programme',
      criteres: [
        'Être membre du HCBE Canada',
        'Avoir un projet professionnel défini',
        'Démontrer la pertinence de la formation',
        'S\'engager à partager les connaissances acquises',
      ],
    },
    {
      id: 3,
      titre: 'Subventions pour Projets Communautaires',
      description: 'Financement pour des initiatives visant le développement de la communauté burkinabè au Canada ou au Burkina Faso.',
      icon: 'ri-community-line',
      montant: 'Jusqu\'à 10 000 $ CAD',
      duree: 'Par projet',
      criteres: [
        'Projet à impact communautaire mesurable',
        'Budget détaillé et réaliste',
        'Équipe de gestion compétente',
        'Plan de suivi et d\'évaluation',
      ],
    },
    {
      id: 4,
      titre: 'Programme de Mentorat Entrepreneurial',
      description: 'Accompagnement et soutien financier pour les entrepreneurs burkinabè souhaitant démarrer ou développer leur entreprise.',
      icon: 'ri-rocket-line',
      montant: 'Jusqu\'à 8 000 $ CAD',
      duree: '12 mois',
      criteres: [
        'Avoir un plan d\'affaires solide',
        'Démontrer le potentiel de croissance',
        'Accepter le mentorat du comité',
        'S\'engager dans le programme complet',
      ],
    },
    {
      id: 5,
      titre: 'Bourses de Recherche',
      description: 'Soutien pour les chercheurs travaillant sur des thématiques liées au développement du Burkina Faso.',
      icon: 'ri-microscope-line',
      montant: 'Jusqu\'à 12 000 $ CAD',
      duree: '6 à 18 mois',
      criteres: [
        'Projet de recherche approuvé',
        'Pertinence pour le développement du Burkina',
        'Affiliation à une institution reconnue',
        'Engagement de publication des résultats',
      ],
    },
    {
      id: 6,
      titre: 'Aide à la Mobilité Professionnelle',
      description: 'Support financier pour faciliter la mobilité professionnelle des membres à travers le Canada.',
      icon: 'ri-map-pin-user-line',
      montant: 'Jusqu\'à 3 000 $ CAD',
      duree: 'Ponctuel',
      criteres: [
        'Offre d\'emploi confirmée',
        'Nécessité de relocalisation',
        'Être membre actif du HCBE',
        'Démontrer le besoin financier',
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bourses et Subventions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Le HCBE Canada offre diverses opportunités de financement pour soutenir votre développement personnel et professionnel
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {opportunites.map((opp) => (
            <div
              key={opp.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-200"
            >
              <div className="p-8">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                  <i className={`${opp.icon} text-3xl text-emerald-600`}></i>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{opp.titre}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{opp.description}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700 font-medium">Montant</span>
                    <span className="text-sm font-bold text-emerald-600">{opp.montant}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700 font-medium">Durée</span>
                    <span className="text-sm font-bold text-gray-900">{opp.duree}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center">
                    <i className="ri-checkbox-line mr-2 text-emerald-600"></i>
                    Critères d'éligibilité
                  </h4>
                  <ul className="space-y-2">
                    {opp.criteres.map((critere, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <i className="ri-arrow-right-s-line text-gray-400 flex-shrink-0 mt-0.5"></i>
                        <span className="text-xs text-gray-600">{critere}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer">
                  <i className="ri-file-text-line mr-2"></i>
                  Postuler
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-question-line text-4xl text-white"></i>
            </div>
            <h3 className="text-3xl font-bold mb-4">Besoin d'aide pour votre candidature ?</h3>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Notre équipe est disponible pour vous accompagner dans la préparation de votre dossier de candidature et répondre à toutes vos questions sur nos programmes de bourses et subventions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-mail-line mr-2"></i>
                Nous Contacter
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer">
                <i className="ri-download-line mr-2"></i>
                Guide de Candidature
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoursesSection;
